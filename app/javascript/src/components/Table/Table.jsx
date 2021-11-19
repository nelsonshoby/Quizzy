import React, { useMemo, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { toast } from "react-toastify";

import quizzesApi from "apis/quizzes";

import { COLUMNS } from "./Column";
import "./Table.css";

import { TOASTR_OPTIONS } from "../../constants";
import ModalComponent from "../ModalComponent";

function Table({ data, fetchQuiz }) {
  const [showModal, setShowModal] = useState(false);
  const [editableId, setEditableId] = useState("");
  const [title, setTitle] = useState("");
  const columns = useMemo(() => COLUMNS, []);
  const tabledata = useMemo(() => data, [data]);
  const tableInstance = useTable({
    columns: columns,
    data: tabledata,
  });
  const handleUpdate = async id => {
    if (title) {
      try {
        await quizzesApi.update({
          id,
          payload: { quiz: { name: title, user_id: data[0].user_id } },
        });
        fetchQuiz();
        setEditableId(null);
      } catch (error) {
        Logger.error(error);
      }
    } else {
      toast.error("Title  can't be empty", TOASTR_OPTIONS);
    }
  };

  const handleDelete = async id => {
    try {
      await quizzesApi.destroy(id);
      fetchQuiz();
    } catch (error) {
      Logger.error(error);
    }
  };

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
                  <td
                    key={index}
                    {...cell.getCellProps()}
                    className="text-base"
                  >
                    {editableId === row.id ? (
                      <>
                        <div className="grid grid-cols-2">
                          <Input
                            placeholder={"Type the new name"}
                            value={title}
                            className="outline-none"
                            autoFocus="on"
                            onChange={e => {
                              setTitle(e.target.value);
                            }}
                          />

                          <div className="inline place-self-end space-x-8">
                            <Button
                              label="Save"
                              size="large"
                              style="secondary"
                              onClick={() => handleUpdate(row.original.id)}
                            />
                            <Button
                              label="Cancel"
                              size="large"
                              style="secondary"
                              onClick={() => setEditableId(null)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-2">
                          <Link
                            to={{
                              pathname: `./quizShowpage/${row.original.id}/show`,
                            }}
                          >
                            {cell.render("Cell")}
                          </Link>

                          <div className="inline float-right space-x-8 place-self-end">
                            <Button
                              label="Edit"
                              style="secondary"
                              size="large"
                              onClick={() => {
                                setTitle(row.original.name);
                                setEditableId(String(row.id));
                              }}
                            />

                            <Button
                              label="Delete"
                              style="secondary"
                              size="large"
                              onClick={() => setShowModal(row.original.id)}
                            />

                            <ModalComponent
                              showModal={showModal}
                              setShowModal={setShowModal}
                              handleDelete={handleDelete}
                            />
                          </div>
                        </div>
                      </>
                    )}
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
