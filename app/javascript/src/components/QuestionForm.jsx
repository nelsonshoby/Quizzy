import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Input } from "@bigbinary/neetoui/v2";
import { Button } from "@bigbinary/neetoui/v2";
import { Select } from "@bigbinary/neetoui/v2";

function QuestionForm() {
  return (
    <div>
      <form>
        <div className="flex-col">
          <Input label="Question" placeholder="Enter question" />
          <Input label="Option 1" placeholder="Option 1" />
          <Input label="Option 2" placeholder="Option 2" />

          <Button
            label="Add new quiz"
            icon={Plus}
            style="secondary"
            iconPosition="left"
          />

          <div className="p-4 mb-2">
            <Select
              defaultValue={{
                label: "Value Three",
                value: "value3",
              }}
              isClearable
              isSearchable
              label="Select"
              name="ValueList"
              options={[
                {
                  label: "Value One",
                  value: "value1",
                },
                {
                  label: "Value Two",
                  value: "value2",
                },
                {
                  label: "Value Three",
                  value: "value3",
                },
                {
                  label: "Value Four",
                  value: "value4",
                },
                {
                  label: "Value Five",
                  value: "value5",
                },
              ]}
              placeholder="Select an Option"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
