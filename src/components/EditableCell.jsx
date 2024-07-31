import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const EditableCell = ({ getValue, row, column, table }) => {
  // Ensure initial value is a string
  const initialValue = getValue() ?? '';
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
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value ?? '')} // Default to empty string if null
      onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    />
  );
};

export default EditableCell;
