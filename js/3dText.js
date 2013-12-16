$(document).ready(function(){
	var camera, controls, scene, renderer, light;
	var textureURLs = [];
	var defaultCameraPosition = {
		x: 900,
		y: -500,
		z: 1000
	};
	var cubes = [];
	var theta;
	var unitdimension = 100;
	var standoff = 400;
	var radius = 600;
	var projector;
	var x,y;
	var imageFolder = "../img/";

	var pixels = [
	  {"x": 0,  "y": 0}, {"x": 4,  "y": 0}, {"x": 7,  "y": 0}, {"x": 10, "y": 0}, {"x": 12, "y": 0}, {"x": 14, "y": 0}, {"x": 15, "y": 0}, {"x": 16, "y": 0}, {"x": 18, "y": 0},
	  
	  {"x": 0,  "y": 1}, {"x": 4,  "y": 1}, {"x": 6,  "y": 1}, {"x": 7,  "y": 1}, {"x": 8,  "y": 1}, {"x": 10, "y": 1}, {"x": 12, "y": 1}, {"x": 14, "y": 1}, {"x": 15, "y": 1}, {"x": 16, "y": 1}, {"x": 18, "y": 1},
	  
	  {"x": 0,  "y": 2}, {"x": 1,  "y": 2}, {"x": 3,  "y": 2}, {"x": 4,  "y": 2}, {"x": 6,  "y": 2}, {"x": 7,  "y": 2}, {"x": 8,  "y": 2}, {"x": 10, "y": 2}, {"x": 12, "y": 2}, {"x": 14, "y": 2}, {"x": 18, "y": 2},
	  
	  {"x": 0,  "y": 3}, {"x": 1,  "y": 3}, {"x": 2,  "y": 3}, {"x": 3,  "y": 3}, {"x": 4,  "y": 3}, {"x": 6,  "y": 3}, {"x": 8,  "y": 3}, {"x": 10, "y": 3}, {"x": 11, "y": 3}, {"x": 12, "y": 3}, {"x": 14, "y": 3}, {"x": 18, "y": 3},
	  
	  {"x": 0,  "y": 4}, {"x": 2,  "y": 4}, {"x": 4,  "y": 4}, {"x": 6,  "y": 4}, {"x": 8,  "y": 4}, {"x": 10, "y": 4}, {"x": 11, "y": 4}, {"x": 14, "y": 4}, {"x": 15, "y": 4}, {"x": 16, "y": 4}, {"x": 18, "y": 4}, 

	  {"x": 0,  "y": 5}, {"x": 2,  "y": 5}, {"x": 4,  "y": 5}, {"x": 6,  "y": 5}, {"x": 7,  "y": 5}, {"x": 8,  "y": 5}, {"x": 10, "y": 5}, {"x": 11, "y": 5}, {"x": 12, "y": 5}, {"x": 14, "y": 5}, {"x": 15, "y": 5}, {"x": 16, "y": 5}, {"x": 18, "y": 5},
	  
	  {"x": 0,  "y": 6}, {"x": 2,  "y": 6}, {"x": 4,  "y": 6}, {"x": 6,  "y": 6}, {"x": 8,  "y": 6}, {"x": 10, "y": 6}, {"x": 12, "y": 6}, {"x": 14, "y": 6}, {"x": 18, "y": 6}, 

	  {"x": 0,  "y": 7}, {"x": 2,  "y": 7}, {"x": 4,  "y": 7}, {"x": 6,  "y": 7}, {"x": 8,  "y": 7}, {"x": 10, "y": 7}, {"x": 12, "y": 7}, {"x": 14, "y": 7}, {"x": 15, "y": 7}, {"x": 16, "y": 7},
	  
	  {"x": 0,  "y": 8}, {"x": 2,  "y": 8}, {"x": 4,  "y": 8}, {"x": 6,  "y": 8}, {"x": 8,  "y": 8}, {"x": 10, "y": 8}, {"x": 12, "y": 8}, {"x": 14, "y": 8}, {"x": 15, "y": 8}, {"x": 16, "y": 8}, {"x": 18, "y": 8}
	];

	function Cube(pixel, textureURL) {
	  this.mesh = null;
	  this.pixelcatX = pixel.x;
	  this.pixelcatY = pixel.y;
	  this.type = "body";
	  this.textureURL = textureURL;
	}

	Cube.prototype = {

	  createMesh : function(x) {
    var geometry = new THREE.CubeGeometry(unitdimension, unitdimension, unitdimension); 
		var material  = new THREE.MeshPhongMaterial({
      ambient   : 0x444444,
      color     : 0xff0000,
      shininess : 100,
      specular  : 0xaaaaaa,
      shading   : THREE.SmoothShading,
	   });

		if(x != 23){ // If not last pixel to be rendered.
			drawing = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture( this.textureURL )});
			this.mesh = new THREE.Mesh( geometry, drawing );
			
    }else{
                                                                                  
			var a1 = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture( imageFolder + "box1.jpg" )});
			var a2 = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture( imageFolder + "box2.jpg" )});
			var a3 = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture( imageFolder + "box3.jpg" )});
			var a4 = new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture( imageFolder + "box4.jpg" )});    
			
			this.mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( [a1, a3, material, material, a4, a2] ) );

		}

    this.mesh.position.x =  this.pixelcatX * unitdimension;
    this.mesh.position.y = -this.pixelcatY * unitdimension;
    this.mesh.position.z = 4000;

    scene.add(this.mesh);
  
	  },

	  flyIn : function() {

	    var tween = new TWEEN.Tween(this.mesh.position);
	    tween.to({z : 0}, 2000);
	    tween.easing(TWEEN.Easing.Sinusoidal.Out);
	    tween.delay(_.random(0, 4000));
	     tween.onUpdate(function() {
	       camera.position.z += 0.1;
	     });
	    tween.start();
	  }
	
	}

	if ( Detector.webgl ){
		init();
		animate();
	}

	function init() {
		
		scene = new THREE.Scene();
		initLights();

		camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.x = defaultCameraPosition.x;
		camera.position.y = defaultCameraPosition.y;
		camera.position.z = defaultCameraPosition.z;
		
		controls = new THREE.OrbitControls( camera );
		controls.addEventListener( 'change', render );
		controls.target.set( defaultCameraPosition.x, defaultCameraPosition.y , 0 )
		
		createCubes();
		animateCubes();

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;

		document.body.appendChild(renderer.domElement);

		window.addEventListener( 'resize', onWindowResize, false );
		window.oncontextmenu = function() {return false; }

		projector = new THREE.Projector();
		
	}
	

	function initLights() {
		
		var lightColor = 0xffffff;
		var defaultAmbientLightColor = 0xcdbbce;

		var light = new THREE.AmbientLight( defaultAmbientLightColor );
		scene.add( light );
		
		var light1 = new THREE.DirectionalLight(lightColor, 0.3);
		light1.position.set(300, 500, 1000);
		scene.add( light1 );

	}

	function createCubes() {
		for(i = 1; i < pixels.length;i++){
			if(i < 10){
				textureURLs[i]= imageFolder + "cards/holidaycard.f.00" + i + ".jpg" ;	
			} else{
				textureURLs[i]= imageFolder + "cards/holidaycard.f.0" + i + ".jpg" ;
			}
		}
	  textureURLs = _.shuffle(textureURLs);
	  _.each(pixels, function(pixel, index) {
	    var cube = new Cube(pixel, textureURLs[index]);
	    if(index == pixels.length-1){
	      cube.createMesh(23);
	    }else{
	      cube.createMesh();
	    }
	    cubes.push(cube);
	  });
	}

	function animateCubes() {
	  _.each(cubes, function(cube, index) {
	    _.bindAll(cube, 'flyIn');
	    _.delay(cube.flyIn, 100);
	  });
	}

	function onWindowResize() {
	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();
	  renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function animate() {
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(animate);
		TWEEN.update();
		theta += 0.1;
		radius = 600;
		cubes[cubes.length-1].mesh.rotation.y -= 0.005;
	}
	
	function render() {
		renderer.render( scene, camera );
	}
});
