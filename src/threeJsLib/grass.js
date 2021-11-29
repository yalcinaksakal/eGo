import {
  DoubleSide,
  InstancedMesh,
  Object3D,
  PlaneBufferGeometry,
  ShaderMaterial,
} from "three";

import { fragmentShader, vertexShader } from "./shaders";

const getGrass = () => {
  const leavesMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      time: {
        value: 0,
      },
    },
    side: DoubleSide,
  });

  // MESH
  const instanceNumber = 30000;
  const positionHelper = new Object3D();

  const geometry = new PlaneBufferGeometry(0.1, 1, 1, 4);
  geometry.translate(0, 0.5, 0); // move grass blade geometry lowest point at 0.

  const instancedMesh = new InstancedMesh(
    geometry,
    leavesMaterial,
    instanceNumber
  );

  // Position and scale the grass blade instances randomly.
  let x, y;
  for (let i = 0; i < instanceNumber; i++) {
    x = i % 100;
    x = x > 50 ? x + 100 : -150 - x;
    y = Math.floor(i / 100) - 150 + Math.random() * 4 - 2;
    positionHelper.position.set(y, 0, x / 5);
    positionHelper.scale.setScalar(0.5 + Math.random() * 3);
    positionHelper.rotation.y = Math.random() * Math.PI;
    positionHelper.updateMatrix();
    instancedMesh.setMatrixAt(i, positionHelper.matrix);
  }

  return { grassInstancedMesh: instancedMesh, grassMaterial: leavesMaterial };
};
export default getGrass;
