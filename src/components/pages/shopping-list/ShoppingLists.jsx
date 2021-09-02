import {useContext, useEffect, useState} from "react";
import shoppingListsResponseInitState from "../../../assests/responses/shopping-lists.json"
import shoppingListsRequestInitState from "../../../assests/requests/shopping-list.json"
import {
    ConfirmDialogContext,
    LoadingProcessScreenContext,
    NavbarHandleContext,
    ShowMessagesContext
} from "../../../App";
import ShoppingListsRC from "../../../services/ShoppingListsRC";
import Content from "../../common/content/Content";
import Card from "../../common/card/Card";
import {dateFormat} from "../../../common/date-utils";
import Button from "../../common/button/Button";
import ShoppingListButtonCreate from "./ShoppingListButtonCreate";
import ButtonNavbarSearch from "../../common/ButtonNavbarSearch";
import $ from 'jquery';
import ShoppingListSearchModal from "./ShoppingListSearchModal";

const ShoppingLists = () => {

    const [shoppingListsResponse, setShoppingListsResponse] = useState(shoppingListsResponseInitState);

    const [shoppingLists, setShoppingLists] = useState([shoppingListsRequestInitState]);

    const [url, setUrl] = useState("");

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    const navbarHandle = useContext(NavbarHandleContext);

    const searchModalId = "shopping-list-search-modal";

    useEffect(() => {
        navbarHandle.setItems({
            middle: [
                (<ShoppingListButtonCreate/>)
            ],
            right: [
                (<ButtonNavbarSearch onClick={showModalHandle}/>)
            ]
        });
    }, []);

    useEffect(() => {
        initData();
    }, [url]);

    const initData = () => {
        loadingProcessScreen.show();
        ShoppingListsRC.get({
            uri: url,
            success: data => {
                setShoppingListsResponse(data);

                if (!shoppingLists[0].id) {
                    setShoppingLists(data.data);
                } else {
                    setShoppingLists([...shoppingLists, ...data.data]);
                }
            },
            error: () => showMessage.error({message: "Error al obtener la lista de la compra."}),
            final: loadingProcessScreen.hide
        });
    }

    const deleteConfirmDialog = (id) => {
        confirmDialog.deleted({
            accept: () => {
                onClickDelete(id);
            }
        });
    }

    const onClickDelete = (id) => {
        loadingProcessScreen.show();
        ShoppingListsRC.delete({
            id: id,
            success: () => {
                initData();
                showMessage.success({message: "Lista borrada."});
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    }

    const loadShoppingListHandle = () => {
        setUrl(shoppingListsResponse.links.next);
    };

    const showButtonLoadShoppingList = () => {
        const {current_page, last_page} = shoppingListsResponse.meta;

        return current_page < last_page;
    }

    const showModalHandle = () => {
        $(`#${searchModalId}`).modal('show');
    }

    return (
        <Content>
            <Content.Header>
                <div className="d-flex justify-content-between">
                    <h1>Listas</h1>
                    <button className="btn" type="button">
                        <i className="fas fa-filter"/>
                    </button>
                </div>
            </Content.Header>
            <Content.Main>
                {
                    shoppingLists.map(data => (
                        <Card className="card-primary card-outline" key={`shopping-list-${data.id}`}>
                            <Card.Body>
                                <h3 className="card-title">{data.name}</h3>
                                <br/>
                                <span className="text-muted">{data.total_products} Productos</span>
                                <br/>
                                <small className="text-muted">{dateFormat(data.updated_at)}</small>
                            </Card.Body>
                        </Card>
                    ))
                }
                {
                    showButtonLoadShoppingList() && (
                        <Button className="btn-block mb-3" variant="default" onClick={loadShoppingListHandle}>
                            <i className="fas fa-spinner pr-1"/>
                            Cargar más
                        </Button>
                    )
                }
                <ShoppingListSearchModal searchModalId={searchModalId}/>
            </Content.Main>
        </Content>
    );
};

export default ShoppingLists;