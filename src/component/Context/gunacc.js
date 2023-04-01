import Gun from "gun";

// initialize gun locally
const gun = Gun({
  peers: [
    "https://gun-manhattan.herokuapp.com/gun",
    "https://quilt-chat.herokuapp.com/gun",
  ],
  localStorage: false,
});

// const getgun = async () => {
//   let path;
//   if (typeof window !== "undefined") {
//     const gun = (await import("gun")).Gun({
//       peers: [
//         "https://gun-manhattan.herokuapp.com/gun",
//         "https://quilt-chat.herokuapp.com/gun",
//       ],
//       localStorage: false,
//     });
//     path = gun
//       .get("/orbitdb/zdpuB3Hq67P1fd2C6EBVGFH2qT3fCHYwHD1Tv5Rnjx5TW8jN3")
//       .get("global");
//   }
//   return path;
// };
export function getIndex() {
  let d = Date.now();
  let r = d / 10 ** 7; //almost 3hrs
  let index = Math.floor(r);
  return index;
}

export const path = gun
  .get("/orbitdb/zdpuB3Hq67P1fd2C6EBVGFH2qT3fCHYwHD1Tv5Rnjx5TW8jN3")
  .get("global");
