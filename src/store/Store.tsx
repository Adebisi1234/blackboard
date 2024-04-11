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
  ws: WebSocket | null;
  drawing: { [key: number]: Drawings };
  page: number;
  readOnly: boolean;
  userId: string;
  isSharing: boolean;
  timestamps: number;
  copiedComps: { [key: number]: number[] };
  deletedComps: { [key: number]: number[] };
  setPage: (payload: number) => void;
  deletePage: (payload: number) => void;
  getPages: () => number[];
  getDrawing: (payload?: number) => Drawings;
  copyComp: (payload: number | number[], cut?: "cut") => void;
  pasteComp: () => void;
  restoreComp: () => void;
  undo: () => void;
  setDrawing: (payload: Drawings[0]) => void;
  init: (payload: {
    drawing: Drawings[0];
    page: number;
    timestamps: number;
    userId: string;
    readOnly: boolean;
    clear?: true;
  }) => void;
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

// This has gotten reallllyyy messy
export const useDrawing = create<DrawingState>()(
  persist(
    immer((set, get) => ({
      ws:
        location.search.length > 0
          ? new WebSocket(`ws://localhost:8080/${location.search}`)
          : null,
      drawing: {
        1: [],
      },
      page: 1,
      copiedComps: {
        1: [],
      },
      deletedComps: {
        1: [],
      },
      readOnly: false,
      userId: crypto.randomUUID(),
      isSharing: false,
      timestamps: Date.now(),
      deletePage(payload) {
        if (get().readOnly) return;
        set((state) => {
          if (get().getPages().length > 1) {
            //Double guard
            delete state.drawing[payload];
            state.page = +Object.keys(state.drawing)[0];
            state.timestamps = Date.now();
          }
        });
      },
      setPage(payload) {
        if (get().readOnly) return;
        set(({ drawing }) => {
          return {
            drawing: { ...drawing, [payload]: drawing[payload] ?? [] },
            page: payload,
            timestamps: Date.now(),
          };
        });
      },
      getPages() {
        return Object.keys(get().drawing).map((id) => Number(id));
      },
      getDrawing() {
        return get().drawing[get().page] ?? []; //Incase deletePage fails which I pray it doesn't
      },
      init: ({ drawing, page, timestamps, userId, clear = false }) =>
        set((state) => {
          if (clear) {
            useLocation.setState((state) => {
              state.location = {};
            });
            useCanvas.setState((state) => {
              state.canvasPos = {
                x: 0,
                y: 0,
              };
            });
            return {
              drawing: {
                1: [],
              },
              page: 1,
              copiedComps: {
                1: [],
              },
              deletedComps: {
                1: [],
              },
              timestamps: Date.now(),
            };
          }
          if (userId !== get().userId) {
            if (!state.drawing[page]) {
              //If the page doesn't exist on this client
              state.drawing[page] = [drawing];
            } else {
              const prev = state.drawing[page][drawing.id];
              if (prev) {
                if (prev.userId === userId) {
                  // If it's the same user then he can edit the comp
                  state.drawing[page][drawing.id] = { ...prev, ...drawing };
                } else {
                  state.drawing[page][state.drawing[page].length - 1] = drawing; //Since there's an comp in the index already add to the end
                }
              } else {
                state.drawing[page][drawing.id] = drawing;
              }
            }
            // state.drawing[page]
            // if (get().timestamps < payload.timestamps) {
            //   console.log("wtf");
            //   return payload;
            // } else {
            //   // Check for differences and update them
            //   console.log(get().timestamps, payload.timestamps);
            //   console.log("skipped");
            // }
          }
        }),
      setDrawing: (payload: Drawings[0]) =>
        set((state: DrawingState) => {
          if (state.drawing[get().page]) {
            state.drawing[get().page].push(payload);
          } else {
            state.drawing[get().page] = [payload];
          }
          state.timestamps = Date.now();
          if (state.ws?.OPEN && payload.prop.type !== "pointer") {
            state.ws.send(
              JSON.stringify({
                drawing: payload,
                page: state.page,
                timestamps: Date.now(),
                userId: state.userId,
                readOnly: state.readOnly,
              })
            );
          }
        }),
      updateDrawing(id, payload) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page][id] = payload;
          if (state.ws?.OPEN && payload.prop.type !== "pointer") {
            state.ws.send(
              JSON.stringify({
                drawing: payload,
                page: state.page,
                timestamps: Date.now(),
                userId: state.userId,
                readOnly: state.readOnly,
              })
            );
          }
        });
      },
      clearPointer(id) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page].splice(id, 1);
          state.timestamps = Date.now();
        });
      },
      hideComp(id) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page][id].opacity = 0;
          if (state.drawing[get().page][id].prop.type !== "pointer") {
            state.deletedComps[get().page].push(id);
          }
          useLocation.setState((state) => {
            delete state.location[id];
          });
          state.timestamps = Date.now();
          if (
            state.ws?.OPEN &&
            state.drawing[get().page][id].prop.type !== "pointer"
          ) {
            state.ws.send(
              JSON.stringify({
                drawing: state.drawing[get().page][id],
                page: state.page,
                timestamps: Date.now(),
                userId: state.userId,
                readOnly: state.readOnly,
              })
            );
          }
        });
      },
      undo() {
        if (get().readOnly) return;
        set((state) => {
          const id = state.drawing[get().page].length - 1;
          if (id < 0) return state;
          state.drawing[get().page][id].opacity = 0;
          if (state.drawing[get().page][id]?.prop.type !== "pointer") {
            state.deletedComps[get().page].push(id);
          }
          state.timestamps = Date.now();
          if (
            state.ws?.OPEN &&
            state.drawing[get().page][id].prop.type !== "pointer"
          ) {
            state.ws.send(
              JSON.stringify({
                drawing: state.drawing[get().page][id],
                page: state.page,
                timestamps: Date.now(),
                userId: state.userId,
                readOnly: state.readOnly,
              })
            );
          }
        });
      },
      toggleHighlight(id) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page][id].highlight = false;
          state.timestamps = Date.now();
        });
      },
      highlightComp(id) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page][id].highlight = true;
          state.timestamps = Date.now();
        });
      },
      hoverComp(id) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page][id].hovered = true;
          state.timestamps = Date.now();
        });
      },
      leaveComp(id) {
        if (get().readOnly) return;
        set((state) => {
          if (typeof id !== "number" || !state.drawing[get().page][id])
            return state;
          state.drawing[get().page][id].hovered = false;
          state.timestamps = Date.now();
        });
      },
      copyComp(payload: number | number[], cut) {
        if (get().readOnly) return;
        set((state) => {
          if (
            (typeof payload === "object" && payload.length === 0) ||
            (!payload && payload !== 0)
          )
            return state;
          state.copiedComps[get().page] =
            typeof payload === "number" ? [payload] : [...payload];
          if (cut) {
            if (typeof payload === "number") {
              state.drawing[get().page][payload].opacity = 0;
            } else {
              payload.forEach((id) => {
                state.drawing[get().page][id].opacity = 0;
              });
            }
          }
          state.timestamps = Date.now();
        });
      },
      pasteComp() {
        if (get().readOnly) return;
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
            newComp.opacity = 1;
            return newComp;
          });
          state.copiedComps[get().page] = update.map(({ id }) => id);
          state.drawing[get().page].push(...update);
          state.timestamps = Date.now();
          update.forEach((payload) => {
            if (state.ws?.OPEN && payload.prop.type !== "pointer") {
              state.ws.send(
                JSON.stringify({
                  drawing: payload,
                  page: state.page,
                  timestamps: Date.now(),
                  userId: state.userId,
                  readOnly: state.readOnly,
                })
              );
            }
          });
        });
      },
      restoreComp() {
        if (get().readOnly) return;
        set((state) => {
          const update = state.deletedComps[get().page].pop();
          if (!update) return state;
          state.drawing[get().page][update].opacity = 1;
          state.timestamps = Date.now();
          if (
            state.ws?.OPEN &&
            state.drawing[get().page][update].prop.type !== "pointer"
          ) {
            state.ws.send(
              JSON.stringify({
                drawing: state.drawing[get().page][update],
                page: state.page,
                timestamps: Date.now(),
                userId: state.userId,
                readOnly: state.readOnly,
              })
            );
          }
        });
      },
      clearAll() {
        if (get().readOnly) {
          return;
        }
        useLocation.setState((state) => {
          state.location = {};
        });
        useCanvas.setState((state) => {
          state.canvasPos = {
            x: 0,
            y: 0,
          };
        });
        set({
          drawing: {
            1: [],
          },
          page: 1,
          copiedComps: {
            1: [],
          },
          deletedComps: {
            1: [],
          },
          timestamps: Date.now(),
        });
      },
    })),
    {
      name: "blackboard:drawings",
      partialize: (state) =>
        !state.readOnly
          ? {
              drawing: state.drawing,
              page: state.page,
            }
          : "",
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
    userId: useDrawing.getState().userId,
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
  persist(
    immer((set) => ({
      location: {},
      setLocation: (payload: Location) =>
        set((state: LocationState) => {
          state.location[payload.id] = payload;
        }),
    })),
    {
      name: "blackboard:location",
    }
  )
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
