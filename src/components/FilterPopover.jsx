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
import { STATUSES } from "../data";
import { PEOPLE } from "../data";
import { ColorIcon } from "./StatusCell";

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
        const statuses = prev.find((filter) => filter.id === "status")?.value;
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }

        return prev.map((f) =>
          f.id === "status"
            ? {
                ...f,
                value: isActive
                  ? statuses.filter((s) => s !== status.id)
                  : statuses.concat(status.id),
              }
            : f
        );
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
        const incharges = prev.find((filter) => filter.id === "incharge")?.value;
        if (!incharges) {
          return prev.concat({
            id: "incharge",
            value: [incharge.id],
          });
        }

        return prev.map((f) =>
          f.id === "incharge"
            ? {
                ...f,
                value: isActive
                  ? incharges.filter((s) => s !== incharge.id)
                  : incharges.concat(incharge.id),
              }
            : f
        );
      })
    }
  >
    <ColorIcon color={incharge.color} mr={3} />
    {incharge.name}
  </Flex>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const filterStatuses = columnFilters.find((f) => f.id === "status")?.value || [];
  const filterIncharges = columnFilters.find((f) => f.id === "incharge")?.value || [];

  return (
    <>
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
      </Popover>
    </>
  );
};

export default FilterPopover;
