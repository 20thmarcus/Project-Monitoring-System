import React, { useState, useEffect } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
// import SideBar from './pages/global/SideBar';
import TaskTable from './components/TaskTable';
import Header from './pages/global/Header';
import Dashboard from './components/Dashboard';
import DATA from './data'; 

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProjectID, setSelectedProjectID] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);
  const [taskData, setTaskData] = useState(DATA);

  const handleSelectProject = (projectID, componentName) => {
    setSelectedProjectID(projectID);
    setSelectedComponent(componentName);
  };

  const handleDashboardClick = () => {
    setShowDashboard(!showDashboard);
  };

  const handleDataUpdate = (newData) => {
    setTaskData(newData);
  };

  return (
    <>
      <Box>
        <Header 
          componentName={selectedComponent} 
          onOpenSidebar={onOpen} 
          onDashboardClick={handleDashboardClick}
        />
        {/* <SideBar onSelectProject={handleSelectProject} isOpen={isOpen} onClose={onClose} /> */}
      </Box>
      <Box>
        {showDashboard ? (
          <Dashboard data={taskData} />  //pass task data to dashboard
        ) : (
          <TaskTable projectID={selectedProjectID} onDataUpdate={handleDataUpdate} /> //handle data update
        )}
      </Box>
    </>
  );
};

export default App;
