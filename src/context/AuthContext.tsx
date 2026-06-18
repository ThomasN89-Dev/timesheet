import { createContext, useContext, useReducer, type ReactNode } from "react";

type LogActionType = "LOGIN" | "LOGOUT";

interface LogAction {
  type: LogActionType;
  payload?: string;
}

interface LoggedState {
  isLogged: boolean;
  userName: string;
}

interface AuthContextType {
  state: LoggedState;
  dispatch: React.Dispatch<LogAction>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function reducer(state: LoggedState, action: LogAction): LoggedState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogged: true, userName: action.payload ?? "" };
    case "LOGOUT":
      return { ...state, isLogged: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isLogged: false,
    userName: "",
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato dentro un AuthProvider");
  }
  return context;
}
