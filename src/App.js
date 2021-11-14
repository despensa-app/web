import Index from './pages/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {LoadingProcessScreenProvider} from "./context/LoadingProcessScreenContext";
import {ShowMessagesProvider} from "./context/ShowMessagesContext";
import {ConfirmDialogProvider} from "./context/ConfirmDialogContext";
import {NavbarHandleProvider} from "./context/NavbarHandleContext";

const App = () => {
    return (
        <LoadingProcessScreenProvider>
            <ShowMessagesProvider>
                <ConfirmDialogProvider>
                    <NavbarHandleProvider>
                        <div className="wrapper">
                            <Index/>
                        </div>
                    </NavbarHandleProvider>
                </ConfirmDialogProvider>
            </ShowMessagesProvider>
        </LoadingProcessScreenProvider>
    );
};

export default App;