import {useContext, useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import Card from "../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../App";

const UnitTypeForm = ({onActionSubmit}) => {

    const url = 'http://despensa-app.api/api/unit-types';

    const [unitTypeName, setUnitTypeName] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const {unitTypeId} = useParams();

    const history = useHistory();

    const showMessage = useContext(ShowMessagesContext);

    useEffect(() => {
        setUnitTypeName('');

        if (!unitTypeId) {
            return;
        }

        loadingProcessScreen.show();
        fetch(`${url}/${unitTypeId}`)
            .then(response => response.json())
            .then(data => {
                setUnitTypeName(data.data.name);
            })
            .catch(error => console.log(error))
            .finally(loadingProcessScreen.hide);
    }, [unitTypeId]);

    const onSubmit = (e) => {
        e.preventDefault();
        loadingProcessScreen.show();

        if (unitTypeId) {
            update();
        } else {
            create();
        }
    };

    const create = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: unitTypeName,
            })
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    showMessage.success({message: "Tipo de unidad creada."});
                }

                return response.json();
            })
            .then(data => history.push(`/unit-types/${data.data.id}`))
            .catch(error => console.log(error))
            .finally(onActionSubmit);
    }

    const update = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: unitTypeName,
            })
        };

        fetch(`${url}/${unitTypeId}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    showMessage.success({message: "Tipo de unidad actualizada."})
                }
            })
            .catch(error => console.log(error))
            .finally(onActionSubmit)
    }


    return (
        <Card>
            <form className="row" onSubmit={onSubmit}>
                <div className="col-sm-10">
                    <div className="row">
                        <label htmlFor="unit_type_name" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                            <input type="text" id="unit_type_name" className="form-control" value={unitTypeName} onChange={(e) => setUnitTypeName(e.target.value)}/>
                        </div>
                    </div>
                    <br className="d-block d-sm-none"/>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-primary btn-block">
                        {unitTypeId ? 'Modificar' : 'Crear'}
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default UnitTypeForm