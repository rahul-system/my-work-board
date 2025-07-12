# Jira Style Project Board

A simple, modern web-based board for organizing tasks, inspired by Jira. Built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

- **Add New Task**: Create tasks with a title and description. Each task gets a random emoji for fun!
- **Task Columns**: Four columns for task status: To Do, Fixed, Testing, Done.
- **Drag and Drop**: Move tasks between columns by dragging and dropping.
- **Delete Task**: Remove tasks using the delete button on each task card.
- **Persistent Storage**: All tasks are automatically saved in your browser's localStorage. Your board is preserved even after closing or refreshing the page.
- **Download Board**: Export all tasks as a JSON file by clicking the "Download Board" button.
- **Upload Board**: Import tasks from a JSON file using the "Upload Board" button. This will overwrite your current board.
- **Responsive Design**: Works well on desktop and mobile browsers.

## How to Use

1. **Open `index.html` in your browser** (Chrome, Edge, Firefox, Safari, etc.).
2. Add tasks using the form at the top.
3. Drag tasks between columns to update their status.
4. Delete tasks using the delete (X) button.
5. Click **Download Board** to save your board as a JSON file.
6. Click **Upload Board** to load a previously saved board (JSON file).

## Notes

- All changes are saved automatically to localStorage.
- Uploading a board will replace your current tasks.
- No backend or server required; everything runs in your browser.

## Development

- No build step required. Just open `index.html` in your browser.
- To run locally with a server (recommended for Chrome):

  ```sh
  python3 -m http.server 8080
  # Then open http://localhost:8080 in your browser
  ```

## License

MIT
