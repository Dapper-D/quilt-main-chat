import React, { useState } from "react";
import { useUserData } from "../../component/Context/useUserData";

const ModalForm = () => {
  let Username = useUserData((state) => state.username);
  let [username, setUsername] = useState(Username);

  return (
    <div>
      {" "}
      <div class="display" htmlFor="username">
        Display Name
      </div>
      <div
        style={{
          width: "100%",
          borderRadius: "1rem",
          marginBottom: "1rem",
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
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Name"
        ></input>
      </div>
    </div>
  );
};

export default ModalForm;
