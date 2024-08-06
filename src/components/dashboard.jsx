import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

const Dashboard = ({ data }) => {
  const statusData = Object.values(
    data.reduce((acc, task) => {
      const { status } = task;
      if (!acc[status]) {
        acc[status] = { name: status, value: 0 };
      }
      acc[status].value += 1;
      return acc;
    }, {})
  );

  const inChargeData = Object.values(
    data.reduce((acc, task) => {
      const { incharge } = task;
      if (!acc[incharge]) {
        acc[incharge] = { name: incharge, value: 0 };
      }
      acc[incharge].value += 1;
      return acc;
    }, {})
  );

  const barData = data.map(task => ({
    name: task.task,
    hours: task.actualHours || 0,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4C4C'];

  return (
    <Box>
      <Flex direction="row" wrap="wrap" justify="space-between" mt={20}>
        <Box width={{ base: '100%', md: '33%' }} p={4}>
          <Heading mb="20px">
            Task Status Distribution
          </Heading>
          <PieChart width={400} height={400}>
            <Pie
              data={statusData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`status-cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </Box>

        <Box width={{ base: '100%', md: '33%' }} p={4}>
          <Heading mb="20px">
            Hours Spent Per Task
          </Heading>
          <BarChart width={600} height={400} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </Box>

        <Box width={{ base: '100%', md: '33%' }} p={4}>
          <Heading mb="20px">
            Tasks by In-Charge
          </Heading>
          <PieChart width={400} height={400}>
            <Pie
              data={inChargeData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {inChargeData.map((entry, index) => (
                <Cell key={`incharge-cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
