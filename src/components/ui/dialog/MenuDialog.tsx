import { useActiveTool, useImage } from "../../../store/Store";
import { generateImage } from "../../../utils/drawings";
import Links from "../Links";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function MenuDialog() {
  const setImage = useImage((state) => state.setImage);
  const setActiveTool = useActiveTool((state) => state.setActiveTool);
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
        <label htmlFor="image" className="cursor-pointer">
          <p>Upload media</p>
        </label>
        <input
          type="file"
          name="file"
          id="image"
          className="absolute inset-0 invisible size-full z-10 "
          tabIndex={-1}
          multiple={false}
          accept=".jpg,.png"
          onChange={(e) => {
            setActiveTool("pointer");
            if (!e.target.files || !e.target.files[0]) return;
            const file = e.target.files[0];
            generateImage(file, setImage);
          }}
        />
      </DialogItem>
      <hr />
      <Links />
    </DialogContainer>
  );
}
