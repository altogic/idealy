import AuthService from '@/services/auth';
import { setCookie } from 'cookies-next';

async function handler(req, res) {
  const { session } = req.body;
  AuthService.setSessionCookie(session.token, req, res);
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
