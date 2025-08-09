import React, { useRef, useState } from 'react';

// Define the props for the LightConeCard component
interface LightConeCardProps {
  imageUrl: string;
  rarity: number; // 4 or 5
  name: string;
}

// Inline SVG for the star icon
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

const LightConeCard: React.FC<LightConeCardProps> = ({ imageUrl, rarity, name }) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [cardTransform, setCardTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [lightConeOpacity, setLightConeOpacity] = useState(0);
  const [lightConeTransform, setLightConeTransform] = useState('translateX(-50%) rotateX(60deg)');
  const [cardReflectionStyles, setCardReflectionStyles] = useState({});
  const [lightStreakStyles, setLightStreakStyles] = useState<{ transform: string; left: string; opacity: string; }[]>([]);

  // Simpler, less saturated reflection colors
  const reflectionColors = [
    '#B0C4DE', '#ADD8E6', '#E6E6FA', '#FFFFFF', '#F0F8FF', '#F0FFFF', '#B0C4DE'
  ];

  // Handle mouse movement to create the parallax tilt and light reflection effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;

    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    const rotateX = (y - 0.5) * -40;
    const rotateY = (x - 0.5) * 40;

    setCardTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    // Update card surface reflection
    setCardReflectionStyles({
      opacity: '0.8',
      transform: `translate(${rotateY * 0.5}px, ${rotateX * 0.5}px) scale(1.1)`,
      backgroundPosition: `${x * 100}% ${y * 100}%`,
    });

    // Update under-card light cone visibility and transform
    setLightConeOpacity(y > 0.6 ? 1 : 0);
    setLightConeTransform(`translateX(-50%) rotateX(60deg) translateX(${rotateY}px)`);

    // Animate individual light streaks based on mouse position
    const newStreakStyles = reflectionColors.map((_, index) => {
      const numStreaks = reflectionColors.length;
      const streakIndexFromCenter = index - Math.floor(numStreaks / 2);
      const tiltFactor = 0.5;
      const spreadFactor = 20;

      const rotation = (streakIndexFromCenter * 10) + (rotateY * tiltFactor);
      const translateX = (streakIndexFromCenter * spreadFactor) + (rotateY * spreadFactor * 0.1);

      return {
        transform: `rotate(${rotation}deg) translateY(-50px) scaleY(1.2)`,
        left: `calc(50% + ${translateX}px)`,
        opacity: '0.8',
      };
    });
    setLightStreakStyles(newStreakStyles);
  };

  // Reset all effects on mouse leave
  const handleMouseLeave = () => {
    setCardTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setCardReflectionStyles({ opacity: '0', transform: 'translate(0, 0) scale(1)' });
    setLightConeOpacity(0);
    setLightConeTransform('translateX(-50%) rotateX(60deg)');
    setLightStreakStyles([]);
  };

  // Array to hold the star components based on rarity
  const stars = Array.from({ length: rarity }, (_, index) => (
    <StarIcon key={index} />
  ));

  return (
    <div className="relative">
      {/* Container for the card and its reflection */}
      <div
        ref={cardContainerRef}
        className="relative w-72 h-[480px] group transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main card container with interactive tilt */}
        <div
          className="relative w-full h-full p-2 flex flex-col justify-between items-center rounded-2xl shadow-xl transform-gpu
                      bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden
                      transition-transform duration-300"
          style={{ transform: cardTransform, transformStyle: 'preserve-3d' }}
        >
          {/* Prismatic reflection on the card's surface */}
          <div
            className="absolute inset-0 z-20 transition-all duration-100 rounded-2xl"
            style={{
              ...cardReflectionStyles,
              backgroundImage: 'conic-gradient(from 180deg at 50% 50%, #B0C4DE 0deg, #FFFFFF 90deg, #ADD8E6 180deg, #B0C4DE 360deg)',
              backgroundSize: '200% 200%',
              mixBlendMode: 'overlay',
            }}
          />
          
          {/* Inner card content container */}
          <div className="relative z-30 w-full h-full flex flex-col items-center">
            {/* Main image container */}
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placehold.co/288x416/1a1a1a/ffffff?text=Image+Not+Found";
                }}
              />
            </div>

            {/* Card name and rarity section */}
            <div className="w-full mt-4 flex flex-col items-center text-white">
              <h3 className="text-xl font-bold font-sans text-center drop-shadow-lg">{name}</h3>
              <div className="flex gap-1 mt-2">{stars}</div>
            </div>
          </div>
        </div>

        {/* Under-card reflection - a wide, fanning light source with prismatic streaks */}
        <div
          className="absolute z-0 w-[400px] h-[150px] bottom-[-120px] left-1/2"
          style={{
            opacity: lightConeOpacity,
            transformOrigin: 'center bottom',
            transform: lightConeTransform,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
          }}
        >
          {/* Central soft glow */}
          <div
            className="absolute w-full h-full bg-white opacity-40 rounded-full"
            style={{
              filter: 'blur(40px)',
              transform: 'scale(0.8) translateY(-50%)',
              mixBlendMode: 'screen',
            }}
          />
          {/* Fanning light streaks */}
          {reflectionColors.map((color, index) => (
            <div
              key={index}
              className="absolute h-[150px] w-[5px] bottom-0"
              style={{
                background: `linear-gradient(to top, ${color}, transparent)`,
                filter: 'blur(15px)',
                mixBlendMode: 'screen',
                transformOrigin: '50% 100%',
                transition: 'transform 0.2s ease-out, left 0.2s ease-out',
                ...lightStreakStyles[index]
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App component to demonstrate usage
const App = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-8 font-sans">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-12 text-center drop-shadow-md">
        Honkai: Star Rail Light Cone
      </h1>

      {/* A container to show multiple cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LightConeCard
          imageUrl="https://placehold.co/288x416/2e2e2e/ffffff?text=LightCone+Image+1"
          name="Something Irreplaceable"
          rarity={5}
        />
        <LightConeCard
          imageUrl="https://placehold.co/288x416/2e2e2e/ffffff?text=LightCone+Image+2"
          name="Patience is All You Need"
          rarity={5}
        />
        <LightConeCard
          imageUrl="https://placehold.co/288x416/2e2e2e/ffffff?text=LightCone+Image+3"
          name="The Unreachable Side"
          rarity={5}
        />
      </div>
    </div>
  );
};

export default App;
