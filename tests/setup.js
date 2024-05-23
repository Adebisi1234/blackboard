import { expect, afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import {
  useDrawing,
  useActive,
  useActiveTool,
  useCanvas,
  useGeneral,
  useHighlighted,
  useImage,
  useLocation,
  useOpenDialog,
} from "../src/store/Store";

expect.extend(matchers);
const originalStates = {
  drawing: useDrawing.getInitialState(),
  active: useActive.getInitialState(),
  activeTool: useActiveTool.getInitialState(),
  canvas: useCanvas.getInitialState(),
  general: useGeneral.getInitialState(),
  highlight: useHighlighted.getInitialState(),
  image: useImage.getInitialState(),
  location: useLocation.getInitialState(),
  dialog: useOpenDialog.getInitialState(),
};

beforeEach(() => {
  useDrawing.setState(originalStates.drawing);
  useActive.setState(originalStates.active);
  useActiveTool.setState(originalStates.activeTool);
  useCanvas.setState(originalStates.canvas);
  useGeneral.setState(originalStates.general);
  useHighlighted.setState(originalStates.highlight);
  useImage.setState(originalStates.image);
  useLocation.setState(originalStates.location);
  useOpenDialog.setState(originalStates.dialog);
});
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});
