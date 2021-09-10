import {useContext, useEffect, useState} from "react";
import Modal from "../../common/modal/Modal";
import Form from "../../common/form/Form";
import Button from "../../common/button/Button";
import ListGroup from "../../common/list-group/ListGroup";
import unitTypeRequestInitState from "../../../assests/requests/unit-type.json";
import {ShowMessagesContext} from "../../../App";
import $ from 'jquery';
import {UnitTypesRC} from "../../../services/UnitTypesRC";

const UnitTypeSearchModal = ({modalId, onClickItem, onClose}) => {

    const [unitTypes, setUnitTypes] = useState([unitTypeRequestInitState]);

    const [unitTypeRequest, setUnitTypeRequest] = useState(unitTypeRequestInitState);

    const showMessage = useContext(ShowMessagesContext);

    useEffect(() => {
        search();
    }, [unitTypeRequest.name]);

    const closeModalHandle = () => {
        $(`#${modalId}`).modal('hide');
        onClose();
    };

    const search = () => {
        UnitTypesRC.get({
            params: {
                query: unitTypeRequest.name
            },
            success: ({data}) => {
                if (data) {
                    setUnitTypes(data);
                } else {
                    setUnitTypes([]);
                }
            },
            error: () => showMessage.error({message: "Error al obtener los tipos de unidad."}),
        });
    };

    const itemHandle = (value) => {
        closeModalHandle();
        onClickItem(value);
    };

    const onChangeHandle = (evt) => {
        setUnitTypeRequest({...unitTypeRequest, [evt.target.name]: evt.target.value})
    };

    return (
        <Modal
            id={modalId}
            keyboard={false}
            backdrop="static">
            <Modal.Header>
                <Form className="flex-fill">
                    <Form.InputGroup>
                        <Form.Label hide htmlFor="unit_type_name">Nombre</Form.Label>
                        <Form.Control
                            autoComplete="off"
                            value={unitTypeRequest.name}
                            onChange={onChangeHandle}
                            type="text"
                            name="name"
                            id="unit_type_name"
                            placeholder="Buscar por nombre"/>
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
                        unitTypes.map((value, i) => (
                            <ListGroup.Item
                                action
                                className="align-items-center"
                                onClick={() => itemHandle(value)}
                                key={`unit-type-search-modal-${i}`}>
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

export default UnitTypeSearchModal;