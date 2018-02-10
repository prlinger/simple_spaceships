/* 
 * Ship is a group. 
 * ship.children[0] is the shipModel
 * ship.children[1] is the camera
 * camera.children[0] is the dirSphere
 */



let container, scene, camera, cameraId;
let renderer, controls;
let raycaster, mouse;
let dirSphere, dirSphereId;
let ship, shipModelId; //The ship is a group of the cameraGroup and ship model
let stationGroup;

let speed = 0.025;
let dir; // the direction the ship will travel
let intersectDS; // the POI on the dirSphere

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
	setCameraProperties();
	cameraId = camera.id;

	// Raycaster for dirSphere
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	// Space Station Loading
	// The station group is returned and added
	scene.add( stationInit() );

	// Ship Model Creation
	let shipGeometry = new THREE.BoxBufferGeometry( 2, 2, 2, 2, 2, 2 );
	let shipMaterial = new THREE.MeshBasicMaterial( {color: 0x0066ff, wireframe: true } );
	let shipModel = new THREE.Mesh( shipGeometry, shipMaterial );
	shipModelId = shipModel.id;

	ship = new THREE.Group();
	ship.add( shipModel );
	ship.add( camera );

	scene.add( ship );
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false);
	window.addEventListener( 'dblclick', onDblClick, false );

}

// This adds a space station
// returns a station group.
function stationInit() {
	let stationGroup = new THREE.Group();

	let stnGeo = new THREE.SphereBufferGeometry( 4, 16, 16 );
	let stnMat = new THREE.MeshBasicMaterial( {color: 0x4425a3, wireframe: true } );
	let stnModel = new THREE.Mesh( stnGeo, stnMat );
	stnModel.position.set( 0, 0, -16 );
	stationGroup.add( stnModel );

	return stationGroup;
}



/*
 * This is called by the render loop.
 * It multiplies the global var dir by the var speed and moves the ship
 * in dir at speed units.
 * NOTE: Need to do something with trig to makes sure speed is the same on diagonals.
 */
function moveShip() {
	if(dir == null) {
		return;
	}



	ship.position.x += dir.x * speed;
	ship.position.y += dir.y * speed;
	ship.position.z += dir.z * speed;
}

function setCameraProperties() {

	// Direction Sphere - Used to control ship movement
	let dirSphereGeo = new THREE.SphereGeometry(2, 16, 16);
	let dirSphereMat = new THREE.MeshBasicMaterial( {color: 0x40ff00, wireframe: true } );
	dirSphere = new THREE.Mesh( dirSphereGeo, dirSphereMat );
	dirSphereId = dirSphere.id;

	dirSphere.material.depthTest = true;
	dirSphere.renderOrder = 1000;
	dirSphere.material.side = THREE.BackSide;
	dirSphere.material.visible = false;

	camera.add( dirSphere ); 
}

function addReferencePoints() {
	let hedronGeometry = new THREE.OctahedronBufferGeometry( 0.1, 1 );
	let hedronMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: false} )

	//var light = new THREE.PointLight( 0xff0000, 10, 100 );
	//light.position.set( 0, 0, 0 );
	//scene.add( light );

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

/*
 * Currently not in use.
 */
function onDocumentMouseMove( event ) {
	event.preventDefault();
	// Change this late to account for inaccurate raycasting.
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


/*
 * There is no point in checking if there is no intersection since inside sphere.
 */
function onDblClick( event ) {
	event.preventDefault();
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera ); //updates ray from camera position.
	intersectDS = raycaster.intersectObject( ship.children[1].children[0] ); // the POI on the dirSphere
	let point = intersectDS[0].point;

	let camVector = new THREE.Vector3();
	camVector.setFromMatrixPosition( camera.matrixWorld );

	// Finding the direction vector for the ship movement. Cam POI to dirSphere POI
	let dirX = point.x - camVector.x; //camera.position.x;
	let dirY = point.y - camVector.y; //camera.position.y;
	let dirZ = point.z - camVector.z; //camera.position.z;

	dir = new THREE.Vector3( dirX, dirY, dirZ );
	console.log( point );
	console.log( camera.position );
	console.log( dir );
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
	
	if(intersectDS) {
		if(intersectDS.length > 0) {
			ship.children[1].children[0].material.color.set( 0xf600ff );
		}
		intersectDS = null;
	} else {
			ship.children[1].children[0].material.color.set( 0x40ff00 );
	}

	moveShip();
	renderer.render( scene, camera );
}




