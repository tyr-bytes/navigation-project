import { PerspectiveCamera } from "three";
function createCamera(){
    const camera = new PerspectiveCamera(
        35, // fov
        1, //aspect ratio (dummy)
        0.1, // near clipping plane
        100, // far clipping
    );
    camera.position.set(0, 0, 10);
    return camera;
}

export { createCamera };