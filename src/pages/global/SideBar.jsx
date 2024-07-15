import React, { useState, useEffect } from 'react';
import {
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, VStack, Box, Editable, EditableInput, EditablePreview, Flex, IconButton, Button
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import DATA from '../../data';

const SideBar = ({ onSelectProject, isOpen, onClose, onClearFilter }) => {
  const [components, setComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedComponents = JSON.parse(localStorage.getItem('components')) || [];
    if (storedComponents.length === 0) {
      const projectIDs = [...new Set(DATA.map(item => item.projectID))];
      const initialComponents = projectIDs.map(id => ({ id, name: `Project ${id}` }));
      localStorage.setItem('components', JSON.stringify(initialComponents));
      setComponents(initialComponents);
    } else {
      setComponents(storedComponents);
    }
  }, []);

  const addComponent = () => {
    const newComponent = {
      id: components.length ? Math.max(...components.map(c => c.id)) + 1 : 1,
      name: `Project ${components.length + 1}`
    };
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    updateLocalStorage(updatedComponents);
  };

  const deleteComponent = (id) => {
    const updatedComponents = components.filter(component => component.id !== id);
    setComponents(updatedComponents);
    updateLocalStorage(updatedComponents);
  };

  const updateLocalStorage = (updatedComponents) => {
    localStorage.setItem('components', JSON.stringify(updatedComponents));
  };

  const handleComponentClick = (id) => {
    const component = components.find(component => component.id === id);
    onSelectProject(id, component.name);
    console.log(`Selecting ${id}`);
  };

  const handleRename = (id, newName) => {
    const updatedComponents = components.map(component =>
      component.id === id ? { ...component, name: newName } : component
    );
    setComponents(updatedComponents);
    updateLocalStorage(updatedComponents);
  };

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearFilter = () => {
    onClearFilter(); // Call the parent function to clear filter
    setSearchTerm(''); // Clear search term if needed
  };

  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Tuesday.com</DrawerHeader>
        <DrawerBody>
          <Flex flexDirection="row">
            <Input
              sx={{ ml: 2, flex: 1, mb: 4 }}
              placeholder='Search projects...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AddIcon onClick={addComponent} ml={4} mt={3} aria-label="Add Project" />
          </Flex>
          
            <Button onClick={clearFilter} mb={4} ml={2}>Summary</Button>
          
          <VStack spacing={4}>
            {filteredComponents.map((component) => (
              <Box
                key={component.id}
                p={4}
                borderWidth={1}
                borderRadius="lg"
                w="100%"
                onClick={() => handleComponentClick(component.id)}
                cursor="pointer"
                position="relative"
                _hover={{ backgroundColor: 'gray.900' }}
              >
                <Editable defaultValue={component.name} onSubmit={(newName) => handleRename(component.id, newName)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <IconButton
                  aria-label="Delete component"
                  icon={<DeleteIcon />}
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComponent(component.id);
                  }}
                />
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
