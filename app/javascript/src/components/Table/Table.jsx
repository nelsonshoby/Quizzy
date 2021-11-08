import React, { useMemo } from "react";

import { Button } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import { COLUMNS } from "./Column";
import "./Table.css";

function Table({ data }) {
  const columns = useMemo(() => COLUMNS, []);

  const data2 = useMemo(() => data, [data]);

  const tableHooks = hooks => {
    hooks.visibleColumns.push(columns => [
      ...columns,
      {
        id: "Edit",
        Headers: "Action",
        Cell: ({ row }) => (
          <Button
            label="Edit"
            onClick={() => alert("editing" + row.values.name)}
            style="primary"
          />
        ),
      },
    ]);
  };
  const tableInstance = useTable(
    {
      columns: columns,
      data: data2,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={index} {...column.getHeaderProps()}>
                {column.render("Headers")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
