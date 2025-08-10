'use client'; // This directive makes this a Client Component

import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from 'react';

/**
 * A client-side component to trigger the full character scraping process.
 * This version removes the simulated login and assumes that user authentication
 * is handled elsewhere (e.g., via a global state, context, or a higher-order component).
 * The browser is expected to automatically include the necessary credentials with the request.
 */
const ScrapeButton: React.FC = () => {
  // State for handling messages, errors, and loading status with explicit types
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Asynchronously triggers the backend's "scrape all characters" endpoint.
   */
  async function triggerScraping(): Promise<void> {
    setIsLoading(true);
    setMessage(null); // Clear previous messages
    setIsError(false);

    try {
      const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      
      //  CORRECTED URL: Added "/api/scrape" to the path
      const res: Response = await fetch(`${apiUrl}/api/scrape/all-characters-basic`, {
        method: 'POST',
        // 'include' is important for sending cookies/auth headers
        // that a user may have from a separate login process.
        credentials: 'include',
      });

      if (res.ok) {
        setMessage('Full character scraping initiated successfully! Check server logs for details.');
        setIsError(false);
      } else {
        const errorText: string = await res.text();
        setMessage(`Failed to trigger scraping: ${errorText}`);
        setIsError(true);
        console.error("Backend Error Response:", errorText);
      }

    } catch (error: unknown) {
      // Handle unexpected network errors
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'An unexpected error occurred.';
      }
      setMessage(`An unexpected error occurred: ${errorMessage}`);
      setIsError(true);
      console.error("Frontend caught error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function triggerScraping2(): Promise<void> {
    setIsLoading(true);
    setMessage(null); // Clear previous messages
    setIsError(false);

    try {
      const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      
      //  CORRECTED URL: Added "/api/scrape" to the path
      const res: Response = await fetch(`${apiUrl}/api/scrape/all-characters`, {
        method: 'POST',
        // 'include' is important for sending cookies/auth headers
        // that a user may have from a separate login process.
        credentials: 'include',
      });

      if (res.ok) {
        setMessage('Full character scraping initiated successfully! Check server logs for details.');
        setIsError(false);
      } else {
        const errorText: string = await res.text();
        setMessage(`Failed to trigger scraping: ${errorText}`);
        setIsError(true);
        console.error("Backend Error Response:", errorText);
      }

    } catch (error: unknown) {
      // Handle unexpected network errors
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'An unexpected error occurred.';
      }
      setMessage(`An unexpected error occurred: ${errorMessage}`);
      setIsError(true);
      console.error("Frontend caught error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center mt-8 p-4 dark:bg-gray-800 rounded-lg shadow-md">
      <Button 
        onClick={triggerScraping} 
        disabled={isLoading} 
        className="mb-4 w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Scraping in progress...' : 'Trigger Full Character basic info Scraping'}
      </Button>
      <Button 
        onClick={triggerScraping2} 
        disabled={isLoading} 
        className="mb-4 w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Scraping in progress...' : 'Trigger Full Character Scraping'}
      </Button>
      {message && (
        <p className={`text-sm px-4 py-2 rounded-md text-center w-full md:w-auto
                      ${isError ? 'bg-red-700/30 text-red-300' : 'bg-green-700/30 text-green-300'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ScrapeButton;
