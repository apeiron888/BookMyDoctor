import { createContext, useReducer, useCallback } from 'react';

export const AuthContext = createContext();

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                user: null,
                accessToken: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'REFRESH':
            return {
                ...state,
                accessToken: action.payload.accessToken,
            };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = useCallback((user, accessToken) => {
        dispatch({ type: 'LOGIN', payload: { user, accessToken } });
    }, []);

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
    }, []);

    const refresh = useCallback((accessToken) => {
        dispatch({ type: 'REFRESH', payload: { accessToken } });
    }, []);

    const setLoading = useCallback((isLoading) => {
        dispatch({ type: 'SET_LOADING', payload: isLoading });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, refresh, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
