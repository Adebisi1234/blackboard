import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import Alerts from "./components/ui/Alerts";
describe("Testing the main Alert component", async () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test("Alerts component exist", () => {
    render(<App />);
    const alerts = screen.getByRole("alert");
    expect(alerts).toBeInTheDocument();
  });

  test("Alerts component has the correct text", () => {
    render(<App />);
    const alerts = screen.getByRole("alert");
    expect(alerts).toHaveTextContent("This project is inspired by tldraw");
  });

  test("Disclaimer can be closed", () => {
    render(<App />);
    const disclaimer = screen.getByTestId("disclaimer");
    const closeDisclaimer = screen.getByTestId("close-disclaimer");
    fireEvent.click(closeDisclaimer);
    expect(disclaimer).not.toBeVisible();
  });
  test("Doesn't show disclaimer when sharing", () => {
    render(<App />);
    const banner = screen.getByTestId("disclaimer");
    expect(banner).not.toBeInTheDocument();
  });
  test("displays 'Offline' banner when readOnly is true", () => {
    render(<Alerts />);
    const offlineBanner = screen.getByRole("banner", { name: "Offline" });
    expect(offlineBanner).toBeInTheDocument();
  });
});
