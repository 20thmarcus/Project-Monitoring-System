import { useState } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text } from "@chakra-ui/react";
import { PROJECTS } from "../data";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

const ProjectCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta;
  const [projects, setProjects] = useState(PROJECTS);
  const [newProject, setNewProject] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectColor, setEditProjectColor] = useState("");

  const handleAddProject = () => {
    if (newProject.trim() === "") return;

    const newId = projects.length + 1;
    const project = { id: newId, name: newProject, color: newProjectColor || "gray.300" };
    setProjects([...projects, project]);
    PROJECTS.push(project); // Update the PROJECT array directly
    setNewProject("");
    setNewProjectColor("");
  };

  const handleEditProject = () => {
    if (editProjectName.trim() === "") return;

    const updatedProjects = projects.map((project) =>
      project.id === editProjectId
        ? { ...project, name: editProjectName, color: editProjectColor || project.color }
        : project
    );
    setProjects(updatedProjects);

    // Update the PROJECT array directly
    const projectIndex = PROJECTS.findIndex((project) => project.id === editProjectId);
    if (projectIndex > -1) {
      PROJECTS[projectIndex] = { id: editProjectId, name: editProjectName, color: editProjectColor || PROJECTS[projectIndex].color };
    }

    // Update all rows in the table with the renamed project
    table.options.data.forEach((rowData, index) => {
      if (rowData[column.id]?.id === editProjectId) {
        updateData(index, column.id, PROJECTS[projectIndex]);
      }
    });

    setEditProjectId(null);
    setEditProjectName("");
    setEditProjectColor("");
  };

  const startEditing = (project, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditProjectId(project.id);
    setEditProjectName(project.name);
    setEditProjectColor(project.color);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {name || "Select Project"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>
        {projects.map((project) => (
          <MenuItem
            onClick={(e) => updateData(row.index, column.id, project)}
            key={project.id}
          >
            <ColorIcon color={project.color} mr={3} />
            {project.name}
            <Button ml={3} size="xs" align="right" onClick={(e) => startEditing(project, e)}>Edit</Button>
          </MenuItem>
        ))}
        <Box p={3}>
          {editProjectId ? (
            <>
              <Input
                placeholder="Edit project name"
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
                mb={2}
              />
              <Input
                placeholder="Edit project color"
                value={editProjectColor}
                onChange={(e) => setEditProjectColor(e.target.value)}
                mb={2}
              />
              <Button onClick={handleEditProject} colorScheme="blue">Save Changes</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="New project name"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                mb={2}
              />
              <Input
                placeholder="New project color"
                value={newProjectColor}
                onChange={(e) => setNewProjectColor(e.target.value)}
                mb={2}
              />
              <Button onClick={handleAddProject} colorScheme="blue" isDisabled={!newProject.trim()}>Add Project</Button>
              {!newProject.trim() && <Text color="red.500" mt={2}>Project name is required</Text>}
            </>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default ProjectCell;
