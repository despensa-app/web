import Content from "../../common/Content";
import {useContext, useEffect, useState} from "react";
import shoppingListInitState from "../../../assests/requests/shopping-list.json"
import BreadCrumbApp from "../../../common/BreadCrumbApp";
import Card from "../../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../../App";
import {Link, useHistory, useParams} from "react-router-dom";
import ShoppingListsRC from "../../../services/ShoppingListsRC";
import ShoppingListProducts from "./ShoppingListProducts";


const ShoppingListForm = () => {

    const {shoppingListId} = useParams();

    const history = useHistory();

    const [shoppingList, setShoppingList] = useState(shoppingListInitState);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const breadcrumbItems = BreadCrumbApp.shoppingList([
        {
            label: shoppingList.id ? 'Modificar' : 'Nuevo',
            active: true
        }
    ]);

    useEffect(() => {
        setShoppingList(shoppingListInitState);

        if (!shoppingListId) {
            return;
        }

        loadingProcessScreen.show();
        ShoppingListsRC.get({
            id: shoppingListId,
            success: ({data}) => {
                setShoppingList(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    }, [shoppingListId]);

    const PageHeader = () => (
        <>
            <span>{shoppingList.id ? 'Modificar' : 'Nueva'} lista de la compra</span>
            {shoppingListId && (
                <Link to={ShoppingListsRC.getPath({path: ['form']})} className="btn btn-success">
                    <i className="fas fa-plus"/>
                </Link>
            )}
        </>
    );

    const CardFooter = () => (
        <button type="submit" className="btn btn-primary">{shoppingList.id ? 'Guardar' : 'Crear'}</button>
    );

    const onSubmit = (e) => {
        e.preventDefault();
        loadingProcessScreen.show();

        if (shoppingList.id) {
            update();
        } else {
            create();
        }
    };

    const create = () => {
        ShoppingListsRC.post({
            body: shoppingList,
            id: shoppingList.id,
            success: ({data}) => {
                showMessage.success({message: "Lista creada."});
                history.push(ShoppingListsRC.getPath({path: [data.id]}));
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    }

    const update = () => {
        ShoppingListsRC.put({
            body: shoppingList,
            id: shoppingList.id,
            success: () => {
                showMessage.success({message: "Lista actualizada."});
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    }

    const onChangeInput = (evt) => {
        setShoppingList({...shoppingList, [evt.target.name]: evt.target.value})
    }

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <form onSubmit={onSubmit}>
                <Card footer={<CardFooter/>}>
                    <div className="form-group mb-0">
                        <label htmlFor="shopping_list_name">Nombre</label>
                        <input
                            type="text"
                            value={shoppingList.name}
                            name="name"
                            onChange={onChangeInput}
                            className="form-control"
                            id="shopping_list_name"
                            placeholder="Ingrese el nombre"/>
                    </div>
                </Card>
            </form>
            {shoppingList.id !== 0 && <ShoppingListProducts shoppingListId={shoppingListId}/>}
        </Content>
    );
}

export default ShoppingListForm;