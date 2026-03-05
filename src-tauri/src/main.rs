// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::fs;
use std::path::PathBuf;

#[tauri::command]
fn save_history(app_handle: tauri::AppHandle, content: String) -> Result<(), String> {
    let app_dir = app_handle.path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data dir")?;

    fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;

    let file_path = app_dir.join("history.json");
    fs::write(file_path, content).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn load_history(app_handle: tauri::AppHandle) -> Result<String, String> {
    let app_dir = app_handle.path_resolver()
        .app_data_dir()
        .ok_or("Failed to get app data dir")?;

    let file_path = app_dir.join("history.json");

    if !file_path.exists() {
        return Ok("[]".to_string());
    }

    fs::read_to_string(file_path).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_history, load_history])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
