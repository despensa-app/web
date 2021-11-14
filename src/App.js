import Index from './pages/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {createContext, useState} from "react";
import {confirmDialog} from 'primereact/confirmdialog';
import {LoadingProcessScreenProvider} from "./context/LoadingProcessScreenContext";
import {ShowMessagesProvider} from "./context/ShowMessagesContext";

export const ConfirmDialogContext = createContext({});

export const NavbarHandleContext = createContext({});

const App = () => {

    const [navbarNavItems, setNavbarNavItems] = useState({
        middle: [],
        right: []
    });

    const actionConfirmationDialog = {
        confirmation: ({accept, reject}) => {
            confirmDialog({
                message: '¿Estás seguro de que quieres continuar?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                closable: false,
                draggable: false,
                acceptLabel: "Si",
                accept,
                reject
            });
        },
        deleted: ({accept, reject}) => {
            confirmDialog({
                message: '¿Desea eliminar este registro?',
                header: 'Confirmación de borrado',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                closable: false,
                draggable: false,
                acceptLabel: "Si",
                accept,
                reject
            });
        }
    };

    const navbarNavItemsValue = {
        items: navbarNavItems,
        setItems: setNavbarNavItems
    };

    return (
        <LoadingProcessScreenProvider>
            <ShowMessagesProvider>
                <ConfirmDialogContext.Provider value={actionConfirmationDialog}>
                    <NavbarHandleContext.Provider value={navbarNavItemsValue}>
                        <div className="wrapper">
                            <Index/>
                        </div>
                    </NavbarHandleContext.Provider>
                </ConfirmDialogContext.Provider>
            </ShowMessagesProvider>
        </LoadingProcessScreenProvider>
    );
};

export default App;