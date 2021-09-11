import {useContext, useEffect, useState} from "react";
import {ShowMessagesContext} from "../../../App";
import $ from 'jquery';
import Modal from "../../common/modal/Modal";
import Form from "../../common/form/Form";
import Button from "../../common/button/Button";
import ListGroup from "../../common/list-group/ListGroup";
import ShoppingListsRC from "../../../services/ShoppingListsRC";
import {useHistory} from "react-router-dom";
import shoppingListInitState from "../../../assests/requests/shopping-list.json";

const ShoppingListSearchModal = ({searchModalId}) => {

    const [shoppingLists, setShoppingLists] = useState([shoppingListInitState]);

    const [shoppingList, setShoppingList] = useState(shoppingListInitState);

    const showMessage = useContext(ShowMessagesContext);

    const history = useHistory();

    useEffect(() => {
        if (shoppingList.name.length >= 1) {
            search();
        } else {
            setShoppingLists([]);
        }
    }, [shoppingList])

    const closeModalHandle = () => {
        $(`#${searchModalId}`).modal('hide');
    }

    const search = () => {
        ShoppingListsRC.get({
            params: {
                query: shoppingList.name
            },
            success: ({data}) => {
                if (data) {
                    setShoppingLists(data);
                } else {
                    setShoppingLists([]);
                }
            },
            error: () => showMessage.error({message: "Error al obtener la lista de la compra."}),
        });
    };

    const itemHandle = (id) => {
        closeModalHandle();
        history.push(`/shopping-list/${id}`);
    }

    const inputHandle = (evt) => {
        setShoppingList({...shoppingList, [evt.target.name]: evt.target.value})
    }

    return (
        <Modal id={searchModalId}>
            <Modal.Header>
                <Form className="flex-fill">
                    <Form.InputGroup>
                        <Form.Label hide htmlFor="shopping_list_name">Nombre</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            value={shoppingList.name}
                            onChange={inputHandle}
                            type="text"
                            name="name"
                            id="shopping_list_name"
                            placeholder="Buscar lista"/>
                        <Form.InputGroup.Append>
                            <Button variant="default" onClick={closeModalHandle}>
                                <i className="fas fa-times"/>
                            </Button>
                        </Form.InputGroup.Append>
                    </Form.InputGroup>
                </Form>
            </Modal.Header>
            <Modal.Body className="p-0 mb-1">
                <ListGroup variant="flush">
                    {
                        shoppingLists.map((value, i) => (
                            <ListGroup.Item
                                action
                                className="align-items-center"
                                onClick={() => itemHandle(value.id)}
                                key={`shopping-list-search-modal-${i}`}>
                                <i className="fas fa-search pr-1"/>
                                {value.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};

export default ShoppingListSearchModal;