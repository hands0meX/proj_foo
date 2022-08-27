import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from '../controls/drag';
import * as CameraUtils from '../utils/CameraUtils'

// 场景
const scene = new THREE.Scene();
//相机
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
// camera.position.set(10, 10, 10)
// camera.lookAt(0, 0, 0);

const initCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
initCamera.position.set(10, 10, 10)
initCamera.lookAt(0, 0, 0);
scene.add(initCamera)


/**
 * 创建一个cube
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0x00fff0
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);




// 渲染
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);




// 创建一个renderTarget
let _renderTexture = new THREE.WebGLRenderTarget(256, 256)
// 创建一个平面，作为映射
const planeGeo = new THREE.PlaneGeometry(256, 256)
const plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
    // color: 0xf00fff,
    map: _renderTexture.texture
}))
plane.position.x = 3
plane.position.z = 3
plane.scale.set(0.01, 0.01, 0.01)
scene.add(plane)



//辅助
const controls = new OrbitControls(initCamera, renderer.domElement);    //  相机辅助
document.body.appendChild(renderer.domElement);

const axH = new THREE.AxesHelper(10, 10)    // 坐标辅助
scene.add(axH)

// const dragControl = new DragControls([cube], camera, renderer.domElement)        //拖拽辅助
// dragControl.addEventListener( 'dragstart', function ( event ) {
// 	event.object.translateX(1)
// } );

// dragControl.addEventListener( 'dragend', function ( event ) {

// 	event.object.material.emissive.set( 0x000000 );

// } );



function testRenderTarget() {
    camera.position.copy(initCamera.position)
    const bl = new THREE.Vector3(-1, -1 , 0)
    const br = new THREE.Vector3(1, -1 , 0)
    const tl = new THREE.Vector3(-1, 1 , 0)
    CameraUtils.frameCorners(camera, bl, br, tl, false)

    _renderTexture.texture.encoding = renderer.outputEncoding
    renderer.setRenderTarget(_renderTexture)
    renderer.state.buffers.depth.setMask(true)
    if(renderer.autoClear === false) renderer.clear()

    plane.visible = false
    renderer.render(scene, camera)
    plane.visible = true
}


function animate() {
    requestAnimationFrame(animate);

    const currentRenderTarget = renderer.getRenderTarget()


    // 此处对画面进行render
    testRenderTarget()

    renderer.setRenderTarget(currentRenderTarget)
    renderer.render(scene, initCamera);
}
animate();