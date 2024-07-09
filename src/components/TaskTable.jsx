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
import EditableCellNumber from "./EditableCellNumber";
import ModuleCell from "./ModuleCell";
import InChargeCell from "./InChargeCell";

const columns = [
  {
    accessorKey: "module",
    header: "Module",
    size: 225,
    cell: ModuleCell,
    enableColumnFilter: true,
  },
  {
    accessorKey: "task",
    header: "Task",
    size: 225,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "budgetHours",
    header: "Budget Hours",
    cell: EditableCellNumber,
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
    cell: EditableCellNumber,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "leadTime",
    header: "Lead Time",
    cell: EditableCell,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 225,
    cell: EditableCell,
  },
];

const TaskTable = ({ projectID }) => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSaved, setIsSaved] = useState(data.map(() => true));

  useEffect(() => {
    if (projectID) {
      setFilteredData(data.filter((item) => item.projectID === projectID));
    } else {
      setFilteredData(data);
    }
  }, [projectID, data]);

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
    }, 1000);
  };

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
        notes: "",
      },
    ]);
    setIsSaved((prev) => [...prev, false]);
  };

  useEffect(() => {
    saveData(data);
  }, [data]);

  return (
    <Box ml={10}>
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
      <Button onClick={addRow} colorScheme="blue" mb={4}>Add Row</Button>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Icon
                    as={SortIcon}
                    mx={3}
                    fontSize={14}
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
          <Box
            className="tr"
            key={row.id}
            border={isSaved[rowIndex] ? "1px solid green" : "1px solid red"}
          >
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </Box>
  );
};

export default TaskTable;
