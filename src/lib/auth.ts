// lib/auth.ts
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode"; // `npm i jwt-decode`

export async function getUser() {
  const cookieStore = await cookies();
  // Corrected: Look for the cookie named 'jwt'
  const token = cookieStore.get("jwt_token")?.value;
  if (!token) return null;

  type Payload = { sub: string; exp: number; roles: string[] };
  try {
    const payload = jwtDecode<Payload>(token);
    // Check if the token has expired
    if (Date.now() / 1000 > payload.exp) {
      console.log("Token expired, returning null.");
      return null;
    }
    console.log("User authenticated:", payload.sub);
    return { username: payload.sub, roles: payload.roles };
  } catch (error) {
    console.error("Error decoding JWT or token is invalid:", error);
    return null;
  }
}
