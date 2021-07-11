import Link from "../common/Link";

const CardProductShopping = ({title, unitTypes, units, onDelete, hrefEdit, hrefView}) => {
    const onClickDelete = () => {
        onDelete();
    };

    return (
        <div className="card bg-light">
            <div className="card-header text-muted border-bottom-0">
                <h2 className="card-title">{title}</h2>
            </div>
            <div className="card-body pt-0">
                <div className="form-group">
                    <label>Tipo de unidad</label>
                    <input className="form-control" value={unitTypes} disabled/>
                </div>
                <div className="form-group mb-0">
                    <label htmlFor="units_per_product">Unidades</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-plus"/>
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            id="units_per_product"
                            value={units} disabled/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <i className="fas fa-minus"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-sm btn-danger" type="button" onClick={onClickDelete}>
                            <i className="fas fa-trash"/>
                        </button>
                    </div>
                    <div className="col-9 text-right">
                        <Link href={hrefEdit} btnColor="success" size="sm">
                            Editar
                        </Link>
                        <Link
                            href={hrefView}
                            btnColor="primary"
                            size="sm"
                            preClassIcon="fas fa-cart-arrow-down">
                            Ver lista
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProductShopping;