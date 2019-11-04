
import * as rp from "request-promise-native";
import * as ColorThief from "color-thief";

import { discoverBridge, changeLightState } from "./hue";
import { rgb2hsb } from "./util";
import { getSpotifySongCoverImage } from "./spotify";

require('dotenv').config();

const {
  // SPOTIFY_CLIENT_ID,
  // SPOTIFY_CLIENT_SECRET,
  SPOTIFY_USER_AUTH_TOKEN,
  HUE_USERNAME,
} = process.env;

(async () => {

  try {
    // get current song from spotify 
    const url = await getSpotifySongCoverImage(
      // SPOTIFY_CLIENT_ID,
      // SPOTIFY_CLIENT_SECRET,
      SPOTIFY_USER_AUTH_TOKEN,
    );

    // download the image convert to buffer
    const image = await rp(url, { encoding: "binary" });
    const buffer = Buffer.from(image, "binary");
    
    const colorThief = new ColorThief();

    // get color palette from image 
    // const palette = colorThief.getPalette(buffer);
    // console.debug("palette", palette);

    // get dominant color and convert it to hsb
    const [r, g, b] = <number[]>colorThief.getColor(buffer);
    const { hue, sat, bri } = rgb2hsb(r, g, b);

    // connect to hue bridge, and update the light(s)
    const api = await discoverBridge(HUE_USERNAME);

    const lightState = {
      transitionTime: 1000, // milliseconds
      hue: hue || 0, // 0-360
      saturation: sat || 75, // 0-100
      brightness: bri || 75, // 0-100
    };

    await changeLightState(api, 2, lightState);
  
  } catch (err) { 
    console.error(err);
  }

})();


