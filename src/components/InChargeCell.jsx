import { useState } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button } from "@chakra-ui/react";
import { PEOPLE } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const InChargeCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [people, setPeople] = useState(PEOPLE);
  const [newPerson, setNewPerson] = useState("");
  const [newPersonColor, setNewPersonColor] = useState("");

  const handleAddPerson = () => {
    const newId = people.length + 1;
    const person = { id: newId, name: newPerson, color: newPersonColor || "gray.300" };
    setPeople([...people, person]);
    PEOPLE.push(person); // Update the PEOPLE array directly
    setNewPerson("");
    setNewPersonColor("");
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {name ? <ColorIcon color={color} mr={3} /> : null}{name || "Select In-Charge"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {people.map((incharge) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, incharge)}
            key={incharge.id}
          >
            <ColorIcon color={incharge.color} mr={3} />
            {incharge.name}
          </MenuItem>
        ))}
        <Box p={3}>
          <Input
            placeholder="New person name"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            mb={2}
          />
          <Input
            placeholder="New person color"
            value={newPersonColor}
            onChange={(e) => setNewPersonColor(e.target.value)}
            mb={2}
          />
          <Button onClick={handleAddPerson} colorScheme="blue">Add Person</Button>
        </Box>
      </MenuList>
    </Menu>
  );
};

export default InChargeCell;
