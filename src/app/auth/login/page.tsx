'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 'credentials: include' is important for sending cookies received from backend
        // For JWT in body, it's about the response JSON.
        body: JSON.stringify({ username, password }),
      });

      // We still parse JSON to check for success messages or specific errors from backend
      const data =
        res.headers.get('content-type')?.includes('application/json')
          ? await res.json()
          : { message: await res.text() };

      // The Next.js API route handles setting the HttpOnly cookie.
      // We just need to check if the login was successful.
      if (res.ok) { // Check for successful HTTP status (2xx)
        console.log("Login successful. HttpOnly JWT cookie should be set by Next.js API route.");
        // Redirect to characters page after successful login
        router.push('/characters');
      } else {
        setError(data.message ?? 'Login failed. Please check your credentials.');
      }
    } catch (err: unknown) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Updated: Redirect to Spring Security's OAuth2 authorization endpoint
  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    window.location.href = `${apiUrl}/oauth2/authorization/google`;
  };

  // Updated: Redirect to Spring Security's OAuth2 authorization endpoint
  const handleFacebookLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    window.location.href = `${apiUrl}/oauth2/authorization/facebook`;
  };

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-gray-950">
      <div
        className="w-80 relative space-y-4 border border-gray-800 bg-gray-900 p-6 rounded-xl shadow"
      >
      <Link href={"/"} className='border text-center hover:brightness-115 text-gray-200 transition-all duration-75 cursor-pointer absolute border-gray-800 bg-gray-900 p-1 left-0 rounded-full  -top-14 w-full '>
        <div className='border border-gray-600 rounded-full w-full p-1 '>Home</div>
      </Link>
        <h1 className="text-2xl font-bold text-center text-white">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 sr-only" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input w-full"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 sr-only" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="Password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-blue-800 border border-blue-600 hover:bg-blue-900 p-1.5 cursor-pointer rounded-md w-full disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0003 4.75C14.0003 4.75 15.6303 5.46 16.9003 6.63L19.4603 4.07C17.7503 2.40 15.0203 1.50 12.0003 1.50C7.72031 1.50 4.07031 3.96 2.36031 7.42L5.80031 9.94C6.68031 8.27 9.17031 6.63 12.0003 6.63Z" fill="#EA4335"/>
              <path d="M23.4999 12.25C23.4999 11.45 23.4299 10.85 23.3099 10.25H12.0001V14.25H18.7801C18.6101 15.13 18.0401 16.01 17.2001 16.68C16.3601 17.35 15.3401 17.88 14.1701 18.25L17.6101 20.81C19.7401 19.00 21.0001 16.20 21.0001 13.00C21.0001 12.75 20.9801 12.50 20.9501 12.25H23.4999Z" fill="#4285F4"/>
              <path d="M5.80031 14.56C5.55031 13.96 5.41031 13.29 5.41031 12.50C5.41031 11.71 5.55031 11.04 5.80031 10.44L2.36031 7.92C1.52031 9.63 1.00031 10.99 1.00031 12.50C1.00031 14.01 1.52031 15.37 2.36031 17.08L5.80031 14.56Z" fill="#FBBC05"/>
              <path d="M12.0003 21.50C14.9803 21.50 17.5203 20.57 19.4603 18.99L16.9003 16.43C15.6303 17.60 14.0003 18.31 12.0003 18.31C9.17031 18.31 6.68031 16.67 5.80031 14.99L2.36031 17.51C4.07031 20.97 7.72031 23.43 12.0003 23.43C14.9803 23.43 17.5203 22.49 19.4603 20.91L16.9003 18.35L12.0003 21.50Z" fill="#34A853"/>
            </svg>
            Sign in with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-sm transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24h11.397v-8.735h-3.037v-3.522h3.037V8.403c0-3.003 1.792-4.664 4.532-4.664 1.307 0 2.433 0.097 2.759 0.141v3.179h-1.899c-1.488 0-1.777 0.707-1.777 1.742v2.291h3.545l-0.462 3.522h-3.083V24h6.082C23.407 24 24 23.407 24 22.675V1.325C24 0.593 23.407 0 22.675 0z" fill="currentColor"/>
            </svg>
            Sign in with Facebook
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
