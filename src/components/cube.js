import { BoxGeometry, BufferGeometry, Mesh, MeshBasicMaterial } from 'three';

function createCube() {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshBasicMaterial();
    const cube = new Mesh(geometry, material);
    return cube;
}
export { createCube };

// later you can add other things for more complex things with more modules