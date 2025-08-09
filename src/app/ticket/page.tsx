'use client'
import { Suspense } from 'react'
import LightCone from '../../components/Ticket3D'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        {/* <Canvas> */}

      <Suspense fallback={"Loading..."}>
        <LightCone />
      </Suspense>
        {/* </Canvas> */}
    </div>
  )
}

export default App