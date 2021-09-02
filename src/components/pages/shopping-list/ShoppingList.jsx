import Content from "../../common/content/Content";
import ListGroup from "../../common/list-group/ListGroup";
import CheckboxCustomLabel from "../../common/CheckboxCustomLabel";
import Button from "../../common/button/Button";
import {useContext, useEffect, useState} from "react";
import shoppingListsResponseInitState from "../../../assests/requests/shopping-list.json";
import shoppingListInitState from "../../../assests/requests/shopping-list.json";
import Form from "../../common/form/Form";
import {useParams} from "react-router-dom";
import ShoppingListsRC from "../../../services/ShoppingListsRC";
import {LoadingProcessScreenContext, NavbarHandleContext, ShowMessagesContext} from "../../../App";
import productsShoppingListResponseInitState from "../../../assests/responses/products-shopping-list.json";
import productShoppingListInitState from "../../../assests/responses/product-shopping-list.json";
import ButtonGroup from "../../common/button/ButtonGroup";
import ProductsShoppingListRC from "../../../services/ProductsShoppingListRC";

const ShoppingList = () => {

    const {shoppingListId} = useParams();

    const [shoppingList, setShoppingList] = useState(shoppingListsResponseInitState);

    const [productShoppingListResponse, setProductShoppingListResponse] = useState(productsShoppingListResponseInitState);

    const [productsShoppingList, setProductsShoppingList] = useState([productShoppingListInitState]);

    const [isEdit, setIsEdit] = useState(false);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const navbarHandle = useContext(NavbarHandleContext);

    useEffect(() => {
        initNavbarItems();
    }, []);

    useEffect(() => {
        setShoppingList(shoppingListInitState);

        if (!shoppingListId) {
            return;
        }

        loadingProcessScreen.show();
        ShoppingListsRC.get({
            id: shoppingListId,
            success: ({data}) => {
                setShoppingList(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
        initDataProducts();
    }, [shoppingListId]);

    const initNavbarItems = () => {
        setIsEdit(false);
        navbarHandle.setItems({
            middle: [
                (<Button variant="primary" onClick={shoppingListEditHandle}>
                    <i className="fas fa-edit pr-1"/>
                    Editar
                </Button>)
            ],
            right: []
        });
    };

    const shoppingListEditHandle = () => {
        setIsEdit(true);
        navbarHandle.setItems({
            middle: [
                (<Button variant="primary" onClick={initNavbarItems}>
                    <i className="fas fa-edit pr-1"/>
                    Guardar
                </Button>),
                (<Button variant="success" onClick={initNavbarItems}>
                    <i className="fas fa-plus pr-1"/>
                    Agregar producto
                </Button>)
            ],
            right: []
        });
    };

    const initDataProducts = () => {
        const uri = ShoppingListsRC.getPath({path: [shoppingListId, 'products'], host: true});

        ShoppingListsRC.get({
            uri,
            success: (data) => {
                setProductShoppingListResponse(data);

                if (!productsShoppingList[0].shopping_list_id) {
                    setProductsShoppingList(data.data);
                } else {
                    setProductsShoppingList([...productsShoppingList, ...data.data]);
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
                    showMessage.error(data.error);
                }
            }
        });
    };

    return (
        <Content>
            <Content.Header>
                <div className="d-flex justify-content-between">
                    {
                        isEdit
                            ? <Form className="flex-grow-1">
                                <Form.Label hide htmlFor="name">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shoppingList.name}
                                    id="name"
                                    name="name"/>
                            </Form>
                            : <h1 className="flex-grow-1">{shoppingList.name}</h1>
                    }
                    <Button>
                        <i className="fas fa-filter"/>
                    </Button>
                    <Button>
                        <i className="fas fa-ellipsis-h"/>
                    </Button>
                </div>
            </Content.Header>
            <Content.Main>
                <ListGroup className="list-group-custom-button">
                    {
                        productsShoppingList.map((value, i) => (
                            <ListGroup.Item className="pl-3" key={`product-shopping-list-${i}`}>
                                <ListGroup.Item.Custom type="content" active={isEdit}>
                                    <div className="d-flex justify-content-between">
                                        <CheckboxCustomLabel/>
                                        <div className="flex-grow-1 text-truncate">
                                            {value.product.name}
                                        </div>
                                    </div>
                                </ListGroup.Item.Custom>
                                <ListGroup.Item.Custom type="button" active={isEdit}>
                                    <ButtonGroup className="h-100">
                                        <Button variant="primary" className="border-radius-0">
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
            </Content.Main>
        </Content>
    );
};

export default ShoppingList;