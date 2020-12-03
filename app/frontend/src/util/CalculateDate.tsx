/**
 * convert ms to form "XX:XX:XX"
 * @param ms 
 * @returns time in form "XX:XX:XX"
 */
export function msToHMS(ms: any) {
  var pad = function (num: number, size: number) { return ('000' + num).slice(size * -1); };

  let seconds = ms / 1000;
  let hours = parseInt((seconds / 3600).toString()); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  let minutes = parseInt((seconds / 60).toString()); // 60 seconds in 1 minute
  seconds = seconds % 60;

  return (pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2));
}
