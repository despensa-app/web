import {useEffect, useState} from "react";
import Form from "../common/form/Form";
import Button from "../common/button/Button";
import $ from 'jquery';
import ShoppingListOptionsModal from "./ShoppingListOptionsModal";
import shoppingListsRequestInitState from "../../services/init-state/requests/shopping-list.json";
import CommonHeader from "../common/CommonHeader";
import {Link} from "react-router-dom";

const ShoppingListHeader = ({
    isEdit,
    shoppingList,
    setShoppingList,
    shoppingListId
}) => {
    const optionsModalId = "options-modal";

    const [unchangedShoppingList, setUnchangedShoppingList] = useState(shoppingListsRequestInitState);

    useEffect(() => {
        if (!isEdit) {
            setUnchangedShoppingList(shoppingList);
        }
    }, [isEdit, shoppingList]);

    const showOptionHandle = () => {
        $(`#${optionsModalId}`).modal('show');
    };

    const resetNameHandle = () => {
        setShoppingList({...shoppingList, name: unchangedShoppingList.name});
    };

    const shoppingListNameHandle = (evt) => {
        setShoppingList({...shoppingList, [evt.target.name]: evt.target.value});
    };

    return (
        <>
            <CommonHeader className="mb-2">
                <div className="flex-grow-1">
                    <Link to="/shopping-list" className="btn pl-0">
                        <i className="fas fa-arrow-left"/>
                    </Link>
                </div>
                {
                    shoppingListId
                    && <>
                        <Button className="pr-0" onClick={showOptionHandle}>
                            <i className="fas fa-ellipsis-h"/>
                        </Button>
                        <ShoppingListOptionsModal modalId={optionsModalId}
                                                  shoppingListId={shoppingListId}/>
                    </>
                }
            </CommonHeader>
            <CommonHeader>
                {
                    isEdit
                        ? <Form className="flex-grow-1">
                            <Form.InputGroup>
                                <Form.Label hide htmlFor="name">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shoppingList.name}
                                    onChange={shoppingListNameHandle}
                                    placeholder="Nombre de la lista"
                                    id="name"
                                    name="name"/>
                                <Form.InputGroup.Append>
                                    <Button variant="default" onClick={resetNameHandle}>
                                        <i className="fas fa-undo-alt"/>
                                    </Button>
                                </Form.InputGroup.Append>
                            </Form.InputGroup>
                        </Form>
                        : <h1 className="flex-grow-1">{shoppingList.name}</h1>
                }
            </CommonHeader>
        </>
    );
};

export default ShoppingListHeader;