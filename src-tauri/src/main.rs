#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{env, path::Path, process::Command};

// use std::process::Command;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![take_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn take_command(name: &str) -> String {
    let mut split = name.trim().split_whitespace();

    let command = split.next().unwrap();
    let args = split;

    let output = match command {
        "cd" => {
            // default to '/' as new directory if one was not provided
            let new_dir = args.peekable().peek().map_or("/", |x| *x);
            let root = Path::new(new_dir);
            if let Err(e) = env::set_current_dir(&root) {
                eprintln!("{}", e);
            }
            "".to_owned()
        }
        "exit" => {
            std::process::exit(0x0100);
        }
        command => {
            let output = Command::new(command).args(args).output();
            println!("{:?}", &output);

            match output {
                Ok(shell_output) => {
                    let out = std::str::from_utf8(&shell_output.stdout);
                    out.expect("invalid command").to_string()
                }
                Err(err) => err.to_string(),
            }
        }
    };

    output
}
