var pyramid, scene, camera, renderer;

var triangleimg = document.querySelector('img[src="./img/triangle.png"]');
triangleimg.addEventListener('click', echoTriangle);

function callTriangle() {
    echoTriangle();
}

function echoTriangle() {
    limpar();

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 10000);
    camera.position.z = 50;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xFFFFFF);

    var coneGeometry = new THREE.ConeGeometry(7, 14, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2,
        wireframe: true,
    });
    var pyramid = new THREE.Mesh(coneGeometry, lambertMaterial);
    pyramid.position.x = 25;
    scene.add(pyramid);

    var pyramidPosition = new THREE.Vector3(0, 0, 0);
    var pyramidVelocity = new THREE.Vector3(0.01, 0.01, 0.05);

    function render() {
        requestAnimationFrame(render);

        pyramid.rotation.y += 0.01;

        pyramidPosition.add(pyramidVelocity);
        pyramid.position.copy(pyramidPosition);

        renderer.render(scene, camera);
    }

    render();

    var container = document.getElementById('two');
    container.appendChild(renderer.domElement);

    var wInput = document.getElementById('w-input');
    var xInput = document.getElementById('x-input');
    var yInput = document.getElementById('y-input');
    var zInput = document.getElementById('z-input');

    wInput.addEventListener('input', function () {
        pyramidVelocity.x = Number(wInput.value) * 0.01;
        pyramidVelocity.y = Number(wInput.value) * 0.01;
        var scale = Math.abs(Math.sin(Number(wInput.value)));
        pyramid.scale.set(scale, scale, scale);
        /* 
        * pyramid.scale.set(Math.abs(Math.sin(Number(wInput.value))), 
        * Math.abs(Math.sin(Number(wInput.value))), 
        * Math.abs(Math.sin(Number(wInput.value)))); 
        * */
    });

    xInput.addEventListener('input', function () {
        pyramidPosition.x = Number(xInput.value);
        pyramid.position.x = pyramidPosition.x;
    });

    yInput.addEventListener('input', function () {
        pyramidPosition.y = Number(yInput.value);
        pyramid.position.y = pyramidPosition.y;
    });

    zInput.addEventListener('input', function () {
        pyramidPosition.z = Number(zInput.value);
        pyramid.position.z = pyramidPosition.z;
    });
}

function bounceTriangle() {
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

    var coneGeometry = new THREE.ConeGeometry(7, 14, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xEAEFF2
    });
    pyramid = new THREE.Mesh(coneGeometry, lambertMaterial);
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