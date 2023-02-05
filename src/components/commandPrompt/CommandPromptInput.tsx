import "./CommandPromptInput.css";
import { invoke } from "@tauri-apps/api";
import { useRef, useState } from "react";

function CommandPromptInput() {
  const [userInput, setUserInput] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          invoke("take_command", { cmd: userInput })
            .then((response) => console.log(response))
            .catch((err) => {
              console.log(err);
            });
        }}>
        <input
          type='text'
          placeholder='input command'
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default CommandPromptInput;
