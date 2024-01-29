type Prop = {
  id: string;
  color: string;
  pos: {
    x: number;
    y: number;
  };
  opacity: number;
};
export default function Text({ id, color, pos, opacity }: Prop) {
  return (
    <textarea
      name={`${id}`}
      id={`${id}`}
      cols={30}
      rows={10}
      className={`left-[${pos.x}px] top-[${pos.y}px] -translate-x-1/2 -translate-y-1/2 opacity-[${opacity}] bg-[${color}}] p-8`}
    ></textarea>
  );
}
