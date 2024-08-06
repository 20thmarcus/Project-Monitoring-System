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
  const [newIncharge, setNewIncharge] = useState("");
  const [editInchargeId, setEditInchargeId] = useState(null);
  const [editInchargeName, setEditInchargeName] = useState("");
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
    if (newIncharge.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/incharges", {
        inchargeName: newIncharge
      });
      const incharge = { id: response.data.id, inchargeName: newIncharge, color: "gray.300" };
      setIncharges([...incharges, incharge]);
      setNewIncharge("");
    } catch (error) {
      console.error("Error adding incharge:", error);
    }
  };

  const handleEditIncharge = async () => {
    if (editInchargeName.trim() === "") return;

    try {
      await axios.put(`http://localhost:5000/incharges/${editInchargeId}`, {
        inchargeName: editInchargeName,
      });

      const updatedIncharges = incharges.map((incharge) =>
        incharge.id === editInchargeId
          ? { ...incharge, inchargeName: editInchargeName }
          : incharge
      );
      setIncharges(updatedIncharges);
      setEditInchargeId(null);
      setEditInchargeName("");
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
    setEditInchargeName(incharge.inchargeName);
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
            {incharge.inchargeName}
            <Button ml={3} size="xs" onClick={(e) => startEditing(incharge, e)}>Edit</Button>
          </MenuItem>
        ))}
        <Box p={3}>
          {editInchargeId ? (
            <>
              <Input
                placeholder="Edit incharge name"
                value={editInchargeName}
                onChange={(e) => setEditInchargeName(e.target.value)}
                mb={2}
              />
              <Button onClick={handleEditIncharge} colorScheme="blue">Save Changes</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="New incharge name"
                value={newIncharge}
                onChange={(e) => setNewIncharge(e.target.value)}
                mb={2}
              />
              <Button onClick={handleAddIncharge} colorScheme="blue" isDisabled={!newIncharge.trim()}>Add Incharge</Button>
              {!newIncharge.trim() && <Text color="red.500" mt={2}>Incharge name is required</Text>}
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default InchargeCell;
