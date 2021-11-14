import {createContext, useState} from "react";

const LoadingProcessScreenContext = createContext({});

export const LoadingProcessScreenProvider = ({children}) => {
    const [loadingProcessScreen, setLoadingProcessScreen] = useState(false);

    const valueLoadingProcessScreen = {
        isLoading: loadingProcessScreen,
        show: () => setLoadingProcessScreen(true),
        hide: () => setLoadingProcessScreen(false)
    };

    return (
        <LoadingProcessScreenContext.Provider value={valueLoadingProcessScreen}>
            {children}
        </LoadingProcessScreenContext.Provider>
    );
};

export default LoadingProcessScreenContext;