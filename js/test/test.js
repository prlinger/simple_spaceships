
var container, stats, gui;
var camera, scene, renderer;
var mesh, geometry;

var geometries = [
				{ type: 'BoxGeometry', geometry: new THREE.BoxGeometry( 200, 200, 200, 2, 2, 2 ) },
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
		BoxGeometry: 0,
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

