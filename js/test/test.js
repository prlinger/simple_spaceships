
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

/*

var container, stats;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
init();
animate();
function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
	container.appendChild( info );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );
	var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
	for ( var i = 0; i < 2000; i ++ ) {
		var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		object.position.z = Math.random() * 800 - 400;
		object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
		object.rotation.z = Math.random() * 2 * Math.PI;
		object.scale.x = Math.random() + 0.5;
		object.scale.y = Math.random() + 0.5;
		object.scale.z = Math.random() + 0.5;
		scene.add( object );
	}
	raycaster = new THREE.Raycaster();
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild(renderer.domElement);



	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
	event.preventDefault();
	//.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	//mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	mouse.x = ( event.offsetX / renderer.domElement.width ) * 2 - 1;
    mouse.y = -( event.offsetY / renderer.domElement.height ) * 2 + 1;

    var deltaX = event.clientX - mouse.x;
    var deltaY = event.clientY - mouse.y; 

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
}

function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {
	theta += 0.0;
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );
	camera.updateMatrixWorld();
	// find intersections
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.emissive.setHex( 0xff0000 );
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	}
	renderer.render( scene, camera );
}
*/


var container, stats;
var camera, scene, raycaster, renderer;
var mouse, INTERSECTED;
var radius = 100, theta = 0;
init();
animate();
function init() {
	container = document.createElement( 'div' );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 40 );
	/*
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light ); */

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	var geometry = new THREE.BoxGeometry( 20, 20, 20 );

	let shipGeometry = new THREE.BoxBufferGeometry( 20, 20, 20, 2, 2, 2 );
	let shipMaterial = new THREE.MeshBasicMaterial( {color: 0x0066ff, wireframe: true } );
	let shipModel = new THREE.Mesh( shipGeometry, shipMaterial );

	scene.add(shipModel);

	/*
	for ( var i = 0; i < 2000; i ++ ) {
		var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		object.position.z = Math.random() * 800 - 400;
		object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
		object.rotation.z = Math.random() * 2 * Math.PI;
		object.scale.x = Math.random() + 0.5;
		object.scale.y = Math.random() + 0.5;
		object.scale.z = Math.random() + 0.5;
		scene.add( object );
	} */
	

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}
function render() {

	raycaster.setFromCamera( mouse, camera ); //updates ray from camera position.
	
	let intersects = raycaster.intersectObjects( scene.children );
	console.log(intersects.length );

	if(intersects.length > 0) {
		scene.children[0].material.color.set( 0xf600ff );
	} else {
		scene.children[0].material.color.set( 0xff0000 );
	}
	
	/*
	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[i].object.material.color.set( 0xf600ff );
		//ship.children[1].children[0].material.color.setHex( 0xff0000 );  //This works
	} */

	/*
	theta += 0.1;
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );
	camera.updateMatrixWorld();
	
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );
	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.color.set( 0xf600ff );// material.emissive.setHex( INTERSECTED.currentHex );
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.currentHex = INTERSECTED.material.color.set( 0xffffff );//material.emissive.getHex();
			//INTERSECTED.material.color.set( 0xff0000 );//material.emissive.setHex( 0xff0000 );
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.color.set( 0xf600ff );//material.emissive.setHex( INTERSECTED.currentHex );
		INTERSECTED = null;
	} */
	renderer.render( scene, camera );
}


// https://stackoverflow.com/questions/25024044/three-js-raycasting-with-camera-as-origin?rq=1
// https://stackoverflow.com/questions/29366109/three-js-three-projector-has-been-moved-to
// http://jsfiddle.net/rohitghatol/pNrT7/
// https://stackoverflow.com/questions/29534613/raycast-doesnt-hit-mesh-when-casted-from-the-inside





