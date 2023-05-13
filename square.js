var cube, scene, camera, renderer;

var squareimg = document.querySelector('img[src="./img/square.png"]');
squareimg.addEventListener('click', echoSquare);

function callSquare() {
    echoSquare();
}

function echoSquare() {
    limpar();

    // Set up the scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xFFFFFF);

    // Create the cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true,
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set up the cube's initial velocity
    cube.userData.velocity = new THREE.Vector3(0.05, 0.05, 0);

    // Call rotateElement function and pass the cube object as an argument
    rotateCube(cube);

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    // Start the animation loop
    animateCube();

    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

function rotateCube(cube) { // Importante mudar o nome da função.

    var cubePosition = {
        x: 0,
        y: 0,
        z: 0
    };

    var cubeVelocity = {
        x: 0.01,
        y: 0.01
    };

    // Get the form inputs and slider
    var wInput = document.getElementById('w-input');
    var xInput = document.getElementById('x-input');
    var yInput = document.getElementById('y-input');
    var zInput = document.getElementById('z-input');

    // Add an event listener to the speed input
    wInput.addEventListener('input', function () {
        cubeVelocity.x = Number(wInput.value) * 0.01;
        cubeVelocity.y = Number(wInput.value) * 0.01;
        var scale = Math.abs(Math.sin(Number(wInput.value))); // Calculate the scale based on the value of wInput
        cube.scale.set(scale, scale, scale); // Apply the scale to the cube
    });

    // Add event listeners to the form inputs
    xInput.addEventListener('input', function () {
        cubePosition.x = Number(xInput.value);
        cube.position.x = cubePosition.x;
    });

    yInput.addEventListener('input', function () {
        cubePosition.y = Number(yInput.value);
        cube.position.y = cubePosition.y;
    });

    zInput.addEventListener('input', function () {
        cubePosition.z = Number(zInput.value);
        cube.position.z = cubePosition.z;
    });
}

function animateCube() { // Importante mudar o nome da função.
    requestAnimationFrame(animateCube);

    // Make the cube bounce off the walls
    if (
        cube.position.x >= 5 ||
        cube.position.x <= -5 ||
        cube.position.y >= 5 ||
        cube.position.y <= -5
    ) {
        cube.userData.velocity.x = -cube.userData.velocity.x;
        cube.userData.velocity.y = -cube.userData.velocity.y;
    }
    cube.position.x += cube.userData.velocity.x;
    cube.position.y += cube.userData.velocity.y;

    renderer.render(scene, camera);
}

function bounceSquare() {
    limpar();

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xdddddd, 1);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.z = 50;
    scene.add(camera);

    var boxGeometry = new THREE.BoxGeometry(7, 14, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    var pyramid = new THREE.Mesh(boxGeometry, lambertMaterial);
    pyramid.position.x = 0;
    scene.add(pyramid);

    var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(-10, 15, 50);
    scene.add(light);

    var t = 0;
    var speed = 0.01;
    var direction = new THREE.Vector3(1, 0, 0);

    function render() {
        t += speed;
        requestAnimationFrame(render);

        if (pyramid.position.y < -20) {
            direction.y = Math.abs(direction.y);
        }
        direction.y -= 0.1;

        pyramid.rotation.y += 0.01;
        pyramid.position.addScaledVector(direction, speed);
        pyramid.scale.y = Math.abs(Math.sin(t));
        pyramid.position.y = -7 * Math.sin(t * 2);
        renderer.render(scene, camera);
    }
    render();

    window.addEventListener('click', function (event) {
        var x = event.clientX / window.innerWidth * 2 - 1;
        var y = -event.clientY / window.innerHeight * 2 + 1;
        var vector = new THREE.Vector3(x, y, 0.5);
        vector.unproject(camera);

        direction = vector.sub(camera.position).normalize();
    }, false);

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);
}