import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Color, Group } from "three";

const carLoader = onLoad => {
  const addModel = gltf => {
    const model = gltf.scene;
    const tyres = [];
    const dist = 0.3;
    const positions = [
      [-dist, dist, 0],
      [-dist, -dist, 0],
      [dist, -dist, 0],
      [dist, dist, 0],
    ];

    model.traverse(m => {
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
        if (m.name === "body") m.material.color = new Color("#7e481c");
        // if (m.name === "logo") m.material.color = new Color("#0096FF");

        if (+m.name < 17) {
          m.position.set(...positions[(+m.name - 1) % 4]);
          tyres.push(m);
        }
      }
    });

    const tyreGroups = [new Group(), new Group(), new Group(), new Group()];
    tyres.forEach(t => tyreGroups[Math.floor((+t.name - 1) / 4)].add(t));

    tyreGroups.forEach((t, i) => t.position.set(i * 6, i * 5 + 5, 0));
    onLoad(model, tyreGroups);
  };

  new GLTFLoader().load("gltfs/mover.gltf", gltf => addModel(gltf));
};
export default carLoader;
