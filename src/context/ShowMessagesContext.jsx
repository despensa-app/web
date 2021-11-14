import {createContext, useRef} from "react";

const ShowMessagesContext = createContext({});

export const ShowMessagesProvider = ({children}) => {
    const toast = useRef(null);

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
        <ShowMessagesContext.Provider value={showMessage}>
            {children}
        </ShowMessagesContext.Provider>
    );
};

export default ShowMessagesContext;