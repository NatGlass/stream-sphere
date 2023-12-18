'use server';

import getUser from '@/lib/auth-service';
import prisma from '@/lib/db';
import {
  CreateIngressOptions,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
} from 'livekit-server-sdk';
import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models';
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function resetIngress(hostIdentity: string) {
  try {
    const ingresses = await ingressClient.listIngress({
      // roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    const deleteRoomPromises = rooms.map((room) =>
      roomService.deleteRoom(room.name)
    );

    await Promise.all(deleteRoomPromises);

    const deleteIngressPromises = ingresses
      .filter(
        (ingress): ingress is { ingressId: string } =>
          ingress.ingressId !== undefined
      )
      .map((ingress) => ingressClient.deleteIngress(ingress.ingressId));

    await Promise.all(deleteIngressPromises);
  } catch (error) {
    console.error('Error in resetIngress:', error);
    throw error;
  }
}

export default async function createIngress(ingressType: IngressInput) {
  try {
    const currentUser = await getUser();

    const options: CreateIngressOptions = {
      name: currentUser.username!,
      roomName: currentUser.id,
      participantName: currentUser.username!,
      participantIdentity: currentUser.id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }

    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error('failed to create ingress');
    }

    await prisma.stream.update({
      where: {
        userId: currentUser.id,
      },
      data: {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
    });

    revalidatePath(`/user/${currentUser.username}/keys`);
    return ingress;
  } catch (error) {
    console.error('Error in createIngress:', error);
    throw error;
  }
}
