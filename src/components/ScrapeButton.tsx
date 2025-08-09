'use client'; // This directive makes this a Client Component

import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * A client-side component to trigger the full character scraping process.
 * This version uses the original '/api/scrape/all-characters' endpoint
 * and includes a check for user authentication before attempting the request.
 */
export default function ScrapeButton() {
  // State for handling messages, errors, and loading status
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // New state to track a simulated login status
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  /**
   * Simulates a login process. In a real application, this would
   * navigate the user to a login page or open a modal.
   */
  const handleLogin = () => {
    // This is a placeholder. In a real app, you would handle
    // the actual login flow here.
    setIsLoggedIn(true);
    setMessage("You are now logged in! Please try scraping again.");
    setIsError(false);
  };

  /**
   * Asynchronously triggers the backend's "scrape all characters" endpoint.
   */
  async function triggerScraping() {
    if (!isLoggedIn) {
      setMessage("Please log in first before attempting to scrape.");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage(null); // Clear previous messages
    setIsError(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
      
      const res = await fetch(`${apiUrl}/api/scrape/all-characters`, {
        method: 'POST',
        // 'include' is important for sending cookies/auth headers to handle
        // the security you have configured.
        credentials: 'include',
      });

      if (res.ok) {
        setMessage('Full character scraping initiated successfully! Check server logs for details.');
        setIsError(false);
      } else {
        const errorText = await res.text();
        setMessage(`Failed to trigger scraping: ${errorText}`);
        setIsError(true);
        console.error("Backend Error Response:", errorText);
      }

    } catch (error) {
      // Handle unexpected network errors
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setMessage(`An unexpected error occurred: ${errorMessage}`);
      setIsError(true);
      console.error("Frontend caught error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center mt-8 p-4">
      {!isLoggedIn && (
        <Button onClick={handleLogin} className="mb-4 w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white">
          Simulate Login
        </Button>
      )}
      <Button onClick={triggerScraping} disabled={isLoading || !isLoggedIn} className="mb-4 w-full md:w-auto">
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
}
