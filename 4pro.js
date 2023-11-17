        import * as THREE from 'three';
        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
        import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75, // 視野角
            window.innerWidth / window.innerHeight, // アスペクト比
            0.1, // ニアクリップ面
            1000 // ファークリップ面
        );
        camera.position.z = 5; // カメラの位置を設定する

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.zoomSpeed = 0.5;
        controls.update(); // 初期化時に一度だけ呼び出す

        // AmbientLightを追加する
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const loader = new GLTFLoader();
        
        const dracoLoader = new DRACOLoader(); // DRACOLoaderのインスタンスを作成
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
        loader.setDRACOLoader(dracoLoader); // GLTFLoaderにDRACOLoaderのインスタンスを提供

        loader.load(
            "path/to/ワンピース.gltf",
            function (gltf) {
                scene.add(gltf.scene);
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
