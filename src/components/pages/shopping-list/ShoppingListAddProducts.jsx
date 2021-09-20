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
import ShoppingListAddProductModal from "./ShoppingListAddProductModal";
import $ from 'jquery';
import ProductsShoppingListRC from "../../../services/ProductsShoppingListRC";
import UnitTypeSearchModal from "./UnitTypeSearchModal";
import unitTypeRequestInitState from "../../../assests/requests/unit-type.json";
import Form from "../../common/form/Form";
import linksPaginationInitState from "../../../assests/links.json";

const ShoppingListAddProducts = () => {

    const [linksPaginationProducts, setLinksPaginationProducts] = useState(linksPaginationInitState);

    const [productsResponse, setProductsResponse] = useState(productsResponseInitState);

    const [products, setProducts] = useState([productRequestInitState]);

    const [selectedProduct, setSelectedProduct] = useState(productRequestInitState);

    const [selectedUnitType, setSelectedUnitType] = useState(unitTypeRequestInitState);

    const [productRequest, setProductRequest] = useState(productRequestInitState);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const navbarHandle = useContext(NavbarHandleContext);

    const {shoppingListId} = useParams();

    const productModalId = "add-product-modal";

    const unitTypeSearchModalId = "unit-type-search-modal";

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
        initDataProducts(true);
    }, [productRequest]);

    const initDataProducts = (isSearch = false) => {
        const getUri = () => {
            if (!linksPaginationProducts) {
                return "";
            }

            return isSearch ? linksPaginationProducts.first : linksPaginationProducts.next;
        }

        ProductsRC.get({
            params: {
                query: productRequest.name
            },
            uri: getUri(),
            success: (data) => {
                if (!isSearch && data.meta && data.meta.current_page === productsResponse.meta.current_page) {
                    return;
                }

                if (data.data) {
                    if (!isSearch && productsResponse.meta.current_page) {
                        setProducts([...products, ...data.data]);
                    } else {
                        setProducts(data.data);
                    }
                } else {
                    setProducts([]);
                }

                setLinksPaginationProducts(data.links);
                setProductsResponse(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    const loadNextProductsPageHandle = () => {
        initDataProducts();
    };

    const selectedProductHandle = (product) => {
        setSelectedProduct(product);
        $(`#${productModalId}`).modal('show');
    };

    const addSelectedProductToList = ({product_id, unit_type_id, units_per_product, successHandle}) => {
        const request = {
            product_id,
            shopping_list_id: shoppingListId,
            unit_type_id,
            units_per_product
        };

        loadingProcessScreen.show();
        ProductsShoppingListRC.post({
            body: request,
            success: () => {
                showMessage.success({message: "Producto agregado"});
                setSelectedUnitType(unitTypeRequestInitState);
                successHandle();
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    const unitTypeProductModalHandle = () => {
        $(`#${unitTypeSearchModalId}`).modal('show');
        $(`#${productModalId}`).modal('hide');
    };

    const selectedUnitTypeSearchModalHandle = (unitType) => {
        setSelectedUnitType(unitType);
    };

    const closeUnitTypeSearchModalHandle = () => {
        $(`#${productModalId}`).modal('show');
    };

    const closeProductModalHandle = () => {
        setSelectedUnitType(unitTypeRequestInitState);
    };

    const inputSearchHandle = (evt) => {
        setProductRequest({...productRequest, [evt.target.name]: evt.target.value})
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
                <Form className="mb-3">
                    <Form.InputGroup>
                        <Form.Label hide htmlFor="product_name"/>
                        <Form.Control
                            autoComplete="off"
                            id="product_name"
                            name="name"
                            value={productRequest.name}
                            onChange={inputSearchHandle}
                            placeholder="Buscar producto"/>
                        <Form.InputGroup.Append>
                            <Button variant="default">
                                <i className="fas fa-search"/>
                            </Button>
                        </Form.InputGroup.Append>
                    </Form.InputGroup>
                </Form>
                <ListGroup className="mb-3">
                    {
                        products.map((value, i) => (
                            <ListGroup.Item
                                key={`products-${i}`}
                                action
                                onClick={() => selectedProductHandle(value)}
                                className="text-truncate">
                                {value.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <CustomButtonLoad
                    onClick={loadNextProductsPageHandle}
                    metaPage={productsResponse.meta}/>
                <ShoppingListAddProductModal
                    modalId={productModalId}
                    product={selectedProduct}
                    unitType={selectedUnitType}
                    addHandle={addSelectedProductToList}
                    unitTypeHandle={unitTypeProductModalHandle}
                    closeHandle={closeProductModalHandle}/>
                <UnitTypeSearchModal
                    modalId={unitTypeSearchModalId}
                    onClickItem={selectedUnitTypeSearchModalHandle}
                    onClose={closeUnitTypeSearchModalHandle}/>
            </Content.Main>
        </Content>
    );
}

export default ShoppingListAddProducts;