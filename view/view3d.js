//import * as THREE from "/lib/lib";

class View3d {
    constructor(sea, d) {
        this.sea = sea;
        this.n = sea.n;
        this.d = d;

        // scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xbfd1e5 );


        // cam
        this.camera = new THREE.OrthographicCamera(-this.n/2, this.n/2, this.n/2, -this.n/2, 1, 1000 );

        // lights
        this.light = new THREE.DirectionalLight( 0xffffff, 1.1 );
        this.light.castShadow = true;
        this.scene.add(this.light);

        // geometry & attributes
        this.geometry = new THREE.BufferGeometry();
        //
        let vertices = this.initVertices();
        let positionAttr = new THREE.BufferAttribute( vertices, 3 );
        positionAttr.dytamic = true;
        this.geometry.addAttribute( 'position', positionAttr );
        //
        let normalAttr = new THREE.BufferAttribute(new Float32Array(vertices.length), 3);
        normalAttr.dytamic = true;
        this.geometry.addAttribute( 'normal', normalAttr );

        // sea
        let seaMaterial = new THREE.MeshPhongMaterial( { color: 0x00FFFF } );
        let seaMesh = new THREE.Mesh( this.geometry, seaMaterial );
        seaMesh.matrix.scale(new THREE.Vector3(1, -1, 1));
        // seaMesh.receiveShadow = true;
        // seaMesh.castShadow = true;
        this.scene.add(seaMesh);


        // renderer
        this.renderer = new THREE.WebGLRenderer({canvas: canvas3d});
        this.renderer.setSize(this.n, this.n);
        //this.renderer.shadowMap.enabled = true;
    }

    addIsle(isle) {
        let isleMaterial = new THREE.MeshPhongMaterial({color: 0x00a000});
        let mesh = null;

        if (isle.type === 'rect') {
            let geometry = new THREE.BoxGeometry(isle.w, isle.h, 4);
            mesh = new THREE.Mesh(geometry, isleMaterial);
            mesh.position.x = isle.c0 + isle.w / 2;
            mesh.position.y = this.n - isle.r0 - isle.h / 2;

        } else if (isle.type === 'line') {
            let hypot = Math.hypot(isle.r - isle.r0, isle.c - isle.c0);
            let geometry = new THREE.BoxGeometry(hypot, isle.width, 4);
            mesh = new THREE.Mesh(geometry, isleMaterial);
            mesh.position.x = (isle.c0 + isle.c) / 2;
            mesh.position.y = this.n - (isle.r0 + isle.r) / 2;
            let alpha = Math.atan2(isle.r - isle.r0, isle.c - isle.c0);
            mesh.rotation.z = -alpha;
        }

        mesh.receiveShadow = true;
        mesh.castShadow = true;
        this.scene.add(mesh);
    }

    initVertices() {
        let d = this.d;
        let side = opts.N / opts.D;
        let v = new Float32Array(side**2 * 18);
        let i = 0;
        for (let r = 0; r < this.n - d; r += d) {
            for (let c = 0; c < this.n - d; c += d) {
                // 1
                v[i + 0] = c;
                v[i + 1] = r;
                // 2
                v[i + 3] = c+d;
                v[i + 4] = r;
                // 3
                v[i + 6] = c;
                v[i + 7] = r+d;
                // 3
                v[i + 9] = c;
                v[i + 10] = r+d;
                // 2
                v[i + 12] = c+d;
                v[i + 13] = r;
                // 4
                v[i + 15] = c+d;
                v[i + 16] = r+d;

                i += 18;
            }
        }
        return new Float32Array(v);
    }

    draw() {
        let startTime = new Date();

        let amp = optz.Kvis3d;

        let half = this.n / 2 | 0;
        this.camera.position.set(half,  half + optz.cameraY, optz.cameraZ);
        this.camera.lookAt(half,  half, 0);

        this.light.position.set(optz.lightX, half, this.n );

        let v = this.geometry.getAttribute('position').array;
        let d = this.d;
        let i = 0;
        for (let r = 0; r < this.n - d; r += d) {
            for (let c = 0; c < this.n - d; c += d) {
                // 1
                v[i+2] = this.sea.w[r][c].x * amp;
                // 2
                v[i+5] = this.sea.w[r][c+d].x * amp;
                // 3
                v[i+8] = this.sea.w[r+d][c].x * amp;
                // 3
                v[i+11] = v[i+8];
                // 2
                v[i+14] = v[i+5];
                // 4
                v[i+17] = this.sea.w[r+d][c+d].x * amp;
                i += 18;
            }
        }

        let n = this.geometry.getAttribute('normal').array;
        let v1 = new THREE.Vector3();
        let v2 = new THREE.Vector3();
        let v3 = new THREE.Vector3();
        let v4 = new THREE.Vector3();
        let d1 = new THREE.Vector3();
        let d2 = new THREE.Vector3();

        // 1---2
        // | Х |
        // 3---4
        for (let i = 0; i < v.length; i+=18 ) {
            v1.set( v[i], v[i+1], v[i+2] );
            v2.set( v[i+3], v[i+4], v[i+5] );
            v3.set( v[i+6], v[i+7], v[i+8] );
            v4.set( v[i+15], v[i+16], v[i+17] );

            d1.subVectors( v2, v1 );
            d2.subVectors( v3, v1 );
            d1.cross(d2);
            d1.normalize();
            n[i  ] = d1.x;
            n[i+1] = d1.y;
            n[i+2] = d1.z;
            n[i+3] = d1.x;
            n[i+4] = d1.y;
            n[i+5] = d1.z;
            n[i+6] = d1.x;
            n[i+7] = d1.y;
            n[i+8] = d1.z;

            d1.subVectors( v3, v4 );
            d2.subVectors( v2, v4 );
            d1.cross(d2);
            d1.normalize();
            n[i+ 9] = d1.x;
            n[i+10] = d1.y;
            n[i+11] = d1.z;
            n[i+12] = d1.x;
            n[i+13] = d1.y;
            n[i+14] = d1.z;
            n[i+15] = d1.x;
            n[i+16] = d1.y;
            n[i+17] = d1.z;
        }

        this.geometry.getAttribute('normal').needsUpdate = true;
        this.geometry.getAttribute('position').needsUpdate = true;

        this.renderer.render( this.scene, this.camera );

        //// time
        console.log(`draw_3d: ${new Date().valueOf() - startTime.valueOf()}`);


    }
}
