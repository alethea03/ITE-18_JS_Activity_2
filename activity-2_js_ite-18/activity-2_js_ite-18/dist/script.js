// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Gradient shader
const gradientShader = {
    uniforms: {
        topColor: { value: new THREE.Color(0xff69b4) }, // Pink
        bottomColor: { value: new THREE.Color(0xffff00) }, // Yellow
    },
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize( normalMatrix * normal );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vNormal;
        void main() {
            gl_FragColor = vec4( mix( bottomColor, topColor, vNormal.y * 0.5 + 0.5 ), 1.0 );
        }
    `
};

// Materials using the gradient shader
const material = new THREE.ShaderMaterial(gradientShader);
// Geometries
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
sphere.position.set(-3, 1, 0);
scene.add(sphere);

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
cube.position.set(0, 1, 0);
scene.add(cube);

const torus = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 100), material);
torus.position.set(3, 1, 0);
scene.add(torus);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.ShadowMaterial({ opacity: 0.5 }));
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
scene.add(floor);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0xFFC0CB, 0.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight.target);

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// Camera positioning
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotating geometries
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

animate();