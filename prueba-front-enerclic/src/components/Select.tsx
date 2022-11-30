import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import { t } from "i18next";
import { ITipo } from "../models/ModeloTipo";

interface SelectProps {
    nombre: string,
    value: string, 
    required?: boolean, 
    opciones: ITipo[],
    function: Function
}

const ComponentSelect = (props : SelectProps) => {
    return(
        <Select
            name={props.nombre}
            labelId={props.nombre}
            id={props.nombre}
            value={props.value}
            label={props.nombre}
            required={props.required}
            onChange={(e) => {props.function(e)}}
        >
            {props.opciones.map((elem, index) => {
                return (
                    <MenuItem key={index} value={elem.value}>
                        {t(elem.key)}
                    </MenuItem>
                );
            })}
        </Select>
    );
}

export default ComponentSelect;