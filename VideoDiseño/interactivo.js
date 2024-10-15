let videoInicial = document.getElementById('videoInicial');
let videoFinal = document.getElementById('videoFinal');
let canvas3D = document.getElementById('canvas3D');
let scene, camera, renderer, model;
let userInteracted = false;
let interactionTimeout;

// Función para cargar y mostrar el modelo 3D
function init3DModel() {
  // Inicializar la escena
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: canvas3D, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Cargar el modelo 3D (ruta al modelo en la carpeta /models)
  const loader = new THREE.GLTFLoader();
  loader.load('models/Perfume1.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);
    camera.position.z = 5;
    animate();
  });
  
  // Detectar interacción del usuario
  canvas3D.addEventListener('touchstart', userInteractedWith3D);
  canvas3D.addEventListener('mousemove', userInteractedWith3D);
  
  // Animar el modelo (rotación continua)
  function animate() {
    requestAnimationFrame(animate);
    if (model) {
      model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }
}

// Función que maneja la interacción del usuario
function userInteractedWith3D() {
  clearTimeout(interactionTimeout); // Reinicia el temporizador si el usuario sigue interactuando
  userInteracted = true;
  interactionTimeout = setTimeout(playFinalVideo, 2000); // Inicia el temporizador de 2 segundos sin interacción
}

// Función que inicia el video final
function playFinalVideo() {
  canvas3D.style.display = 'none'; // Oculta el modelo 3D
  videoFinal.style.display = 'block'; // Muestra el video final
  videoFinal.play();
}

// Al tocar el video inicial, se muestra el modelo 3D
videoInicial.addEventListener('click', function() {
  videoInicial.style.display = 'none'; // Oculta el video inicial
  canvas3D.style.display = 'block'; // Muestra el canvas del modelo 3D
  init3DModel(); // Inicializa el modelo 3D
});
