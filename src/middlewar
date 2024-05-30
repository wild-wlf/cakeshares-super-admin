import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const publicPages = ['/'];

const privatePages = [
  '/',
  '/dashboard',
  '/manage-user',
  '/manage-products',
  '/community-chat',
  '/stakeholder-chat',
  '/settings',
];

export function middleware(request) {
  const cookieHeader = cookies(request.headers);
  const token = cookieHeader.get(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE);
  const allowedPages = cookieHeader.get(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE);
  const path = new URL(request.url).pathname;

  const isPublicPage = publicPages.includes(path);
  const isPrivatePage = privatePages.includes(path);

  // Handle ignored extensions (e.g., images)
  const ignoredExtensions = ['.svg', '.ico', '.png', '.jpg', '.jpeg', '.gif'];
  const isIgnored = ignoredExtensions.some(ext => path.endsWith(ext));
  if (isIgnored) {
    return NextResponse.next();
  }

  if (isPublicPage) {
    return NextResponse.next();
  }

  const url = new URL(request.url);
  const currentOrigin = url.origin;

  if (isPrivatePage) {
    if (token && allowedPages) {
      if (allowedPages.value.includes(path)) {
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(`${currentOrigin}/`);
  }
  return NextResponse.next();
}
