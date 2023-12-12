import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

// Cannot be a default export in an api route
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing Clerk Webhook Secret');
  }

  // Get the headers from the request
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing required svix headers', { status: 400 });
  }

  // Get the body from the request
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new webhook
  const webhook = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook
  try {
    evt = webhook.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error('Error verifying webhook', error);
    return new Response('Error verifying webhook', { status: 400 });
  }

  // Get the ID and type of the event
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook received with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body', body);

  return new Response('', { status: 200 });
}
