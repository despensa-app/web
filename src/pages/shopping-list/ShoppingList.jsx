import Content from "../../components/common/content/Content";
import ListGroup from "../../components/common/list-group/ListGroup";
import CustomCheckBox from "../../components/common/CustomCheckBox";
import Button from "../../components/common/button/Button";
import {useEffect, useState} from "react";
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json";
import Form from "../../components/common/form/Form";
import {Link, useHistory, useParams} from "react-router-dom";
import ShoppingListsRC from "../../services/ShoppingListsRC";
import productsShoppingListResponseInitState from "../../services/init-state/responses/products-shopping-list.json";
import productShoppingListInitState from "../../services/init-state/responses/product-shopping-list.json";
import ButtonGroup from "../../components/common/button/ButtonGroup";
import ProductsShoppingListRC from "../../services/ProductsShoppingListRC";
import ShoppingListProductDetailModal from "../../components/shopping-list/ShoppingListProductDetailModal";
import $ from 'jquery';
import CustomButtonLoad from "../../components/common/CustomButtonLoad";
import ShoppingListOptionsModal from "../../components/shopping-list/ShoppingListOptionsModal";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import {useSetNavbarItems} from "../../hooks/useNavbarItems";

const ShoppingList = () => {

    const {shoppingListId} = useParams();

    const [shoppingList, setShoppingList] = useState(shoppingListsRequestInitState);

    const [unchangedShoppingList, setUnchangedShoppingList] = useState(shoppingListsRequestInitState);

    const [productShoppingListResponse, setProductShoppingListResponse] = useState(productsShoppingListResponseInitState);

    const [productsShoppingList, setProductsShoppingList] = useState([productShoppingListInitState]);

    const [isEdit, setIsEdit] = useState(false);

    const [selectProduct, setSelectProduct] = useState(productShoppingListInitState);

    const [nextProductPageURL, setNextProductPageURL] = useState("");

    const history = useHistory();

    const productDetailModalId = "product-detail-modal";

    const optionsModalId = "options-modal";

    const {showLoadingProcessScreen, hideLoadingProcessScreen} = useLoadingProcessScreen();

    const {showSuccessMessage, showErrorMessage} = useShowToastMessage();

    const {setNavbarMiddleItems} = useSetNavbarItems();

    useEffect(() => {
        initNavbarItems();
    }, []);

    useEffect(() => {
        if (isEdit) {
            shoppingListEditHandle();
        } else {
            setUnchangedShoppingList(shoppingList);
        }
    }, [isEdit, shoppingList]);

    useEffect(() => {
        setShoppingList({...shoppingListsRequestInitState, name: "Nueva lista"});

        if (!shoppingListId) {
            setIsEdit(true);
            setProductsShoppingList([]);

            return;
        }

        showLoadingProcessScreen();
        ShoppingListsRC.get({
            id: shoppingListId,
            success: ({data}) => {
                setShoppingList(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showErrorMessage(data.error);
                }
            },
            final: hideLoadingProcessScreen
        });
    }, [shoppingListId]);

    useEffect(() => {
        if (!shoppingListId) {
            return;
        }

        initDataProducts();
    }, [nextProductPageURL]);

    const initNavbarItems = () => {
        setIsEdit(false);
        setNavbarMiddleItems([
            (<Button variant="primary" onClick={shoppingListEditHandle}>
                <i className="fas fa-edit pr-1"/>
                Editar
            </Button>)
        ]);
    };

    const shoppingListEditHandle = () => {
        setIsEdit(true);
        setNavbarMiddleItems([
            (<Button variant="primary"
                     className="mr-1"
                     onClick={saveChangesHandle}>
                <i className="fas fa-edit pr-1"/>
                Guardar
            </Button>),
            (<Button variant="success"
                     onClick={buttonAddProductHandle}>
                Agregar producto
            </Button>)
        ]);
    };

    const buttonAddProductHandle = () => {
        const getUrl = (id) => {
            return `/shopping-list/${id}/add-products`;
        };

        if (shoppingListId) {
            history.push(getUrl(shoppingListId));
        } else {
            createShoppingList({
                success: (data) => {
                    history.push(getUrl(data.id));
                }
            });
        }
    };

    const saveChangesHandle = () => {
        if (shoppingListId) {
            updateShoppingList({success: initNavbarItems});
        } else {
            createShoppingList({
                success: (data) => {
                    initNavbarItems();
                    history.push("/shopping-list/" + data.id);
                }
            });
        }
    };

    const createShoppingList = ({success}) => {
        ShoppingListsRC.post({
            body: shoppingList,
            id: shoppingList.id,
            success: ({data}) => {
                showSuccessMessage({message: "Lista creada."});
                success(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showErrorMessage(data.error);
                }
            }
        });
    };

    const updateShoppingList = ({success}) => {
        ShoppingListsRC.put({
            body: shoppingList,
            id: shoppingList.id,
            success: () => {
                showSuccessMessage({message: "Lista actualizada."});
                success();
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

    const shoppingListNameHandle = (evt) => {
        setShoppingList({...shoppingList, [evt.target.name]: evt.target.value});
    };

    const resetNameHandle = () => {
        setShoppingList({...shoppingList, name: unchangedShoppingList.name});
    };

    const showButtonAddProductContentMain = () => {
        return !productsShoppingList.length && !isEdit;
    };

    const loadNexProductPageHandle = () => {
        setNextProductPageURL(productShoppingListResponse.links.next);
    };

    const showOptionHandle = () => {
        $(`#${optionsModalId}`).modal('show');
    }

    return (
        <Content>
            <Content.Header>
                <div className="d-flex justify-content-between">
                    {
                        isEdit
                            ? <Form className="flex-grow-1">
                                <Form.InputGroup>
                                    <Form.Label hide htmlFor="name">Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={shoppingList.name}
                                        onChange={shoppingListNameHandle}
                                        placeholder="Nombre de la lista"
                                        id="name"
                                        name="name"/>
                                    <Form.InputGroup.Append>
                                        <Button variant="default" onClick={resetNameHandle}>
                                            <i className="fas fa-undo-alt"/>
                                        </Button>
                                    </Form.InputGroup.Append>
                                </Form.InputGroup>
                            </Form>
                            : <h1 className="flex-grow-1">{shoppingList.name}</h1>
                    }
                    {
                        shoppingListId
                        && <>
                            <Button>
                                <i className="fas fa-filter"/>
                            </Button>
                            <Button onClick={showOptionHandle}>
                                <i className="fas fa-ellipsis-h"/>
                            </Button>
                        </>
                    }
                </div>
            </Content.Header>
            <Content.Main>
                {
                    showButtonAddProductContentMain()
                    && <Link
                        to={`/shopping-list/${shoppingListId}/add-products`}
                        className="btn btn-success btn-block">
                        <i className="fas fa-plus pr-1"/>
                        Agregar producto
                    </Link>
                }
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
                <ShoppingListOptionsModal modalId={optionsModalId}/>
            </Content.Main>
        </Content>
    );
};

export default ShoppingList;