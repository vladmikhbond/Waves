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

        // geometry
        this.geometry = new THREE.BufferGeometry();
        let attr = new THREE.BufferAttribute( this.initVertices(), 3 );
        attr.dytamic = true;
        this.geometry.addAttribute( 'position', attr );

        // see
        let seaMaterial = new THREE.MeshPhongMaterial( { color: 0x00FFFF } );
        let seaMesh = new THREE.Mesh( this.geometry, seaMaterial );
        seaMesh.receiveShadow = true;
        seaMesh.castShadow = true;
        this.scene.add(seaMesh);

        // renderer
        this.renderer = new THREE.WebGLRenderer({canvas: canvas3d});
        this.renderer.setSize(this.n, this.n);
        this.renderer.shadowMap.enabled = true;
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
        let v = [];
        for (let r = 0; r < this.n - d; r += d ) {
            for (let c = 0; c < this.n - d; c += d ) {
                // 1
                v.push(c);
                v.push(r);
                v.push(0);
                // 2
                v.push(c+d);
                v.push(r);
                v.push(0);
                // 3
                v.push(c);
                v.push(r+d);
                v.push(0);

                //3
                v.push(c);
                v.push(r+d);
                v.push(0);
                // 2
                v.push(c+d);
                v.push(r);
                v.push(0);
                // 4
                v.push(c+d);
                v.push(r+d);
                v.push(0);        }
        }
        return new Float32Array(v);
    }

    draw() {
        let amp = optz.Kvis3d;

        let half = this.n / 2 | 0;
        this.camera.position.set(half,  half + optz.cameraY, optz.cameraZ);
        this.camera.lookAt(half,  half, 0);

        this.light.position.set(optz.lightX, half, this.n );

        let v = this.geometry.getAttribute('position').array;
        let d = this.d;
        let i = 0;
        for (let r_ = 0; r_ < this.n - d; r_ += d) {
            let r = this.n - d - r_;
            for (let c = 0; c < this.n - d; c += d) {
                // 1
                // v[i] = c;
                // v[i+1] = r_;
                v[i+2] = this.sea.w[r][c].x * amp;
                // 2
                // v[i+3] = c+d;
                // v[i+4] = r_;
                v[i+5] = this.sea.w[r-d][c].x * amp;
                // 3
                // v[i+6] = c;
                // v[i+7] = r_+d;
                v[i+8] = this.sea.w[r][c + d].x * amp;
                // 3
                // v[i+9] = c;
                // v[i+10] = r_+d;
                v[i+11] = this.sea.w[r][c + d].x * amp;
                // 2
                // v[i+12] = c+d;
                // v[i+13] = r_;
                v[i+14] = this.sea.w[r-d][c].x * amp;
                // 4
                // v[i+15] = c+d;
                // v[i+16] = r_+d;
                v[i+17] = this.sea.w[r-d][c + d].x * amp;
                i += 18;
            }
        }
        this.geometry.getAttribute('position').needsUpdate = true;
        this.geometry.computeVertexNormals();
        this.renderer.render( this.scene, this.camera );
    }
}
