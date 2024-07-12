import React from 'react';
import { Box, Heading} from '@chakra-ui/react';
//import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Dashboard = ({ data }) => {
  return (
    <Box>
      <Heading mt="200px">
        This is the dashboard
      </Heading>
      {/* <BarChart width={600} height={300} data={data}>
        <XAxis dataKey="task" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="project" fill="#8884d8" />
        <Bar dataKey="status" fill="#82ca9d" />
      </BarChart> */}
    </Box>
  );
};

export default Dashboard;
