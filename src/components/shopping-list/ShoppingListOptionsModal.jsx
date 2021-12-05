import {useContext} from "react";
import {useHistory} from "react-router-dom";
import Modal from "../common/modal/Modal";
import NavTabs from "../common/nav-tabs/NavTabs";
import ListGroup from "../common/list-group/ListGroup";
import ConfirmDialogContext from "../../context/ConfirmDialogContext";
import {useShowToastMessage} from "../../hooks/useToastMessage";
import {useLoadingProcessScreen} from "../../hooks/useLoadingProcessScreen";
import $ from 'jquery';
import ShoppingListsRC from "../../services/ShoppingListsRC";

const ShoppingListOptionsModal = ({modalId, shoppingListId}) => {

    const confirmDialog = useContext(ConfirmDialogContext);

    const {showSuccessMessage, showErrorMessage} = useShowToastMessage();

    const {showLoadingProcessScreen, hideLoadingProcessScreen} = useLoadingProcessScreen();

    const history = useHistory();

    const deleteConfirmDialog = (id) => {
        $(`#${modalId}`).modal('hide');
        confirmDialog.deleted({
            accept: () => {
                onClickDelete(id);
            }
        });
    };

    const onClickDelete = (id) => {
        showLoadingProcessScreen();
        ShoppingListsRC.delete({
            id: id,
            success: () => {
                showSuccessMessage({message: "Lista borrada."});
                history.push("/shopping-list/");
            },
            error: (data) => {
                console.log(data);
                if (data && data.error) {
                    showErrorMessage(data.error);
                }
            },
            final: hideLoadingProcessScreen
        });
    };

    return (
        <Modal id={modalId}>
            <Modal.Body className="p-0">
                <NavTabs>
                    <NavTabs.Item active id="filter">
                        <i className="fas fa-filter pr-1"/>
                        Filtrar
                    </NavTabs.Item>
                    <NavTabs.Item id="sorting">
                        <i className="fas fa-sort pr-1"/>
                        Ordenar
                    </NavTabs.Item>
                    <NavTabs.Item id="options">
                        <i className="fas fa-th-large pr-1"/>
                        Opciones
                    </NavTabs.Item>
                </NavTabs>
                <NavTabs.Content>
                    <NavTabs.Content.Pane active id="filter">
                        <ListGroup variant="flush">
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                <i className="fas fa-tags w-fixed-25"/>
                                <span className="flex-grow-1">Categorías</span>
                                <i className="fas fa-angle-right"/>
                            </ListGroup.Item>
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                <i className="fas fa-calendar-alt w-fixed-25"/>
                                <span className="flex-grow-1">Fecha de creación</span>
                                <i className="fas fa-angle-right"/>
                            </ListGroup.Item>
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                <i className="fas fa-calendar-alt w-fixed-25"/>
                                <span className="flex-grow-1">Fecha de actualización</span>
                                <i className="fas fa-angle-right"/>
                            </ListGroup.Item>
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                <i className="fas fa-star w-fixed-25"/>
                                <span className="flex-grow-1">Favoritos</span>
                                <i className="fas fa-angle-right"/>
                            </ListGroup.Item>
                        </ListGroup>
                    </NavTabs.Content.Pane>
                    <NavTabs.Content.Pane id="sorting">
                        <ListGroup variant="flush">
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                Fecha de actualización
                                <i className="fas fa-long-arrow-alt-down"/>
                            </ListGroup.Item>
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                Fecha de creación
                                <i className="fas fa-long-arrow-alt-down"/>
                            </ListGroup.Item>
                            <ListGroup.Item action
                                            className="d-flex justify-content-between align-items-center">
                                Título
                                <i className="fas fa-long-arrow-alt-down"/>
                            </ListGroup.Item>
                        </ListGroup>
                    </NavTabs.Content.Pane>
                    <NavTabs.Content.Pane id="options">
                        <ListGroup variant="flush">
                            <ListGroup.Item action
                                            className="">
                                <i className="fas fa-clone w-fixed-25"/>
                                Duplicar lista
                            </ListGroup.Item>
                            <ListGroup.Item action
                                            onClick={() => deleteConfirmDialog(shoppingListId)}
                                            className="text-danger border-top">
                                <i className="fas fa-trash w-fixed-25"/>
                                Eliminar lista
                            </ListGroup.Item>
                        </ListGroup>
                    </NavTabs.Content.Pane>
                </NavTabs.Content>
            </Modal.Body>
        </Modal>
    );
};

export default ShoppingListOptionsModal;