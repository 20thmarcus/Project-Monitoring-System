import { useState, useEffect } from "react";
import { Box, Button, Icon, Heading } from "@chakra-ui/react";

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

export const ColorIcon = ({ color, ...props }) => (
  <Box w="16px" h="16px" bg={color} borderRadius="3px" {...props} />
);

const TaskTable = ({ onDataUpdate }) => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSaved, setIsSaved] = useState(data.map(() => true));
  const [testingg, settesttingg] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  });

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
  const deleteRow = async (rowIndex) => {
    console.log("Deleting row:", rowIndex);
    setData((prev) => {
      const newData = prev.filter((_, index) => index !== rowIndex);
      saveData(newData);
      return newData;
    });
  };

  // ginawa ko sa harap ni sir jay - marcus
  async function functiontesting () {
    await fetch('http://localhost:5000/tasks/getallproject', {method: "GET"})
    .then(response => response.json())
    .then(data => { setData(data)})
    .catch(error => console.error('Error:', error));
  }
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
      cell: ProjectCell,
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
      cell: ModuleCell,
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
      cell: InChargeCell,
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
        <Button size="sm" colorScheme="red" onClick={() => deleteRow(row.index)}>
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

  const addRow = () => {
    setData((prev) => [
      ...prev,
      {
        project: "",
        module: "",
        task: "",
        budgetHours: "",
        targetDate: "",
        status: STATUSES[0],
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
       <p>{JSON.stringify(testingg,null,2)}</p>
      <Button onClick={functiontesting}>
        Testing sample sample 
      </Button>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box 
                className="th" 
                w={header.getSize()} 
                key={header.id}
                // display="flex"
                // alignItems="center"
                // justifyContent="center"
                // padding="8px"
                // borderBottom="1px solid #ccc"
                // backgroundColor="#f9f9f9"
                // fontWeight="bold"
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
        {table.getRowModel().rows.map((row, rowIndex) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box
                className="td"
                w={cell.column.getSize()}
                key={cell.id}
                display="flex"
                alignItems="center"
                justifyContent="center"
                // padding="8px"
                // borderBottom="1px solid #ccc"
                // backgroundColor="#fff"
                fontSize="sm"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <br /><br /><br /><br />
    </Box>
  );
};

export default TaskTable;
