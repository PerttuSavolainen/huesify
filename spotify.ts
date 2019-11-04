// import SpotifyWebApi = require("spotify-web-api-node");
import * as rp from "request-promise-native";

export const getSpotifySongCoverImage = async (userAuthToken: string): Promise<string> => {

  const { item: { album } } = await rp("https://api.spotify.com/v1/me/player/currently-playing", {
    json: true,
    headers: {
      "Authorization": "Bearer " + userAuthToken,
    },
  })

  // get url of the smallest album cover image
  const url = (album.images || [])
    .sort((a, b) => a.width - b.width)
    .map(image => image.url)
    .find(image => image) // return the first truthy value
  ;

  if (!url) {
    throw new Error("Could not find album image for album:" + album);
  }

  return url;
};