type Prop = {
  src: string;
  alt: string;
  pos: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  opacity: number;
};
export default function Image({ src, alt, pos, width, height, opacity }: Prop) {
  return (
    <div
      className={`left-[${pos.x}px] top-[${pos.y}px] -translate-x-1/2 -translate-y-1/2 opacity-[${opacity}]`}
    >
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
