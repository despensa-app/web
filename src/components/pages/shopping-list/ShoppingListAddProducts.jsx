import {useContext, useEffect, useState} from "react";
import productsResponseInitState from "../../../assests/responses/products.json";
import productRequestInitState from "../../../assests/requests/product.json";
import {LoadingProcessScreenContext, NavbarHandleContext, ShowMessagesContext} from "../../../App";
import Content from "../../common/content/Content";
import ProductsRC from "../../../services/ProductsRC";
import Button from "../../common/button/Button";
import ListGroup from "../../common/list-group/ListGroup";
import CustomButtonLoad from "../../common/CustomButtonLoad";
import {Link, useParams} from "react-router-dom";

const ShoppingListAddProducts = () => {

    const [productsUrlPage, setProductsUrlPage] = useState('');

    const [productsResponse, setProductsResponse] = useState(productsResponseInitState);

    const [products, setProducts] = useState([productRequestInitState]);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const navbarHandle = useContext(NavbarHandleContext);

    const {shoppingListId} = useParams();

    useEffect(() => {
        navbarHandle.setItems({
            middle: [
                (<Link
                    to={`/shopping-list/${shoppingListId}`}
                    className="btn btn-success">
                    Terminar
                </Link>)
            ],
            right: []
        });
    }, []);

    useEffect(() => {
        initDataProducts();
    }, [productsUrlPage])

    const initDataProducts = () => {
        ProductsRC.get({
            uri: productsUrlPage,
            success: (data) => {
                setProductsResponse(data);

                if (!products[0].id) {
                    setProducts(data.data);
                } else {
                    setProducts([...products, ...data.data]);
                }
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    const loadProductsHandle = () => {
        setProductsUrlPage(productsResponse.links.next);
    };

    return (
        <Content>
            <Content.Header>
                <div className="d-flex justify-content-between">
                    <h1>Seleccionar productos</h1>
                    <Button>
                        <i className="fas fa-filter"/>
                    </Button>
                </div>
            </Content.Header>
            <Content.Main>
                <ListGroup className="mb-3">
                    {
                        products && products.map((value, i) => (
                            <ListGroup.Item
                                key={`products-${i}`}
                                action
                                className="text-truncate">
                                {value.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <CustomButtonLoad
                    onClick={loadProductsHandle}
                    metaPage={productsResponse.meta}/>
            </Content.Main>
        </Content>
    );
}

export default ShoppingListAddProducts;