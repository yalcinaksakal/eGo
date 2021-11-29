import {
  AmbientLight,
  // AxesHelper,
  DirectionalLight,
  SpotLight,
  // SpotLightHelper,
} from "three";

const createLights = () => {
  //lights

  const light = new DirectionalLight("white");
  light.position.set(0, 100, 0);
  light.target.position.set(0, 0, 0);

  const spotLight = new SpotLight("white", 1, 500, Math.PI / 9);
  spotLight.position.set(50, 50, 50);

  spotLight.castShadow = true;

  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  // spotLight.shadow.camera.near = 21;
  // spotLight.shadow.camera.far = 100;
  // spotLight.shadow.camera.fov = 10;
  // const lhelper = new SpotLightHelper(spotLight, "red");
  // const pointLightHelper = new PointLightHelper(pl, 50);
  return {
    ambient: new AmbientLight("white"),
    light,
    spotLight,
    // axesHelper: new AxesHelper(50),
    // lhelper,
    // pointLightHelper,
  };
};

export default createLights;
