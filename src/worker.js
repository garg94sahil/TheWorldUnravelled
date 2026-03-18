const BEEHIIV_PUB_ID = 'pub_6e79921b-060e-41a0-98fb-cbdc0c3ea6c9';
const BEEHIIV_API_KEY = 'OISgEFS2Hg2zuprlMJbLBUDYxKaPGIJuIvKZyTeORIDeKxBZVLYbAJaOQkO5HyhF';
const ALLOWED_ORIGIN = 'https://www.theworldunravelled.com';

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { email } = await request.json();

    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true }),
      }
    );

    const data = await beehiivRes.json();

    return new Response(JSON.stringify(data), {
      status: beehiivRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      }
    });
  }
};
