#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

// use std::process::Command;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![take_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn take_command(name: &str) -> String {
    let split: Vec<&str> = name.split_whitespace().collect();
    let output = Command::new(split[0])
        .args(&split[1..])
        .output()
        .expect("cannot run command");

    let out = std::str::from_utf8(&output.stdout);
    println!("{:?}", out.unwrap().to_string());
    out.unwrap().to_string()
}
