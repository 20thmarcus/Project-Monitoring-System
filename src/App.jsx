import React, { useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import SideBar from './pages/global/SideBar';
import TaskTable from './components/TaskTable';
import Header from './pages/global/Header';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProjectID, setSelectedProjectID] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('');

  const handleSelectProject = (projectID, componentName) => {
    setSelectedProjectID(projectID);
    setSelectedComponent(componentName);
  };

  return (
    <>
      <Box>
        <Header componentName={selectedComponent} onOpenSidebar={onOpen} />
        <SideBar onSelectProject={handleSelectProject} isOpen={isOpen} onClose={onClose} />
      </Box>
      <Box>
        <TaskTable projectID={selectedProjectID} />
      </Box>
    </>
  );
};

export default App;
