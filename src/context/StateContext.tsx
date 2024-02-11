import { createContext, useContext, useReducer } from "react";
import { Location } from "../types/general";

const LocationContext = createContext<Location[]>([]);

const LocationDispatchContext = createContext<
  React.Dispatch<{
    id: number;
    loc: Location;
  }>
>(null!);

export function LocationProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [Location, dispatch] = useReducer(locationReducer, []);
  console.log(Location);

  return (
    <LocationContext.Provider value={Location}>
      <LocationDispatchContext.Provider value={dispatch}>
        {children}
      </LocationDispatchContext.Provider>
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}

export function useLocationDispatch() {
  return useContext(LocationDispatchContext);
}

export function locationReducer(
  location: Location[],
  action: { id: number; loc: Location }
) {
  const temp = [...location];
  if (!temp[action.id]) {
    temp[action.id] = action.loc;
    return temp;
  }
  if (compareLocations(temp[action.id], action.loc)) {
    return temp;
  }
  temp[action.id] = action.loc;
  return temp;
}

function compareLocations(obj1: Location, obj2: Location) {
  return (
    obj1.height === obj2.height &&
    obj1.width === obj2.width &&
    obj1.x === obj2.x &&
    obj1.y === obj2.y
  );
}
