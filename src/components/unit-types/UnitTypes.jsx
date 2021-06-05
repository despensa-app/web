import {useContext, useEffect, useState} from "react";
import Content from "../common/Content";
import Card from "../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import Pagination from "../common/Pagination";
import UnitTypeForm from "./UnitTypeForm";
import {Link, useParams} from "react-router-dom";

const UnitTypes = () => {

    const urlBase = 'http://despensa-app.api/api/unit-types';

    const breadcrumbItems = {
        home: {
            preIconClassName: 'fas fa-home',
            url: '/'
        },
        items:
            [
                {
                    label: 'Tipo de unidades',
                    active: true
                }
            ]
    };

    const unitTypesData = {
        "data": [
            {
                "id": 46,
                "name": "perferendis",
                "created_at": 1612031857,
                "updated_at": 1612031857
            }
        ],
        "links": {
            "first": "http://despensa-app.api/api/unit-types?page=1",
            "last": "http://despensa-app.api/api/unit-types?page=67",
            "prev": "http://despensa-app.api/api/unit-types?page=3",
            "next": "http://despensa-app.api/api/unit-types?page=5"
        },
        "meta": {
            "current_page": 4,
            "from": 46,
            "last_page": 67,
            "links": [
                {
                    "url": "http://despensa-app.api/api/unit-types?page=3",
                    "label": "&laquo; Previous",
                    "active": false
                }
            ],
            "path": "http://despensa-app.api/api/unit-types",
            "per_page": 15,
            "to": 60,
            "total": 1000
        }
    }

    const [unitTypes, setUnitTypes] = useState(unitTypesData);

    const [url, setUrl] = useState(urlBase);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const {unitTypeId} = useParams();

    const showMessage = useContext(ShowMessagesContext);

    useEffect(() => {
        initData();
    }, [url]);

    const initData = () => {
        loadingProcessScreen.show();
        fetch(url)
            .then(response => response.json())
            .then(data => setUnitTypes(data))
            .catch(error => console.log(error))
            .finally(loadingProcessScreen.hide);
    };

    const PageHeader = () => (
        <>
            <span>Tipo de unidades de productos</span>
            {unitTypeId && <Link to="/unit-types" className="btn btn-success">
                <i className="fas fa-plus"/>
            </Link>}
        </>
    );

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setUrl(url);
    };

    const onActionSubmit = () => {
        initData();
    }

    const onClickDelete = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        loadingProcessScreen.show();
        fetch(`${urlBase}/${id}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    initData();
                    showMessage.success({message: "Tipo de unidad borrada."});
                } else {
                    loadingProcessScreen.hide();
                    return response.json()
                }
            })
            .then(response => {
                if (response && response.error) {
                    showMessage.error(response.error);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <UnitTypeForm onActionSubmit={onActionSubmit}/>
            <Card className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th/>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            unitTypes.data.map((unitType, i) => (
                                <tr key={`unit-type-${i}`}>
                                    <td className="w-25 td-btn-actions">
                                        <div className="btn-group">
                                            <Link to={`/unit-types/${unitType.id}`} className="btn btn-primary btn-sm" href="/">
                                                <i className="fas fa-edit"/>
                                            </Link>
                                            <button className="btn btn-danger btn-sm" onClick={(e) => onClickDelete(unitType.id)}>
                                                <i className="far fa-trash-alt"/>
                                            </button>
                                        </div>
                                    </td>
                                    <td>{unitType.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination
                    links={unitTypes.meta.links}
                    onClick={onPageClick}
                    nameKey="unit-types"/>
            </Card>
        </Content>
    );
};

export default UnitTypes;