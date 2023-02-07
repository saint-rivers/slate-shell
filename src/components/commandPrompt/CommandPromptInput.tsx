import "./CommandPromptInput.css";
import { invoke } from "@tauri-apps/api";
import { useEffect, useRef, useState } from "react";
import { log } from "console";

function CommandPromptInput() {
  const [userInput, setUserInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);

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
                setOutput([response, ...output]);
                setUserInput("");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}>
        <input
          type='text'
          placeholder='input command'
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />

        <div>
          {output.map((data, index) => (
            <div key={index}>
              <p>{data}</p>
              <hr />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default CommandPromptInput;
