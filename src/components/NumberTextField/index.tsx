import React from "react";

import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import "./styles.css";
import { isNumber } from "lodash";

type Props = {
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: number) => void;
  value: number;
  text: string;
};

const NumberTextField = ({
  onChange,
  onDecrease,
  onIncrease,
  value,
  text,
}: Props) => {
  const [inputValue, setInputValue] = React.useState(value);

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget;

    const quantity = Number(value);

    if (isNumber(quantity)) {
      setInputValue(quantity);
      onChange(quantity);
    }
  };

  return (
    <FormControl
      className="number-field-form"
      sx={{ borderColor: "primary.main" }}
    >
      <IconButton className="number-field-form__decrease" onClick={onDecrease}>
        <RemoveCircleIcon className="number-field-form__decrease-icon" />
      </IconButton>

      <InputBase
        type="number"
        fullWidth
        sx={{ ml: 1, flex: 1, textAlign: "center" }}
        placeholder={text}
        inputProps={{
          "aria-label": `product ${text}`,
          style: {
            textAlign: "center",
            position: "relative",
            left: 4,
          },
        }}
        value={value}
        onChange={handleChangeValue}
      />

      <IconButton className="number-field-form__increase" onClick={onIncrease}>
        <AddCircleIcon className="number-field-form__increase-icon" />
      </IconButton>
    </FormControl>
  );
};

export default NumberTextField;
