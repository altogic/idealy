/* eslint-disable no-param-reassign */

import { SESSION_COOKIE_OPTIONS } from 'constants';
import { deleteCookie, setCookie as nextCookie } from 'cookies-next';

/* eslint-disable no-bitwise */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function setCookie(name, value, req, res) {
  nextCookie(name, value, {
    req,
    res,
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    domain: process.env.NEXT_PUBLIC_DOMAIN
  });
}
export async function setSessionCookie(session, user, req, res) {
  setCookie('session', session, req, res);
  setCookie('user', user, req, res);
  setCookie('session_token', session.token, req, res);
}
export async function deleteSessionCookies() {
  deleteCookie('session', SESSION_COOKIE_OPTIONS);
  deleteCookie('user', SESSION_COOKIE_OPTIONS);
  deleteCookie('session_token', SESSION_COOKIE_OPTIONS);
  deleteCookie('subdomain', SESSION_COOKIE_OPTIONS);
}

export function randomHexColor() {
  return `#${randomInt(0, 16777214).toString(16)}`;
}
export function generateUrl(link, subdomain = 'app') {
  return `http://${subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}/${link}`;
}
export function shadeHexColor(color, percent) {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  return `#${(
    0x1000000 +
    (Math.round((t - R) * p) + R) * 0x10000 +
    (Math.round((t - G) * p) + G) * 0x100 +
    (Math.round((t - B) * p) + B)
  )
    .toString(16)
    .slice(1)}`;
}
