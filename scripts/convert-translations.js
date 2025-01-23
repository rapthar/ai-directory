const fs = require('fs');
const path = require('path');
const set = require('lodash/set');

const messagesDir = path.join(__dirname, '..', 'messages');

// Function to convert flat object to nested object
function convertToNestedStructure(flatObj) {
  return Object.entries(flatObj).reduce(
    (acc, [key, value]) => set(acc, key, value),
    {}
  );
}

// Process each translation file
fs.readdirSync(messagesDir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(messagesDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const nestedContent = convertToNestedStructure(content);
    
    // Write the new nested structure back to the file
    fs.writeFileSync(
      filePath,
      JSON.stringify(nestedContent, null, 2),
      'utf8'
    );
    
    console.log(`Converted ${file} to nested structure`);
  }
});
