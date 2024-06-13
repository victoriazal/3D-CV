import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
{/* <div className='absolute top-28 left-0 z-10 flex items-center justify-center'>
            popup
        </div> */}
const Home = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1);
  const adjustCloudForScreenSize = () => {
    let screenScale;
    let screenPosition = [-3, 0, -1]
    let rotation = [0.1, 4.7, 0]
    if (window.innerWidth < 768) {
      screenScale = [0.4, 0.4, 0.4]
    }
    else {
      screenScale = [3, 3, 3]
    }
    return [screenScale, screenPosition, rotation]
  }
  const [cloudScale, cloudPosition, cloudRotation] = adjustCloudForScreenSize()
  return (
    <section className='w-full h-screen relative'>
      <Canvas className={'w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}'}
        camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={5} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight groundColor='#000000' intensity={1} />
          <Sky />
          <Bird />
          <Island
            setCurrentStage={setCurrentStage}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            position={cloudPosition}
            scale={cloudScale}
            rotation={cloudRotation} />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home 