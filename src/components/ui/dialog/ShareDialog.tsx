import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function ShareDialog() {
  return (
    <DialogContainer className="w-fit">
      <DialogItem className="w-fit">
        <p className="w-max">Copy link</p>
      </DialogItem>
    </DialogContainer>
  );
}
