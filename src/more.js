import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xababab);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 5, 10).setLength(15);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;  // Enable shadow mapping
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Optional: softer shadows

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const earthRadius = 10;
const planet = new THREE.Object3D();
const geo = new THREE.SphereGeometry(earthRadius, 32, 32);
const mats = new THREE.MeshBasicMaterial({
    color: "teal",
    wireframe: true,
    transparent: true,
});
const sphere = new THREE.Mesh(geo, mats);
planet.add(sphere);
scene.add(planet);

const earthTilt = THREE.MathUtils.degToRad(23.5);
planet.rotation.z = earthTilt;

// Create and position pins
let dot = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshLambertMaterial({ color: "red" }));
// let pin = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5).translate(0, -0.3, 0).rotateX(Math.PI / 2), new THREE.MeshLambertMaterial({color: "blue"}));
// [
//   [48, 92.3],
//   [43, -70],
//   [-33, 151],
//   [34, -118],
// ].forEach(p => {
//   let newSphere = dot.clone()
//   newSphere.position.setFromSphericalCoords(earthRadius, THREE.MathUtils.degToRad(90 - p[0]), THREE.MathUtils.degToRad(p[1]));
//   let newPin = pin.clone();
//   newSphere.add(newPin);
//   newSphere.updateMatrixWorld();
//   newPin.lookAt(new THREE.Vector3(0, 0, 0));  // Adjust pin orientation to point towards the Earth's center
//   planet.add(newSphere);  // Add to the planet for correct rotation and tilt
// });

// In order for this to work, it has to be flipped.
function geoCodesToVector3(acity) {
    const lat = acity[0];
    const long = acity[1];
    const x =
        Math.sin((lat * Math.PI) / 180) * Math.cos((long * Math.PI / 180) * earthRadius);
    const y =
        Math.sin((lat * Math.PI) / 180) * Math.sin((long * Math.PI) / 180) * earthRadius;
    const z = Math.cos((lat * Math.PI) / 180) * earthRadius;

    return new THREE.Vector3(z, y, x);
}

function geoCodesToQuart(acity) {
    const lat = acity[0];
    const long = acity[1];

    console.log
}

let greenDot = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshLambertMaterial({ color: "green" }));
sphere.add(greenDot);

let coords = [90, 0];
let mah_vector = geoCodesToVector3(coords);
let thing = scene.worldToLocal(mah_vector);
greenDot.position.setFromSphericalCoords(mah_vector.z, mah_vector.x, mah_vector.y);
// greenDot.position.add(thing);
// greenDot.updateMatrixWorld();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(3, 5, 8);
scene.add(light);

const torusRadius = earthRadius; // same as the radius of the Earth
const tubeRadius = 0.02;  // thickness of the torus, adjust as needed
const radialSegments = 30; // smoothness of the torus
const tubularSegments = 100; // smoothness of the torus

const torusGeometry = new THREE.TorusGeometry(torusRadius, tubeRadius, radialSegments, tubularSegments);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); // use wireframe for clarity
const equatorialRing = new THREE.Mesh(torusGeometry, torusMaterial);

// Rotate the torus to align with the equator
equatorialRing.rotation.x = Math.PI / 2;

// Add the equatorial ring to the planet object to ensure it rotates with the Earth
planet.add(equatorialRing);


window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(25);
scene.add(axesHelper);

let clock = new THREE.Clock();

function animate() {
    const deltaTime = clock.getDelta();
    const rotationSpeed = .0000727;
    let speedUp = 24 * 60;
    planet.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotationSpeed * deltaTime * speedUp);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    // Rotate around the y-axis
    controls.update();
}

animate();