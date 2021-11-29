import { MeshStandardMaterial, Mesh, BoxBufferGeometry } from "three";

//Plane
const createPlane = () => {
  const size = Math.max(window.innerHeight, window.innerWidth) * 1.5;
  const plane = new Mesh(
    new BoxBufferGeometry(size, 60, 1),
    new MeshStandardMaterial({
      color: "#151d26",
    })
  );

  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, -0.5, 0);
  return plane;
};

export default createPlane;
