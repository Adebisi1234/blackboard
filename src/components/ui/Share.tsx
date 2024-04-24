import { useOpenDialog } from "../../store/Store";
import Button from "./Button";
import ShareDialog from "./dialog/ShareDialog";

export default function Share() {
  const { dialog, setDialog, reset } = useOpenDialog();

  return (
    <div className="relative" data-testid="share">
      <Button
        className=" !size-fit bg-blue-600 px-4 py-2 rounded-lg"
        onClick={() => (dialog !== "share" ? setDialog("share") : reset())}
      >
        <span>Share</span>
      </Button>
      <dialog
        open={dialog === "share"}
        className="top-full z-10 mr-0"
        data-testid="share-dialog"
      >
        <ShareDialog />
      </dialog>
    </div>
  );
}
