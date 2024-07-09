import React, { useState } from 'react';
import SideBar from './pages/global/SideBar';
import TaskTable from './components/TaskTable';

const App = () => {
  const [selectedProjectID, setSelectedProjectID] = useState(null);
  const handleSelectProject = (projectID) => {
    setSelectedProjectID(projectID);
  };
  return (
    <>
        <SideBar onSelectProject={handleSelectProject} />
        <TaskTable projectID={selectedProjectID} />
    </>

  );
};

export default App;

