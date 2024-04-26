import { act, render, renderHook, screen } from "@testing-library/react";
import ExportPopup from "./ExportPopup";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useCanvas } from "../../../store/Store";
const user = userEvent.setup();
describe(ExportPopup, () => {
  test("renders the component with correctly", async () => {
    const { setRef } = renderHook(() => useCanvas()).result.current;
    const toPng = vi.hoisted(() => vi.fn());
    const toJpeg = vi.hoisted(() => vi.fn());
    const toSvg = vi.hoisted(() => vi.fn());
    vi.mock("html-to-image", () => {
      return { toJpeg, toPng, toSvg };
    });
    const container = render(<ExportPopup />).baseElement as HTMLDivElement;
    const pngElement = screen.getByText("PNG");
    const svgElement = screen.getByText("SVG");
    const jpgElement = screen.getByText("JPG");
    expect(pngElement).toBeInTheDocument();
    expect(svgElement).toBeInTheDocument();
    expect(jpgElement).toBeInTheDocument();
    act(() => {
      setRef(container);
    });

    await user.click(pngElement);
    expect(toPng).toHaveBeenCalled();
    await user.click(svgElement);
    expect(toSvg).toHaveBeenCalled();
    await user.click(jpgElement);
    expect(toJpeg).toHaveBeenCalled();
  });
});
