import { createContext, useContext, useReducer } from "react";

type Themes = "dark" | "light";
type ThemeAction = "TOGGLE_THEME";

interface ThemeState {
  theme: Themes;
}
interface ThemeActionType {
  type: ThemeAction;
}
interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeActionType>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function reducer(state: ThemeState, action: ThemeActionType): ThemeState {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
    default:
      return state;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    theme: "dark",
  });

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAuth deve essere usato dentro un ThemeProvider");
  }
  return context;
}
