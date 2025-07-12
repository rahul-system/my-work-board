// jsonToCsv.js
// Utility to convert board JSON to CSV with headers: task-id, title, description, status

/**
 * Converts an array of task objects to CSV string.
 * @param {Array} tasks - Array of task objects with id, title, description, status.
 * @returns {string} CSV string with header row.
 */
function jsonToCsv(tasks) {
    const headers = ['task-id', 'title', 'description', 'status'];
    // Each field is quoted, and empty fields are handled
    const escape = (str) => '"' + (str === undefined || str === null ? '' : String(str).replace(/"/g, '""')) + '"';
    const rows = tasks.map(task => [
        escape(task.id),
        escape(task.title),
        escape(task.description),
        escape(task.status)
    ].join(','));
    return [headers.join(','), ...rows].join('\n');
}

// Example usage:
// const tasks = [
//   { id: 'task-1', title: 'Title', description: 'Desc', status: 'todo' },
//   ...
// ];
// const csv = jsonToCsv(tasks);
// console.log(csv);

module.exports = { jsonToCsv };

// CLI utility: node jsonToCsv.js input.json output.csv
if (require.main === module) {
    const fs = require('fs');
    const path = require('path');
    const [, , inputPath, outputPath] = process.argv;
    if (!inputPath || !outputPath) {
        console.error('Usage: node jsonToCsv.js <input.json> <output.csv>');
        process.exit(1);
    }
    try {
        const jsonData = JSON.parse(fs.readFileSync(path.resolve(inputPath), 'utf8'));
        if (!Array.isArray(jsonData)) {
            throw new Error('Input JSON must be an array of tasks');
        }
        const csv = jsonToCsv(jsonData);
        fs.writeFileSync(path.resolve(outputPath), csv, 'utf8');
        console.log(`CSV file written to ${outputPath}`);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}
