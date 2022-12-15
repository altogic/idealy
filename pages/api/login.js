import { setCookie } from 'cookies-next';

async function handler(req, res) {
  const { user, session } = req.body;
  setCookie('session_token', session.token, {
    req,
    res,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });

  setCookie('user', user, {
    req,
    res,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  setCookie('session', session, {
    req,
    res,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  });
  return res.status(200).json({ message: 'ok' });
}
export default handler;
