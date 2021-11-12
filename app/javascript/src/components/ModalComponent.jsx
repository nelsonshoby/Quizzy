import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Modal } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";

function ModalComponent({ showModal, setShowModal, handleDelete }) {
  return (
    <div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <Typography style="h2">Are you sure to delete this item?</Typography>
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
    </div>
  );
}

export default ModalComponent;
