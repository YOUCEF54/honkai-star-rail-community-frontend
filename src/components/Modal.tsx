import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'gsap';
import { useModal } from '@/app/context/modal-context';

// A simple hook to manage modal state for demonstration purposes.

// Interface for a character object
interface Character {
  name: string;
  image: string;
  rarity: number;
}

// Inline SVG for a close button
const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 text-amber-200"
  >
    <path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

// Inline SVG for a star icon
const StarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-amber-200">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

// The main Modal component
const Modal: React.FC = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Placeholder images for the characters
  const characterImages = {
    phainon: "/images/phainon.webp",
    anaxa: "/images/anaxa.webp",
    mydei: "/images/mydei.webp",
    sunday: "/images/sunday.webp",
    bronya: "/images/bronya.webp",
    tingyun: "/images/tingyun.webp",
  };
  const ticketImage = "/ticket-ict.png";
  const bgImage = "/bg3.jpeg";

  const favoriteCharacters: Character[] = [
    { name: 'Phainon', image: characterImages.phainon, rarity: 5 },
    { name: 'Anaxa', image: characterImages.anaxa, rarity: 5 },
    { name: 'Mydei', image: characterImages.mydei, rarity: 5 },
  ];

  const favoriteTeam: Character[] = [
    { name: 'Phainon', image: characterImages.phainon, rarity: 5 },
    { name: 'Sunday', image: characterImages.sunday, rarity: 5 },
    { name: 'Bronya', image: characterImages.bronya, rarity: 5 },
    { name: 'Tingyun', image: characterImages.tingyun, rarity: 4 },
  ];

  const renderStars = (rarity: number): JSX.Element[] => {
    return Array.from({ length: rarity }, (_, i) => <StarIcon key={i} />);
  };

  const setupThreeJS = useCallback(() => {
    if (!canvasRef.current || !isModalOpen) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // POST-PROCESSING FOR BLOOM EFFECT
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 1.2;
    bloomPass.radius = 0.5;
    composer.addPass(bloomPass);

    // BACKGROUND PLANE
    const textureLoader = new THREE.TextureLoader();
    // Using a placeholder image for the background
    const bgTexture = textureLoader.load("/images/bg3.jpeg", () => {
      bgTexture.wrapS = THREE.RepeatWrapping;
      bgTexture.wrapT = THREE.RepeatWrapping;
      bgTexture.repeat.set(2, 2);
    });
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;
    const bgGeometry = new THREE.PlaneGeometry(100, 100);
    const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture, side: THREE.DoubleSide });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.z = -10;
    scene.add(bgMesh);
    
    // Add a glowing, rotating torus knot to enhance the 3D effect
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8A2BE2, // Blue-violet color for the glow
      emissive: 0x8A2BE2,
      emissiveIntensity: 5
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add ambient and point light to illuminate the torus knot
    const ambientLight = new THREE.AmbientLight(0x404040, 20); // soft white light
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the torus knot
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;

      composer.render();
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      // Dispose of textures and geometries to prevent memory leaks
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      setupThreeJS();
    }
  }, [isModalOpen, setupThreeJS]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <section className='fixed inset-0 z-50 flex flex-col items-center justify-center font-serif text-lg font-extralight'>
      {/* Three.js canvas for the 3D background and effects */}
      <canvas ref={canvasRef} className='absolute inset-0 z-40' />

      {/* Close button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
      >
        <CloseIcon />
      </button>

      {/* Main modal content container */}
      <div className='relative z-50 flex flex-col items-center mx-auto'>
        <div className='w-[36rem] z-50 flex flex-col justify-center relative mx-auto p-2 bg-gradient-to-b from-black/80 via-neutral-950 to-black rounded-t-[3.5rem] border border-amber-200'>
          
          <div className='flex flex-col gap-4 z-50'>
            <h2 className='text-center bg-amber-200 px-2 text-amber-950'>
              <span>Favorite Characters</span>
            </h2>

            {/* The character cards section with ticket design */}
            <div className='flex gap-2 p-2 bg-black border border-amber-200'>
              {favoriteCharacters.map((character, index) => (
                <div
                  key={index}
                  className='h-72 w-1/3 overflow-clip group cursor-pointer hover:scale-105 transition-transform duration-300 relative
                             bg-gradient-to-b from-amber-500/90 to-amber-950/40
                             before:content-[""] before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-black/10 before:z-20
                             after:content-[""] after:absolute after:inset-0 after:z-10 after:bg-black/30 group-hover:after:bg-transparent transition-colors duration-300'
                >
                  {/* The ticket shape mask and image */}
                  <div className='relative w-full h-full'>
                    <img
                      width={500}
                      height={500}
                      alt={character.name}
                      src={character.image}
                      className='h-full w-full object-cover z-50 drop-shadow-2xl shadow-black
                                 [clip-path:url(#ticket-clip-path)]'
                    />
                    {/* The star rarity overlay */}
                    <div className='absolute text-amber-200 bottom-[1px] left-[1px] right-[1px] flex flex-col items-center justify-center py-4 pt-8 bg-gradient-to-b from-transparent via-black/50 to-black/70'>
                      <div>{character.name}</div>
                      <div className='flex'>{renderStars(character.rarity)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden SVG for the clip-path mask */}
            <svg width="0" height="0">
              <clipPath id="ticket-clip-path" clipPathUnits="objectBoundingBox">
                <path d="M0,0.05 C0,0.05, 0.05,0, 0.1,0 L0.9,0 C0.9,0, 0.95,0, 1,0.05 L1,0.95 C1,0.95, 0.95,1, 0.9,1 L0.1,1 C0.1,1, 0.05,1, 0.05,0.95 L0.05,0.95 L0.05,0.95 L0,0.95 C0,0.95, 0,0.95, 0,0.9 L0,0.9 L0,0.9 L0,0.1 C0,0.1, 0,0.05, 0,0.05 Z" />
              </clipPath>
            </svg>
            
            {/* Favorite Team section */}
            <h2 className='text-center bg-amber-200 px-2 text-amber-950 font-serif text-lg font-extralight'>Favorite Team</h2>
            <div>
              <div className='flex gap-2 p-2 bg-black border border-amber-200'>
                {favoriteTeam.map((member, index) => (
                  <div
                    key={index}
                    className='relative size-1/4 aspect-square overflow-clip border border-amber-200
                               bg-black/40 backdrop-blur-lg hover:scale-105 transition-transform duration-300'
                  >
                    <img
                      width={500}
                      height={500}
                      alt={member.name}
                      src={member.image}
                      className='absolute -top-3 w-full h-[14rem] object-cover z-50 drop-shadow-2xl shadow-black'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App component to demonstrate the Modal
const App: React.FC = () => {
  const { isModalOpen, setIsModalOpen } = useModal();

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-8 font-sans">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-12 text-center drop-shadow-md">
        HSR Themed Modal
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 text-amber-200 border border-amber-200 rounded-lg shadow-lg
                   bg-neutral-900/50 hover:bg-neutral-800 transition-colors"
      >
        Open Modal
      </button>
      <Modal />
    </div>
  );
};

export default Modal;
