import React, { useMemo, useState } from "react";

import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Modal } from "@bigbinary/neetoui/v2";
import { Typography } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useTable } from "react-table";
import { toast } from "react-toastify";

import quizzesApi from "apis/quizzes";

import { COLUMNS } from "./Column";
import "./Table.css";

import { TOASTR_OPTIONS } from "../../constants";

function Table({ data, fetchquiz }) {
  const [showModal, setShowModal] = useState(false);
  const [editableId, setEditableId] = useState("");
  const [title, setTitle] = useState("");
  const columns = useMemo(() => COLUMNS, []);
  const data2 = useMemo(() => data, [data]);
  const tableInstance = useTable({
    columns: columns,
    data: data2,
  });
  const handleUpdate = async id => {
    if (title) {
      try {
        await quizzesApi.update({
          id,
          payload: { quiz: { name: title, user_id: data[0].user_id } },
        });
        fetchquiz();
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
      fetchquiz();
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
                  <td key={index} {...cell.getCellProps()}>
                    {editableId === row.id ? (
                      <>
                        <div className="grid grid-cols-2">
                          <Input
                            placeholder={"Type the new name"}
                            className="outline-none"
                            autoFocus="on"
                            onChange={e => setTitle(e.target.value.trim())}
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
                          {cell.render("Cell")}
                          <div className="inline float-right space-x-8 place-self-end">
                            <Button
                              label="Edit"
                              style="secondary"
                              size="large"
                              onClick={() => setEditableId(String(row.id))}
                            />

                            <Button
                              label="Delete"
                              style="secondary"
                              size="large"
                              onClick={() => setShowModal(row.original.id)}
                            />
                            {showModal && (
                              <Modal isOpen={showModal}>
                                <Modal.Header>
                                  <Typography style="h2">
                                    Are you sure to delete this item?
                                  </Typography>
                                </Modal.Header>

                                <Modal.Footer className="space-x-2">
                                  <Button
                                    label="Continue"
                                    onClick={() => {
                                      handleDelete(showModal);
                                      setShowModal(false);
                                    }}
                                    size="large"
                                  />
                                  <Button
                                    style="text"
                                    label="Cancel"
                                    onClick={() => setShowModal(false)}
                                    size="large"
                                  />
                                </Modal.Footer>
                              </Modal>
                            )}
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
