// app/api/migrate-data/route.ts
// This file defines the API endpoint for triggering the data migration.

import { NextRequest, NextResponse } from 'next/server';

// Define the URL of your Spring Boot backend's migration endpoint.
const BACKEND_API_URL = 'http://localhost:8080/api/hsr/migrate-data';

/**
 * Handles POST requests to the API route.
 * This function acts as a proxy, forwarding the request to the Spring Boot backend.
 */
export async function POST(req: NextRequest) {
    try {
        const jwt = req.cookies.get('jwt_token')?.value;

        // Forward the POST request to the backend.
        const backendResponse = await fetch(BACKEND_API_URL, {
            method: 'POST',
            // You can pass headers or a body from the incoming request if needed.
            headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,

        });

        // Check if the backend response was successful.
        if (!backendResponse.ok) {
            // If the backend returned an error, parse and return the error message.
            const errorText = await backendResponse.text();
            return new NextResponse(JSON.stringify({ error: `Backend error: ${errorText}` }), {
                status: backendResponse.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Parse the successful response from the backend.
        const responseText = await backendResponse.text();
        // Since the backend returns a simple string, we'll wrap it in a JSON object for consistency.
        return new NextResponse(JSON.stringify({ message: responseText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Failed to proxy request to backend:', error);
        // Return a 500 Internal Server Error if something goes wrong.
        return new NextResponse(JSON.stringify({ error: 'Internal server error while migrating data.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
