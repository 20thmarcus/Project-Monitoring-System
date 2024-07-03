import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditableCellNumber = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <NumberInput
      value={value}
      onChange={(valueString) => setValue(parseFloat(valueString))}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      step={0.5}
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
export default EditableCellNumber;
