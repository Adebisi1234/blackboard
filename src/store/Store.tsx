import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
import {
  ActiveTool,
  Drawings,
  Location,
  General,
  ImageType,
} from "../types/general";

//TODO= IMPLEMENT IMMER

interface DrawingState {
  drawing: Drawings;
  copiedComps: number[];
  deletedComps: number[];
  copyComp: (payload: number | number[]) => void;
  pasteComp: () => void;
  restoreComp: () => void;
  // copiedComp: number[];
  setDrawing: (payload: Drawings[0]) => void;
  init: (payload: Drawings) => void;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  clearPointer: (id: number) => void;
  hideComp: (id: number) => void;
  toggleHighlight: (id: number) => void;
  highlightComp: (id: number) => void;
  hoverComp: (id: number) => void;
  leaveComp: (id: number) => void;
}

interface ImageState {
  image: ImageType | undefined;
  setImage: (payload: ImageState["image"]) => void;
  clearImage: () => void;
}

interface GeneralState {
  general: General;
  setGeneral: (payload: Partial<General>) => void;
}

interface LocationState {
  location: { [key: number]: Location };
  setLocation: (payload: Location) => void;
}
interface HighlightedState {
  highlighted: number[];
  setHighlighted: (payload: number[]) => void;
}
interface ActiveToolState {
  activeTool: ActiveTool;
  setActiveTool: (payload: ActiveTool) => void;
}

interface ActiveCompState {
  activeComp: number[];
  setActiveComp: (payload: number | number[]) => void;
}

interface Canvas {
  canvasPos: {
    x: number;
    y: number;
  };
  canvasRef: HTMLDivElement | undefined;
  setRef: (ref: HTMLDivElement) => void;
  setCanvasPos: (payload: { x: number; y: number }) => void;
}

export const useActive = create<ActiveCompState>()((set) => ({
  activeComp: [],
  setActiveComp(payload) {
    set(() => ({
      activeComp: typeof payload === "number" ? [payload] : payload,
    }));
  },
}));

export const useDrawing = create<DrawingState>()(
  immer((set) => ({
    drawing: [],
    copiedComps: [],
    deletedComps: [],
    init: (payload: Drawings) =>
      set({
        drawing: [...payload],
      }),
    setDrawing: (payload: Drawings[0]) =>
      set((state: DrawingState) => {
        state.drawing.push(payload);
      }),
    updateDrawing(id, payload) {
      set((state) => {
        state.drawing[id] = payload;
      });
    },
    clearPointer(id) {
      set(({ drawing }) => {
        drawing.splice(id, 1);
      });
    },
    hideComp(id) {
      set((state) => {
        state.drawing[id].opacity = 0;
        if (state.drawing[id].prop.type !== "pointer") {
          state.deletedComps.push(id);
        }
      });
    },
    toggleHighlight(id) {
      set(({ drawing }) => {
        drawing[id].highlight = false;
      });
    },
    highlightComp(id) {
      set(({ drawing }) => {
        drawing[id].highlight = true;
      });
    },
    hoverComp(id) {
      set(({ drawing }) => {
        drawing[id].hovered = true;
      });
    },
    leaveComp(id) {
      set(({ drawing }) => {
        drawing[id].hovered = false;
      });
    },
    copyComp(payload: number | number[]) {
      set((state) => {
        state.copiedComps =
          typeof payload === "number" ? [payload] : [...payload];
      });
    },
    pasteComp() {
      set((state) => {
        const update = state.copiedComps.map((comp) => {
          const newComp = { ...state.drawing[comp] };
          newComp.id = state.drawing.length;
          newComp.copy = true;
          return newComp;
        });
        state.drawing.push(...update);
      });
    },
    restoreComp() {
      set((state) => {
        const update = state.deletedComps.pop();
        if (!update) return state;
        state.drawing[update].opacity = 1;
      });
    },
  }))
);

export const useGeneral = create<GeneralState>()((set) => ({
  general: {
    color: "#ffffff",
    opacity: 1,
    strokeWidth: 3,
    dash: 0,
    fill: 0,
    scale: 1,
    highlight: false,
    copy: false,
    font: 24,
    hovered: false,
  },
  setGeneral(payload) {
    set((state) => ({
      general: {
        ...state.general,
        ...payload,
      },
    }));
  },
}));

export const useHighlighted = create<HighlightedState>()((set) => ({
  highlighted: [],
  setHighlighted(payload: number[]) {
    set((state: HighlightedState) => {
      state.highlighted = payload;
      return state;
    });
  },
}));

export const useLocation = create<LocationState>()(
  immer((set) => ({
    location: {},
    setLocation: (payload: Location) =>
      set((state: LocationState) => {
        state.location[payload.id] = payload;
      }),
  }))
);

export const useActiveTool = create<ActiveToolState>()(
  immer((set) => ({
    activeTool: "pencil",
    setActiveTool: (payload) =>
      set({
        activeTool: payload,
      }),
  }))
);

export const useCanvas = create<Canvas>()(
  immer((set) => ({
    canvasPos: {
      x: 0,
      y: 0,
    },
    canvasRef: undefined,
    setRef(ref) {
      set({
        canvasRef: ref,
      });
    },
    setCanvasPos(payload) {
      set({
        canvasPos: payload,
      });
    },
  }))
);

export const useImage = create<ImageState>()(
  immer((set) => ({
    image: undefined,
    setImage(payload) {
      set({
        image: payload,
      });
    },
    clearImage() {
      set({
        image: undefined,
      });
    },
  }))
);
