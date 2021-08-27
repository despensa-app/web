import ShoppingListProductCard from "./ShoppingListProductCard";
import {useContext, useEffect, useState} from "react";
import productsShoppingListInitState from "../../../assests/responses/products-shopping-list.json";
import ShoppingListsRC from "../../../services/ShoppingListsRC";
import {ConfirmDialogContext, LoadingProcessScreenContext, ShowMessagesContext} from "../../../App";
import Pagination from "../../common/Pagination";

const ShoppingListProducts = ({shoppingListId}) => {

    const [productShoppingList, setProductShoppingList] = useState(productsShoppingListInitState);

    const [productsUrlPage, setProductsUrlPage] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    useEffect(() => {
        initDataProducts(productsUrlPage);
    }, [productsUrlPage])

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setProductsUrlPage(url);
        initDataProducts(url);
    };

    const initDataProducts = (url = null) => {
        const path = ShoppingListsRC.getPath({path: [shoppingListId, 'products'], host: true});
        const uri = url ? url : path;

        ShoppingListsRC.get({
            uri,
            success: (data) => {
                setProductShoppingList(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Productos
                    <button className="btn btn-success"><i className="fas fa-plus"/></button>
                </h2>
            </div>
            <div className="card-body">
                <div className="row d-flex align-items-stretch">
                    {
                        productShoppingList.data.map((relationship, i) => (
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                                 key={`product-relationship-${i}`}>
                                <ShoppingListProductCard
                                    name={relationship.product.name}
                                    units_per_product={relationship.units_per_product}
                                    img_url={relationship.product.img_url}
                                    unit_type_name={relationship.unit_type.name}/>
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    links={productShoppingList.meta.links}
                    onClick={onPageClick}
                    nameKey="product-relationship"/>
            </div>
        </div>
    );
}

export default ShoppingListProducts;