import { MeshStandardMaterial, Mesh, BoxBufferGeometry } from "three";

//Plane
const createPlane = () => {
  const size = Math.max(window.innerHeight, window.innerWidth) * 0.5;
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
  const soil = new Mesh(
    new BoxBufferGeometry(size, 130, 2),
    new MeshStandardMaterial({ color: "#9b7653" })
  );
  soil.rotation.x = -Math.PI / 2;
  soil.position.set(0, -1.6, 0);
  soil.receiveShadow = true;
  return [plane, soil];
};

export default createPlane;
