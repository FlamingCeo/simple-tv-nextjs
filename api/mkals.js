const fs = require('fs');
const path = require('path');

function replaceTokensInFile(filePath, tokenMap) {
    let fileContents = fs.readFileSync(filePath, 'utf8');
    for (const [token, replacement] of Object.entries(tokenMap)) {
        fileContents = fileContents.replace(new RegExp(token, 'g'), replacement);
    }
    fs.writeFileSync(filePath, fileContents);
    console.log(`Tokens replaced in file: ${filePath}`);
}

function processDirectory(directoryPath, tokenMap) {
    fs.readdirSync(directoryPath).forEach(item => {
        const itemPath = path.join(directoryPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
            processDirectory(itemPath, tokenMap);
        } else {
            replaceTokensInFile(itemPath, tokenMap);
        }
    });
}

function main() {
    const directoryPath = './dist';
    const tokenMap = {
        '@modules': './modules',
    };
    
    if (!fs.existsSync(directoryPath)) {
        console.error(`Directory "${directoryPath}" not found.`);
        return;
    }

    processDirectory(directoryPath, tokenMap);
}

main();