'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// --- 1. The main 3D Logo Component (No changes here) ---
function NirmaanLogo() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const logoTexture = useLoader(THREE.TextureLoader, '/images/nirmaan_logo.png');
    const emissiveIntensity = 3;

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.4;
            meshRef.current.rotation.x = Math.cos(t * 0.1) * 0.2;
            meshRef.current.position.y = Math.sin(t * 0.5) * 5; 
        }
    });

    const aspectRatio = logoTexture.image ? logoTexture.image.width / logoTexture.image.height : 1;
    const width = 320; 
    const height = width / aspectRatio;

    return (
        <mesh ref={meshRef} position={[0, 0, -20]}> 
            <planeGeometry args={[width, height]} /> 
            <meshStandardMaterial
                map={logoTexture}
                transparent={true}
                emissive="#ff6600"
                emissiveIntensity={emissiveIntensity}
                roughness={0.4}
                metalness={0.8}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// --- 2. Floating Particles Component (No changes here) ---
function Particles({ count = 3000 }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const particleColor = '#ffffff';

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = -500 + Math.random() * 1000;
            const y = -500 + Math.random() * 1000;
            const z = -500 + Math.random() * 1000;
            temp.push({ t, factor, speed, x, y, z });
        }
        return temp;
    }, [count]);

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = particles[i].x;
            positions[i * 3 + 1] = particles[i].y;
            positions[i * 3 + 2] = particles[i].z;
        }
        return positions;
    }, [count, particles]);
    
    useFrame(() => {
        if (!pointsRef.current) return;
        const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        for (let i = 0; i < particles.length; i++) {
            const { factor, speed } = particles[i];
            particles[i].t += speed;
            const t = particles[i].t;
            positions[i * 3 + 1] += Math.sin(t) * factor * 0.0005;
            if (positions[i * 3 + 1] < -500) {
                 positions[i * 3 + 1] = 500;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlePositions.length / 3}
                    array={particlePositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.7} color={particleColor} sizeAttenuation />
        </points>
    );
}

// --- 3. Construction-inspired Wireframes (No changes here) ---
function ConstructionElements() {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        if(groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    const scaffoldEmissive = '#0077ff';
    const blockColor = '#ffffff';

    const elements = useMemo(() => {
        const items = [];
        for (let i = 0; i < 8; i++) {
            items.push(
                <mesh key={`scaffold-${i}`} position={[(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600]}>
                    <boxGeometry args={[50 + Math.random() * 100, 50 + Math.random() * 100, 50 + Math.random() * 100]} />
                    <meshStandardMaterial color="orange" emissive={scaffoldEmissive} emissiveIntensity={0.5} wireframe />
                </mesh>
             );
        }
        for (let i = 0; i < 10; i++) {
            items.push(
                <mesh key={`block-${i}`} position={[(Math.random() - 0.5) * 800, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 800]}>
                    <boxGeometry args={[10 + Math.random() * 20, 10 + Math.random() * 20, 10 + Math.random() * 20]} />
                    <meshStandardMaterial color={blockColor} wireframe opacity={0.3} transparent />
                </mesh>
             );
        }
        return items;
    }, []);

    return <group ref={groupRef}>{elements}</group>;
}

// --- 4. Camera Controller ---
// POINT 1: MODIFIED - I've amplified the effect to make it more noticeable.
function Rig() {
    useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 30, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 20, 0.05);
        state.camera.position.z = 350 + Math.cos(state.clock.getElapsedTime() * 0.1) * 20;
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

// --- POINT 2: NEW - This new component will rotate our entire scene. ---
function SceneAnimator({ groupRef }) {
    useFrame((state) => {
        if (groupRef.current) {
            // Gently tilt the group based on the mouse's x and y position
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.2, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.2, 0.1);
        }
    });
    return null;
}

// --- Main Hero Section Component ---
export default function Hero() {
    // POINT 3: NEW - We need a ref to control the whole scene group.
    const sceneGroupRef = useRef<THREE.Group>(null!);

    return (
        <div className="relative w-full h-[85vh] bg-black">
            <div className="absolute top-0 left-0 w-full h-full z-10 flex items-end justify-center pb-24 pointer-events-none">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 15px rgba(0,0,0,0.7)' }}>
                        Innovate. Create. Build.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mt-4" style={{ textShadow: '0 0 10px rgba(0,0,0,0.7)' }}>
                        Building the Future, One Innovation at a Time.
                    </p>
                </div>
            </div>

            <Canvas camera={{ position: [0, 0, 250], fov: 75 }}>
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 100, 700]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[150, 150, 150]} intensity={0.8} color="#ff8800" />
                <pointLight position={[-150, -150, -50]} intensity={1.5} color="#00aaff" />
                <directionalLight position={[0, 200, 100]} intensity={1} />

                <Suspense fallback={null}>
                    {/* POINT 4: MODIFIED - All 3D elements are now inside our controllable group */}
                    <group ref={sceneGroupRef}>
                        <NirmaanLogo />
                        <Particles />
                        <ConstructionElements />
                    </group>
                    
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.1}
                            luminanceSmoothing={0.9}
                            height={300}
                            intensity={0.8}
                        />
                    </EffectComposer>
                </Suspense>
                
                <Rig />
                {/* POINT 5: NEW - We add our new animator component to the canvas */}
                <SceneAnimator groupRef={sceneGroupRef} />
            </Canvas>
        </div>
    );
}





// 'use client';

// import React, { Suspense, useRef, useMemo } from 'react';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import { useTheme } from 'next-themes';

// // --- 1. The main 3D Logo Component (Now Theme-Aware) ---
// function NirmaanLogo({ theme }: { theme?: string }) {
//     const meshRef = useRef<THREE.Mesh>(null!);
//     const logoTexture = useLoader(THREE.TextureLoader, '/images/nirmaan_logo.png');

//     // CHANGE 1: Glow ko theme ke hisab se adjust kiya
//     const emissiveIntensity = theme === 'dark' ? 3 : 1; // Light mode mein glow kam

//     useFrame((state) => {
//         if (meshRef.current) {
//             const t = state.clock.getElapsedTime();
//             meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.4;
//             meshRef.current.rotation.x = Math.cos(t * 0.1) * 0.2;
//             meshRef.current.position.y = Math.sin(t * 0.5) * 5; 
//         }
//     });

//     const aspectRatio = logoTexture.image ? logoTexture.image.width / logoTexture.image.height : 1;
//     const width = 180; 
//     const height = width / aspectRatio;

//     return (
//         <mesh ref={meshRef} position={[0, 0, -20]}> 
//             <planeGeometry args={[width, height]} /> 
//             <meshStandardMaterial
//                 map={logoTexture}
//                 transparent={true}
//                 emissive="#ff6600"
//                 emissiveIntensity={emissiveIntensity}
//                 roughness={0.4}
//                 metalness={0.8}
//                 side={THREE.DoubleSide}
//             />
//         </mesh>
//     );
// }

// // --- 2. Floating Particles Component ---
// function Particles({ count = 3000, theme }: { count?: number, theme?: string }) {
//     const pointsRef = useRef<THREE.Points>(null!);
//     const particleColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';

//     const particles = useMemo(() => {
//         const temp = [];
//         for (let i = 0; i < count; i++) {
//             const t = Math.random() * 100;
//             const factor = 20 + Math.random() * 100;
//             const speed = 0.01 + Math.random() / 200;
//             const x = -500 + Math.random() * 1000;
//             const y = -500 + Math.random() * 1000;
//             const z = -500 + Math.random() * 1000;
//             temp.push({ t, factor, speed, x, y, z });
//         }
//         return temp;
//     }, [count]);

//     const particlePositions = useMemo(() => {
//         const positions = new Float32Array(count * 3);
//         for (let i = 0; i < count; i++) {
//             positions[i * 3] = particles[i].x;
//             positions[i * 3 + 1] = particles[i].y;
//             positions[i * 3 + 2] = particles[i].z;
//         }
//         return positions;
//     }, [count, particles]);
    
//     useFrame(() => {
//         if (!pointsRef.current) return;
//         const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
//         for (let i = 0; i < particles.length; i++) {
//             const { factor, speed } = particles[i];
//             particles[i].t += speed;
//             const t = particles[i].t;
//             positions[i * 3 + 1] += Math.sin(t) * factor * 0.0005;
//             if (positions[i * 3 + 1] < -500) {
//                  positions[i * 3 + 1] = 500;
//             }
//         }
//         pointsRef.current.geometry.attributes.position.needsUpdate = true;
//     });

//     return (
//         <points ref={pointsRef}>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     count={particlePositions.length / 3}
//                     array={particlePositions}
//                     itemSize={3}
//                 />
//             </bufferGeometry>
//             <pointsMaterial size={0.7} color={particleColor} sizeAttenuation />
//         </points>
//     );
// }

// // --- 3. Construction-inspired Wireframes (Now Theme-Aware) ---
// function ConstructionElements({ theme }: { theme?: string }) {
//     const groupRef = useRef<THREE.Group>(null!);
//     useFrame((state) => {
//         if(groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
//     });

//     // CHANGE 2: Dono type ke boxes ke liye light aur dark mode colors
//     const scaffoldEmissive = theme === 'dark' ? '#0077ff' : '#003366'; // Darker blue for light mode
//     const blockColor = theme === 'dark' ? '#ffffff' : '#555555'; // Dark grey for light mode

//     const elements = useMemo(() => {
//         const items = [];
//         for (let i = 0; i < 8; i++) {
//             items.push(
//                 <mesh key={`scaffold-${i}`} position={[(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600]}>
//                     <boxGeometry args={[50 + Math.random() * 100, 50 + Math.random() * 100, 50 + Math.random() * 100]} />
//                     <meshStandardMaterial color="orange" emissive={scaffoldEmissive} emissiveIntensity={0.5} wireframe />
//                 </mesh>
//              );
//         }
//         for (let i = 0; i < 10; i++) {
//             items.push(
//                 <mesh key={`block-${i}`} position={[(Math.random() - 0.5) * 800, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 800]}>
//                     <boxGeometry args={[10 + Math.random() * 20, 10 + Math.random() * 20, 10 + Math.random() * 20]} />
//                     <meshStandardMaterial color={blockColor} wireframe opacity={0.3} transparent />
//                 </mesh>
//              );
//         }
//         return items;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [theme]); // Depend on theme so it re-renders on change

//     return <group ref={groupRef}>{elements}</group>;
// }

// // --- 4. Camera Controller ---
// function Rig() {
//     useFrame((state) => {
//         state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.pointer.x * Math.PI / 2) * 5, 0.05);
//         state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.sin(state.pointer.y * Math.PI / 2) * 5, 0.05);
//         state.camera.position.z = 350 + Math.cos(state.clock.getElapsedTime() * 0.1) * 20;
//         state.camera.lookAt(0, 0, 0);
//     });
//     return null;
// }

// // --- Main Hero Section Component ---
// export default function Hero() {
//     const { theme } = useTheme(); 
    
//     const backgroundColor = theme === 'dark' ? '#050505' : '#f0f0f0';
//     const fogColor = theme === 'dark' ? '#050505' : '#d0d0d0';
//     const textColor = theme === 'dark' ? 'text-white' : 'text-black';
//     const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

//     return (
//         <div className={`relative w-full h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
//             <div className="absolute top-0 left-0 w-full h-full z-10 flex items-end justify-center pb-24 pointer-events-none">
//                 <div className="text-center">
//                     <h1 className={`text-5xl md:text-7xl font-bold tracking-wider ${textColor}`} style={{ textShadow: `0 0 15px rgba(0,0,0,${theme === 'dark' ? '0.7' : '0.2'})` }}>
//                         NIRMAAN
//                     </h1>
//                     <p className={`text-lg md:text-xl mt-4 ${subtextColor}`} style={{ textShadow: `0 0 10px rgba(0,0,0,${theme === 'dark' ? '0.7' : '0.2'})` }}>
//                         Building the Future, One Innovation at a Time.
//                     </p>
//                 </div>
//             </div>

//             <Canvas camera={{ position: [0, 0, 250], fov: 75 }}>
//                 <color attach="background" args={[backgroundColor]} />
//                 <fog attach="fog" args={[fogColor, 100, 700]} />
//                 <ambientLight intensity={theme === 'dark' ? 0.5 : 1.5} />
//                 <pointLight position={[150, 150, 150]} intensity={0.8} color="#ff8800" />
//                 <pointLight position={[-150, -150, -50]} intensity={1.5} color="#00aaff" />
//                 <directionalLight position={[0, 200, 100]} intensity={1} />

//                 <Suspense fallback={null}>
//                     {/* CHANGE 3: Theme ko dono components mein pass kiya */}
//                     <NirmaanLogo theme={theme} />
//                     <Particles theme={theme} />
//                     <ConstructionElements theme={theme} />
                    
//                     <EffectComposer>
//                         <Bloom
//                             luminanceThreshold={0.1}
//                             luminanceSmoothing={0.9}
//                             height={300}
//                             intensity={0.8}
//                         />
//                     </EffectComposer>
//                 </Suspense>
                
//                 <Rig />
//             </Canvas>
//         </div>
//     );
// }











// 'use client';

// import React, { Suspense, useRef, useMemo } from 'react';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
// import { useTheme } from 'next-themes'; // <-- 1. THEME HOOK IMPORT KIYA

// // --- 1. The main 3D Logo Component ---
// function NirmaanLogo() {
//     const meshRef = useRef<THREE.Mesh>(null!);
//     const logoTexture = useLoader(THREE.TextureLoader, '/images/nirmaan_logo.png');

//     useFrame((state) => {
//         if (meshRef.current) {
//             const t = state.clock.getElapsedTime();
//             meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.4;
//             meshRef.current.rotation.x = Math.cos(t * 0.1) * 0.2;
//             meshRef.current.position.y = Math.sin(t * 0.5) * 5; 
//         }
//     });

//     const aspectRatio = logoTexture.image ? logoTexture.image.width / logoTexture.image.height : 1;
//     const width = 180; 
//     const height = width / aspectRatio;

//     return (
//         <mesh ref={meshRef} position={[0, 0, -20]}> 
//             <planeGeometry args={[width, height]} /> 
//             <meshStandardMaterial
//                 map={logoTexture}
//                 transparent={true}
//                 emissive="#ff6600"
//                 emissiveIntensity={3}
//                 roughness={0.4}
//                 metalness={0.8}
//                 side={THREE.DoubleSide}
//             />
//         </mesh>
//     );
// }

// // --- 2. Floating Particles Component (Ab Theme Aware Hai) ---
// function Particles({ count = 3000, theme }: { count?: number, theme?: string }) {
//     const pointsRef = useRef<THREE.Points>(null!);
//     const particleColor = theme === 'dark' ? '#ffffff' : '#1a1a1a'; // Dark particles for light theme

//     const particles = useMemo(() => {
//         const temp = [];
//         for (let i = 0; i < count; i++) {
//             const t = Math.random() * 100;
//             const factor = 20 + Math.random() * 100;
//             const speed = 0.01 + Math.random() / 200;
//             const x = -500 + Math.random() * 1000;
//             const y = -500 + Math.random() * 1000;
//             const z = -500 + Math.random() * 1000;
//             temp.push({ t, factor, speed, x, y, z });
//         }
//         return temp;
//     }, [count]);

//     const particlePositions = useMemo(() => {
//         const positions = new Float32Array(count * 3);
//         for (let i = 0; i < count; i++) {
//             positions[i * 3] = particles[i].x;
//             positions[i * 3 + 1] = particles[i].y;
//             positions[i * 3 + 2] = particles[i].z;
//         }
//         return positions;
//     }, [count, particles]);
    
//     useFrame(() => {
//         if (!pointsRef.current) return;
//         const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
//         for (let i = 0; i < particles.length; i++) {
//             const { factor, speed } = particles[i];
//             particles[i].t += speed;
//             const t = particles[i].t;
//             positions[i * 3 + 1] += Math.sin(t) * factor * 0.0005;
//             if (positions[i * 3 + 1] < -500) {
//                  positions[i * 3 + 1] = 500;
//             }
//         }
//         pointsRef.current.geometry.attributes.position.needsUpdate = true;
//     });

//     return (
//         <points ref={pointsRef}>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     count={particlePositions.length / 3}
//                     array={particlePositions}
//                     itemSize={3}
//                 />
//             </bufferGeometry>
//             <pointsMaterial size={0.7} color={particleColor} sizeAttenuation />
//         </points>
//     );
// }

// // --- 3. Construction-inspired Wireframes ---
// function ConstructionElements() {
//     const groupRef = useRef<THREE.Group>(null!);
//     useFrame((state) => {
//         if(groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
//     });

//     const elements = useMemo(() => {
//         const items = [];
//         for (let i = 0; i < 8; i++) {
//             items.push(
//                 <mesh key={`scaffold-${i}`} position={[(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600]}>
//                     <boxGeometry args={[50 + Math.random() * 100, 50 + Math.random() * 100, 50 + Math.random() * 100]} />
//                     <meshStandardMaterial color="orange" emissive="#0077ff" emissiveIntensity={0.5} wireframe />
//                 </mesh>
//              );
//         }
//         for (let i = 0; i < 10; i++) {
//             items.push(
//                 <mesh key={`block-${i}`} position={[(Math.random() - 0.5) * 800, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 800]}>
//                     <boxGeometry args={[10 + Math.random() * 20, 10 + Math.random() * 20, 10 + Math.random() * 20]} />
//                     <meshStandardMaterial color="#ffffff" wireframe opacity={0.3} transparent />
//                 </mesh>
//              );
//         }
//         return items;
//     }, []);

//     return <group ref={groupRef}>{elements}</group>;
// }

// // --- 4. Camera Controller ---
// function Rig() {
//     useFrame((state) => {
//         state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.pointer.x * Math.PI / 2) * 5, 0.05);
//         state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.sin(state.pointer.y * Math.PI / 2) * 5, 0.05);
//         state.camera.position.z = 350 + Math.cos(state.clock.getElapsedTime() * 0.1) * 20;
//         state.camera.lookAt(0, 0, 0);
//     });
//     return null;
// }

// // --- Main Hero Section Component ---
// export default function Hero() {
//     const { theme } = useTheme(); // <-- 2. THEME KI CURRENT VALUE LI
    
//     // 3. THEME KE HISAB SE COLORS SET KIYE
//     const backgroundColor = theme === 'dark' ? '#050505' : '#f0f0f0';
//     const fogColor = theme === 'dark' ? '#050505' : '#d0d0d0';
//     const textColor = theme === 'dark' ? 'text-white' : 'text-black';
//     const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

//     return (
//         <div className={`relative w-full h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
//             <div className="absolute top-0 left-0 w-full h-full z-10 flex items-end justify-center pb-24 pointer-events-none">
//                 <div className="text-center">
//                     <h1 className={`text-5xl md:text-7xl font-bold tracking-wider ${textColor}`} style={{ textShadow: `0 0 15px rgba(0,0,0,${theme === 'dark' ? '0.7' : '0.2'})` }}>
//                         NIRMAAN
//                     </h1>
//                     <p className={`text-lg md:text-xl mt-4 ${subtextColor}`} style={{ textShadow: `0 0 10px rgba(0,0,0,${theme === 'dark' ? '0.7' : '0.2'})` }}>
//                         Building the Future, One Innovation at a Time.
//                     </p>
//                 </div>
//             </div>

//             <Canvas camera={{ position: [0, 0, 250], fov: 75 }}>
//                 <color attach="background" args={[backgroundColor]} />
//                 <fog attach="fog" args={[fogColor, 100, 700]} />
//                 <ambientLight intensity={theme === 'dark' ? 0.5 : 1.5} /> {/* Light theme mein light zyada */}
//                 <pointLight position={[150, 150, 150]} intensity={0.8} color="#ff8800" />
//                 <pointLight position={[-150, -150, -50]} intensity={1.5} color="#00aaff" />
//                 <directionalLight position={[0, 200, 100]} intensity={1} />

//                 <Suspense fallback={null}>
//                     <NirmaanLogo />
//                     <Particles theme={theme} /> {/* Theme ko particle component mein pass kiya */}
//                     <ConstructionElements />
//                     <EffectComposer>
//                         <Bloom
//                             luminanceThreshold={0.1}
//                             luminanceSmoothing={0.9}
//                             height={300}
//                             intensity={0.8}
//                         />
//                     </EffectComposer>
//                 </Suspense>
                
//                 <Rig />
//             </Canvas>
//         </div>
//     );
// }





// 'use client';

// import React, { Suspense, useRef, useMemo } from 'react';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import * as THREE from 'three';
// import { EffectComposer, Bloom } from '@react-three/postprocessing';

// // --- 1. The main 3D Logo Component ---
// function NirmaanLogo() {
//     const meshRef = useRef<THREE.Mesh>(null!);
//     const logoTexture = useLoader(THREE.TextureLoader, '/images/nirmaan_logo.png');

//     useFrame((state) => {
//         if (meshRef.current) {
//             const t = state.clock.getElapsedTime();
//             meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.4;
//             meshRef.current.rotation.x = Math.cos(t * 0.1) * 0.2;
//             meshRef.current.position.y = Math.sin(t * 0.5) * 5; 
//         }
//     });

//     const aspectRatio = logoTexture.image ? logoTexture.image.width / logoTexture.image.height : 1;
//     // CHANGE 1: Logo ka size 100 se 180 kar diya
//     const width = 180; 
//     const height = width / aspectRatio;

//     return (
//         <mesh ref={meshRef} position={[0, 0, -20]}> 
//             <planeGeometry args={[width, height]} /> 
//             <meshStandardMaterial
//                 map={logoTexture}
//                 transparent={true}
//                 emissive="#ff6600"
//                 emissiveIntensity={3}
//                 roughness={0.4}
//                 metalness={0.8}
//                 side={THREE.DoubleSide}
//             />
//         </mesh>
//     );
// }

// // --- 2. Floating Particles Component ---
// function Particles({ count = 3000 }) {
//     const pointsRef = useRef<THREE.Points>(null!);

//     const particles = useMemo(() => {
//         const temp = [];
//         for (let i = 0; i < count; i++) {
//             const t = Math.random() * 100;
//             const factor = 20 + Math.random() * 100;
//             const speed = 0.01 + Math.random() / 200;
//             const x = -500 + Math.random() * 1000;
//             const y = -500 + Math.random() * 1000;
//             const z = -500 + Math.random() * 1000;
//             temp.push({ t, factor, speed, x, y, z });
//         }
//         return temp;
//     }, [count]);

//     const particlePositions = useMemo(() => {
//         const positions = new Float32Array(count * 3);
//         for (let i = 0; i < count; i++) {
//             positions[i * 3] = particles[i].x;
//             positions[i * 3 + 1] = particles[i].y;
//             positions[i * 3 + 2] = particles[i].z;
//         }
//         return positions;
//     }, [count, particles]);
    
//     useFrame(() => {
//         if (!pointsRef.current) return;
//         const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
//         for (let i = 0; i < particles.length; i++) {
//             const { factor, speed } = particles[i];
//             particles[i].t += speed;
//             const t = particles[i].t;
//             positions[i * 3 + 1] += Math.sin(t) * factor * 0.0005;
//             if (positions[i * 3 + 1] < -500) {
//                  positions[i * 3 + 1] = 500;
//             }
//         }
//         pointsRef.current.geometry.attributes.position.needsUpdate = true;
//     });

//     return (
//         <points ref={pointsRef}>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     count={particlePositions.length / 3}
//                     array={particlePositions}
//                     itemSize={3}
//                 />
//             </bufferGeometry>
//             <pointsMaterial size={0.7} color="#ffffff" sizeAttenuation />
//         </points>
//     );
// }

// // --- 3. Construction-inspired Wireframes ---
// function ConstructionElements() {
//     const groupRef = useRef<THREE.Group>(null!);
//     useFrame((state) => {
//         if(groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
//     });

//     const elements = useMemo(() => {
//         const items = [];
//         for (let i = 0; i < 8; i++) {
//             items.push(
//                 <mesh key={`scaffold-${i}`} position={[(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600]}>
//                     <boxGeometry args={[50 + Math.random() * 100, 50 + Math.random() * 100, 50 + Math.random() * 100]} />
//                     <meshStandardMaterial color="orange" emissive="#0077ff" emissiveIntensity={0.5} wireframe />
//                 </mesh>
//              );
//         }
//         for (let i = 0; i < 10; i++) {
//             items.push(
//                 <mesh key={`block-${i}`} position={[(Math.random() - 0.5) * 800, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 800]}>
//                     <boxGeometry args={[10 + Math.random() * 20, 10 + Math.random() * 20, 10 + Math.random() * 20]} />
//                     <meshStandardMaterial color="#ffffff" wireframe opacity={0.3} transparent />
//                 </mesh>
//              );
//         }
//         return items;
//     }, []);

//     return <group ref={groupRef}>{elements}</group>;
// }

// // --- 4. Camera Controller ---
// function Rig() {
//     useFrame((state) => {
//         state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.pointer.x * Math.PI / 2) * 5, 0.05);
//         state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.sin(state.pointer.y * Math.PI / 2) * 5, 0.05);
//         state.camera.position.z = 350 + Math.cos(state.clock.getElapsedTime() * 0.1) * 20;
//         state.camera.lookAt(0, 0, 0);
//     });
//     return null;
// }

// // --- Main Hero Section Component ---
// export default function Hero() {
//     return (
//         <div className="relative w-full h-screen bg-black">
//             {/* CHANGE 2: Text ko neeche move kar diya */}
//             <div className="absolute top-0 left-0 w-full h-full z-10 flex items-end justify-center pb-24 pointer-events-none">
//                 <div className="text-center">
//                     <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 15px rgba(0,0,0,0.7)' }}>
//                         NIRMAAN
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-300 mt-4" style={{ textShadow: '0 0 10px rgba(0,0,0,0.7)' }}>
//                         Building the Future, One Innovation at a Time.
//                     </p>
//                 </div>
//             </div>

//             <Canvas camera={{ position: [0, 0, 250], fov: 75 }}>
//                 <color attach="background" args={['#050505']} />
//                 <fog attach="fog" args={['#050505', 100, 700]} />
//                 <ambientLight intensity={0.5} />
//                 <pointLight position={[150, 150, 150]} intensity={0.8} color="#ff8800" />
//                 <pointLight position={[-150, -150, -50]} intensity={1.5} color="#00aaff" />
//                 <directionalLight position={[0, 200, 100]} intensity={1} />

//                 <Suspense fallback={null}>
//                     <NirmaanLogo />
//                     <Particles />
//                     <ConstructionElements />
//                     <EffectComposer>
//                         <Bloom
//                             luminanceThreshold={0.1}
//                             luminanceSmoothing={0.9}
//                             height={300}
//                             intensity={0.8}
//                         />
//                     </EffectComposer>
//                 </Suspense>
                
//                 <Rig />
//             </Canvas>
//         </div>
//     );
// }










// 'use client';

// import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import * as THREE from 'three'; // Import THREE for types
// import { EffectComposer, Bloom } from '@react-three/postprocessing';

// // --- Helper function to extract shape from image alpha channel ---
// const createShapeFromImage = (image: HTMLImageElement) => {
//     const canvas = document.createElement('canvas');
//     canvas.width = image.width;
//     canvas.height = image.height;
//     const context = canvas.getContext('2d');
//     if (!context) return null;
//     context.drawImage(image, 0, 0);
//     const imageData = context.getImageData(0, 0, image.width, image.height);
//     const { data, width, height } = imageData;

//     const points: THREE.Vector2[] = [];
//     const threshold = 128;
    
//     for (let y = 0; y < height; y++) {
//         for (let x = 0; x < width; x++) {
//             const alpha = data[(y * width + x) * 4 + 3];
//             if (alpha > threshold) {
//                 const isEdge = 
//                     (x === 0 || data[(y * width + (x - 1)) * 4 + 3] < threshold) ||
//                     (x === width - 1 || data[(y * width + (x + 1)) * 4 + 3] < threshold) ||
//                     (y === 0 || data[((y - 1) * width + x) * 4 + 3] < threshold) ||
//                     (y === height - 1 || data[((y + 1) * width + x) * 4 + 3] < threshold);

//                 if(isEdge){
//                    points.push(new THREE.Vector2(x - width / 2, -(y - height / 2)));
//                 }
//             }
//         }
//     }

//     points.sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));
    
//     if (points.length === 0) {
//         console.warn("No points found for shape extraction.");
//         return null;
//     }

//     return new THREE.Shape(points);
// };

// // --- 1. The main 3D Logo Component ---
// function NirmaanLogo() {
//     const meshRef = useRef<THREE.Mesh>(null!);
//     // Ab hum Shape nahi, sirf TextureLoader se image load karenge
//     const logoTexture = useLoader(THREE.TextureLoader, '/images/nirmaan_logo.png');

//     // Animate the logo's rotation
//     useFrame((state) => {
//         if (meshRef.current) {
//             const t = state.clock.getElapsedTime();
//             meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.4;
//             meshRef.current.rotation.x = Math.cos(t * 0.1) * 0.2;
//             // Optionally, make it slightly bob up and down
//             meshRef.current.position.y = Math.sin(t * 0.5) * 5; 
//         }
//     });

//     // Texture ke aspect ratio ke according plane ka size set karo
//     const aspectRatio = logoTexture.image.width / logoTexture.image.height;
//     const width = 100; // Adjust this width as needed for your logo size
//     const height = width / aspectRatio;

//     return (
//         <mesh ref={meshRef} position={[0, 0, -20]} scale={[1, 1, 1]}> 
//             {/* PlaneGeometry ek simple 2D plane banayega */}
//             <planeGeometry args={[width, height]} /> 
//             <meshStandardMaterial
//                 map={logoTexture} // Logo image ko texture ki tarah apply karo
//                 transparent={true} // PNG ki transparency ke liye
//                 emissive="#ff6600" // Glow effect ke liye
//                 emissiveIntensity={3} // Glow intensity
//                 roughness={0.4}
//                 metalness={0.8}
//                 side={THREE.DoubleSide}
//             />
//         </mesh>
//     );
// }

// // --- 2. Floating Particles Component ---
// function Particles({ count = 3000 }) {
//     const pointsRef = useRef<THREE.Points>(null!);

//     const particles = useMemo(() => {
//         const temp = [];
//         for (let i = 0; i < count; i++) {
//             const t = Math.random() * 100;
//             const factor = 20 + Math.random() * 100;
//             const speed = 0.01 + Math.random() / 200;
//             const x = -500 + Math.random() * 1000;
//             const y = -500 + Math.random() * 1000;
//             const z = -500 + Math.random() * 1000;
//             temp.push({ t, factor, speed, x, y, z });
//         }
//         return temp;
//     }, [count]);

//     const particlePositions = useMemo(() => {
//         const positions = new Float32Array(count * 3);
//         for (let i = 0; i < count; i++) {
//             positions[i * 3] = particles[i].x;
//             positions[i * 3 + 1] = particles[i].y;
//             positions[i * 3 + 2] = particles[i].z;
//         }
//         return positions;
//     }, [count, particles]);
    
//     useFrame(() => {
//         if (!pointsRef.current) return;
//         const positions = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
//         for (let i = 0; i < particles.length; i++) {
//             const { factor, speed } = particles[i];
//             particles[i].t += speed;
//             const t = particles[i].t;
//             positions[i * 3 + 1] += Math.sin(t) * factor * 0.0005;
//             if (positions[i * 3 + 1] < -500) {
//                  positions[i * 3 + 1] = 500;
//             }
//         }
//         pointsRef.current.geometry.attributes.position.needsUpdate = true;
//     });

//     return (
//         <points ref={pointsRef}>
//             <bufferGeometry>
//                 <bufferAttribute
//                     attach="attributes-position"
//                     count={particlePositions.length / 3}
//                     array={particlePositions}
//                     itemSize={3}
//                 />
//             </bufferGeometry>
//             <pointsMaterial size={0.7} color="#ffffff" sizeAttenuation />
//         </points>
//     );
// }

// // --- 3. Construction-inspired Wireframes ---
// function ConstructionElements() {
//     const groupRef = useRef<THREE.Group>(null!);
//     useFrame((state) => {
//         if(groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
//     });

//     const elements = useMemo(() => {
//         const items = [];
//         for (let i = 0; i < 8; i++) {
//             items.push(
//                 <mesh key={`scaffold-${i}`} position={[(Math.random() - 0.5) * 600, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600]}>
//                     <boxGeometry args={[50 + Math.random() * 100, 50 + Math.random() * 100, 50 + Math.random() * 100]} />
//                     <meshStandardMaterial color="orange" emissive="#0077ff" emissiveIntensity={0.5} wireframe />
//                 </mesh>
//              );
//         }
//         for (let i = 0; i < 10; i++) {
//             items.push(
//                 <mesh key={`block-${i}`} position={[(Math.random() - 0.5) * 800, (Math.random() - 0.5) * 500, (Math.random() - 0.5) * 800]}>
//                     <boxGeometry args={[10 + Math.random() * 20, 10 + Math.random() * 20, 10 + Math.random() * 20]} />
//                     <meshStandardMaterial color="#ffffff" wireframe opacity={0.3} transparent />
//                 </mesh>
//              );
//         }
//         return items;
//     }, []);

//     return <group ref={groupRef}>{elements}</group>;
// }

// // --- 4. Camera Controller ---
// function Rig() {
//     useFrame((state) => {
//         state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.pointer.x * Math.PI / 2) * 5, 0.05);
//         state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.sin(state.pointer.y * Math.PI / 2) * 5, 0.05);
//         state.camera.position.z = 250 + Math.cos(state.clock.getElapsedTime() * 0.1) * 20;
//         state.camera.lookAt(0, 0, 0);
//     });
//     return null;
// }

// // --- Main Hero Section Component ---
// export default function Hero() {
//     return (
//         <div className="relative w-full h-screen bg-black">
//             <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center pointer-events-none">
//                 <div className="text-center">
//                     <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider">
//                         NIRMAAN
//                     </h1>
//                     <p className="text-lg md:text-xl text-gray-300 mt-4">
//                         Building the Future, One Innovation at a Time.
//                     </p>
//                 </div>
//             </div>

//             <Canvas camera={{ position: [0, 0, 250], fov: 75 }}>
//                 <color attach="background" args={['#050505']} />
//                 <fog attach="fog" args={['#050505', 100, 700]} />
//                 <ambientLight intensity={0.5} />
//                 <pointLight position={[150, 150, 150]} intensity={0.8} color="#ff8800" />
//                 <pointLight position={[-150, -150, -50]} intensity={1.5} color="#00aaff" />
//                 <directionalLight position={[0, 200, 100]} intensity={1} />

//                 <Suspense fallback={null}>
//                     <NirmaanLogo />
//                     <Particles />
//                     <ConstructionElements />
//                     <EffectComposer>
//                         <Bloom
//                             luminanceThreshold={0.1}
//                             luminanceSmoothing={0.9}
//                             height={300}
//                             intensity={0.8}
//                         />
//                     </EffectComposer>
//                 </Suspense>
                
//                 <Rig />
//             </Canvas>
//         </div>
//     );
// }
















// import Link from "next/link";
// import ThreeDScene from "../ThreeDScene/ThreeDScene";

// const Hero = () => {
//   return (
//     <>
//       <section
//         id="home"
//         className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
//       >


//         {/* START: 3D Scene Background */}
//         <div className="absolute inset-0 z-[-1] opacity-30">
//           <ThreeDScene />
//         </div>
//         {/* END: 3D Scene Background */}


//         <div className="container">
//           <div className="-mx-4 flex flex-wrap">
//             <div className="w-full px-4">
//               <div
//                 className="wow fadeInUp mx-auto max-w-[800px] text-center"
//                 data-wow-delay=".2s"
//               >
//                 <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
//                   Welcome to Club Nirmaan
//                 </h1>
//                 <p className="dark:text-body-color-dark mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
//                   The official Civil Engineering society of IIT Mandi. We build,
//                   we innovate, we create.
//                 </p>
//                 <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
//                   <Link
//                     href="/projects"
//                     className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
//                   >
//                     View Our Projects
//                   </Link>
//                   <Link
//                     href="/contact"
//                     className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
//                   >
//                     Get In Touch
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* All the SVG code remains the same... */}
//         <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
//           <svg
//             width="450"
//             height="556"
//             viewBox="0 0 450 556"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle
//               cx="277"
//               cy="63"
//               r="225"
//               fill="url(#paint0_linear_25:217)"
//             />
//             <circle
//               cx="17.9997"
//               cy="182"
//               r="18"
//               fill="url(#paint1_radial_25:217)"
//             />
//             <circle
//               cx="76.9997"
//               cy="288"
//               r="34"
//               fill="url(#paint2_radial_25:217)"
//             />
//             <circle
//               cx="325.486"
//               cy="302.87"
//               r="180"
//               transform="rotate(-37.6852 325.486 302.87)"
//               fill="url(#paint3_linear_25:217)"
//             />
//             <circle
//               opacity="0.8"
//               cx="184.521"
//               cy="315.521"
//               r="132.862"
//               transform="rotate(114.874 184.521 315.521)"
//               stroke="url(#paint4_linear_25:217)"
//             />
//             <circle
//               opacity="0.8"
//               cx="356"
//               cy="290"
//               r="179.5"
//               transform="rotate(-30 356 290)"
//               stroke="url(#paint5_linear_25:217)"
//             />
//             <circle
//               opacity="0.8"
//               cx="191.659"
//               cy="302.659"
//               r="133.362"
//               transform="rotate(133.319 191.659 302.659)"
//               fill="url(#paint6_linear_25:217)"
//             />
//             <defs>
//               <linearGradient
//                 id="paint0_linear_25:217"
//                 x1="-54.5003"
//                 y1="-178"
//                 x2="222"
//                 y2="288"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" />
//                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//               </linearGradient>
//               <radialGradient
//                 id="paint1_radial_25:217"
//                 cx="0"
//                 cy="0"
//                 r="1"
//                 gradientUnits="userSpaceOnUse"
//                 gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
//               >
//                 <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
//                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
//               </radialGradient>
//               <radialGradient
//                 id="paint2_radial_25:217"
//                 cx="0"
//                 cy="0"
//                 r="1"
//                 gradientUnits="userSpaceOnUse"
//                 gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
//               >
//                 <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
//                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
//               </radialGradient>
//               <linearGradient
//                 id="paint3_linear_25:217"
//                 x1="226.775"
//                 y1="-66.1548"
//                 x2="292.157"
//                 y2="351.421"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" />
//                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//               </linearGradient>
//               <linearGradient
//                 id="paint4_linear_25:217"
//                 x1="184.521"
//                 y1="182.159"
//                 x2="184.521"
//                 y2="448.882"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" />
//                 <stop offset="1" stopColor="white" stopOpacity="0" />
//               </linearGradient>
//               <linearGradient
//                 id="paint5_linear_25:217"
//                 x1="356"
//                 y1="110"
//                 x2="356"
//                 y2="470"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" />
//                 <stop offset="1" stopColor="white" stopOpacity="0" />
//               </linearGradient>
//               <linearGradient
//                 id="paint6_linear_25:217"
//                 x1="118.524"
//                 y1="29.2497"
//                 x2="166.965"
//                 y2="338.63"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" />
//                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
//         <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
//           <svg
//             width="364"
//             height="201"
//             viewBox="0 0 364 201"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
//               stroke="url(#paint0_linear_25:218)"
//             />
//             <path
//               d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
//               stroke="url(#paint1_linear_25:218)"
//             />
//             <path
//               d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
//               stroke="url(#paint2_linear_25:218)"
//             />
//             <path
//               d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
//               stroke="url(#paint3_linear_25:218)"
//             />
//             <circle
//               opacity="0.8"
//               cx="214.505"
//               cy="60.5054"
//               r="49.7205"
//               transform="rotate(-13.421 214.505 60.5054)"
//               stroke="url(#paint4_linear_25:218)"
//             />
//             <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
//             <defs>
//               <linearGradient
//                 id="paint0_linear_25:218"
//                 x1="184.389"
//                 y1="69.2405"
//                 x2="184.389"
//                 y2="212.24"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                 <stop offset="1" stopColor="#4A6CF7" />
//               </linearGradient>
//               <linearGradient
//                 id="paint1_linear_25:218"
//                 x1="156.389"
//                 y1="69.2405"
//                 x2="156.389"
//                 y2="212.24"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                 <stop offset="1" stopColor="#4A6CF7" />
//               </linearGradient>
//               <linearGradient
//                 id="paint2_linear_25:218"
//                 x1="125.389"
//                 y1="69.2405"
//                 x2="125.389"
        
//         y2="212.24"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                 <stop offset="1" stopColor="#4A6CF7" />
//               </linearGradient>
//               <linearGradient
//                 id="paint3_linear_25:218"
//                 x1="93.8507"
//                 y1="67.2674"
//                 x2="89.9278"
//                 y2="210.214"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" stopOpacity="0" />
//                 <stop offset="1" stopColor="#4A6CF7" />
//               </linearGradient>
//               <linearGradient
//                 id="paint4_linear_25:218"
//                 x1="214.505"
//                 y1="10.2849"
//                 x2="212.684"
//                 y2="99.5816"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#4A6CF7" />
//                 <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
//               </linearGradient>
//               <radialGradient
//                 id="paint5_radial_25:218"
//                 cx="0"
//                 cy="0"
//                 r="1"
//                 gradientUnits="userSpaceOnUse"
//                 gradientTransform="translate(220 63) rotate(90) scale(43)"
//               >
//                 <stop offset="0.145833" stopColor="white" stopOpacity="0" />
//                 <stop offset="1" stopColor="white" stopOpacity="0.08" />
//               </radialGradient>
//             </defs>
//           </svg>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;
