import {useContext, useEffect, useState} from "react";
import shoppingListsInitState from "../../../assests/responses/shopping-lists.json"
import {ConfirmDialogContext, LoadingProcessScreenContext, ShowMessagesContext} from "../../../App";
import ShoppingListsRC from "../../../services/ShoppingListsRC";
import Content from "../../common/content/Content";
import Card from "../../common/card/Card";
import {dateFormat} from "../../../common/date-utils";

const ShoppingList = () => {

    const [shoppingLists, setShoppingLists] = useState(shoppingListsInitState);

    const [url, setUrl] = useState("");

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    useEffect(() => {
        initData();
    }, [url]);

    const initData = () => {
        loadingProcessScreen.show();
        ShoppingListsRC.get({
            uri: url,
            success: setShoppingLists,
            error: () => showMessage.error({message: "Error al obtener la lista de la compra."}),
            final: loadingProcessScreen.hide
        });
    }

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setUrl(url);
    };

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
                    shoppingLists.data.map(data => (
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
            </Content.Main>
        </Content>
    );
};

export default ShoppingList;