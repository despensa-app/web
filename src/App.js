import Index from './components/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {createContext, useRef, useState} from "react";
import { confirmDialog } from 'primereact/confirmdialog';

export const LoadingProcessScreenContext = createContext({});

export const ShowMessagesContext = createContext({});

export const ConfirmDialogContext = createContext({});

const App = () => {

    const [loadingProcessScreen, setLoadingProcessScreen] = useState(false);

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
                accept,
                reject
            });
        }
    };

    return (
        <LoadingProcessScreenContext.Provider value={valueLoadingProcessScreen}>
            <ShowMessagesContext.Provider value={showMessage}>
                <ConfirmDialogContext.Provider value={actionConfirmationDialog}>
                    <Index/>
                </ConfirmDialogContext.Provider>
            </ShowMessagesContext.Provider>
        </LoadingProcessScreenContext.Provider>
    );
};

export default App;