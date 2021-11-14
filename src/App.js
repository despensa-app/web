import Index from './pages/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {createContext, useState} from "react";
import {LoadingProcessScreenProvider} from "./context/LoadingProcessScreenContext";
import {ShowMessagesProvider} from "./context/ShowMessagesContext";
import {ConfirmDialogProvider} from "./context/ConfirmDialogContext";

export const NavbarHandleContext = createContext({});

const App = () => {

    const [navbarNavItems, setNavbarNavItems] = useState({
        middle: [],
        right: []
    });

    const navbarNavItemsValue = {
        items: navbarNavItems,
        setItems: setNavbarNavItems
    };

    return (
        <LoadingProcessScreenProvider>
            <ShowMessagesProvider>
                <ConfirmDialogProvider>
                    <NavbarHandleContext.Provider value={navbarNavItemsValue}>
                        <div className="wrapper">
                            <Index/>
                        </div>
                    </NavbarHandleContext.Provider>
                </ConfirmDialogProvider>
            </ShowMessagesProvider>
        </LoadingProcessScreenProvider>
    );
};

export default App;