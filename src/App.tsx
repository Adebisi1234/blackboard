import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import Canvas from "./components/Canvas";
import Alerts from "./components/ui/Alerts";
import Overlay from "./components/ui/UiOverlay";
import Button from "./components/ui/Button";
import { useDrawing } from "./store/Store";

export default function App() {
  const clearAll = useDrawing((s) => s.clearAll);
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        clearAll();
      }}
    >
      <Canvas />
      <Overlay />
      <Alerts />
    </ErrorBoundary>
  );
}

function Fallback({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div
      role="alert"
      className="absolute inset-0 flex flex-col items-center justify-center w-screen h-screen text-red-500"
    >
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button
        onClick={() => resetErrorBoundary()}
        className="w-fit bg-red-500 text-white px-2 py-1"
      >
        Reset all state, and retry
      </Button>
    </div>
  );
}
