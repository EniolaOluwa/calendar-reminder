import React from "react";

import "./style.scss";

function CloseModalBtn({ onClick, text = "Close" }) {
  return (
    <button className="close-modal-btn" onClick={onClick}>
      {text}
    </button>
  );
}

export default CloseModalBtn;
