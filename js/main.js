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
	window.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'keydown', onKeyDown, false );

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

	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	camera.add( dirSphere );  // add this back
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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

function onDocumentMouseMove( event ) {
	event.preventDefault();
	// Change this late to account for inaccurate raycasting.
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseMove( event ) {
	event.preventDefault();
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

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
	
	
	raycaster.setFromCamera( mouse, camera ); //updates ray from camera position.
	
	let intersects = raycaster.intersectObjects( ship.children[1].children );

	if(intersects.length > 0) {
		ship.children[1].children[0].material.color.set( 0xf600ff );
	} else {
		ship.children[1].children[0].material.color.set( 0x40ff00 );
	}
	
	/*
	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[i].object.material.color.set( 0xf600ff );
		//ship.children[1].children[0].material.color.setHex( 0xff0000 );  //This works
	}
	/*
	let INTERSECTED;
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			INTERSECTED.material.color.setHex( 0xff00ff );
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	} */


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



