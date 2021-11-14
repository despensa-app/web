import Content from "../../components/common/content/Content";
import Button from "../../components/common/button/Button";
import {useEffect, useState} from "react";
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json";
import Form from "../../components/common/form/Form";
import {Link, useHistory, useParams} from "react-router-dom";
import ShoppingListsRC from "../../services/ShoppingListsRC";
import $ from 'jquery';
import ShoppingListOptionsModal from "../../components/shopping-list/ShoppingListOptionsModal";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import {useSetNavbarItems} from "../../hooks/useNavbarItems";
import ShoppingListProductsList from "../../components/shopping-list/ShoppingListProductsList";

const ShoppingList = () => {

    const {shoppingListId} = useParams();

    const [shoppingList, setShoppingList] = useState(shoppingListsRequestInitState);

    const [unchangedShoppingList, setUnchangedShoppingList] = useState(shoppingListsRequestInitState);

    const [isEdit, setIsEdit] = useState(false);

    const history = useHistory();

    const optionsModalId = "options-modal";

    const {showLoadingProcessScreen, hideLoadingProcessScreen} = useLoadingProcessScreen();

    const {showSuccessMessage, showErrorMessage} = useShowToastMessage();

    const {setNavbarMiddleItems} = useSetNavbarItems();

    const [hasProducts, setHasProducts] = useState(false);

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

    const shoppingListNameHandle = (evt) => {
        setShoppingList({...shoppingList, [evt.target.name]: evt.target.value});
    };

    const resetNameHandle = () => {
        setShoppingList({...shoppingList, name: unchangedShoppingList.name});
    };

    const showButtonAddProductContentMain = () => {
        return !hasProducts && !isEdit;
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
                <ShoppingListProductsList
                    shoppingListId={shoppingListId}
                    isEdit={isEdit}
                    setHasProducts={setHasProducts}/>
                <ShoppingListOptionsModal modalId={optionsModalId}/>
            </Content.Main>
        </Content>
    );
};

export default ShoppingList;