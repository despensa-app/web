import {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Card from "../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import {UnitTypesRC} from "../../services/UnitTypesRC";
import unitTypesInitState from "../../assests/requests/unit-type.json";

const UnitTypeForm = ({onActionSubmit}) => {

    const [unitType, setUnitType] = useState(unitTypesInitState)

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const {unitTypeId} = useParams();

    const history = useHistory();

    const showMessage = useContext(ShowMessagesContext);

    useEffect(() => {
        setUnitType(unitTypesInitState);

        if (!unitTypeId) {
            return;
        }

        loadingProcessScreen.show();
        UnitTypesRC.get({
            id: unitTypeId,
            success: (data) => {
                setUnitType(data.data);
            },
            error: (data) => {
                showMessage.error(data.error);
                history.push(UnitTypesRC.getPath());
            },
            final: loadingProcessScreen.hide
        });
    }, [unitTypeId]);

    const onSubmit = (e) => {
        e.preventDefault();
        loadingProcessScreen.show();

        if (unitType.id) {
            update();
        } else {
            create();
        }
    };

    const create = () => {
        UnitTypesRC.post({
            body: unitType,
            success: () => {
                showMessage.success({message: "Tipo de unidad creada."});
            },
            error: (data) => showMessage.error(data.error),
            final: () => {
                onActionSubmit();
                setUnitType(unitTypesInitState);
            }
        });
    }

    const update = () => {
        UnitTypesRC.put({
            body: unitType,
            id: unitType.id,
            success: () => {
                showMessage.success({message: "Tipo de unidad actualizada."})
            },
            error: (data) => showMessage.error(data.error),
            final: onActionSubmit
        });
    }

    const onChangeInput = (evt) => {
        setUnitType({...unitType, [evt.target.name]: evt.target.value})
    }

    return (
        <Card>
            <form className="row" onSubmit={onSubmit}>
                <div className="col-sm-10">
                    <div className="row">
                        <label htmlFor="unit_type_name" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                id="unit_type_name"
                                className="form-control"
                                name="name"
                                value={unitType.name}
                                onChange={onChangeInput}/>
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