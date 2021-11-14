import {createContext, useState} from "react";

const NavbarHandleContext = createContext({});

export const NavbarHandleProvider = ({children}) => {
    const [navbarNavItems, setNavbarNavItems] = useState({
        middle: [],
        right: []
    });

    const navbarNavItemsValue = {
        items: navbarNavItems,
        setItems: setNavbarNavItems
    };

    return (
        <NavbarHandleContext.Provider value={navbarNavItemsValue}>
            {children}
        </NavbarHandleContext.Provider>
    );
};

export default NavbarHandleContext;