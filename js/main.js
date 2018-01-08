
let container, scene, camera;
let renderer, controls;
let dirSphere, ship; //The ship is a group of the cameraGroup and ship model

let cameraLocation = { x:0, y:0, z:16 };

init();
addReferencePoints();
animate();

function init() {
	container = document.getElementById( 'container' );

	// Renderer
	renderer = new THREE.WebGLRenderer( { antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );

	// The camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( cameraLocation.x, cameraLocation.y, cameraLocation.z );
	//scene.add( camera );


	// Direction Sphere - Used to control ship movement
	let dirSphereGeo = new THREE.SphereGeometry(2, 16, 16);
	let dirSphereMat = new THREE.MeshBasicMaterial( {color: 0x40ff00, wireframe: true } );
	dirSphere = new THREE.Mesh( dirSphereGeo, dirSphereMat );

	dirSphere.material.depthTest = true;
	dirSphere.renderOrder = 1000;
	camera.add( dirSphere );

	// Ship Model Creation
	let shipGeometry = new THREE.BoxGeometry( 2, 2, 2, 2, 2, 2 );
	let shipMaterial = new THREE.MeshBasicMaterial( {color: 0x0066ff, wireframe: true } );
	let shipModel = new THREE.Mesh( shipGeometry, shipMaterial );

	ship = new THREE.Group();
	ship.add( shipModel );
	ship.add( camera );

	scene.add( ship );
	

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false);
	document.addEventListener( 'keydown', onKeyDown, false );

}

function setCameraProperties() {

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

	controls.update();

	render();
}

function render() {
	renderer.render( scene, camera );
}



function onKeyDown ( event ) {
	var rotateAngle = 0.05;

	switch( event.keyCode ) {

		case 68: /*D*/

		ship.translateY( -0.15 );


		break;

		case 65: /*A*/

		ship.translateY( 0.15 );

		break;

	}

};



