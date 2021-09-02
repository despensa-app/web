import Index from './components/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {createContext, useRef, useState} from "react";
import {confirmDialog} from 'primereact/confirmdialog';

export const LoadingProcessScreenContext = createContext({});

export const ShowMessagesContext = createContext({});

export const ConfirmDialogContext = createContext({});

export const NavbarHandleContext = createContext({});

const App = () => {

    const [loadingProcessScreen, setLoadingProcessScreen] = useState(false);

    const [navbarNavItems, setNavbarNavItems] = useState({
        middle: [],
        right: []
    });

    const toast = useRef(null);

    const valueLoadingProcessScreen = {
        isLoading: loadingProcessScreen,
        show: () => setLoadingProcessScreen(true),
        hide: () => setLoadingProcessScreen(false)
    };

    const showMessage = {
        toast: toast,
        success: ({message}) => {
            toast.current.show({severity: 'success', summary: 'Operación realizada', detail: message, life: 5000});
        },
        info: ({message}) => {
            toast.current.show({severity: 'info', summary: 'Información', detail: message, life: 5000});
        },
        warn: ({message}) => {
            toast.current.show({severity: 'warn', summary: 'Advertencia', detail: message, life: 5000});
        },
        error: ({message}) => {
            toast.current.show({severity: 'error', summary: 'Error', detail: message, life: 5000});
        }
    };

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
        <LoadingProcessScreenContext.Provider value={valueLoadingProcessScreen}>
            <ShowMessagesContext.Provider value={showMessage}>
                <ConfirmDialogContext.Provider value={actionConfirmationDialog}>
                    <NavbarHandleContext.Provider value={navbarNavItemsValue}>
                        <div className="wrapper">
                            <Index/>
                        </div>
                    </NavbarHandleContext.Provider>
                </ConfirmDialogContext.Provider>
            </ShowMessagesContext.Provider>
        </LoadingProcessScreenContext.Provider>
    );
};

export default App;