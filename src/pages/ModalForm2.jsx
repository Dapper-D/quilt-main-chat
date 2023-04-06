import React, { useState } from "react";
import { useUserData } from "../../component/Context/useUserData";

const ModalForm2 = () => {
  //   let [status, setStatus] = useState(status);
  let Bio = useUserData((state) => state.bio);
  let [description, setDescription] = useState(Bio);

  return (
    <div>
      <div class="display" htmlFor="description">
        Set Status
      </div>
      <div
        style={{
          width: "100%",
          borderRadius: "1rem",
          border: "1px solid var(--modal-color)",
        }}
      >
        <input
          type="text"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            outline: "none",
            borderRadius: "1rem",
            padding: "1rem",
            color: "var(--border-color)",
            border: "1px solid var(--transparent )",
          }}
          name=""
          id=""
          maxLength={60}
          cols="10"
          rows="1"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Status "
        ></input>
      </div>
    </div>
  );
};

export default ModalForm2;
