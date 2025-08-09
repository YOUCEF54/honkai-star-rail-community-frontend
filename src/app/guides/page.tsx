'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, Swords, Shield, ScrollText } from 'lucide-react';
import { gsap } from 'gsap';
import Link from 'next/link';

// Variants for the hero section, remains the same.
const heroVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' // Use a valid Framer Motion easing string
    }
  },
};

/**
 * A single interactive guide card component using GSAP for animation.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the guide.
 * @param {string} props.description - The description of the guide.
 * @param {React.ReactNode} props.icon - The Lucide icon for the card.
 * @param {string} props.glowColor - The color for the glowing effect.
 */
interface GuideCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: string;
}
const GuideCard: React.FC<GuideCardProps> = ({ title, description, icon, glowColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    // Set initial GSAP state
    gsap.set(card, { transformStyle: 'preserve-3d', perspective: 1000 });
    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });

    interface MouseMoveEvent extends MouseEvent {
      currentTarget: EventTarget & HTMLDivElement;
    }

    const handleMouseMove = (e: MouseMoveEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * 15; // Increased rotation for more drama
      const rotateY = (0.5 - x / rect.width) * 15;
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      // Animate card rotation and glow position with GSAP
      gsap.to(card, {
      rotateX,
      rotateY,
      ease: "power2.out",
      duration: 0.3,
      });

      gsap.to(glow, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 1,
      ease: "power2.out",
      duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      // Reset card rotation and glow on mouse leave
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "elastic.out(1, 0.3)", // Fun elastic ease for the bounce back
        duration: 0.6,
      });
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link
    href={"/guides/beginner-guide"}
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl p-6 bg-[#161c2a]/60 border border-[#3b4150] shadow-lg cursor-pointer transform-gpu"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      {/* GSAP-controlled glowing light effect */}
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] rounded-full blur-2xl opacity-0 transform-gpu z-0"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
          top: '50%',
          left: '50%',
        }}
      />

      {/* Card content */}
      <div className="flex items-start gap-6 relative z-10">
        <div className="relative flex-shrink-0 p-3 rounded-full bg-[#1e2330] border border-[#4a4f61]">
          {icon}
          <div
            className="absolute inset-0 rounded-full blur-md"
            style={{ backgroundColor: glowColor, opacity: 0.4 }}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-indigo-300">
            {title}
          </h2>
          <p className="mt-2 text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

// Main page component
export default function GuidesPage() {
  const guides = [
    {
      title: 'Beginner\'s Guide to the Galaxy',
      description: 'An essential guide for new Trailblazers, covering the basics of exploration and combat.',
      icon: <BookOpenText className="w-12 h-12 text-purple-400" />,
      glowColor: '#8b5cf6'
    },
    {
      title: 'Advanced Combat Strategies',
      description: 'Master the art of battle with in-depth analysis of team compositions, relics, and light cones.',
      icon: <Swords className="w-12 h-12 text-cyan-400" />,
      glowColor: '#06b6d4'
    },
    {
      title: 'Building Your Perfect Team',
      description: 'Learn how to synergize your favorite characters to create an unstoppable team for any challenge.',
      icon: <Shield className="w-12 h-12 text-green-400" />,
      glowColor: '#22c55e'
    },
    {
      title: 'Relic & Light Cone Farming',
      description: 'Optimize your gear and understand the best farming routes to maximize your character\'s potential.',
      icon: <ScrollText className="w-12 h-12 text-yellow-400" />,
      glowColor: '#eab308'
    },
  ];

  return (
    <div className="bg-[#0f121a] min-h-screen text-gray-100 font-sans p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Official Interastral Guides
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Explore a collection of in-depth guides to help you on your journey through the cosmos. From beginner tips to advanced combat strategies, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <GuideCard
              key={index}
              title={guide.title}
              description={guide.description}
              icon={guide.icon}
              glowColor={guide.glowColor}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
