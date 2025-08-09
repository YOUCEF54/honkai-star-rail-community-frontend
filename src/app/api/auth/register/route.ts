import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();               // pass raw body
  const spring = 'http://localhost:8080/api/auth/register';

  const res = await fetch(spring, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const resBody = await res.text();            // forward as‑is
  return new NextResponse(resBody, { status: res.status });
}

import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const spring = 'http://localhost:8080/api/characters';

  const res = await fetch(spring, {
    headers: { cookie: cookies().toString() },
    credentials: 'include',
  });

  const body = await res.text();
  return new NextResponse(body, { status: res.status });
}
