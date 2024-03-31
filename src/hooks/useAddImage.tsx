import { useEffect } from "react";
import { Drawings, ImageType } from "../types/general";
import { useDrawing, useGeneral, useImage } from "../store/Store";

export default function useAddImage(drawingId: { current: number }) {
  const { image, clearImage } = useImage();
  const setDrawing = useDrawing((state) => state.setDrawing);
  const general = useGeneral((state) => state.general);
  useEffect(() => {
    if (!image) {
      return;
    }
    const newImageComp = {
      id: drawingId.current,
      ...general,
      prop: {
        type: "image",
        src: image.src,
        alt: "Image uploaded by user",
        width:
          (image.width / image.height) *
          Math.min(image.height, innerHeight - 400),
        height: Math.min(image.height, innerHeight - 400),
        x:
          innerWidth / 2 -
          ((image.width / image.height) *
            Math.min(image.height, innerHeight - 400)) /
            2,
        y: innerHeight / 2 - Math.min(image.height, innerHeight - 400) / 2,
      },
      pos: {
        x:
          innerWidth / 2 -
          ((image.width / image.height) *
            Math.min(image.height, innerHeight - 400)) /
            2,
        y: innerHeight / 2 - Math.min(image.height, innerHeight - 400) / 2,
        width:
          (image.width / image.height) *
          Math.min(image.height, innerHeight - 400),
        height: Math.min(image.height, innerHeight - 400),
      },
    } satisfies Drawings<"image">[0];
    setDrawing(newImageComp);
    drawingId.current++;
    clearImage();
  }, [image]);
}
