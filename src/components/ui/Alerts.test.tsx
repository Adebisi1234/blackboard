import {
  render,
  fireEvent,
  screen,
  renderHook,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Alerts from "./Alerts";
import { vi } from "vitest";
import { useDrawing } from "../../store/Store";

describe("Testing the main Alert component", async () => {
  test("Alerts component exist", () => {
    render(<Alerts />);
    const alerts = screen.getByRole("alert");
    expect(alerts).toBeInTheDocument();
  });

  test("Alerts component has the correct text", () => {
    render(<Alerts />);
    const alerts = screen.getByRole("alert");
    expect(alerts).toHaveTextContent("This project is inspired by tldraw");
  });

  test("Disclaimer can be closed", () => {
    render(<Alerts />);
    const disclaimer = screen.getByTestId("disclaimer");
    const closeDisclaimer = screen.getByTestId("close-disclaimer");
    fireEvent.click(closeDisclaimer);
    expect(disclaimer).not.toBeVisible();
  });
  test("Doesn't show disclaimer when sharing", () => {
    render(<Alerts />);
    const banner = screen.getByTestId("disclaimer");
    expect(banner).not.toBeInTheDocument(); //This will fail, will need to figure out how to edit the location
  });
  test("displays 'Offline' banner when readOnly is true", () => {
    const { userOffline } = renderHook(() => useDrawing()).result.current;

    act(() => userOffline(true));
    render(<Alerts />);
    const offlineBanner = screen.getByRole("banner");
    expect(offlineBanner).toBeInTheDocument();
  });
});
