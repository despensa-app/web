import Index from './components/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {createContext, useRef, useState} from "react";

export const LoadingProcessScreenContext = createContext({});

export const ShowMessagesContext = createContext({});

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

    return (
        <LoadingProcessScreenContext.Provider value={valueLoadingProcessScreen}>
            <ShowMessagesContext.Provider value={showMessage}>
                <Index/>
            </ShowMessagesContext.Provider>
        </LoadingProcessScreenContext.Provider>
    );
};

export default App;