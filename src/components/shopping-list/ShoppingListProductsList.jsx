import {useEffect, useState} from "react";
import ListGroup from "../common/list-group/ListGroup";
import CustomCheckBox from "../common/CustomCheckBox";
import ButtonGroup from "../common/button/ButtonGroup";
import Button from "../common/button/Button";
import productShoppingListInitState from "../../services/init-state/responses/product-shopping-list.json";
import ProductsShoppingListRC from "../../services/ProductsShoppingListRC";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import $ from 'jquery';
import ShoppingListsRC from "../../services/ShoppingListsRC";
import productsShoppingListResponseInitState from "../../services/init-state/responses/products-shopping-list.json";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import ShoppingListProductDetailModal from "./ShoppingListProductDetailModal";
import CustomButtonLoad from "../common/CustomButtonLoad";

const ShoppingListProductsList = ({shoppingListId, isEdit, setHasProducts}) => {
    const [productsShoppingList, setProductsShoppingList] = useState([productShoppingListInitState]);

    const {showErrorMessage} = useShowToastMessage();

    const [selectProduct, setSelectProduct] = useState(productShoppingListInitState);

    const productDetailModalId = "product-detail-modal";

    const [nextProductPageURL, setNextProductPageURL] = useState("");

    const [productShoppingListResponse, setProductShoppingListResponse] = useState(productsShoppingListResponseInitState);

    const {showLoadingProcessScreen, hideLoadingProcessScreen} = useLoadingProcessScreen();

    useEffect(() => {
        if (!shoppingListId) {
            setProductsShoppingList([]);
        }
    }, [shoppingListId]);

    useEffect(() => {
        if (!shoppingListId) {
            return;
        }

        initDataProducts();
    }, [nextProductPageURL]);

    useEffect(() => {
        setHasProducts(productsShoppingList.length > 0)
    }, [productsShoppingList])

    const checkProductHandle = ({selected, value}) => {
        const {product_id, shopping_list_id, unit_type_id} = value;

        ProductsShoppingListRC.put({
            body: {product_id, shopping_list_id, unit_type_id, selected},
            error: (data) => {
                if (data && data.error) {
                    showErrorMessage(data.error);
                }
            }
        });
    };

    const showProductDetailHandle = (productShoppingList) => {
        setSelectProduct(productShoppingList);
        $(`#${productDetailModalId}`).modal('show');
    };

    const productDeleteHandle = ({product_id, unit_type_id, shopping_list_id}) => {
        ProductsShoppingListRC.delete({
            body: {product_id, shopping_list_id, unit_type_id},
            success: () => {
                setProductsShoppingList(productsShoppingList.filter(value => {
                    return !(product_id === value.product_id && shopping_list_id === value.shopping_list_id && unit_type_id === value.unit_type_id);
                }));
            },
            error: (data) => {
                if (data && data.error) {
                    showErrorMessage(data.error);
                }
            }
        });
    };

    const initDataProducts = () => {
        let uri = nextProductPageURL;

        if (!nextProductPageURL) {
            uri = ShoppingListsRC.getPath({path: [shoppingListId, 'products'], host: true});
        }

        showLoadingProcessScreen();
        ShoppingListsRC.get({
            uri,
            success: (data) => {
                if (data.meta.current_page === productShoppingListResponse.meta.current_page) {
                    return true;
                }

                if (productShoppingListResponse.meta.current_page) {
                    setProductsShoppingList([...productsShoppingList, ...data.data]);
                } else {
                    setProductsShoppingList(data.data);
                }

                setProductShoppingListResponse(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showErrorMessage(data.error);
                }
            },
            final: hideLoadingProcessScreen
        });
    };

    const loadNexProductPageHandle = () => {
        setNextProductPageURL(productShoppingListResponse.links.next);
    };

    return (
        <>
            <ListGroup className="list-group-custom-button mb-3">
                {
                    productsShoppingList.map((value, i) => (
                        <ListGroup.Item className="pl-3" key={`product-shopping-list-${i}`}>
                            <ListGroup.Item.Custom type="content" active={isEdit}>
                                <div className="d-flex justify-content-between">
                                    <CustomCheckBox
                                        onClick={selected => checkProductHandle({selected, value})}
                                        active={value.selected}/>
                                    <div className="flex-grow-1 text-truncate">
                                        {value.product.name}
                                    </div>
                                </div>
                            </ListGroup.Item.Custom>
                            <ListGroup.Item.Custom type="button" active={isEdit}>
                                <ButtonGroup className="h-100">
                                    <Button
                                        variant="primary"
                                        className="border-radius-0"
                                        onClick={evt => showProductDetailHandle(value)}>
                                        Ver
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="border-radius-0"
                                        onClick={evt => productDeleteHandle(value)}>
                                        <i className="fas fa-trash"/>
                                    </Button>
                                </ButtonGroup>
                            </ListGroup.Item.Custom>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <CustomButtonLoad
                onClick={loadNexProductPageHandle}
                metaPage={productShoppingListResponse.meta}/>
            <ShoppingListProductDetailModal
                productDetailModalId={productDetailModalId}
                productShoppingList={selectProduct}/>
        </>
    );
};

export default ShoppingListProductsList;