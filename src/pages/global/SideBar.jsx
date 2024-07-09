import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, VStack, Box, Editable, EditableInput, EditablePreview, useDisclosure, Flex } from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';

const SideBar = ({ onSelectProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [components, setComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addComponent = () => {
    setComponents([...components, `Project ${components.length + 1}`]);
  };

  const handleComponentClick = (index) => {
    const projectID = index + 1;
    onSelectProject(projectID);
    console.log(`Navigating to Project ${projectID}`);
  };

  const filteredComponents = components.filter(component =>
    component.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HamburgerIcon boxSize={6} ref={btnRef} colorScheme='teal' onClick={onOpen} mb={6} />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
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
              <AddIcon onClick={addComponent} ml={4} mt={3} aria-label="Add Project"/>
            </Flex>
            <Box
              p={4}
              borderWidth={1}
              borderRadius="lg"
              w="100%"
              onClick={() => handleComponentClick()}
              cursor="pointer"
              position="relative"
              mb={4}
            >
              Summary
            </Box>
            <VStack spacing={4}>
              {filteredComponents.map((component, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  w="100%"
                  onClick={() => handleComponentClick(index)}
                  cursor="pointer"
                  position="relative"
                >
                  <Editable defaultValue={component}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBar;
