import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function ExportPopup() {
  return (
    <DialogContainer className="w-fit">
      <DialogItem>
        <p>PNG</p>
      </DialogItem>
      <DialogItem>
        <p>JPG</p>
      </DialogItem>
      <DialogItem>
        <p>SVG</p>
      </DialogItem>
      <hr />
      <DialogItem className="gap-2">
        <div className="checkBox size-4 border bg-transparent"></div>
        <p className="w-max">Transparent</p>
      </DialogItem>
    </DialogContainer>
  );
}
