import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  ActiveTool,
  Drawings,
  Location,
  General,
  ImageType,
} from "../types/general";
import { cloneComp } from "../utils/drawings";
import { produce } from "immer";

//TODO= IMPLEMENT IMMER

interface DrawingState {
  drawing: { [key: number]: Drawings };
  page: number;
  copiedComps: { [key: number]: number[] };
  deletedComps: { [key: number]: number[] };
  setPage: (payload: number) => void;
  deletePage: (payload: number) => void;
  getNumOfPages: () => number;
  getDrawing: (payload?: number) => Drawings;
  copyComp: (payload: number | number[]) => void;
  pasteComp: () => void;
  restoreComp: () => void;
  undo: () => void;
  setDrawing: (payload: Drawings[0]) => void;
  init: (payload: { [key: number]: Drawings }) => void;
  updateDrawing: (id: number, payload: Drawings[0]) => void;
  clearPointer: (id: number) => void;
  hideComp: (id: number) => void;
  toggleHighlight: (id: number) => void;
  highlightComp: (id: number) => void;
  hoverComp: (id: number) => void;
  leaveComp: (id: number) => void;
  clearAll: () => void;
}

interface ImageState {
  image: ImageType | undefined;
  setImage: (payload: ImageState["image"]) => void;
  clearImage: () => void;
}

interface OpenDialog {
  dialog:
    | "help"
    | "controls"
    | "panel"
    | "menu"
    | "share"
    | "pages"
    | "zoom"
    | null;
  setDialog: (
    name: "help" | "controls" | "panel" | "menu" | "share" | "pages" | "zoom"
  ) => void;
  reset: () => void;
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
  persist(
    immer((set, get) => ({
      drawing: {
        0: [],
      },
      page: 0,
      copiedComps: {
        0: [],
      },
      deletedComps: {
        0: [],
      },
      deletePage(payload) {
        set(({ drawing, page }) => {
          delete drawing[payload];
          page = 0;
        });
      },
      setPage(payload) {
        set(({ drawing }) => {
          // console.log(payload);
          return {
            page: payload,
            drawing: { ...drawing, [payload]: drawing[payload] ?? [] },
          };
        });
      },
      getNumOfPages() {
        return Object.keys(get().drawing).length;
      },
      getDrawing() {
        // console.log(get().page);
        return get().drawing[get().page];
      },
      init: (payload: { [key: number]: Drawings }) =>
        set({
          drawing: { ...payload },
        }),
      setDrawing: (payload: Drawings[0]) =>
        set((state: DrawingState) => {
          state.drawing[get().page].push(payload);
        }),
      updateDrawing(id, payload) {
        set((state) => {
          state.drawing[get().page][id] = payload;
        });
      },
      clearPointer(id) {
        set(({ drawing }) => {
          drawing[get().page].splice(id, 1);
        });
      },
      hideComp(id) {
        set((state) => {
          if (!id) return state;
          state.drawing[get().page][id].opacity = 0;
          if (state.drawing[get().page][id].prop.type !== "pointer") {
            state.deletedComps[get().page].push(id);
          }
          useLocation.setState((state) => {
            delete state.location[id];
          });
        });
      },
      undo() {
        set((state) => {
          const id = state.drawing[get().page].length - 1;
          state.drawing[get().page][id].opacity = 0;
          if (state.drawing[get().page][id].prop.type !== "pointer") {
            state.deletedComps[get().page].push(id);
          }
        });
      },
      toggleHighlight(id) {
        set(({ drawing }) => {
          drawing[get().page][id].highlight = false;
        });
      },
      highlightComp(id) {
        set(({ drawing }) => {
          drawing[get().page][id].highlight = true;
        });
      },
      hoverComp(id) {
        set(({ drawing }) => {
          drawing[get().page][id].hovered = true;
        });
      },
      leaveComp(id) {
        set(({ drawing }) => {
          drawing[get().page][id].hovered = false;
        });
      },
      copyComp(payload: number | number[]) {
        set((state) => {
          if (!payload || (typeof payload === "object" && payload.length === 0))
            return state;
          state.copiedComps[get().page] =
            typeof payload === "number" ? [payload] : [...payload];
        });
      },
      pasteComp() {
        set((state) => {
          const update = state.copiedComps[get().page].map((comp, i) => {
            const newComp = produce(
              state.drawing[get().page][comp],
              (draft) => {
                cloneComp(draft);
              }
            );
            newComp.id = state.drawing[get().page].length + i;
            newComp.copy = true;
            return newComp;
          });
          state.copiedComps[get().page] = update.map(({ id }) => id);
          state.drawing[get().page].push(...update);
        });
      },
      restoreComp() {
        set((state) => {
          const update = state.deletedComps[get().page].pop();
          if (!update) return state;
          state.drawing[get().page][update].opacity = 1;
        });
      },
      clearAll() {
        set({
          drawing: {
            0: [],
          },
          page: 0,
          copiedComps: {
            0: [],
          },
          deletedComps: {
            0: [],
          },
        });
      },
    })),
    {
      name: "blackboard:drawings",
      partialize: (state) => ({
        drawing: state.drawing,
        page: state.page,
      }),
      // onRehydrateStorage: (state) => {
      //   console.log("hydration starts");

      //   // optional
      //   return (state, error) => {
      //     if (error) {
      //       console.log("an error happened during hydration", error);
      //     } else {
      //       console.log("hydration finished");
      //     }
      //   };
      // },
    }
  )
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

export const useOpenDialog = create<OpenDialog>()((set) => ({
  dialog: null,
  setDialog(name) {
    set({
      dialog: name,
    });
  },
  reset() {
    set({
      dialog: null,
    });
  },
}));
