import { useState } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text } from "@chakra-ui/react";
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
  const [editPersonId, setEditPersonId] = useState(null);
  const [editPersonName, setEditPersonName] = useState("");
  const [editPersonColor, setEditPersonColor] = useState("");

  const handleAddPerson = () => {
    if (newPerson.trim() === "") return;

    const newId = people.length + 1;
    const person = { id: newId, name: newPerson, color: newPersonColor || "gray.300" };
    setPeople([...people, person]);
    PEOPLE.push(person); // Update the PEOPLE array directly
    setNewPerson("");
    setNewPersonColor("");
  };

  const handleEditPerson = () => {
    if (editPersonName.trim() === "") return;

    const updatedPeople = people.map((person) =>
      person.id === editPersonId
        ? { ...person, name: editPersonName, color: editPersonColor || person.color }
        : person
    );
    setPeople(updatedPeople);

    // Update the PEOPLE array directly
    const personIndex = PEOPLE.findIndex((person) => person.id === editPersonId);
    if (personIndex > -1) {
      PEOPLE[personIndex] = { id: editPersonId, name: editPersonName, color: editPersonColor || PEOPLE[personIndex].color };
    }

    // Update all rows in the table with the renamed person
    table.options.data.forEach((rowData, index) => {
      if (rowData[column.id]?.id === editPersonId) {
        updateData(index, column.id, PEOPLE[personIndex]);
      }
    });

    setEditPersonId(null);
    setEditPersonName("");
    setEditPersonColor("");
  };

  const startEditing = (person, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditPersonId(person.id);
    setEditPersonName(person.name);
    setEditPersonColor(person.color);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {name || "Select In-Charge"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {people.map((person) => (
          <MenuItem
            onClick={(e) => updateData(row.index, column.id, person)}
            key={person.id}
          >
            <ColorIcon color={person.color} mr={3} />
            {person.name}
            <Button ml={3} size="xs" onClick={(e) => startEditing(person, e)}>Edit</Button>
          </MenuItem>
        ))}
        <Box p={3}>
          {editPersonId ? (
            <>
              <Input
                placeholder="Edit person name"
                value={editPersonName}
                onChange={(e) => setEditPersonName(e.target.value)}
                mb={2}
              />
              <Input
                placeholder="Edit person color"
                value={editPersonColor}
                onChange={(e) => setEditPersonColor(e.target.value)}
                mb={2}
              />
              <Button onClick={handleEditPerson} colorScheme="blue">Save Changes</Button>
            </>
          ) : (
            <>
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
              <Button onClick={handleAddPerson} colorScheme="blue" isDisabled={!newPerson.trim()}>Add Person</Button>
              {!newPerson.trim() && <Text color="red.500" mt={2}>Person name is required</Text>}
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default InChargeCell;
