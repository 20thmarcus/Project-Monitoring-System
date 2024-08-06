import { useState, useEffect } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const ModuleCell = ({ getValue, row, column, table, moduleN }) => {
  const { moduleName, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [editModuleId, setEditModuleId] = useState(null);
  const [editModuleName, setEditModuleName] = useState("");
  const [modulename, setmodulename] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/modules");
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    const fetchModuleName = async () => {
      try {
        setmodulename(moduleN);
      } catch (error) {
        console.error("Error fetching module name:", error);
      }
    };

    fetchModules();

    if (moduleN) {
      fetchModuleName();
    }
  }, [moduleN]);

  const handleAddModule = async () => {
    if (newModule.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/modules", {
        moduleName: newModule
      });
      const module = { id: response.data.id, moduleName: newModule, color: "gray.300" };
      setModules([...modules, module]);
      setNewModule("");
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  const handleEditModule = async () => {
    if (editModuleName.trim() === "") return;

    try {
      await axios.put(`http://localhost:5000/modules/${editModuleId}`, {
        moduleName: editModuleName,
      });

      const updatedModules = modules.map((module) =>
        module.id === editModuleId
          ? { ...module, moduleName: editModuleName }
          : module
      );
      setModules(updatedModules);
      setEditModuleId(null);
      setEditModuleName("");
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  const handleModuleChange = async (module) => {
    try {
      await updateData(row.index, column.id, module.moduleName);
      setmodulename(module.moduleName);
      toast({
        title: "Module Updated",
        description: `Module updated to ${module.moduleName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating module:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update module.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const startEditing = (module, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditModuleId(module.id);
    setEditModuleName(module.moduleName);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {modulename || "Select Module"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {modules.map((module, index) => (
          <MenuItem
            onClick={() => handleModuleChange(module)}
            key={module.id || index}
          >
            <ColorIcon color={module.color} mr={3} />
            {module.moduleName}
            <Button ml={3} size="xs" onClick={(e) => startEditing(module, e)}>Edit</Button>
          </MenuItem>
        ))}
        <Box p={3}>
          {editModuleId ? (
            <>
              <Input
                placeholder="Edit module name"
                value={editModuleName}
                onChange={(e) => setEditModuleName(e.target.value)}
                mb={2}
              />
              <Button onClick={handleEditModule} colorScheme="blue">Save Changes</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="New module name"
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
                mb={2}
              />
              <Button onClick={handleAddModule} colorScheme="blue" isDisabled={!newModule.trim()}>Add Module</Button>
              {!newModule.trim() && <Text color="red.500" mt={2}>Module name is required</Text>}
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default ModuleCell;
