import { useEffect } from "react";
import { Drawings, ImageType } from "../types/general";
import { useDrawing, useImage } from "../store/Store";

export default function useAddImage(drawingId: { current: number }) {
  const { image } = useImage();
  const setDrawing = useDrawing((state) => state.setDrawing);
  useEffect(() => {
    if (!image) {
      return;
    }
    const newImageComp = {
      id: drawingId.current,
      prop: {
        type: "image",
        src: image.src,
        alt: "Image uploaded by user",
        width: image.width,
        height: image.height,
      },
      pos: {
        x: innerWidth / 2,
        y: Math.max(innerHeight / 2 - image.height / 2, 10),
      },
    } satisfies Drawings<"image">[0];
    setDrawing(newImageComp);
    drawingId.current++;
  }, [image]);
}
