// logic from https://stackoverflow.com/a/6179495
export const rgb2hsb = (r:number, g: number, b: number): { hue: number; sat: number; bri: number; } => {    
    r /= 255; g /= 255; b /= 255; // Scale to unity.   
    var minVal = Math.min(r, g, b),
    maxVal = Math.max(r, g, b),
    delta = maxVal - minVal,
    HSB = {hue:0, sat:0, bri:maxVal},
    del_R, del_G, del_B;
  
    if( delta !== 0 )
    {
        HSB.sat = delta / maxVal;
        del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;
  
        if (r === maxVal) {HSB.hue = del_B - del_G;}
        else if (g === maxVal) {HSB.hue = (1 / 3) + del_R - del_B;}
        else if (b === maxVal) {HSB.hue = (2 / 3) + del_G - del_R;}
  
        if (HSB.hue < 0) {HSB.hue += 1;}
        if (HSB.hue > 1) {HSB.hue -= 1;}
    }
  
    HSB.hue *= 360;
    HSB.sat *= 100;
    HSB.bri *= 100;
  
    return HSB;
  };