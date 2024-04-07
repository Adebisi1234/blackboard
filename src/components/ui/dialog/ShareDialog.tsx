import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function ShareDialog() {
  return (
    <DialogContainer className="w-fit">
      <DialogItem className="w-fit flex-col items-start p-1">
        <p className="w-max text-left">Copy link</p>
        <small className="w-max font-light">Share collaboration link</small>
      </DialogItem>
      <hr />
      <DialogItem>
        <p>Save project as Image</p>
      </DialogItem>
    </DialogContainer>
  );
}
