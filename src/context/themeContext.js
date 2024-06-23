// Production Based Syntax and Code Convention Followed Here

// This is Another Syntax for Defining the Context & Provider
import { createContext, useContext } from "react";

// In this, we are initializing the Context with few Values that we need in the Context
export const ThemeContext = createContext(
    // Setting the Defaut Object witht the Values that we need
    {
        themeMode: "light",
        darkTheme: () => { },
        lightTheme: () => { }
    }
)

// Creating the Provider Here Only and Exporting it
// This will help to reduce the file and make it simpler
export const ThemeProvider = ThemeContext.Provider;

// Now, Generally when we create the Context, we also create the custom Hook for that Context to use it easily
// Because If we don't create the Hook, then we have to import the Context and useContext everywhere
// But by using the hook, we don't need to do that

// Custom Theme Hook
export default function useTheme() {
    return useContext(ThemeContext)
}