import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GlowMaterial() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null)
  
  useFrame(({ clock }) => {
    shaderRef.current.uniforms.time.value = clock.getElapsedTime()
  })
  
  return (
    <shaderMaterial
      ref={shaderRef}
      uniforms={{
        time: { value: 0 },
        color: { value: new THREE.Color('#ff00ff') },
        intensity: { value: 1.5 }
      }}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float time;
        uniform vec3 color;
        uniform float intensity;
        varying vec2 vUv;
        
        void main() {
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          float glow = smoothstep(0.5, 1.0, 1.0 - length(vUv - 0.5));
          vec3 finalColor = color * glow * intensity * pulse;
          gl_FragColor = vec4(finalColor, glow * 0.7);
        }
      `}
      transparent
      blending={THREE.AdditiveBlending}
    />
  )
}