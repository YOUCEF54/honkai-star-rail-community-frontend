'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

// Define the structure for a single star
interface Star {
  x: number;
  y: number;
  z: number; // Used for parallax effect (closer stars move faster)
  size: number;
  color: string;
}

const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]); // Use a ref to hold stars array for stable reference
  const currentCanvasDimensionsRef = useRef({ width: 0, height: 0 }); // Ref for animation loop to read dimensions

  // Constants for the camera focus effect
  const NUM_STARS = 200;
  const STAR_MIN_SIZE = 0.5;
  const STAR_MAX_SIZE = 1;
  const BASE_SPEED = 0.5;
  const Z_FACTOR = 80; // Controls how quickly stars "pass" the camera
  const CHROMATIC_ABERRATION_STRENGTH = 0.005; // Max pixel offset relative to canvas size
  const DISTORTION_STRENGTH = 0.0005; // Max distortion factor relative to canvas size
  const FOCUS_ZONE_PERCENT = 0.2; // Percentage of the smaller canvas dimension for the perfect focus zone

  // Function to initialize stars
  const initStars = useCallback((width: number, height: number, numStars: number): Star[] => {
    const stars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * width, // Z-coordinate for parallax effect
        size: Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE,
        color: `rgba(255, 255, 255, 0.7)`, // Semi-transparent white
      });
    }
    return stars;
  }, []);

  // Function to draw stars with chromatic aberration and distortion
  const drawStars = useCallback((ctx: CanvasRenderingContext2D, stars: Star[], currentWidth: number, currentHeight: number) => {
    ctx.clearRect(0, 0, currentWidth, currentHeight); // Clear the entire canvas

    const centerX = currentWidth / 2;
    const centerY = currentHeight / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY); // Max distance from center to corner
    const focusZoneRadius = Math.min(currentWidth, currentHeight) * FOCUS_ZONE_PERCENT;

    // Set composite operation for blending colors (for chromatic aberration)
    ctx.globalCompositeOperation = 'lighter';

    stars.forEach(star => {
      const scale = currentWidth / (star.z + 0.01); // Add small epsilon to avoid division by zero
      const x = star.x * scale;
      const y = star.y * scale;
      const currentSize = star.size * scale * 0.5;

      // Calculate distance from center
      const distX = x - centerX;
      const distY = y - centerY;
      const distanceFromCenter = Math.sqrt(distX * distX + distY * distY);

      // Calculate effect strength based on distance from center
      // Effect is 0 in the focus zone, and increases linearly outside it
      let effectStrength = 0;
      if (distanceFromCenter > focusZoneRadius) {
        effectStrength = Math.min(1, (distanceFromCenter - focusZoneRadius) / (maxDistance - focusZoneRadius));
      }

      // Chromatic Aberration: Draw multiple circles with slight offsets and different colors
      const chromaticOffset = effectStrength * CHROMATIC_ABERRATION_STRENGTH * currentWidth; // Offset scales with canvas width

      // Distortion: Make stars elliptical, stretching away from the center
      const distortionAmount = effectStrength * DISTORTION_STRENGTH * currentWidth; // Amount of distortion to add
      let radiusX = currentSize;
      let radiusY = currentSize;

      // Apply distortion based on direction from center
      if (distanceFromCenter > 0) {
        // Calculate the proportion of displacement along X and Y axes
        const ratioX = Math.abs(distX / distanceFromCenter);
        const ratioY = Math.abs(distY / distanceFromCenter);

        // Stretch radius along the direction of displacement
        radiusX = currentSize * (1 + distortionAmount * ratioX);
        radiusY = currentSize * (1 + distortionAmount * ratioY);
      }


      // Draw Red channel
      ctx.fillStyle = `rgba(255, 0, 0, ${parseFloat(star.color.split(',')[3]) * (1 - effectStrength * 0.5)})`; // Reduce opacity slightly
      ctx.beginPath();
      ctx.ellipse(x - chromaticOffset, y, radiusX, radiusY, 0, 0, Math.PI * 2); // Use ellipse for distortion
      ctx.fill();

      // Draw Green channel (main star)
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2); // Use ellipse for distortion
      ctx.fill();

      // Draw Blue channel
      ctx.fillStyle = `rgba(0, 0, 255, ${parseFloat(star.color.split(',')[3]) * (1 - effectStrength * 0.5)})`; // Reduce opacity slightly
      ctx.beginPath();
      ctx.ellipse(x + chromaticOffset, y, radiusX, radiusY, 0, 0, Math.PI * 2); // Use ellipse for distortion
      ctx.fill();
    });

    // Reset composite operation after drawing all stars
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Function to update star positions
  const updateStars = useCallback((stars: Star[], currentWidth: number, currentHeight: number) => {
    stars.forEach(star => {
      const speed = BASE_SPEED + (currentWidth / (star.z + Z_FACTOR)) * 0.5;
      star.z -= speed;

      if (star.z <= 0) {
        // Reset star to a new random position at the far end
        star.z = currentWidth + Math.random() * currentWidth;
        star.x = Math.random() * currentWidth;
        star.y = Math.random() * currentHeight;
        star.size = Math.random() * (STAR_MAX_SIZE - STAR_MIN_SIZE) + STAR_MIN_SIZE;
        star.color = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
      }
    });
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = currentCanvasDimensionsRef.current; // Read dimensions from ref
    updateStars(starsRef.current, width, height);
    drawStars(ctx, starsRef.current, width, height);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [updateStars, drawStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Function to handle canvas resizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const newWidth = parent.clientWidth;
        const newHeight = parent.clientHeight;

        // Update ref
        currentCanvasDimensionsRef.current = { width: newWidth, height: newHeight };

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Re-initialize stars with new dimensions
        starsRef.current = initStars(newWidth, newHeight, NUM_STARS);

        // Start animation loop if not already running, or restart with new stars
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    // Initial setup
    handleResize(); // Set initial dimensions and stars and start animation
    window.addEventListener('resize', handleResize);

    // Cleanup function: This runs when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initStars, animate]); // Dependencies are now stable

  return (
    <div className="absolute inset-0 overflow-hidden -z-20"> {/* Ensure it's behind content */}
      <canvas ref={canvasRef} className="w-full h-full bg-transparent"></canvas>
    </div>
  );
};

export default GalaxyBackground;
