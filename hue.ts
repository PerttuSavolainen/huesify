const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

export async function discoverBridge(userName) {
  return v3.discovery.nupnpSearch()
    .then(searchResults => {
      const host = searchResults[0].ipaddress;
      return v3.api.createLocal(host).connect(userName);
    })
  ;
}
  
export async function changeLightState(api, lightId: number, settings): Promise<void> {
  const {
    transitionTime = 100, // milliseconds
    hue = 0, // 0-360
    saturation = 75, // 0-100
    brightness = 75, // 0-100
  } = settings;

  console.log(`setting light transition time: ${transitionTime}, h: ${hue} s: ${saturation} b: ${brightness})`);

  const state = new LightState()
    .on()
    .transition(transitionTime)
    .hsb(hue, saturation, brightness)
  ;

  await api.lights.setLightState(lightId, state);
}
