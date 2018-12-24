//import * as THREE from "./three";

const D = 5;
let view3d = document.getElementById("view3d");
let scene;
let camera;

let renderer;
let light;
let arr;
let material;

function init3d(n, sea)
{
    view3d = document.getElementById("view3d");
    view3d.style.width = n + 'px';
    view3d.style.height = n + 'px';

    camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
    camera.position.set( n/2, n/2, 340 );
    camera.lookAt( n/2, n/2, 0 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( n, n );
    renderer.shadowMap.enabled = true;

    view3d.appendChild( renderer.domElement );

    light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( -100, -100, 340 );
    light.castShadow = true;



    //material = new THREE.MeshBasicMaterial( { color: 0x008cf0 } );
    material = new THREE.MeshPhongMaterial( { color: 0xC7C7C7 } );


    let geometry = new THREE.BufferGeometry();

    arr = [];
    let k = 0;
    for (let r = 0; r < n-D; r+=D) {
        for (let c = 0; c < n-D; c+=D) {
            // 1
            arr.push(c);
            arr.push(r);
            arr.push(0);
            // 2
            arr.push(c+D);
            arr.push(r);
            arr.push(k);
            // 3
            arr.push(c);
            arr.push(r+D);
            arr.push(k);


            //3
            arr.push(c);
            arr.push(r+D);
            arr.push(k);
            // 2
            arr.push(c+D);
            arr.push(r);
            arr.push(k);
            // 4
            arr.push(c+D);
            arr.push(r+D);
            arr.push(0);        }
    }
    let vertices = new Float32Array(arr);

    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
}

function show3d(n, sea)
{
    let i = 2;
    let k = 10;
    for (let r_ = 0; r_ < n-D; r_+=D) {
        let r = n-D - r_;
        for (let c = 0; c < n-D; c+=D) {
            // 1
            arr[i] = sea.w[r][c].x * k;
            // 2
            arr[i+3] = sea.w[r-D][c].x * k;
            // 3
            arr[i+6] = sea.w[r][c+D].x * k;

            // 3
            arr[i+9] = sea.w[r][c+D].x * k;
            // 2
            arr[i+12] = sea.w[r-D][c].x * k;
            // 4
            arr[i+15] = sea.w[r-D][c+D].x * k;
            i += 18;
        }
    }
    let vertices = new Float32Array(arr);

    let geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals();

    // let plain = new THREE.Mesh( geometry, material );
    // //plain.rotation.x = -Math.PI/2;
    // plain.receiveShadow = true;

    let terrainMesh = new THREE.Mesh( geometry, material );
    //terrainMesh.rotation.x = -Math.PI/2;
    terrainMesh.receiveShadow = true;
    terrainMesh.castShadow = true;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );
    scene.add( terrainMesh );
    scene.add(light);
    renderer.render( scene, camera );


    // scene = new THREE.Scene();
    // scene.add( plain );
    // scene.add(light);
    // renderer.render( scene, camera );
}

