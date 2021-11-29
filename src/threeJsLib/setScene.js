import { Scene, FogExp2 } from "three";
import myCam from "./camera";
import createPlane from "./createPlaneAndBoxes";
import createLights from "./lights";
import carLoader from "./moverGLTF";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

const setScene = () => {
  const flagColors = ["#FFCC00", "#D00", "#000"];

  //renderer
  const renderer = createR();
  //camera
  const camera = myCam();
  //scene
  const scene = new Scene();
  //fog
  scene.fog = new FogExp2(flagColors[1], 0.002);
  renderer.setClearColor(scene.fog.color);

  //car
  let tyres;
  const onGLtfLoaded = (model, t = null) => {
    scene.add(model);
    if (t) {
      tyres = t;
      scene.add(...tyres);
    }
  };
  carLoader(onGLtfLoaded);
  //lights
  scene.add(...Object.values(createLights()));

  //add a plane
  const plane = createPlane();
  scene.add(plane);

  const { domElement } = renderer;

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //animate

  const animate = () => {
    if (tyres)
      tyres.forEach(t => {
        t.rotation.z -= 0.5;
      });
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  };

  //init
  animate();
  return { domElement, onResize };
};

export default setScene;
