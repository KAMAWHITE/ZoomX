import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/google/callback'
);

let users = [
  { id: 1, username: 'admin', password: '11111111', email: 'admin@gmail.com' }
];
let nextUserId = 2;

export async function GET(req) {
  const code = new URL(req.url).searchParams.get('code');
  if (!code) return Response.redirect('http://localhost:3000/login?error=no_code');

  try {
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = users.find(u => u.email === payload.email);
    if (!user) {
      user = {
        id: nextUserId++,
        name: payload.given_name || payload.name?.split(' ')[0],
        email: payload.email,
        picture: payload.picture,
        username: payload.email.split('@')[0],
      };
      users.push(user);
    }

    const token = `google-${Date.now()}`;

    return new Response(
      `<script>
        localStorage.setItem('token', '${token}');
        localStorage.setItem('user', '${JSON.stringify(user)}');
        window.location.href = '/home';
      </script>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    return Response.redirect('http://localhost:3000/login?error=failed');
  }
}