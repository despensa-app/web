import {createContext, useState} from "react";

const NavbarItemsContext = createContext({});

export const NavbarItemsProvider = ({children}) => {
    const [navbarNavItems, setNavbarNavItems] = useState({
        middle: [],
        right: []
    });

    const navbarNavItemsValue = {
        items: navbarNavItems,
        setItems: setNavbarNavItems
    };

    return (
        <NavbarItemsContext.Provider value={navbarNavItemsValue}>
            {children}
        </NavbarItemsContext.Provider>
    );
};

export default NavbarItemsContext;