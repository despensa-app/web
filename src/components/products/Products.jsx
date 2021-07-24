import {useState, useEffect, useContext} from "react";
import Card from "../common/Card";
import Pagination from "../common/Pagination";
import Content from "../common/Content";
import CardProduct from "./CardProduct";
import {Link} from "react-router-dom";
import {ConfirmDialogContext, LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import productsInitState from "../../assests/responses/products.json";
import BreadCrumbApp from "../../common/BreadCrumbApp";
import ProductsRC from "../../services/ProductsRC";
import routes from "../../assests/routes.json";

const Products = () => {

    const [products, setProducts] = useState(productsInitState);

    const [url, setUrl] = useState("");

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    useEffect(() => {
        initData();
    }, [url]);

    const initData = () => {
        loadingProcessScreen.show();
        ProductsRC.get({
            uri: url,
            success: setProducts,
            error: () => showMessage.error({message: "Error al obtener los productos"}),
            final: loadingProcessScreen.hide
        });
    }

    const PageHeader = () => (
        <>
            <span>Productos </span>
            <Link to={routes.products_form} className="btn btn-success">
                <i className="fas fa-plus"/>
            </Link>
        </>
    );

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setUrl(url);
    };

    const onClickDelete = (id) => {
        loadingProcessScreen.show();
        ProductsRC.delete({
            id: id,
            success: () => {
                initData();
                showMessage.success({message: "Producto borrado."});
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
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

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={BreadCrumbApp.product()}>
            <Card>
                <div className="row d-flex align-items-stretch">
                    {
                        products.data.map((product, i) => (
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                                 key={`products-${i}`}>
                                <CardProduct {...product}
                                             onClickDelete={deleteConfirmDialog}/>
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    links={products.meta.links}
                    onClick={onPageClick}
                    nameKey="product-relationship"/>
            </Card>
        </Content>
    );
};

export default Products;