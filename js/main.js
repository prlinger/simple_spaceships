
let container, scene, camera;
let renderer, controls;


init();
addReferencePoints();
animate();

function init() {
	container = document.getElementById( 'container' );
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 24;

	renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera, renderer.domElement );

	let geometry = new THREE.BoxGeometry( 2, 2, 2, 2, 2, 2 );
	let material = new THREE.MeshBasicMaterial( {color: 0x0066ff, wireframe: true } );
	let ship = new THREE.Mesh( geometry, material );
	scene.add( ship );

	window.addEventListener( 'resize', onWindowResize, false);
}

function addReferencePoints() {
	let hedronGeometry = new THREE.OctahedronGeometry( 0.1, 1 );
	let hedronMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: false} )

	for ( let i = -24; i <= 24; i += 4 ) {
		for( let m = -24; m <= 24; m += 4 ){
			for( let n = -24; n <= 24; n += 4 ) {
				let hedron = new THREE.Mesh( hedronGeometry, hedronMaterial );
				hedron.position.x = i;
				hedron.position.y = m;
				hedron.position.z = n;

				scene.add( hedron );
			}
		}
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	renderer.render( scene, camera );
}





