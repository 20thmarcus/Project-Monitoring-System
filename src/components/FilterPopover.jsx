import {
  Button,
  Icon,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  VStack,
  Flex,
} from "@chakra-ui/react";
import FilterIcon from "./icons/FilterIcon";
import { PROJECTS } from "../data";
import { STATUSES } from "../data";
import { PEOPLE } from "../data";
import { ColorIcon } from "./StatusCell";
const ProjectItem = ({ project, setColumnFilters, isActive }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        const projects = prev.find((filter) => filter.id === "project")?.value || [];
        if (!projects.includes(project.id)) {
          return [...prev.filter(f => f.id !== "project"), { id: "project", value: [...projects, project.id] }];
        } else {
          const updatedProjects = projects.filter(p => p !== project.id);
          if (updatedProjects.length === 0) {
            return prev.filter(f => f.id !== "project");
          } else {
            return [...prev.filter(f => f.id !== "project"), { id: "project", value: updatedProjects }];
          }
        }
      })
    }
  >
    <ColorIcon color={project.color} mr={3} />
    {project.name}
  </Flex>
);

const StatusItem = ({ status, setColumnFilters, isActive }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        const statuses = prev.find((filter) => filter.id === "status")?.value || [];
        if (!statuses.includes(status.id)) {
          return [...prev.filter(f => f.id !== "status"), { id: "status", value: [...statuses, status.id] }];
        } else {
          const updatedStatuses = statuses.filter(s => s !== status.id);
          if (updatedStatuses.length === 0) {
            return prev.filter(f => f.id !== "status");
          } else {
            return [...prev.filter(f => f.id !== "status"), { id: "status", value: updatedStatuses }];
          }
        }
      })
    }
  >
    <ColorIcon color={status.color} mr={3} />
    {status.name}
  </Flex>
);

const InchargeItem = ({ incharge, setColumnFilters, isActive }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        const incharges = prev.find((filter) => filter.id === "incharge")?.value || [];
        if (!incharges.includes(incharge.id)) {
          return [...prev.filter(f => f.id !== "incharge"), { id: "incharge", value: [...incharges, incharge.id] }];
        } else {
          const updatedIncharges = incharges.filter(i => i !== incharge.id);
          if (updatedIncharges.length === 0) {
            return prev.filter(f => f.id !== "incharge");
          } else {
            return [...prev.filter(f => f.id !== "incharge"), { id: "incharge", value: updatedIncharges }];
          }
        }
      })
    }
  >
    <ColorIcon color={incharge.color} mr={3} />
    {incharge.name}
  </Flex>
);


const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const filterProjects = columnFilters.find((f) => f.id === "project")?.value || [];
  const filterStatuses = columnFilters.find((f) => f.id === "status")?.value || [];
  const filterIncharges = columnFilters.find((f) => f.id === "incharge")?.value || [];

  return (
    <>

      {/* <Popover isLazy>
        <PopoverTrigger>
          <Button
            size="sm"
            color={filterProjects.length > 0 ? "blue.300" : ""}
            leftIcon={<Icon as={FilterIcon} fontSize={18} />}
          >
            Filter by Project
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <VStack align="flex-start" spacing={1}>
              {PROJECTS.map((project) => (
                <ProjectItem
                  project={project}
                  isActive={filterProjects.includes(project.id)}
                  setColumnFilters={setColumnFilters}
                  key={project.id}
                />
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover isLazy>
        <PopoverTrigger>
          <Button
            size="sm"
            color={filterStatuses.length > 0 ? "blue.300" : ""}
            leftIcon={<Icon as={FilterIcon} fontSize={18} />}
          >
            Filter by Status
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <VStack align="flex-start" spacing={1}>
              {STATUSES.map((status) => (
                <StatusItem
                  status={status}
                  isActive={filterStatuses.includes(status.id)}
                  setColumnFilters={setColumnFilters}
                  key={status.id}
                />
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover isLazy>
        <PopoverTrigger>
          <Button
            size="sm"
            color={filterIncharges.length > 0 ? "blue.300" : ""}
            leftIcon={<Icon as={FilterIcon} fontSize={18} />}
          >
            Filter by Incharge
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <VStack align="flex-start" spacing={1}>
              {PEOPLE.map((incharge) => (
                <InchargeItem
                  incharge={incharge}
                  isActive={filterIncharges.includes(incharge.id)}
                  setColumnFilters={setColumnFilters}
                  key={incharge.id}
                />
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover> */}

    </>
  );
};

export default FilterPopover;
