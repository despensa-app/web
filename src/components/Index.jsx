import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import Aside from './common/Aside';
import Product from "./pages/products/Product";
import Products from "./pages/products/Products";
import ProductForm from "./pages/products/ProductForm";
import LoadingProcessScreen from "./common/LoadingProcessScreen";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../App";
import UnitTypes from "./pages/unit-types/UnitTypes";
import {Toast} from "primereact/toast";
import ShoppingLists from "./pages/shopping-list/ShoppingLists";
import ShoppingListForm from "./pages/shopping-list/ShoppingListForm";
import Navbar from "./common/navbar/Navbar";

const Index = () => {
    const version = "1.0.0";
    const loadingProcessScreenContext = useContext(LoadingProcessScreenContext);
    const showMessage = useContext(ShowMessagesContext);

    return (
        <Router>
            <LoadingProcessScreen {...loadingProcessScreenContext}/>
            <Toast ref={showMessage.toast}/>
            <Aside/>
            <Switch>
                <Route path="/products/:productId/form">
                    <ProductForm/>
                </Route>
                <Route path="/products/form">
                    <ProductForm/>
                </Route>
                <Route path="/products/:productId">
                    <Product/>
                </Route>
                <Route path="/products">
                    <Products/>
                </Route>
                <Route path="/unit-types/:unitTypeId">
                    <UnitTypes/>
                </Route>
                <Route path="/unit-types">
                    <UnitTypes/>
                </Route>
                <Route path="/shopping-list/create">
                    <ShoppingListForm/>
                </Route>
                <Route path="/shopping-list/:shoppingListId/edit">
                    <ShoppingListForm/>
                </Route>
                <Route path="/shopping-list/:shoppingListId">
                    <ShoppingListForm/>
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