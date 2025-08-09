// // src/app/api/characters/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// const SPRING = 'http://localhost:8080/api/characters';

// export async function GET(req: NextRequest) {
//   /** Extract jwt cookie directly from the request */
//   const jwt = req.cookies.get('jwt')?.value;      // ✅ no TS error

//   const res = await fetch(SPRING, {
//     // Convert cookie → Authorization header
//     headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
//     cache: 'no-store',
//   });

//   const body = await res.text();
//   return new NextResponse(body, {
//     status: res.status,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }



// export async function POST(req: NextRequest) {
//   const jwt = req.cookies.get('jwt')?.value;
//   const form = await req.formData();

//   // ✅ Rebuild FormData because `req.formData()` may not stream correctly to Spring
//   const realForm = new FormData();
//   realForm.append('json', form.get('json') as string);
//   realForm.append('image', form.get('image') as File);

//   const res = await fetch(SPRING, {
//     method: 'POST',
//     headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
//     body: realForm,
//   });

//   const text = await res.text();
//   return new NextResponse(text, { status: res.status });
// }


// src/app/api/characters/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SPRING = 'http://localhost:8080/api/characters';

export async function GET(req: NextRequest) {
  const jwt = req.cookies.get('jwt_token')?.value;
  const res = await fetch(SPRING, {
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  // TODO: you may need to adjust size limits if your images are large
  const jwt = req.cookies.get('jwt_token')?.value;

  // Read the multipart request (JSON + image)
  const formData = await req.formData();

  // Proxy it to Spring
  const springRes = await fetch(SPRING, {
    method: 'POST',
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
    body: formData,           // forward the FormData directly
  });

  const text = await springRes.text();
  return new NextResponse(text, {
    status: springRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
