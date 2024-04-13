import { useEffect } from "react";
import { Drawings } from "../types/general";
import { useDrawing, useGeneral, useImage } from "../store/Store";
import useWindowSize from "./useWindowSize";

export default function useAddImage(drawingId: { current: number }) {
  const { image, clearImage } = useImage();
  const setDrawing = useDrawing((state) => state.setDrawing);
  const general = useGeneral((state) => state.general);
  const windowHeight = useWindowSize()[1];
  useEffect(() => {
    if (!image) {
      return;
    }
    // Don't ask me how I did it, I just did it, it was hard :)
    const newImageComp = {
      id: drawingId.current,
      ...general,
      prop: {
        type: "image",
        src: image.src,
        alt: "Image uploaded by user",
        width: Math.min(
          (image.width / image.height) *
            Math.min(image.height, windowHeight - 400),
          innerWidth
        ),
        height: Math.min(
          Math.min(image.height, windowHeight - 400),
          innerWidth
        ),
        x:
          innerWidth / 2 -
          Math.min(
            (image.width / image.height) *
              Math.min(image.height, windowHeight - 400),
            innerWidth
          ) /
            2,
        y:
          windowHeight / 2 -
          Math.min(Math.min(image.height, windowHeight - 400), innerWidth) / 2,
      },
      pos: {
        x:
          innerWidth / 2 -
          Math.min(
            (image.width / image.height) *
              Math.min(image.height, windowHeight - 400),
            innerWidth
          ) /
            2,
        y:
          windowHeight / 2 -
          Math.min(Math.min(image.height, windowHeight - 400), innerWidth) / 2,
      },
    } satisfies Drawings<"image">[0];
    setDrawing(newImageComp);
    drawingId.current++;
    clearImage();
  }, [image]);
}
