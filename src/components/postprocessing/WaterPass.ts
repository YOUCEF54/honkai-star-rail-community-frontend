import { ShaderPass } from 'three-stdlib'
import * as THREE from 'three'

const WaterShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    factor: { value: 0.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float factor;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 offset = vec2(
        sin(time + uv.y * 10.0) * factor * 0.1,
        cos(time + uv.x * 8.0) * factor * 0.1
      );
      
      vec3 color;
      color.r = texture2D(tDiffuse, uv + offset * 0.5).r;
      color.g = texture2D(tDiffuse, uv + offset * 0.3).g;
      color.b = texture2D(tDiffuse, uv + offset * 0.1).b;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

export class WaterPass extends ShaderPass {
  constructor(factor = 0.5) {
    super({
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        factor: { value: factor }
      },
      vertexShader: WaterShader.vertexShader,
      fragmentShader: WaterShader.fragmentShader
    })
  }
}