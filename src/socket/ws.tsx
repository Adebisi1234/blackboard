// import { useEffect, useRef } from "react";
// import { useDrawing } from "../store/Store";
// import { Drawings } from "../types/general";
// let count = Date.now();

// export default function useWebSockets(
//   init: (payload: {
//     drawing: Drawings[0];
//     page: number;
//     timestamps: number;
//     userId: string;
//     readOnly: boolean;
//   }) => void
// ) {
//   const ws = useRef<WebSocket>(null!);
//   useEffect(() => {
//     if (location.search.length > 0) {
//       ws.current = new WebSocket(`ws://192.168.43.170:8080/${location.search}`);
//       ws.current.addEventListener("open", () => {
//         // useDrawing.subscribe((state) => {
//         //   if (Date.now() - count <= 50) return;
//         //   count = Date.now();
//         //   ws.send(
//         //     JSON.stringify({
//         //       drawing: state.drawing,
//         //       timestamps: Date.now(),
//         //       page: state.page,
//         //       userId: state.userId,
//         //       readOnly: state.readOnly,
//         //     })
//         //   );
//         // });
//         ws.current.addEventListener("message", (ev) => {
//           const res = JSON.parse(ev.data);
//           console.log(res);
//           init(res);
//         });
//       });
//     }
//   }, [location.search]);

//   return ws.current;
// }
