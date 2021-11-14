import Content from "../../components/common/content/Content";
import Button from "../../components/common/button/Button";
import {useEffect, useState} from "react";
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json";
import {Link, useHistory, useParams} from "react-router-dom";
import ShoppingListsRC from "../../services/ShoppingListsRC";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import {useSetNavbarItems} from "../../hooks/useNavbarItems";
import ShoppingListProductsList from "../../components/shopping-list/ShoppingListProductsList";
import ShoppingListHeader from "../../components/shopping-list/ShoppingListHeader";

const ShoppingList = () => {

    const {shoppingListId} = useParams();

    const [shoppingList, setShoppingList] = useState(shoppingListsRequestInitState);

    const [isEdit, setIsEdit] = useState(false);

    const history = useHistory();

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

    const showButtonAddProductContentMain = () => {
        return !hasProducts && !isEdit;
    };

    return (
        <Content>
            <Content.Header>
                <ShoppingListHeader
                    shoppingListId={shoppingListId}
                    isEdit={isEdit}
                    shoppingList={shoppingList}
                    setShoppingList={setShoppingList}/>
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
            </Content.Main>
        </Content>
    );
};

export default ShoppingList;