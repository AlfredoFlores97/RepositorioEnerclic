import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Radio from "@mui/material/Radio/Radio";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { t } from "i18next";
import { ITipo } from "../models/ModeloTipo";

interface RadioProps {
    nombre: string,
    value: number, 
    opciones: ITipo[],
    function: Function
}

const ComponentRadioGroup = (props : RadioProps) => {
    return(
        <RadioGroup
            defaultValue={0}
            onChange={(e) => {props.function(e)}}
        >
            {props.opciones.map((elem, index) => {
                return (
                <FormControlLabel
                    key={elem.key+index}
                    value={index}
                    control={<Radio />}
                    label={t(elem.key)}
                />
                );
            })}
      </RadioGroup>
    );
}

export default ComponentRadioGroup;