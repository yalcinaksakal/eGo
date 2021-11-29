import { Scene, FogExp2 } from "three";
import myCam from "./camera";
import createPlane from "./createPlaneAndBoxes";
import gtlfLoader from "./gtlfLoader";
import createLights from "./lights";
import carLoader from "./moverGLTF";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

const setScene = () => {
  let speed = 0.1;
  const flagColors = ["#FFCC00", "#D00", "#000"];
  let colorIndex = 0;
  //renderer
  const renderer = createR();
  //camera
  const camera = myCam();
  //scene
  const scene = new Scene();
  //fog
  scene.fog = new FogExp2(flagColors[colorIndex], 0.002);

  renderer.setClearColor(scene.fog.color);

  //car
  let tyres;
  const onCarLoaded = (model, t = null) => {
    scene.add(model);
    if (t) {
      tyres = t;
      scene.add(...tyres);
    }
  };
  carLoader(onCarLoaded);
  //lights
  scene.add(...Object.values(createLights()));
  //objects
  let grass;
  const onGtlfLoad = model => {
    scene.add(model);
    grass = model;
  };
  gtlfLoader(onGtlfLoad, "gltfs/grass/scene.gltf");
  //add a plane
  const [plane, soil] = createPlane();
  scene.add(plane, soil);

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
        t.rotation.z -= speed;
      });
    if (grass) {
      grass.position.x -= speed / 2;

      if (grass.position.x < -100) {
        grass.position.x = 100;
        colorIndex++;
        colorIndex %= 3;
        scene.fog.color.set(flagColors[colorIndex]);
        renderer.setClearColor(flagColors[colorIndex]);
      }
    }
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  };

  //init
  animate();
  return { domElement, onResize };
};

export default setScene;
