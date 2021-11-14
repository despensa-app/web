import ShowMessagesContext from "../context/ShowMessagesContext";
import {useContext} from "react";

export const useToastMessage = () => {
    return useContext(ShowMessagesContext).toast;
}

export const useShowToastMessage = () => {
    const context = useContext(ShowMessagesContext);

    return {
        showSuccessMessage: context.success,
        showInfoMessage: context.info,
        showWarnMessage: context.warn,
        showErrorMessage: context.error
    };
}