'use client';

import VerifiedMark from '../../verified-mark';
import BioModal from '../bio-modal';

type TAboutCard = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
};

function AboutCard({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: TAboutCard) {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? 'follower' : 'followers';

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-slate-900 p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName} <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          {followedByCount} {followedByLabel}
        </div>
        <p className="text-sm">{bio || 'No bio yet.'}</p>
      </div>
    </div>
  );
}

export default AboutCard;
