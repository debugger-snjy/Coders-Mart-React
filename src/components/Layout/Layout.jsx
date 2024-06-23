import React, { useEffect, useState } from 'react'
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '../../context/themeContext'

// Layout of the website
function Layout() {

    const [themeMode, setThemeMode] = useState(localStorage.getItem('mode') ?? "light");

    // Now, The Methods like lightTheme, darkTheme that we are using have nothing in them
    // i.e, there functionalities are not defined
    // So, If we define the Functionality of that function here with the same name then, all the functionality will be used by the context method

    // Code for the Light Theme
    const lightTheme = () => {
        setThemeMode("light")
        localStorage.setItem("mode", "light")
    }

    // Code for the Dark Theme
    const darkTheme = () => {
        setThemeMode("dark")
        localStorage.setItem("mode", "dark")
    }

    // The Above 2 Function only change the themeMode variable Value, Not change them in the html or css
    // Actual Code For Changin the Theme in the HTML - CSS

    useEffect(() => {

        // Getting the HTML Tag using querySelector
        const mainHtml = document.querySelector('html');

        // Removing all the light and dark class, removing both because no class like that should be present before adding the themeMode Class
        mainHtml.classList.remove("light", "dark")

        // Now, Adding the Actual theme class that we need i.e, which is present in the themeMode
        mainHtml.classList.add(themeMode)

    },
        // We want to call this every time when the themeMode is changed, so themeMode dependency Added
        [themeMode]
    );


    return (
        <>
            <ThemeProvider value={{ darkTheme, lightTheme, themeMode }}>
                {/* Header section */}
                <Header />

                {/* Main content.  */}
                <main className='relative'>
                    <Outlet />
                </main>

                {/* Footer section */}
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default Layout
