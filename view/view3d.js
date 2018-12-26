//import * as THREE from "/lib/lib";

class View3d {
    constructor(sea) {
        this.sea = sea;
        this.n = sea.n;

        this.camera = new THREE.  PerspectiveCamera( 75, 1, 0.1, 1000 );
        this.camera.position.set( this.n/2, this.n/2, 325 );
        this.camera.lookAt( this.n/2, this.n/2, 0 );

        this.renderer = new THREE.WebGLRenderer({canvas: canvas3d});
        this.renderer.setSize(this.n, this.n);
        this.renderer.shadowMap.enabled = true;

        let light = new THREE.DirectionalLight( 0x00ffff, 1.1 );
        light.position.set( -this.n/2, 0, 200 );
        light.castShadow = true;
        this.initVertices();

        this.geometry = new THREE.BufferGeometry();
        this.geometry.addAttribute( 'position', new THREE.BufferAttribute( this.vertices, 3 ) );

        let material = new THREE.MeshPhongMaterial( { color: 0xffFFFF } );
        this.ocean = new THREE.Mesh( this.geometry, material );
        //this.ocean.rotation.x = -Math.PI/8;
        this.ocean.receiveShadow = true;
        this.ocean.castShadow = true;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xbfd1e5 );
        this.scene.add(light);
        this.scene.add( this.ocean );
    }


    initVertices() {
        let a = [];
        for (let r = 0; r < this.n - D; r += D ) {
            for (let c = 0; c < this.n - D; c += D ) {
                // 1
                a.push(c);
                a.push(r);
                a.push(0);
                // 2
                a.push(c+D);
                a.push(r);
                a.push(0);
                // 3
                a.push(c);
                a.push(r+D);
                a.push(0);

                //3
                a.push(c);
                a.push(r+D);
                a.push(0);
                // 2
                a.push(c+D);
                a.push(r);
                a.push(0);
                // 4
                a.push(c+D);
                a.push(r+D);
                a.push(0);        }
        }
        this.vertices = new Float32Array(a);
    }


    draw()
    {
        let i = 2;
        let k = Kvis3d;
        for (let r_ = 0; r_ < this.n - D; r_ += D) {
            let r = this.n - D - r_;
            for (let c = 0; c < this.n - D; c += D) {
                // 1
                let v = this.vertices;
                v[i] = this.sea.w[r][c].x * k;
                // 2
                v[i+3] = this.sea.w[r-D][c].x * k;
                // 3
                v[i+6] = this.sea.w[r][c + D].x * k;
                // 3
                v[i+9] = this.sea.w[r][c + D].x * k;
                // 2
                v[i+12] = this.sea.w[r-D][c].x * k;
                // 4
                v[i+15] = this.sea.w[r-D][c + D].x * k;
                i += 18;
            }
        }
        this.geometry.computeVertexNormals();
        this.renderer.render( this.scene, this.camera );
    }
}
