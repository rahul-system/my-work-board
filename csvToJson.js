// csvToJson.js
// Utility to convert CSV (with headers: task-id, title, description, status) to JSON array of tasks

class CsvToJson {
    static parse(csv) {
        const lines = csv.trim().split(/\r?\n/);
        if (lines.length < 2) return [];
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        return lines.slice(1).map(line => {
            // Improved CSV parsing: handle quoted fields and commas inside quotes
            const values = [];
            let current = '', inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        current += '"';
                        i++; // skip next quote
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === ',' && !inQuotes) {
                    values.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            values.push(current);
            // Pad values to headers length
            while (values.length < headers.length) values.push('');
            // Remove extra values (from malformed lines)
            if (values.length > headers.length) values.length = headers.length;
            const obj = {};
            headers.forEach((h, idx) => {
                obj[h] = values[idx].replace(/^"|"$/g, '').replace(/""/g, '"');
            });
            return obj;
        }).filter(obj => obj[headers[0]] && obj[headers[0]].startsWith('task-'));
    }
}

module.exports = CsvToJson;

// CLI utility: node csvToJson.js input.csv output.json
if (require.main === module) {
    const fs = require('fs');
    const path = require('path');
    const [, , inputPath, outputPath] = process.argv;
    if (!inputPath || !outputPath) {
        console.error('Usage: node csvToJson.js <input.csv> <output.json>');
        process.exit(1);
    }
    try {
        const csvData = fs.readFileSync(path.resolve(inputPath), 'utf8');
        const jsonArr = CsvToJson.parse(csvData);
        fs.writeFileSync(path.resolve(outputPath), JSON.stringify(jsonArr, null, 2), 'utf8');
        console.log(`JSON file written to ${outputPath}`);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}
