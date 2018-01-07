
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let geometry = new THREE.SphereGeometry( 8, 32, 32 );
let material = new THREE.MeshBasicMaterial( {color: 0x0066ff} );
let ship = new THREE.Mesh( geometry, material );
scene.add( ship );






