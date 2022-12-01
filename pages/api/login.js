import AuthService from '@/services/auth';

async function handler(req, res) {
  const { token } = req.body;
  AuthService.setSessionCookie(token, req, res);
  return res.status(200).json({ message: 'ok' });
}
export default handler;
