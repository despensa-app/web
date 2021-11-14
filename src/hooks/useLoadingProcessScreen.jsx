import {useContext} from "react";
import LoadingProcessScreenContext from "../context/LoadingProcessScreenContext";

export const useIsLoadingProcessScreen = () => {
    return useContext(LoadingProcessScreenContext).isLoading;
};

export const useLoadingProcessScreen = () => {
    const context = useContext(LoadingProcessScreenContext);

    return {
        showLoadingProcessScreen: context.show,
        hideLoadingProcessScreen: context.hide
    };
};