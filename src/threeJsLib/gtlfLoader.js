import { InstancedMesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gtlfLoader = (onLoad, url) => {
  const addModel = gltf => {
    const model = gltf.scene;
    let grass;
    model.traverse(m => {
      if (m.name === "Object_4") {
        // m.castShadow = true;
        // m.receiveShadow = true;
        // m.scale.set(50, 50, 50);
        // m.position.set(0, -0.4, 26);
        grass = m;
      }
    });

    const grasses = new InstancedMesh(
      grass.geometry.clone(),
      grass.material.clone(),
      // ["seat"].includes(part.name)
      //   ? new MeshBasicMaterial({ color: "blue" })
      //   : part.material.clone(),
      40
    );
    let positionHelper, x, y;
    for (let i = 0; i < 40; i++) {
      positionHelper = new Object3D();
      positionHelper.scale.set(50, 50, 50);
      x = i % 2 ? 40 : -55;
      y = Math.floor(i / 2) - 10;
      positionHelper.position.set(y * 25 + Math.random() * 10 - 5, 0, x);
      positionHelper.rotateY(Math.PI / 2);
      positionHelper.updateMatrix();
      grasses.setMatrixAt(i, positionHelper.matrix);
    }
    grasses.instanceMatrix.needsUpdate = true;
    onLoad(grasses);
  };

  new GLTFLoader().load(url, gltf => addModel(gltf));
};
export default gtlfLoader;
