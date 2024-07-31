import { useState, useEffect } from "react";
import { Box, Button, Icon } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA, { STATUSES } from "../data";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import HoursCell from "./HoursCell";
import ModuleCell from "./ModuleCell";
import InChargeCell from "./InChargeCell";
import LeadTimeCell from "./LeadTimeCell";
import ProjectCell from "./ProjectCell";
import axios from "axios";

export const ColorIcon = ({ color, ...props }) => (
  <Box w="16px" h="16px" bg={color} borderRadius="3px" {...props} />
);

const TaskTable = ({ onDataUpdate }) => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSaved, setIsSaved] = useState(data.map(() => true));

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    readTable();
  }, []);

  const validateRow = (row) => {
    if (!row.module || !row.task || !row.budgetHours || !row.targetDate || !row.status) {
      return false;
    }
    if (row.status === STATUSES[1] && !row.startDate) {
      return false;
    }
    if (row.status === STATUSES[2] && (!row.startDate || !row.endDate || !row.actualHours)) {
      return false;
    }
    return true;
  };

  const saveData = (newData) => {
    setTimeout(() => {
      setIsSaved(newData.map(row => validateRow(row)));
      onDataUpdate(newData);
    }, 1000);
  };

  const deleteRow = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      console.log("Deleting task:", taskId);

      // Update state to remove the deleted task
      setData((prev) => {
        const newData = prev.filter((task) => task.taskID !== taskId);
        saveData(newData);
        return newData;
      });

      // Optionally, reset column filters if needed
      setColumnFilters([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const readTable = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks/getallproject', { method: "GET" });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const columns = [
    {
      accessorKey: "validationStatus",
      header: "",
      size: 1,
      cell: ({ row }) => (
        <ColorIcon
          color={isSaved[row.index] ? "green.400" : "red.400"}
          mr={3}
        />
      ),
    },
    {
      accessorKey: "project",
      header: "Project",
      cell: ({ row, column, table }) => (
        <ProjectCell
          getValue={() => row.original[column.id]}
          row={row}
          column={column}
          table={table}
          projectDesc={row.original.project}
        />
      ),
      enableSorting: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterProject) => {
        if (filterProject.length === 0) return true;
        const project = row.getValue(columnId);
        return filterProject.includes(project?.id);
      },
    },
    {
      accessorKey: "module",
      header: "Module",
      size: 200,
      cell: ({ row, column, table }) => (
        <ModuleCell
          getValue={() => row.original[column.id]}
          row={row}
          column={column}
          table={table}
          moduleN={row.original.moduleName}
        />
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "task",
      header: "Task",
      size: 200,
      cell: EditableCell,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "budgetHours",
      header: "Budget Hours",
      cell: HoursCell,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "targetDate",
      header: "Target Date",
      cell: DateCell,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: StatusCell,
      enableSorting: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatus) => {
        if (filterStatus.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatus.includes(status?.id);
      },
    },
    {
      accessorKey: "incharge",
      header: "In-Charge",
      cell: ({ row, column, table }) => (
        <InChargeCell
          getValue={() => row.original[column.id]}
          row={row}
          column={column}
          table={table}
          username={row.original.firstName}
        />
      ),
      enableSorting: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterIncharge) => {
        if (filterIncharge.length === 0) return true;
        const incharge = row.getValue(columnId);
        return filterIncharge.includes(incharge?.id);
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: DateCell,
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: DateCell,
    },
    {
      accessorKey: "actualHours",
      header: "Actual Hours",
      cell: HoursCell,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "leadTime",
      header: "Lead Time",
      cell: LeadTimeCell,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "notes",
      header: "Notes",
      size: 200,
      cell: EditableCell,
    },
    {
      accessorKey: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <Button size="sm" colorScheme="red" onClick={() => deleteRow(row.original.taskID)}>
          Delete
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) => {
          const newData = prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          );
          saveData(newData);
          return newData;
        }),
    },
  });

  const addRow = async () => {
    try {
      const response = await axios.post("http://localhost:5000/tasks");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setData((prev) => [
      ...prev,
      {
        project: "",
        module: "",
        task: "",
        budgetHours: "",
        targetDate: "",
        status: "",
        incharge: "",
        startDate: "",
        endDate: "",
        actualHours: "",
        leadTime: "",
        notes: ""
      },
    ]);
    setIsSaved((prev) => [...prev, false]);
  };

  useEffect(() => {
    saveData(data);
  }, [data]);

  return (
    <Box ml={10} mt="100px">
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      <Button onClick={addRow} colorScheme="blue" mb={4}>
        Add Row
      </Button>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box
                className="th"
                w={header.getSize()}
                key={header.id}
              >
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Icon
                    as={SortIcon}
                    mx={3}
                    fontSize="sm"
                    onClick={header.column.getToggleSortingHandler()}
                  />
                )}
                {
                  {
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()]
                }
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box
                className="td"
                w={cell.column.getSize()}
                key={cell.id}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskTable;
