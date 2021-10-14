import {useContext, useEffect, useState} from "react";
import shoppingListsResponseInitState from "../../services/init-state/responses/shopping-lists.json"
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json"
import {ConfirmDialogContext, LoadingProcessScreenContext, NavbarHandleContext, ShowMessagesContext} from "../../App";
import ShoppingListsRC from "../../services/ShoppingListsRC";
import Content from "../../components/common/content/Content";
import Card from "../../components/common/card/Card";
import {dateFormat} from "../../utils/date-utils";
import Button from "../../components/common/button/Button";
import ShoppingListButtonCreate from "../../components/shopping-list/ShoppingListButtonCreate";
import ButtonNavbarSearch from "../../components/common/ButtonNavbarSearch";
import $ from 'jquery';
import ShoppingListSearchModal from "../../components/shopping-list/ShoppingListSearchModal";
import {useHistory} from "react-router-dom";
import CustomButtonLoad from "../../components/common/CustomButtonLoad";

const ShoppingLists = () => {

    const [shoppingListsResponse, setShoppingListsResponse] = useState(shoppingListsResponseInitState);

    const [shoppingLists, setShoppingLists] = useState([shoppingListsRequestInitState]);

    const [nextShoppingListPageURL, setNextShoppingListPageURL] = useState("");

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    const navbarHandle = useContext(NavbarHandleContext);

    const searchModalId = "shopping-list-search-modal";

    const history = useHistory();

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
    }, [nextShoppingListPageURL]);

    const initData = () => {
        loadingProcessScreen.show();
        ShoppingListsRC.get({
            uri: nextShoppingListPageURL,
            success: data => {
                if (data.meta.current_page === shoppingListsResponse.meta.current_page) {
                    return;
                }

                if (shoppingListsResponse.meta.current_page) {
                    setShoppingLists([...shoppingLists, ...data.data]);
                } else {
                    setShoppingLists(data.data);
                }

                setShoppingListsResponse(data);
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

    const loadNextShoppingListPageHandle = () => {
        setNextShoppingListPageURL(shoppingListsResponse.links.next);
    };

    const showModalHandle = () => {
        $(`#${searchModalId}`).modal('show');
    }

    const cardClickHandle = (shoppingListId) => {
        history.push(`/shopping-list/${shoppingListId}`);
    }

    return (
        <Content>
            <Content.Header>
                <div className="d-flex justify-content-between">
                    <h1>Listas</h1>
                    <Button>
                        <i className="fas fa-filter"/>
                    </Button>
                </div>
            </Content.Header>
            <Content.Main>
                {
                    shoppingLists.map(data => (
                        <Card
                            className="card-outline cursor-pointer"
                            variant="primary"
                            onClick={() => cardClickHandle(data.id)}
                            key={`shopping-list-${data.id}`}>
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
                <CustomButtonLoad
                    onClick={loadNextShoppingListPageHandle}
                    metaPage={shoppingListsResponse.meta}/>
                <ShoppingListSearchModal searchModalId={searchModalId}/>
            </Content.Main>
        </Content>
    );
};

export default ShoppingLists;