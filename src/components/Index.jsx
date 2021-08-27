import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import Aside from './common/Aside';
import Footer from './common/Footer';
import Nav from "./common/nav/Nav";
import Product from "./pages/products/Product";
import Products from "./pages/products/Products";
import ProductForm from "./pages/products/ProductForm";
import LoadingProcessScreen from "./common/LoadingProcessScreen";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../App";
import UnitTypes from "./pages/unit-types/UnitTypes";
import {Toast} from "primereact/toast";
import ShoppingList from "./pages/shopping-list/ShoppingList";
import ShoppingListForm from "./pages/shopping-list/ShoppingListForm";

const Index = () => {
    const version = "1.0.0";
    const loadingProcessScreenContext = useContext(LoadingProcessScreenContext);
    const showMessage = useContext(ShowMessagesContext);

    return (
        <Router>
            <LoadingProcessScreen {...loadingProcessScreenContext}/>
            <Toast ref={showMessage.toast}/>
            <Nav/>
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
                <Route path="/shopping-list/form">
                    <ShoppingListForm/>
                </Route>
                <Route path="/shopping-list/:shoppingListId/form">
                    <ShoppingListForm/>
                </Route>
                <Route path="/shopping-list/:shoppingListId">
                    <ShoppingListForm/>
                </Route>
                <Route path="/shopping-list">
                    <ShoppingList/>
                </Route>
                <Route exact path="/">
                    <ShoppingList/>
                </Route>
                <Route path="*">
                    <p>La página no existe</p>
                </Route>
            </Switch>
            <Footer version={version}/>
        </Router>
    );
};

export default Index;