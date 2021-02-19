import Index from './components/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {createContext, useState} from "react";

export const LoadingProcessScreenContext = createContext({});

const App = () => {

    const [loadingProcessScreen, setLoadingProcessScreen] = useState(false);

    const valueLoadingProcessScreen = {
        isLoading: loadingProcessScreen,
        show: () => setLoadingProcessScreen(true),
        hide: () => setLoadingProcessScreen(false)
    };

    return (
        <LoadingProcessScreenContext.Provider value={valueLoadingProcessScreen}>
            <Index/>
        </LoadingProcessScreenContext.Provider>
    );
};

export default App;