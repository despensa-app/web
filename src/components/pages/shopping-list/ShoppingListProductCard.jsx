const ShoppingListProductCard = ({name, img_url, unit_type_name, units_per_product}) => {
    return (
        <div className="card bg-light">
            <div className="card-header text-muted border-bottom-0">
                <h2 className="card-title">{name}</h2>
            </div>
            <div className="card-body pt-0">
                <div className="form-group text-center">
                    <img src={img_url} alt="image-product" className="img-rounded img-fluid"/>
                </div>
                <div className="form-group">
                    <label htmlFor="unit_type_product">Tipo de unidad</label>
                    <input className="form-control" value={unit_type_name} disabled/>
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
                            value={units_per_product} disabled/>
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
                        <a href="#" className="btn btn-sm btn-danger">
                            <i className="fas fa-trash"/>
                        </a>
                    </div>
                    <div className="col-9 text-right">
                        <a href="#" className="btn btn-sm btn-primary">
                            Ver producto
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingListProductCard;