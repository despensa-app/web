import Modal from "../common/modal/Modal";

const ShoppingListOptionsModal = ({modalId}) => {
    return (
        <Modal id={modalId}>
            <Modal.Body className="p-0">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link border-radius-0 active" id="filter-tab" data-toggle="tab" href="#filter" role="tab" aria-controls="filter" aria-selected="true">
                            <i className="fas fa-filter pr-1"/>
                            Filtrar
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link border-radius-0" id="sorting-tab" data-toggle="tab" href="#sorting" role="tab" aria-controls="sorting" aria-selected="false">
                            <i className="fas fa-sort pr-1"/>
                            Ordenar
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link border-radius-0" id="options-tab" data-toggle="tab" href="#options" role="tab" aria-controls="options" aria-selected="false">
                            <i className="fas fa-th-large pr-1"/>
                            Opciones
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="filter" role="tabpanel" aria-labelledby="filter-tab">
                        <div className="list-group list-group-flush">
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <i className="fas fa-tags w-fixed-25"/>
                                <span className="flex-grow-1">Categorías</span>
                                <i className="fas fa-angle-right"/>
                            </button>
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <i className="fas fa-calendar-alt w-fixed-25"/>
                                <span className="flex-grow-1">Fecha de creación</span>
                                <i className="fas fa-angle-right"/>
                            </button>
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <i className="fas fa-calendar-alt w-fixed-25"/>
                                <span className="flex-grow-1">Fecha de actualización</span>
                                <i className="fas fa-angle-right"/>
                            </button>
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <i className="fas fa-star w-fixed-25"/>
                                <span className="flex-grow-1">Favoritos</span>
                                <i className="fas fa-angle-right"/>
                            </button>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="sorting" role="tabpanel" aria-labelledby="sorting-tab">
                        <div className="list-group list-group-flush">
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                Fecha de actualización
                                <i className="fas fa-long-arrow-alt-down"/>
                            </button>
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                Fecha de creación
                                <i className="fas fa-long-arrow-alt-down"/>
                            </button>
                            <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                Título
                                <i className="fas fa-long-arrow-alt-down"/>
                            </button>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="options" role="tabpanel" aria-labelledby="options-tab">
                        <div className="list-group list-group-flush">
                            <button type="button" className="list-group-item list-group-item-action">
                                <i className="fas fa-clone w-fixed-25"/>
                                Duplicar lista
                            </button>
                            <button type="button" className="list-group-item list-group-item-action text-danger border-top">
                                <i className="fas fa-trash w-fixed-25"/>
                                Eliminar lista
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ShoppingListOptionsModal;