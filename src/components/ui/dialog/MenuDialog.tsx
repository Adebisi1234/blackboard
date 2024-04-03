import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function MenuDialog() {
  return (
    <DialogContainer className="w-[150px] gap-4">
      <DialogItem>
        <p>File</p>
      </DialogItem>
      <DialogItem>
        <p>Edit</p>
      </DialogItem>
      <DialogItem>
        <p>View</p>
      </DialogItem>
      <DialogItem>
        <p>Export</p>
      </DialogItem>
      <DialogItem>
        <p>Upload media</p>
      </DialogItem>
      <hr />
      <DialogItem>
        <p>Github</p>
      </DialogItem>
      <DialogItem>
        <p>Twitter</p>
      </DialogItem>
      <DialogItem>
        <p>Email</p>
      </DialogItem>
    </DialogContainer>
  );
}
