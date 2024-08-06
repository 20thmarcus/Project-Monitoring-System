import { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text } from "@chakra-ui/react";
import axios from "axios";

const ProjectCell = ({ getValue, row, column, table, projectDesc }) => {

  const { updateData } = table.options.meta;
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // Fetch projects only once when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projectDesc) {
      setProjectDescription(projectDesc);
    }
  }, [projectDesc]);

  const handleAddProject = useCallback(async () => {
    if (newProject.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/projects", {
        project: newProject,
        projectDescription: newProjectDescription || "No description",
      });
      const project = { id: response.data.id, project: newProject, projectDescription: newProjectDescription || "No description" };
      setProjects(prevProjects => [...prevProjects, project]);
      setNewProject("");
      setNewProjectDescription("");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  }, [newProject, newProjectDescription]);


  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
        as={Box}
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
      >
        {projectDescription || "Select Project"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(row.index, column.id, null)}>
          None
        </MenuItem>
        {projects.map((project, index) => (
          <MenuItem
            onClick={() => updateData(row.index, column.id, project.project)}
            key={project.id || index}
          >
            <Text as="span">{project.project}</Text>
            <Text ml={3} as="span">{project.projectDescription}</Text>
          </MenuItem>
        ))}
        <Box p={3}>
        {      
          (
            <>
              <Input
                placeholder="New project name"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                mb={2}
              />
              <Input
                placeholder="New project description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
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
