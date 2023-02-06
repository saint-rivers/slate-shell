import "./CommandPromptInput.css";
import { invoke } from "@tauri-apps/api";
import { useRef, useState } from "react";
import { log } from "console";

function CommandPromptInput() {
  const [userInput, setUserInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  interface Output {
    status: any;
    stdout: string;
    stderr: string;
  }

  function isOutput(obj: unknown): obj is string {
    // console.log(JSON.stringify(obj));
    return JSON.stringify(obj) !== undefined;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          invoke("take_command", { name: userInput })
            .then((response) => {
              if (isOutput(response)) {
                console.log(response);
                setOutput(response);
              }
            })
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

        <p>{output}</p>
      </form>
    </div>
  );
}

export default CommandPromptInput;
