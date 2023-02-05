#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use std::process::Command;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, take_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("hello, {}", name)
}

#[tauri::command]
fn take_command(cmd: &str) -> String {
    // let split: Vec<&str> = cmd.split_whitespace().collect();
    // Command::new(cmd[0])
    println!("{}", cmd);
    format!("hello, {}", cmd)
}
