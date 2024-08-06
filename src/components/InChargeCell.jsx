import { useState, useEffect } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const InchargeCell = ({ getValue, row, column, table, inchargeN }) => {
  const { inchargeName, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [incharges, setIncharges] = useState([]);
  const [newIncharge, setNewIncharge] = useState({ inchargeName: "", lastName: "", email: "" });
  const [editInchargeId, setEditInchargeId] = useState(null);
  const [editIncharge, setEditIncharge] = useState({ inchargeName: "", lastName: "", email: "" });
  const [inchargename, setinchargename] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchIncharges = async () => {
      try {
        const response = await axios.get("http://localhost:5000/incharges");
        setIncharges(response.data);
      } catch (error) {
        console.error("Error fetching incharges:", error);
      }
    };

    const fetchInchargeName = async () => {
      try {
        setinchargename(inchargeN);
      } catch (error) {
        console.error("Error fetching incharge name:", error);
      }
    };

    fetchIncharges();

    if (inchargeN) {
      fetchInchargeName();
    }
  }, [inchargeN]);

  const handleAddIncharge = async () => {
    if (newIncharge.inchargeName.trim() === "" || newIncharge.lastName.trim() === "" || newIncharge.email.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/incharges", newIncharge);
      const incharge = { id: response.data.id, ...newIncharge, color: "gray.300" };
      setIncharges([...incharges, incharge]);
      setNewIncharge({ inchargeName: "", lastName: "", email: "" });
    } catch (error) {
      console.error("Error adding incharge:", error);
    }
  };

  const handleEditIncharge = async () => {
    if (editIncharge.inchargeName.trim() === "" || editIncharge.lastName.trim() === "" || editIncharge.email.trim() === "") return;

    try {
      await axios.put(`http://localhost:5000/incharges/${editInchargeId}`, editIncharge);

      const updatedIncharges = incharges.map((incharge) =>
        incharge.id === editInchargeId
          ? { ...incharge, ...editIncharge }
          : incharge
      );
      setIncharges(updatedIncharges);
      setEditInchargeId(null);
      setEditIncharge({ inchargeName: "", lastName: "", email: "" });
    } catch (error) {
      console.error("Error updating incharge:", error);
    }
  };

  const handleInchargeChange = async (incharge) => {
    try {
      await updateData(row.index, column.id, incharge.inchargeName);
      setinchargename(incharge.inchargeName);
      toast({
        title: "Incharge Updated",
        description: `Incharge updated to ${incharge.inchargeName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating incharge:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update incharge.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const startEditing = (incharge, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditInchargeId(incharge.id);
    setEditIncharge({ inchargeName: incharge.inchargeName, lastName: incharge.lastName, email: incharge.email });
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {inchargename || "Select Incharge"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {incharges.map((incharge, index) => (
          <MenuItem
            onClick={() => handleInchargeChange(incharge)}
            key={incharge.id || index}
          >
            <ColorIcon color={incharge.color} mr={3} />
            {incharge.inchargeName} {incharge.lastName} ({incharge.email})
            {/* <Button ml={3} size="xs" onClick={(e) => startEditing(incharge, e)}>Edit</Button> */}
          </MenuItem>
        ))}
        <Box p={3}>
          {editInchargeId ? (
            <>
              <Input
                placeholder="Edit incharge name"
                value={editIncharge.inchargeName}
                onChange={(e) => setEditIncharge({ ...editIncharge, inchargeName: e.target.value })}
                mb={2}
              />
              <Input
                placeholder="Edit last name"
                value={editIncharge.lastName}
                onChange={(e) => setEditIncharge({ ...editIncharge, lastName: e.target.value })}
                mb={2}
              />
              <Input
                placeholder="Edit email"
                value={editIncharge.email}
                onChange={(e) => setEditIncharge({ ...editIncharge, email: e.target.value })}
                mb={2}
              />
              <Button onClick={handleEditIncharge} colorScheme="blue">Save Changes</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Incharge name"
                value={newIncharge.inchargeName}
                onChange={(e) => setNewIncharge({ ...newIncharge, inchargeName: e.target.value })}
                mb={2}
              />
              <Input
                placeholder="Last name"
                value={newIncharge.lastName}
                onChange={(e) => setNewIncharge({ ...newIncharge, lastName: e.target.value })}
                mb={2}
              />
              <Input
                placeholder="Email"
                value={newIncharge.email}
                onChange={(e) => setNewIncharge({ ...newIncharge, email: e.target.value })}
                mb={2}
              />
              <Button onClick={handleAddIncharge} colorScheme="blue" isDisabled={!newIncharge.inchargeName.trim() || !newIncharge.lastName.trim() || !newIncharge.email.trim()}>Add Incharge</Button>
              {(!newIncharge.inchargeName.trim() || !newIncharge.lastName.trim() || !newIncharge.email.trim()) && <Text color="red.500" mt={2}>All fields are required</Text>}
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default InchargeCell;
