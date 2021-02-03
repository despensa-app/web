import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Aside from './common/Aside';
import Footer from './common/Footer';
import Content from "./common/Content";
import Nav from "./common/nav/Nav";
import Product from "./products/Product";

const Index = () => {
    const version = "1.0.0";

    return (
        <Router>
            <Nav/>
            <Aside/>
            <Switch>
                <Route path="/products/:productId">
                    <Product/>
                </Route>
                <Route path="/products/form">
                    <Content/>
                </Route>
                <Route path="/products">
                    <Content/>
                </Route>
                <Route path="/unit-types/:unitTypeId">
                    <Content/>
                </Route>
                <Route path="/unit-types">
                    <Content/>
                </Route>
                <Route path="/shopping-list/:shoppingListId">
                    <Content/>
                </Route>
                <Route path="/shopping-list/form">
                    <Content/>
                </Route>
                <Route path="/shopping-list">
                    <Content/>
                </Route>
                <Route path="/">
                    <Content/>
                </Route>
            </Switch>
            <Footer version={version}/>
        </Router>
    );
};

export default Index;