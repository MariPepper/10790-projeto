var circle, scene, camera, renderer;

var circleimg = document.querySelector('img[src="./img/circle.png"]');
circleimg.addEventListener('click', echoCircle);

function callCircle() {
    echoCircle();
}

function echoCircle() {
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

    // Create the circle
    var circleGeometry = new THREE.CircleGeometry(1, 32);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
    });
    circle = new THREE.Mesh(circleGeometry, material);
    scene.add(circle);

    // Set up the circle's initial velocity
    circle.userData.velocity = new THREE.Vector3(0.05, 0.05, 0);

    // Call rotateElement function and pass the circle object as an argument
    rotateCircle(circle);

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    // Start the animation loop
    animateCircle();

    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
}

function rotateCircle(circle) { // Importante mudar o nome da função.

    var circlePosition = {
        x: 0,
        y: 0,
        z: 0
    };

    var circleVelocity = {
        x: 0.05,
        y: 0.05
    };

    // Get the form inputs and slider
    var wInput = document.getElementById('w-input');
    var xInput = document.getElementById('x-input');
    var yInput = document.getElementById('y-input');
    var zInput = document.getElementById('z-input');

    // Add an event listener to the speed input
    wInput.addEventListener('input', function () {
        circleVelocity.x = Number(wInput.value) * 0.01;
        circleVelocity.y = Number(wInput.value) * 0.01;
        circle.scale.set(Math.abs(Math.sin(Number(wInput.value))), 
        Math.abs(Math.sin(Number(wInput.value))), 
        Math.abs(Math.sin(Number(wInput.value))));
    });

    // Add event listeners to the form inputs
    xInput.addEventListener('input', function () {
        circlePosition.x = Number(xInput.value);
        circle.position.x = circlePosition.x;
    });

    yInput.addEventListener('input', function () {
        circlePosition.y = Number(yInput.value);
        circle.position.y = circlePosition.y;
    });

    zInput.addEventListener('input', function () {
        circlePosition.z = Number(zInput.value);
        circle.position.z = circlePosition.z;
    });
}

function animateCircle() {
    requestAnimationFrame(animateCircle);

    // Check for collisions with the edges of the screen
    var center = new THREE.Vector3(0, 0, 0);
    if (circle.position.x >= 5 || circle.position.x <= -5) {
        circle.userData.velocity.x = -circle.userData.velocity.x;
        circle.position.x = circle.position.x;
    }
    if (circle.position.y >= 5 || circle.position.y <= -5) {
        circle.userData.velocity.y = -circle.userData.velocity.y;
        circle.position.y = circle.position.y;
    }
    if (circle.position.z <= -5) {
        circle.userData.velocity.z = -circle.userData.velocity.z;
        circle.position.z = circle.position.z;
    }

    // Add a random velocity when the circle collides with the center of the screen
    if (circle.position.distanceTo(center) <= 1) {
    // Add some gravity
    circle.userData.velocity.y -= 0.01;

    // Update the circle's position
    circle.position.x += circle.userData.velocity.x;
    circle.position.y += circle.userData.velocity.y;
    circle.position.z += circle.userData.velocity.z;
    }

    circle.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.1);

    // Render the scene
    renderer.render(scene, camera);
}

function bounceCircle() {
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

    var torusGeometry = new THREE.TorusGeometry(7, 14, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    var pyramid = new THREE.Mesh(torusGeometry, lambertMaterial);
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