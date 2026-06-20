type AuthUser = {
    id: string;
    name?: string;
    email?: string;
    avatar?: string | null;
    role?: string;
    [key: string]: unknown;
};

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (payload: { user: AuthUser; token: string }) => void;
    setUser: (user: AuthUser | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    syncUser: () => Promise<void>;
};


export type {
    AuthUser,
    AuthState,
}