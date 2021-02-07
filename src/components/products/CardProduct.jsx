import {Link} from "react-router-dom";

const CardProduct = ({id, name, price, img_url, calories, description}) => (
    <div className="card bg-light">
        <div className="card-header text-muted border-bottom-0">
            <h2 className="card-title">{name}</h2>
        </div>
        <div className="card-body pt-0">
            <div className="row">
                <div className="col-7">
                    <p className="text-muted text-sm long-text">{description}</p>
                    <ul className="ml-4 mb-0 fa-ul text-muted">
                        <li className="small">
                            <span className="fa-li"><i className="fas fa-lg fa-euro-sign"/></span>
                            <span>{price} €</span>
                        </li>
                        <li className="small">
                            <span className="fa-li"><i className="fas fa-lg fa-burn"/></span>
                            <span>{calories} kcal</span>
                        </li>
                    </ul>
                </div>
                <div className="col-5 text-center">
                    <img src={img_url} alt="image-product" className="img-rounded img-fluid"/>
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
                    <Link to={`/products/${id}`} className="btn btn-sm btn-primary">
                        Ver producto
                    </Link>
                    <a href="#" className="btn btn-sm btn-default">
                        <i className="fas fa-cart-arrow-down"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default CardProduct;