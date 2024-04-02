import { useOpenDialog } from "../../store/Store";
import Button from "./Button";

export default function Share() {
  const { dialog, setDialog } = useOpenDialog();
  return (
    <>
      <Button
        className=" !size-fit bg-blue-600 px-4 py-2 rounded-lg"
        onClick={() => setDialog("share")}
      >
        <span>Share</span>
      </Button>
      <dialog open={dialog === "share"}></dialog>
    </>
  );
}
