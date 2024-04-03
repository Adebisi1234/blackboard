import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function PageDialog() {
  return (
    <DialogContainer>
      <DialogItem>
        <p>Pages</p>
        <span className="text-xl">+</span>
      </DialogItem>
      <hr />
      <DialogItem>
        <div className="flex gap-3 ml-1">
          <p>•</p>
          <p>Page 1</p>
        </div>
      </DialogItem>
      <DialogItem>
        <div className="flex gap-3 ml-1">
          <p></p>
          <p>Page 2</p>
        </div>

        <p>X</p>
      </DialogItem>
    </DialogContainer>
  );
}
