import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import Aside from './common/Aside';
import Footer from './common/Footer';
import Content from "./common/Content";
import Nav from "./common/nav/Nav";
import Product from "./products/Product";
import Products from "./products/Products";
import ProductForm from "./products/ProductForm";
import LoadingProcessScreen from "./common/LoadingProcessScreen";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../App";
import UnitTypes from "./unit-types/UnitTypes";
import {Toast} from "primereact/toast";
import ShoppingList from "../pages/ShoppingList";

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
                    <Content/>
                </Route>
                <Route path="/shopping-list/:shoppingListId/form">
                    <Content/>
                </Route>
                <Route path="/shopping-list/:shoppingListId">
                    <Content/>
                </Route>
                <Route path="/shopping-list">
                    <ShoppingList/>
                </Route>
                <Route exact path="/">
                    <Content/>
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