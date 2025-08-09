'use client'

import React, { useRef, useState, useEffect } from 'react'

const LightCone = () => {
  const groupRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [time, setTime] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    let animationId
    const animate = () => {
      setTime(prev => prev + 0.016)
      animationId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [mounted])

  // Don't render anything until mounted (prevents SSR issues)
  if (!mounted) {
    return null
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div 
        ref={groupRef}
        style={{
          position: 'relative',
          width: '300px',
          height: '450px',
          transform: `perspective(1000px) rotateX(${isHovered ? 5 : 10}deg) rotateY(${Math.sin(time * 0.3) * 2}deg)`,
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer glow */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          left: '-60px',
          right: '-60px',
          bottom: '-60px',
          background: `radial-gradient(circle, rgba(74, 144, 226, ${0.2 + Math.sin(time * 0.5) * 0.1}) 0%, transparent 70%)`,
          borderRadius: '20px',
          filter: 'blur(30px)',
          zIndex: 1
        }} />

        {/* Card border with metallic effect */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '-8px',
          right: '-8px',
          bottom: '-8px',
          background: `linear-gradient(${time * 30}deg, #C0C0C0, #E8E8E8, #A0A0A0, #E8E8E8)`,
          borderRadius: '15px',
          zIndex: 2,
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
        }} />

        {/* Base card with actual image */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: '10px',
          zIndex: 3,
          overflow: 'hidden',
          backgroundImage: 'url(/images/Hyselin.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {/* Subtle overlay to enhance the image */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `linear-gradient(135deg, 
              rgba(255, 140, 0, 0.1) 0%, 
              transparent 30%, 
              transparent 70%, 
              rgba(139, 69, 19, 0.1) 100%
            )`,
            mixBlendMode: 'multiply'
          }} />
        </div>

        {/* Rainbow prism effect - Primary layer */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `conic-gradient(from ${time * 60}deg, 
            transparent,
            rgba(255, 0, 150, 0.4),
            rgba(0, 255, 150, 0.4),
            rgba(150, 0, 255, 0.4),
            rgba(255, 150, 0, 0.4),
            rgba(255, 0, 150, 0.4),
            transparent
          )`,
          borderRadius: '10px',
          opacity: isHovered ? 0.9 : 0.6,
          transition: 'opacity 0.3s ease',
          filter: 'blur(2px)',
          zIndex: 4,
          mixBlendMode: 'screen'
        }} />

        {/* Rainbow prism effect - Secondary layer */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `conic-gradient(from ${-time * 40}deg, 
            rgba(255, 100, 200, 0.3),
            rgba(100, 255, 200, 0.3),
            rgba(200, 100, 255, 0.3),
            rgba(255, 200, 100, 0.3),
            rgba(255, 100, 200, 0.3)
          )`,
          borderRadius: '10px',
          opacity: 0.5,
          filter: 'blur(1px)',
          zIndex: 5,
          mixBlendMode: 'overlay'
        }} />

        {/* Glass effect with realistic refraction */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `linear-gradient(135deg, 
            rgba(240, 248, 255, 0.1) 0%, 
            rgba(240, 248, 255, 0.05) 50%, 
            rgba(240, 248, 255, 0.15) 100%
          )`,
          borderRadius: '10px',
          backdropFilter: 'blur(1px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          zIndex: 6,
          boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)'
        }} />

        {/* Holographic light rays */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          zIndex: 7,
          pointerEvents: 'none',
          opacity: isHovered ? 0.8 : 0.4,
          transition: 'opacity 0.3s ease'
        }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '1px',
                height: '300px',
                background: `linear-gradient(to bottom, 
                  transparent, 
                  rgba(255, 255, 255, ${0.1 + Math.sin(time * 2 + i) * 0.08}), 
                  rgba(255, 215, 0, ${0.05 + Math.sin(time * 1.5 + i) * 0.03}),
                  transparent
                )`,
                transform: `translate(-50%, -50%) rotate(${(i * 30) + time * 10}deg)`,
                filter: 'blur(0.5px)',
                transformOrigin: '50% 50%'
              }}
            />
          ))}
        </div>

        {/* Chromatic aberration effect */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: `linear-gradient(${time * 3}deg, 
            rgba(255, 0, 100, 0.08),
            transparent 30%,
            rgba(0, 255, 100, 0.08) 50%,
            transparent 70%,
            rgba(100, 0, 255, 0.08)
          )`,
          borderRadius: '10px',
          opacity: 0.7,
          mixBlendMode: 'screen',
          zIndex: 8
        }} />

        {/* Stars at bottom with enhanced effects */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 9
        }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Star outer glow */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '-8px',
                width: '36px',
                height: '36px',
                background: `radial-gradient(circle, 
                  rgba(255, 215, 0, ${0.4 + Math.sin(time * 3 + i) * 0.2}) 0%, 
                  rgba(255, 165, 0, 0.2) 50%, 
                  transparent 70%
                )`,
                borderRadius: '50%',
                filter: 'blur(6px)',
                zIndex: -2
              }} />
              
              {/* Star shadow */}
              <div style={{
                position: 'absolute',
                top: '3px',
                left: '3px',
                width: '20px',
                height: '20px',
                background: 'rgba(0, 0, 0, 0.4)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                filter: 'blur(2px)',
                zIndex: -1
              }} />
              
              {/* Main star */}
              <div style={{
                width: '20px',
                height: '20px',
                background: `linear-gradient(45deg, 
                  #FFD700 0%, 
                  #FFA500 50%, 
                  #FFD700 100%
                )`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                filter: `drop-shadow(0 0 ${4 + Math.sin(time * 2 + i) * 2}px #FFD700)`,
                transform: `scale(${1 + Math.sin(time * (2 + i * 0.2)) * 0.1})`,
                zIndex: 1
              }} />
              
              {/* Star inner glow */}
              <div style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '16px',
                height: '16px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 60%)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                zIndex: 2
              }} />
            </div>
          ))}
        </div>

        {/* Holographic shimmer sweep - constrained to card */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          borderRadius: '10px',
          overflow: 'hidden',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: `${-30 + (Math.sin(time * 0.8) * 130)}%`,
            width: '25%',
            height: '100%',
            background: `linear-gradient(90deg,
              transparent,
              rgba(255, 255, 255, 0.4) 50%,
              transparent
            )`,
            filter: 'blur(1px)',
            transform: 'skewX(-20deg)'
          }} />
        </div>

        {/* Prismatic edge lighting */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          border: '2px solid transparent',
          borderRadius: '10px',
          background: `linear-gradient(${time * 45}deg, 
            rgba(255, 0, 150, 0.6), 
            rgba(0, 255, 150, 0.6), 
            rgba(150, 0, 255, 0.6), 
            rgba(255, 150, 0, 0.6)
          ) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'exclude',
          maskComposite: 'exclude',
          zIndex: 11,
          opacity: isHovered ? 0.8 : 0.4,
          transition: 'opacity 0.3s ease'
        }} />
      </div>

      {/* Realistic bottom rainbow reflection following physics */}
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        left: '50%',
        transform: 'translateX(-50%) perspective(400px) rotateX(70deg)',
        width: '400px',
        height: '60px',
        background: `conic-gradient(from ${time * 45}deg at 50% 0%, 
          transparent 0deg,
          rgba(255, 0, 150, 0.4) 60deg,
          rgba(0, 255, 150, 0.4) 120deg,
          rgba(150, 0, 255, 0.4) 180deg,
          rgba(255, 150, 0, 0.4) 240deg,
          rgba(255, 0, 150, 0.4) 300deg,
          transparent 360deg
        )`,
        borderRadius: '50% 50% 0 0',
        filter: 'blur(8px)',
        opacity: isHovered ? 0.6 : 0.3,
        transition: 'opacity 0.3s ease',
        zIndex: 0,
        mixBlendMode: 'screen',
        clipPath: 'ellipse(60% 100% at 50% 0%)'
      }} />

      {/* Additional reflection rays */}
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '40px',
        zIndex: -1,
        pointerEvents: 'none'
      }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '2px',
              height: '40px',
              background: `linear-gradient(to bottom, 
                rgba(255, 255, 255, ${0.3 + Math.sin(time * 2 + i) * 0.1}),
                transparent
              )`,
              transform: `translateX(-50%) rotate(${(i - 3) * 15 + Math.sin(time + i) * 5}deg)`,
              transformOrigin: '50% 0%',
              filter: 'blur(1px)',
              opacity: 0.4
            }}
          />
        ))}
      </div>
      <style>
        ${Array.from({ length: 5 }, (_, i) => `
          @keyframes starPulse${i} {
            0% { 
              filter: drop-shadow(0 0 4px #FFD700) drop-shadow(0 0 8px #FFA500);
              transform: scale(1);
            }
            100% { 
              filter: drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 16px #FFA500) drop-shadow(0 0 24px #FFD700);
              transform: scale(1.1);
            }
          }
        `).join('')}
      `</style>
    </div>
  )
}

export default function EnhancedLightConeViewer() {
  return <LightCone />
}