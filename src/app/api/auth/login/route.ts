// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Call your Spring Boot backend for authentication
    const springResponse = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!springResponse.ok) {
      const errorData = await springResponse.json();
      return NextResponse.json({ message: errorData.message || 'Authentication failed' }, { status: springResponse.status });
    }

    const springJson = await springResponse.json();
    const token = springJson.token; // Assuming your Spring backend returns a 'token' field

    // Create a new response object to set the cookie
    // IMPORTANT: DO NOT use NextResponse.redirect() here.
    // We will return a 200 OK and let the client-side handle the redirect.
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });

    // Set the HttpOnly JWT cookie
    response.cookies.set({
      name: 'jwt_token', // Ensure this matches the cookie name you verified
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure: true in production (HTTPS)
      sameSite: 'lax', // 'lax' is a good default.
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    console.log("Login successful. HttpOnly JWT cookie 'jwt_token' should be set. Client will redirect.");
    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
