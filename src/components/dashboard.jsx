import React from 'react';
import { Box, Heading} from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DATA from '../data';

const Dashboard = ({ projectID }) => {
  // Filter data for the selected project
  const filteredData = DATA.filter(item => item.projectID === projectID);

  // Prepare data for the chart
  const chartData = filteredData.map(item => ({
    task: item.task,
    status: item.status.name,
    budgetHours: item.budgetHours || 0,
    actualHours: item.actualHours || 0,
  }));

  return (
    <Box width="100%" height="400px" mt="150px">

      <Heading>
        This is the dashboard
      </Heading>
      {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="task" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budgetHours" fill="#8884d8" />
          <Bar dataKey="actualHours" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer> */}
    </Box>
  );
};

export default Dashboard;
