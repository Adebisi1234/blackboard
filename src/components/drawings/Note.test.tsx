import {
  render,
  screen,
  renderHook,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { describe, test } from "vitest";
import Note from "./Note";
import { Drawings } from "../../types/general";
import {
  useActiveTool,
  useDrawing,
  useGeneral,
  useLocation,
} from "../../store/Store";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe(Note, () => {
  test("Note component properly rendered", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
    expect(screen.getByTestId(0)).toBeInTheDocument();
  });
  test("Note component overlay properly rendered", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      highlight: true,
      opacity: 1,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        id: 0,
      });
    });
    render(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
    expect(screen.getByTestId("overlay-0")).toBeInTheDocument();
  });
  test("Note textarea is rendered on doubleClick", async () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });

    const { rerender, baseElement } = render(
      <Note {...(getDrawing()[0] as Drawings<"note">[0])} />
    );
    await user.dblClick(baseElement);
    const textarea: HTMLTextAreaElement = await screen.findByTestId(
      "textarea-0"
    );
    expect(textarea).toBeInTheDocument();
  });
  test("Note textarea is editable on doubleClick", async () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });

    const { rerender, baseElement } = render(
      <Note {...(getDrawing()[0] as Drawings<"note">[0])} />
    );
    await user.dblClick(baseElement);
    const textarea: HTMLTextAreaElement = await screen.findByTestId(
      "textarea-0"
    );
    const text = "Hi there";
    for (let i = 0; i < text.length; i++) {
      await user.type(textarea, text[i]);
      rerender(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
    }

    expect(textarea.value).toBe("Hi there");
  });
  test("Note textarea is hidden on pointerleave", async () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });

    render(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
    const noteElement = screen.getByTestId(0);
    fireEvent.pointerLeave(noteElement);
    const textarea: HTMLTextAreaElement = await screen.findByTestId(
      "textarea-0"
    );
    expect(textarea).toHaveClass("hidden");
  });
  // test("Note textarea is moveable", async () => {
  //   const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
  //     .current;
  //   const { setLocation } = renderHook(() => useLocation()).result.current;
  //   const { setActiveTool } = renderHook(() => useActiveTool()).result.current;

  //   const { general } = renderHook(() => useGeneral()).result.current;
  //   const newNoteComp = {
  //     ...general,
  //     id: 0,
  //     pos: {
  //       x: 0,
  //       y: 0,
  //     },
  //     prop: {
  //       type: "note",
  //       value: "",
  //     },
  //   } satisfies Drawings<"note">[0];
  //   act(() => {
  //     setDrawing(newNoteComp);
  //     setActiveTool("hand");
  //     setLocation({
  //       x: 0,
  //       y: 0,
  //       width: 200,
  //       height: 200,
  //       id: 0,
  //     });
  //   });

  //   const { rerender } = render(
  //     <Note {...(getDrawing()[0] as Drawings<"note">[0])} />
  //   );
  //   const noteElement = screen.getByTestId(0);
  //   await user.pointer([
  //     {
  //       keys: "[TouchA>]",
  //       target: noteElement,
  //       coords: {
  //         clientX: 10,
  //         clientY: 10,
  //         x: 10,
  //         y: 10,
  //         offsetX: 10,
  //         offsetY: 10,
  //         pageX: 10,
  //         pageY: 10,
  //         screenX: 10,
  //         screenY: 10,
  //       },
  //     },
  //     {
  //       pointerName: "TouchA",
  //       target: noteElement,
  //       coords: {
  //         clientX: 20,
  //         clientY: 20,
  //         x: 20,
  //         y: 20,
  //         offsetX: 20,
  //         offsetY: 20,
  //         pageX: 20,
  //         pageY: 20,
  //         screenX: 20,
  //         screenY: 20,
  //       },
  //     },
  //     {
  //       pointerName: "TouchA",
  //       target: noteElement,
  //       coords: {
  //         clientX: 21,
  //         clientY: 21,
  //         x: 21,
  //         y: 21,
  //         offsetX: 21,
  //         offsetY: 21,
  //         pageX: 21,
  //         pageY: 21,
  //         screenX: 21,
  //         screenY: 21,
  //       },
  //     },
  //     {
  //       pointerName: "TouchA",
  //       target: noteElement,
  //       coords: {
  //         clientX: 22,
  //         clientY: 22,
  //         x: 22,
  //         y: 22,
  //         offsetX: 22,
  //         offsetY: 22,
  //         pageX: 22,
  //         pageY: 22,
  //         screenX: 22,
  //         screenY: 22,
  //       },
  //     },
  //     { keys: "[/TouchA]" },
  //   ]);
  //   rerender(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
  //   const textarea: HTMLTextAreaElement = await screen.findByTestId(
  //     "textarea-0"
  //   );
  //   console.log(getDrawing()[0]);
  //   expect(textarea).toHaveClass("hidden");
  // });
});
