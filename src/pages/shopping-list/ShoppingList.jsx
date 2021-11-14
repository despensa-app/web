import Content from "../../components/common/content/Content";
import Button from "../../components/common/button/Button";
import {useEffect, useState} from "react";
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json";
import {useHistory, useParams} from "react-router-dom";
import ShoppingListsRC from "../../services/ShoppingListsRC";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import {useSetNavbarItems} from "../../hooks/useNavbarItems";
import ShoppingListProductsList from "../../components/shopping-list/ShoppingListProductsList";
import ShoppingListHeader from "../../components/shopping-list/ShoppingListHeader";
import ShoppingListButtonAddProduct from "../../components/shopping-list/ShoppingListButtonAddProduct";

const ShoppingList = () => {

    const {shoppingListId} = useParams();

    const [shoppingList, setShoppingList] = useState(shoppingListsRequestInitState);

    const [isEdit, setIsEdit] = useState(false);

    const history = useHistory();

    const {showLoadingProcessScreen, hideLoadingProcessScreen} = useLoadingProcessScreen();

    const {showSuccessMessage, showErrorMessage} = useShowToastMessage();

    const {setNavbarMiddleItems} = useSetNavbarItems();

    const [hasProducts, setHasProducts] = useState(true);

    useEffect(() => {
        initNavbarItems();
    }, []);

    useEffect(() => {
        if (isEdit || !hasProducts) {
            shoppingListEditHandle();
        }
    }, [isEdit, shoppingList, hasProducts]);

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

    const addProductHandle = () => {
        createShoppingList({
            success: (data) => {
                history.push(`/shopping-list/${data.id}/add-products`);
            }
        })
    }

    const shoppingListEditHandle = () => {
        setIsEdit(true);
        setNavbarMiddleItems([
            (<Button variant="primary"
                     className="mr-1"
                     onClick={saveChangesHandle}>
                <i className="fas fa-edit pr-1"/>
                Guardar
            </Button>),
            (<ShoppingListButtonAddProduct
                shoppingListId={shoppingListId}
                isEdit={isEdit}
                addProductHandle={addProductHandle}/>)
        ]);
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
                <ShoppingListProductsList
                    shoppingListId={shoppingListId}
                    isEdit={isEdit}
                    setHasProducts={setHasProducts}/>
            </Content.Main>
        </Content>
    );
};

export default ShoppingList;