import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LeadTimeCell = ({ getValue, row, column, table }) => {
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
      step={1}
      precision={1}
      min={0}
      ml={2}
      mt={1}
      mb={1}
      
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
