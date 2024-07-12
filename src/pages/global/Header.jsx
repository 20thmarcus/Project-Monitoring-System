import React from 'react';
import { Flex, Box, Heading, Button, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Dashboard from './dashboard'
import { Route, Router } from 'react-router-dom';

const Header = ({ componentName, onOpenSidebar }) => {
  return (
    <Box
      position="fixed"
      top="0"
      width="100vw"
      bg="gray.800"
      py={4}
      px={5}
      zIndex={2}
    >
      <Flex
        justify="space-between"
        align="center"
      >
        <Flex align="center">
          <IconButton
            aria-label="Open sidebar"
            icon={<HamburgerIcon />}
            mr={4}
            onClick={onOpenSidebar}
          />
          <Heading as="h1" size="lg" variant="logo">Tuesday.com</Heading>
        </Flex>
        <Heading as="h2" size="md">{ componentName }</Heading>
        <Button
          variant="outline"
          onClick={() => {
            
          }}
        >
          Dashboard
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
