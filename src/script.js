import './style.css'

import Expirience from './Expirience/Expirience.js';

const expirience = new Expirience(document.querySelector('canvas.webgl'));

// import './style.css'
// import * as THREE from 'three'
// import * as dat from 'lil-gui'
// import gsap from 'gsap';

// // TODO: SEND CSS ANIMATION PROPERTY TO GUI
// // EXTRACT CONSTANTS
// // TRY MESH GROUPS - 2 and 3 meshes
// // FIX FAST CLICKING BUG


// /**
//  * Debug
//  */
// const gui = new dat.GUI()
// const parameters = {
//     // meshes
//     materialColor: '#ffeded',
//     baseMeshOpacity: 0.7,

//     // environment
//     objectsDistance: 4,
//     distanceMeshToOY: 2,
//     isAxesHelperVisible: false,
//     maxDistanceParicleToOY: 10,
//     parallaxPower: 2,

//     // particles
//     pariclesCount: 1000,
//     particlesSize: 0.03,

//     // camera
//     deltaCameraToMesh: 0.6,
//     cameraPositionZInit: 8
// };



// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader();
// const gradientTexture = textureLoader.load('textures/gradients/3.jpg');
// gradientTexture.magFilter = THREE.NearestFilter;



// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')


// // Scene
// const scene = new THREE.Scene()



// /**
//  * Lights
//  */
// const directionLight = new THREE.DirectionalLight('#ffffff', 1);
// directionLight.position.set(1, 1, 0);
// scene.add(directionLight);



// /**
//  * Objects
//  */

// // Meshes
// const mesh1 = new THREE.Mesh(
//     new THREE.TorusGeometry(1, 0.4, 16, 60),
//     new THREE.MeshToonMaterial({ 
//         color: parameters.materialColor,
//         transparent: true,
//         opacity: parameters.baseMeshOpacity,
//         gradientMap: gradientTexture
//     })
// )
// const mesh2 = new THREE.Mesh(
//     new THREE.ConeGeometry(1, 2, 32),
//     new THREE.MeshToonMaterial({ 
//         color: parameters.materialColor,
//         transparent: true,
//         opacity: parameters.baseMeshOpacity,
//         gradientMap: gradientTexture
//     })
// )
// const mesh3 = new THREE.Mesh(
//     new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
//     new THREE.MeshToonMaterial({ 
//         color: parameters.materialColor,
//         transparent: true,
//         opacity: parameters.baseMeshOpacity,
//         gradientMap: gradientTexture
//     })
// );

// const sectionMeshes = [
//     {
//         mesh: mesh1, 
//         clicked: false,
//         initPosition: new THREE.Vector3(
//             parameters.distanceMeshToOY * Math.cos((2 * Math.PI) * (0 / 3)), 
//             -parameters.objectsDistance * 0,
//             - parameters.distanceMeshToOY * Math.sin((2 * Math.PI) * (0 / 3))
//         )
//     },
//     {
//         mesh: mesh2, 
//         clicked: false,
//         initPosition: new THREE.Vector3(
//             parameters.distanceMeshToOY * Math.cos((2 * Math.PI) * (1 / 3)), 
//             - parameters.objectsDistance * 1,
//             - parameters.distanceMeshToOY * Math.sin((2 * Math.PI) * (1 / 3))
//         )
//     },
//     {
//         mesh: mesh3,
//         clicked: false,
//         initPosition: new THREE.Vector3(
//             parameters.distanceMeshToOY * Math.cos((2 * Math.PI) * (2 / 3)), 
//             - parameters.objectsDistance * 2,
//             - parameters.distanceMeshToOY * Math.sin((2 * Math.PI) * (2 / 3))
//         )
//     },
// ];

// mesh1.position.set(...sectionMeshes[0].initPosition);
// mesh2.position.set(...sectionMeshes[1].initPosition);
// mesh3.position.set(...sectionMeshes[2].initPosition);

// scene.add(mesh1, mesh2, mesh3);


// // paricles
// let particles = null;
// let particlesGeometry = null;
// let particlesMaterial = null;

// const generateParticles = () => {
//     if (particles !== null) {
//         particlesGeometry.dispose();
//         particlesMaterial.dispose();
//         scene.remove(particles);
//     }

//     const positions = new Float32Array(parameters.pariclesCount * 3);
//     let i3;
//     for (let index = 0; index < parameters.pariclesCount; index++) {
//         i3 = index * 3;
//         positions[i3    ] = (Math.random() - 0.5) * parameters.maxDistanceParicleToOY * 2;
//         positions[i3 + 1] = 
//             Math.random() + parameters.objectsDistance * 0.5 - Math.random() * parameters.objectsDistance * sectionMeshes.length;
//         positions[i3 + 2] = (Math.random() - 0.5) * parameters.maxDistanceParicleToOY * 2;
//     };

//     particlesGeometry = new THREE.BufferGeometry();
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//     particlesMaterial = new THREE.PointsMaterial({ 
//         color: parameters.materialColor, 
//         size: parameters.particlesSize,
//         sizeAttenuation: true
//     });

//     particles = new THREE.Points(
//         particlesGeometry,
//         particlesMaterial
//     );

//     scene.add(particles);
// };
// generateParticles();



// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
// directionalLight.position.set(1, 1, 0)
// scene.add(directionalLight)



// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }



// /**
//  * Events
//  */
// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })


// const coursor = {
//     x: 0,
//     y: 0,
//     getCoursorVersionForRaycaster: function() {
//         return {
//             x: this.x * 2,
//             y: - this.y * 2
//         }
//     }
// };

// window.addEventListener('mousemove', event => {
//     coursor.x = event.clientX / sizes.width - 0.5;
//     coursor.y = event.clientY / sizes.height - 0.5;
// });


// const returnMeshObjectToInitPosition = meshObject => {
//     gsap.to(
//         meshObject.mesh.position,
//         {
//             duration: 2,
//             ease: 'power2.inOut',
//             x: meshObject.initPosition.x,
//             z: meshObject.initPosition.z,
//         }
//     )
// };
// const returnSectionContainerToInitState = sectionIndex => {
//     const movedMovers = document
//                         .querySelectorAll(`section:nth-of-type(${1 + sectionIndex}) > .section__container > .section__container__mover--moved`);

//     let index = 0;
//     gsap.to(
//         movedMovers,
//         {
//             duration: 2,
//             width: 0,
//             ease: 'power0.easeNone',
//             stagger: {
//                 each: 1,
//                 onComplete: () => {
//                     movedMovers
//                         .item(index++)
//                         .classList
//                         .remove('section__container__mover--moved');
//                 }
//             }
//         }
//     );
// }


// window.addEventListener('click', () => {
//     const intersectedObject = intersectingObject?.object;
//     const selectedObject = sectionMeshes[currentSection];

//     if (intersectedObject !== selectedObject.mesh ||
//         Math.abs(selectedObject.mesh.position.y - camera.position.y) > parameters.deltaCameraToMesh) {
//         return;
//     }
    
//     const newClickedValue = !selectedObject.clicked;

//     if (newClickedValue) {
//         const moveDistance = 2;
//         const meshPostionProjectionOnOY = new THREE.Vector3(0, selectedObject.mesh.position.y, 0);        
//         const directionFromMeshPosition = 
//             new THREE.Vector3()
//             .copy(selectedObject.mesh.position)
//             .sub(meshPostionProjectionOnOY);
//         const moveDirection = new THREE.Vector3().copy(directionFromMeshPosition);
//         moveDirection.normalize();
//         moveDirection.applyEuler(
//             new THREE.Euler(
//                 0, 
//                 (currentSection % 2 ? - 1 : 1) * Math.PI * 0.5, 
//                 0
//             )
//         );
//         moveDirection.multiplyScalar(moveDistance);
//         const newPosition = new THREE.Vector3()
//             .copy(selectedObject.mesh.position)
//             .add(moveDirection);

//         // const test = new THREE.Mesh(
//         //     new THREE.BoxGeometry(1, 1, 1),
//         //     material
//         // );
//         // scene.add(test);

//         // test.position.set(...newPosition);

//         // console.log('newPosition:', newPosition)
//         // console.log('position:', selectedObject.mesh.position)
//         // console.log('distance:', selectedObject.mesh.position.distanceTo(newPosition));
//         // console.log('test pos:', test.position);
        
//         gsap.to(
//             sectionMeshes[currentSection].mesh.position,
//             {
//                 duration: 2,
//                 ease: 'power2.inOut',
//                 x: newPosition.x,
//                 z: newPosition.z,
//                 onStart: () => {
//                     const lidMover = document
//                         .querySelector(`section:nth-of-type(${1 + currentSection}) > .section__container > .section__container__mover--lid`);
                        
//                     gsap.to(
//                         lidMover,
//                         {
//                             duration: 2,
//                             ease: 'power2.inOut',
//                             width: '55vw',
//                             onStart: () => {
//                                 // console.log('lid mover goes');
//                                 lidMover.classList.add('section__container__mover--moved');
//                             },
//                             onComplete: () => {
//                                 const preview = document
//                                     .querySelector(`section:nth-of-type(${1 + currentSection}) > .section__container > .section__container__preview`);

//                                 preview.addEventListener('click', () => {
//                                     const previewMover = document
//                                         .querySelector(`section:nth-of-type(${1 + currentSection}) > .section__container > .section__container__mover--preview`);

//                                     gsap.to(
//                                         previewMover,
//                                         {
//                                             duration: 2,
//                                             ease: 'power2.inOut',
//                                             width: '55vw',
//                                             onStart: () => {
//                                                 previewMover.classList.add('section__container__mover--moved');
                
//                                                 // console.log('ended');
//                                             }
//                                         }
//                                     );
//                                 });

//                                 // console.log('ended');
//                             }
//                         }
//                     );
//                     // console.log('started');
//                 }
//             }
//         );
//     } else {
//         returnMeshObjectToInitPosition(sectionMeshes[currentSection]);

//         returnSectionContainerToInitState(currentSection);
//     }

//     selectedObject.clicked = newClickedValue;
// });


// const returnMeshBasicOpacity = mesh => {
//     gsap.to(
//         mesh.material,
//         {
//             duration: 1,
//             ease: 'power2.inOut',
//             opacity: parameters.baseMeshOpacity
//         }
//     );
// }

// let previousSection = 0;
// let currentSection = 0;
// let scrollY = window.scrollY;

// window.addEventListener('scroll', () => {
//     scrollY = window.scrollY;

//     currentSection = Math.round(scrollY / sizes.height);
    
//     if (currentSection !== previousSection) {
//         // move object
//         returnMeshObjectToInitPosition(sectionMeshes[previousSection]);

//         // reset clicking
//         sectionMeshes[previousSection].clicked = false;

//         // reset opacity highlighting
//         returnMeshBasicOpacity(sectionMeshes[previousSection].mesh)

//         // move container with info
//         returnSectionContainerToInitState(previousSection);

//         previousSection = currentSection;

//         gsap.to(
//             sectionMeshes[currentSection].mesh.rotation,
//             {
//                 duration: 1.5,
//                 ease: 'power2.inOut',
//                 x: '+=6',
//                 y: '+=3',
//                 z: '+=1.5'
//             }
//         );
//     }
// });



// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = parameters.cameraPositionZInit

// const cameraGroup = new THREE.Group();
// cameraGroup.add(camera);

// scene.add(cameraGroup);



// /**
//  * Axes helper
//  */
// let axesHelper = null;

// const createAxesHelper = visible => {
//     axesHelper = new THREE.AxesHelper();
//     axesHelper.visible = visible;
//     scene.add(axesHelper);
// };

// if (parameters.isAxesHelperVisible) {
//     createAxesHelper(parameters.isAxesHelperVisible)
// }



// /**
//  * Raycaster
//  */
// const raycaster = new THREE.Raycaster();



// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     alpha: true
// });
// //renderer.setClearAlpha(0.5);
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// /**
//  * Animate
//  */
// const clock = new THREE.Clock();

// let elapsedTime = 0;
// let previousTime = 0;
// let deltaTime;
// let parallaxX;
// let parallaxY;
// let scrollProgress = 0;
// let intersections = null;

// var intersectingObject = null;

// const tick = () =>
// {
//     // calculate times
//     elapsedTime = clock.getElapsedTime()
//     deltaTime = elapsedTime - previousTime;
//     previousTime = elapsedTime;


//     // default rotation of meshes
//     for (const object of sectionMeshes) {
//         object.mesh.rotation.x += deltaTime * 0.1;
//         object.mesh.rotation.y += deltaTime * 0.12;
//     }


//     // move camera according to scroll progress
//     scrollProgress = scrollY / sizes.height * parameters.objectsDistance
//     camera.position.x = 
//         parameters.cameraPositionZInit
//         * 
//         Math.cos((2 * Math.PI) * (scrollY / sizes.height) / sectionMeshes.length);
//     camera.position.y = - scrollProgress;
//     camera.position.z = 
//         - parameters.cameraPositionZInit
//         * 
//         Math.sin((2 * Math.PI) * (scrollY / sizes.height) / sectionMeshes.length);

//     camera.lookAt(new THREE.Vector3(0, - scrollProgress, 0));


//     // move camera according to coursor moving
//     parallaxX = coursor.x;
//     parallaxY = - coursor.y;

//     cameraGroup.position.x += 
//         (parallaxX * Math.sin((2 * Math.PI) * (scrollY / sizes.height) / sectionMeshes.length) - cameraGroup.position.x) *
//         deltaTime * 
//         parameters.parallaxPower;
//     cameraGroup.position.y += 
//         (parallaxY - cameraGroup.position.y) * 
//         deltaTime * 
//         parameters.parallaxPower;
//     cameraGroup.position.z += 
//         (parallaxX * Math.cos((2 * Math.PI) * (scrollY / sizes.height) / sectionMeshes.length) - cameraGroup.position.z) *
//         deltaTime * 
//         parameters.parallaxPower;
    

//     // handle raycaster
//     raycaster.setFromCamera(coursor.getCoursorVersionForRaycaster(), camera);
//     intersections = raycaster.intersectObjects(sectionMeshes.map(object => object.mesh));

//     if (intersections.length > 0) {
//         if (intersectingObject === null) {
//             intersectingObject = intersections[0];

//             const intersectingObjectInSectionMeshes = sectionMeshes.find(object => object.mesh === intersectingObject.object);
//             if (intersectingObjectInSectionMeshes.clicked === false 
//             && Math.abs(intersectingObjectInSectionMeshes.mesh.position.y - camera.position.y) < parameters.deltaCameraToMesh) {
//                 gsap.to(
//                     intersectingObject.object.material,
//                     {
//                         duration: 1,
//                         ease: 'power2.inOut',
//                         opacity: 1
//                     }
//                 )
//             }

//             // console.log('entered');
//         }
//     }
//     else {
//         if (intersectingObject) {
//             const intersectingObjectInSectionMeshes = sectionMeshes.find(object => object.mesh === intersectingObject.object);
//             if (intersectingObjectInSectionMeshes.clicked === false) {
//                 returnMeshBasicOpacity(intersectingObject.object);
//             }

//             // console.log('leaved');
//         }

//         intersectingObject = null;
//     }


//     // Render
//     renderer.render(scene, camera)


//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick();

// /**
//  * Debug interaction
//  */
// const environmenDebugtFolder = gui.addFolder('Environment');
// const meshesDebugFolder = gui.addFolder('Meshes');
// const particlesDebugFolder = gui.addFolder('Particles');
// const cameraDebugFolder = gui.addFolder('Camera');

// // environmenDebugtFolder
// environmenDebugtFolder
//     .add(parameters, 'objectsDistance')
//     .min(0)
//     .max(10)
//     .step(0.01)
//     .name('distance: mesh-mesh')
//     .onFinishChange(value => {
//         sectionMeshes.forEach((object, index) => {
//             object.mesh.position.y = - value * index;
//             object.initPosition.y = - value * index;
//         });

//         generateParticles();
//     });

// environmenDebugtFolder
//     .add(parameters, 'distanceMeshToOY')
//     .min(0)
//     .max(10)
//     .step(0.01)
//     .name('distance: mesh-OY')
//     .onFinishChange(value => {
//         sectionMeshes.forEach((object, index) => {
//             object.mesh.position.x = value * Math.cos((2 * Math.PI) * (index / sectionMeshes.length));
//             object.mesh.position.z = - value * Math.sin((2 * Math.PI) * (index / sectionMeshes.length));

//             object.initPosition.x = value * Math.cos((2 * Math.PI) * (index / sectionMeshes.length));
//             object.initPosition.z = - value * Math.sin((2 * Math.PI) * (index / sectionMeshes.length));
//         });

//         generateParticles();
//     });

// environmenDebugtFolder
//     .add(parameters, 'isAxesHelperVisible')
//     .name('ON: axes helper')
//     .onChange(value => {
//         if (value === true) {
//             createAxesHelper(true);
//         } else {
//             if (axesHelper) {
//                 axesHelper.dispose();
//                 scene.remove(axesHelper);
//             }
//         }
//     });

// environmenDebugtFolder
//     .add(parameters, 'maxDistanceParicleToOY')
//     .min(1)
//     .max(30)
//     .name('distance: paricle-OY')
//     .onFinishChange(generateParticles);

// environmenDebugtFolder
//     .add(parameters, 'parallaxPower')
//     .min(0)
//     .max(10)
//     .step(0.001)
//     .name('parallax');

// // meshesDebugFolder
// meshesDebugFolder 
//     .add(parameters, 'baseMeshOpacity')
//     .min(0)
//     .max(1)
//     .step(0.001)
//     .name('opacity')
//     .onChange(value => {
//         sectionMeshes
//             //.slice()
//             .filter(object => !object.clicked)
//             .forEach(object => {
//                 object.mesh.material.opacity = value;
//                 object.mesh.material.needsUpdate = true;
//             })
//     });

// meshesDebugFolder
//     .addColor(parameters, 'materialColor')
//     .name('color')
//     .onChange(() => {
//         sectionMeshes.forEach(object => {
//             object.mesh.color.set(parameters.materialColor);
//         });
//     });
    
// // particlesDebugFolder
// particlesDebugFolder
//     .add(parameters, 'pariclesCount')
//     .min(0)
//     .max(20000)
//     .step(1)
//     .name('count')
//     .onFinishChange(generateParticles);

// particlesDebugFolder
//     .add(parameters, 'particlesSize')
//     .min(0.001)
//     .max(0.1)
//     .step(0.001)
//     .name('size')
//     .onFinishChange(generateParticles);


// // cameraDebugFolder
// cameraDebugFolder
//     .add(parameters, 'deltaCameraToMesh')
//     .min(0)
//     .max(3)
//     .step(0.01)
//     .name('delta: camera-mesh');

// cameraDebugFolder
//     .add(parameters, 'cameraPositionZInit')
//     .min(0)
//     .max(20)
//     .step(0.01)
//     .name('distance: camera-OY');