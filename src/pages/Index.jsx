import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Aside from "../components/common/Aside";
import LoadingProcessScreen from "../components/common/LoadingProcessScreen";
import {Toast} from "primereact/toast";
import ShoppingLists from "./shopping-list/ShoppingLists";
import Navbar from "../components/common/navbar/Navbar";
import ShoppingList from "./shopping-list/ShoppingList";
import ShoppingListAddProducts from "./shopping-list/ShoppingListAddProducts";
import {useToastMessage} from "../hooks/useToastMessage";

const Index = () => {
    const version = "1.0.0";
    const toastMessage = useToastMessage();

    return (
        <Router>
            <LoadingProcessScreen/>
            <Toast ref={toastMessage}/>
            <Aside/>
            <Switch>
                <Route path="/shopping-list/create">
                    <ShoppingList/>
                </Route>
                <Route path="/shopping-list/:shoppingListId/add-products">
                    <ShoppingListAddProducts/>
                </Route>
                <Route path="/shopping-list/:shoppingListId/edit">
                    <ShoppingList/>
                </Route>
                <Route path="/shopping-list/:shoppingListId">
                    <ShoppingList/>
                </Route>
                <Route path="/shopping-list">
                    <ShoppingLists/>
                </Route>
                <Route exact path="/">
                    <ShoppingLists/>
                </Route>
                <Route path="*">
                    <p>La página no existe</p>
                </Route>
            </Switch>
            <Navbar/>
        </Router>
    );
};

export default Index;