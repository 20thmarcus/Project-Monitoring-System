import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HoursCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
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
      min={0.5}
      display="flex"
      alignItems="center"
    >
      <NumberInputField />
      <NumberInputStepper mt={1} sx={{ h: "1rem", w: "1rem"}}>
        <NumberIncrementStepper sx={{ fontSize: "0.75rem" }}/>
        <NumberDecrementStepper sx={{ fontSize: "0.75rem" }} />
      </NumberInputStepper>
    </NumberInput>
  );
};
export default HoursCell;
