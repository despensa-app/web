import Index from './pages/Index';
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';
import {LoadingProcessScreenProvider} from "./context/LoadingProcessScreenContext";
import {ShowMessagesProvider} from "./context/ShowMessagesContext";
import {ConfirmDialogProvider} from "./context/ConfirmDialogContext";
import {NavbarItemsProvider} from "./context/NavbarItemsContext";

const App = () => {
    return (
        <LoadingProcessScreenProvider>
            <ShowMessagesProvider>
                <ConfirmDialogProvider>
                    <NavbarItemsProvider>
                        <div className="wrapper">
                            <Index/>
                        </div>
                    </NavbarItemsProvider>
                </ConfirmDialogProvider>
            </ShowMessagesProvider>
        </LoadingProcessScreenProvider>
    );
};

export default App;