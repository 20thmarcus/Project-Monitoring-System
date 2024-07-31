import { useState, useEffect } from "react";
import { Box, Menu, MenuButton, MenuItem, MenuList, Input, Button, Text } from "@chakra-ui/react";
import axios from "axios";

const ProjectCell = ({ getValue, row, column, table, projectDesc }) => {
  const { project, description } = getValue() || {};
  const { updateData } = table.options.meta;
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    // alert(projectID)

    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    const fetchProjectDescription = async () => { 
      try { 
        setProjectDescription(projectDesc); 
      } 
      catch (error) { 
        console.error("Error fetching project description:", error); 
      } };

    fetchProjects();

    if(projectDesc){
      fetchProjectDescription();
    }
  }, [projectDesc]);

  const handleAddProject = async () => {
    if (newProject.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/projects", {
        project: newProject,
        projectDescription: newProjectDescription || "No description",
      });
      const project = { project: newProject, projectDescription: newProjectDescription || "No description" };
      setProjects([...projects, project]);
      setNewProject("");
      setNewProjectDescription("");
    } catch (error) {
      console.error("Error ", error);
    }
  };
  const handleEditProject = async () => {
    if (editProjectName.trim() === "") return;
    try {
      await axios.put(`http://localhost:5000/projects/${editProjectId}`, {
        project: editProjectName,
        projectDescription: editProjectDescription || "No description",
      });

      const updatedProjects = projects.map((project) =>
        project.id === editProjectId
          ? { ...project, project: editProjectName, projectDescription: editProjectDescription || project.projectDescription }
          : project
      );
      setProjects(updatedProjects);
      setEditProjectId(null);
      setEditProjectName("");
      setEditProjectDescription("");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const startEditing = (project, event) => {
    event.stopPropagation(); // Prevent the menu from closing
    setEditProjectId(project.id);
    setEditProjectName(project.project);
    setEditProjectDescription(project.projectDescription);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton
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
            onClick={() => updateData(row.index, column.id, project)}
            key={project.id || index}
          >
            {project.project}
            <Text ml={3}>{project.projectDescription}</Text>
            <Button ml={3} size="xs" onClick={(e) => startEditing(project, e)}>Edit</Button>
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
                placeholder="Edit project description"
                value={editProjectDescription}
                onChange={(e) => setEditProjectDescription(e.target.value)}
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
