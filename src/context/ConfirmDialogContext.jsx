import {createContext} from "react";
import {confirmDialog} from "primereact/confirmdialog";

const ConfirmDialogContext = createContext({});

export const ConfirmDialogProvider = ({children}) => {
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

    return (
        <ConfirmDialogContext.Provider value={actionConfirmationDialog}>
            {children}
        </ConfirmDialogContext.Provider>
    );
};

export default ConfirmDialogContext;