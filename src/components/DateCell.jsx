import { forwardRef } from "react";
import { Box, Center, Icon } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./icons/CalendarIcon";

const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
  <Center ref={ref} onClick={onClick} cursor="pointer">
    {value ? (
      <>
        {value}
        <Box
          pos="absolute"
          right={3}
          fontSize="md"
          color="red.300"
          onClick={(e) => {
            e.stopPropagation();
            clearDate();
          }}
        >
          &times;
        </Box>
      </>
    ) : (
      <Icon as={CalendarIcon} fontSize="xl" />
    )}
  </Center>
));

const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue();
  const { updateData } = table.options.meta;

  const handleChange = (selectedDate) => {
    updateData(row.index, column.id, selectedDate);
  };

  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MM/dd/yyyy"
      selected={date}
      onChange={handleChange}
      customInput={
        <DateCustomInput
          clearDate={() => handleChange(null)}
        />
      }
    />
  );
};

export default DateCell;
