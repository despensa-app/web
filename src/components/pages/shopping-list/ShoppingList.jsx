import Content from "../../common/Content";
import {Link} from "react-router-dom";
import routes from "../../../assests/routes.json";
import BreadCrumbApp from "../../../common/BreadCrumbApp";
import ShoppingListCard from "./ShoppingListCard";
import Pagination from "../../common/Pagination";
import {useContext, useEffect, useState} from "react";
import shoppingListsInitState from "../../../assests/responses/shopping-lists.json"
import {ConfirmDialogContext, LoadingProcessScreenContext, ShowMessagesContext} from "../../../App";
import ShoppingListsRC from "../../../services/ShoppingListsRC";

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

    const PageHeader = () => (
        <>
            <span>Lista de la compra </span>
            <Link to={routes.shopping_list_form} className="btn btn-success">
                <i className="fas fa-plus"/>
            </Link>
        </>
    );

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
        <Content pageHeader={<PageHeader/>} breadcrumbItems={BreadCrumbApp.shoppingList()}>
            <div className="card">
                <div className="card-body">
                    <div className="row d-flex align-items-stretch">
                        {
                            shoppingLists.data.map((shoppingList) => (
                                <div className="col-12 col-sm-6 col-md-3 d-flex">
                                    <ShoppingListCard {...shoppingList}
                                                      onClickDelete={deleteConfirmDialog}/>
                                </div>
                            ))
                        }
                    </div>
                    <Pagination
                        links={shoppingLists.meta.links}
                        onClick={onPageClick}
                        nameKey="product-relationship"/>
                </div>
            </div>
        </Content>
    );
};

export default ShoppingList;