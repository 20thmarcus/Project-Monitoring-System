import { useState, useEffect } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text } from "@chakra-ui/react";
import axios from "axios";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const InChargeCell = ({ getValue, row, column, table, username }) => {
  const { firstName, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newPersonColor, setNewPersonColor] = useState("");
  const [editPersonId, setEditPersonId] = useState(null);
  const [editPersonName, setEditPersonName] = useState("");
  const [incharge, setIncharge] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setPeople(response.data); // Fix: Use setPeople instead of setUsers
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchUserName = async () => {
      try {
        setIncharge(username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsers();

    if (username) {
      fetchUserName();
    }
  }, [username]);

  const handleAddPerson = async () => {
    if (newPerson.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/users", {
        firstName: newPerson
      });

      const person = { firstName: newPerson };
      setPeople([...people, person]);
      setNewPerson("");
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  const handleEditPerson = async () => {
    if (editPersonName.trim() === "") return;

    try {
      await axios.put(`http://localhost:5000/users/${editPersonId}`, {
        firstName: editPersonName,
      });

      const updatedPeople = people.map((person) =>
        person.id === editPersonId
          ? { ...person, firstName: editPersonName }
          : person
      );
      setPeople(updatedPeople);
      setEditPersonId(null);
      setEditPersonName("");
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  const startEditing = (person, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditPersonId(person.id);
    setEditPersonName(person.firstName);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {incharge || "Select In-Charge"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {people.map((person) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, person)}
            key={person.id}
          >
            <ColorIcon color={person.color} mr={3} />
            {person.firstName}
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
