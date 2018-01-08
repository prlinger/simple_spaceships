
// Cube with normals
/*
var container, stats, gui;
var camera, scene, renderer;
var mesh, geometry;

var geometries = [
				{ type: 'dirSphereGeometry', geometry: new THREE.dirSphereGeometry( 200, 200, 200, 2, 2, 2 ) },
				{ type: 'CircleGeometry', geometry: new THREE.CircleGeometry( 200, 32 ) },
				{ type: 'CylinderGeometry', geometry: new THREE.CylinderGeometry( 75, 75, 200, 8, 8 ) } ,
				{ type: 'IcosahedronGeometry', geometry: new THREE.IcosahedronGeometry( 100, 1 ) },
				{ type: 'OctahedronGeometry', geometry: new THREE.OctahedronGeometry( 200, 0 ) },
				{ type: 'PlaneGeometry', geometry: new THREE.PlaneGeometry( 200, 200, 4, 4 ) },
				{ type: 'RingGeometry', geometry: new THREE.RingGeometry( 32, 64, 16 ) },
				{ type: 'SphereGeometry', geometry: new THREE.SphereGeometry( 100, 12, 12 ) },
				{ type: 'TorusGeometry', geometry: new THREE.TorusGeometry( 64, 16, 12, 12 ) },
				{ type: 'TorusKnotGeometry', geometry: new THREE.TorusKnotGeometry( 64, 16 ) }
			];
			var options = {
				Geometry: 0
			};

var material = new THREE.MeshBasicMaterial( { color: 0xfefefe, wireframe: true, opacity: 0.5 } );
init();
animate();

function addMesh() {
	if ( mesh !== undefined ) {
		scene.remove( mesh );
		geometry.dispose();
	}
	geometry = geometries[ options.Geometry ].geometry;
	// scale geometry to a uniform size
	geometry.computeBoundingSphere();
	var scaleFactor = 160 / geometry.boundingSphere.radius;
	geometry.scale( scaleFactor, scaleFactor, scaleFactor );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	var faceNormalsHelper = new THREE.FaceNormalsHelper( mesh, 10 );
	mesh.add( faceNormalsHelper );
	var vertexNormalsHelper = new THREE.VertexNormalsHelper( mesh, 10 );
	mesh.add( vertexNormalsHelper );
}
function init() {
	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 500;
	camera.enableDamping = true;
	scene = new THREE.Scene();
	addMesh();

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	var geometries = {
		dirSphereGeometry: 0,
		CircleGeometry: 1,
		CylinderGeometry: 2,
		IcosahedronGeometry: 3,
		OctahedronGeometry: 4,
		PlaneGeometry: 5,
		RingGeometry: 6,
		SphereGeometry: 7,
		TorusGeometry: 8,
		TorusKnotGeometry: 9
	};

	var controls = new THREE.OrbitControls( camera, renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );
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
*/

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


