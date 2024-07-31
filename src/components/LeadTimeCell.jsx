import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LeadTimeCell = ({ getValue, row, column, table }) => {
  // Ensure initial value is a number
  const initialValue = getValue() ?? 0;
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onBlur();
  }, [value]);

  return (
    <NumberInput
      value={value}
      onChange={(valueString) => {
        const newValue = parseFloat(valueString);
        setValue(isNaN(newValue) ? 0 : newValue); // Default to 0 if NaN
      }}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      step={1}
      precision={1}
      min={0}
    >
      <NumberInputField />
      <NumberInputStepper sx={{ h: "1rem", w: "1rem" }}>
        <NumberIncrementStepper sx={{ fontSize: "0.75rem" }} />
        <NumberDecrementStepper sx={{ fontSize: "0.75rem" }} />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default LeadTimeCell;
