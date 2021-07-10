import {useState, useEffect, useContext} from "react";
import Card from "../common/Card";
import Pagination from "../common/Pagination";
import Content from "../common/Content";
import CardProduct from "./CardProduct";
import {Link} from "react-router-dom";
import {LoadingProcessScreenContext} from "../../App";
import productsInitState from "../../assests/responses/products.json";
import BreadCrumbApp from "../../common/breadCrumbApp";

const Products = () => {

    const urlBase = 'http://despensa-app.api/api/products';

    const [products, setProducts] = useState(productsInitState);

    const [url, setUrl] = useState(urlBase);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    useEffect(() => {
        loadingProcessScreen.show();
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(loadingProcessScreen.hide);
    }, [url]);

    const PageHeader = () => (
        <>
            <span>Productos </span>
            <Link to="/products/form" className="btn btn-success">
                <i className="fas fa-plus"/>
            </Link>
        </>
    );

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setUrl(url);
    };

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={BreadCrumbApp.product()}>
            <Card>
                <div className="row d-flex align-items-stretch">
                    {
                        products.data.map((product, i) => (
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                                 key={`products-${i}`}>
                                <CardProduct {...product}/>
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    links={products.meta.links}
                    onClick={onPageClick}
                    nameKey="product-relationship"/>
            </Card>
        </Content>
    );
};

export default Products;