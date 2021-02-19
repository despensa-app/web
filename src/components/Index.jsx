import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {useContext} from "react";
import Aside from './common/Aside';
import Footer from './common/Footer';
import Content from "./common/Content";
import Nav from "./common/nav/Nav";
import Product from "./products/Product";
import Products from "./products/Products";
import ProductForm from "./products/ProductForm";
import LoadingProcessScreen from "./common/LoadingProcessScreen";
import {LoadingProcessScreenContext} from "../App";

const Index = () => {
    const version = "1.0.0";
    const loadingProcessScreenContext = useContext(LoadingProcessScreenContext);

    return (
        <Router>
            <LoadingProcessScreen {...loadingProcessScreenContext}/>
            <Nav/>
            <Aside/>
            <Switch>
                <Route path="/products/form/:productId">
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
                    <Content/>
                </Route>
                <Route path="/unit-types">
                    <Content/>
                </Route>
                <Route path="/shopping-list/form">
                    <Content/>
                </Route>
                <Route path="/shopping-list/form/:productId">
                    <Content/>
                </Route>
                <Route path="/shopping-list/:shoppingListId">
                    <Content/>
                </Route>
                <Route path="/shopping-list">
                    <Content/>
                </Route>
                <Route exact path="/">
                    <Content/>
                </Route>
                <Route path="*">
                    <p>La pagina no existe</p>
                </Route>
            </Switch>
            <Footer version={version}/>
        </Router>
    );
};

export default Index;