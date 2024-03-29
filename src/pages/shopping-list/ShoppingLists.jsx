import {useEffect, useState} from "react";
import shoppingListsResponseInitState from "../../services/init-state/responses/shopping-lists.json"
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json"
import ShoppingListsRC from "../../services/ShoppingListsRC";
import Content from "../../components/common/content/Content";
import Card from "../../components/common/card/Card";
import {dateFormat} from "../../utils/date-utils";
import ShoppingListButtonCreate from "../../components/shopping-list/ShoppingListButtonCreate";
import ButtonNavbarSearch from "../../components/common/ButtonNavbarSearch";
import $ from 'jquery';
import ShoppingListSearchModal from "../../components/shopping-list/ShoppingListSearchModal";
import {useHistory} from "react-router-dom";
import CustomButtonLoad from "../../components/common/CustomButtonLoad";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import {useSetNavbarItems} from "../../hooks/useNavbarItems";
import CommonHeader from "../../components/common/CommonHeader";

const ShoppingLists = () => {

    const [shoppingListsResponse, setShoppingListsResponse] = useState(shoppingListsResponseInitState);

    const [shoppingLists, setShoppingLists] = useState([shoppingListsRequestInitState]);

    const [nextShoppingListPageURL, setNextShoppingListPageURL] = useState("");

    const searchModalId = "shopping-list-search-modal";

    const history = useHistory();

    const {showLoadingProcessScreen, hideLoadingProcessScreen} = useLoadingProcessScreen();

    const {showErrorMessage} = useShowToastMessage();

    const {setNavbarItems} = useSetNavbarItems();

    useEffect(() => {
        setNavbarItems({
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
        showLoadingProcessScreen();
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
            error: () => showErrorMessage({message: "Error al obtener la lista de la compra."}),
            final: hideLoadingProcessScreen
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
                <CommonHeader title="Listas"/>
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