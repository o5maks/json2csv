const isEmptyError = 'Please type in something';
const invalidJSONInputError = 'Invalid JSON input';

function isObject(any) {
    return typeof any == 'object' && !Array.isArray(any);
}

function convert(obj) {
    const keys = Array.isArray(obj) 
        ? [...new Set(obj.flatMap((x) => Object.keys(x)))]
        : Object.keys(obj);
  
    const lines = [keys];

    if (Array.isArray(obj)) {
        for (const item of obj) {
            const row = keys.map((key) => (
                item[key]
            ));
            lines.push(row);
        }
    } else {
        const row = keys.map((key) => (
            obj[key]
        ));
        lines.push(row);
    }
  
    return lines.map((line) => (line
        .map((char) => (
            char ? `"${char}"` : ''
        ))
        .join(',')
    )).join('\n');
}


document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('textarea.input');
    const parseButton = document.querySelector('button.parse');
    const resetButton = document.querySelector('button.reset');
    const copyButton = document.querySelector('button.copy');
    const outputElement = document.querySelector('pre');

    parseButton.onclick = function () {
        const content = inputElement.value;

        if(!content) {
            outputElement.innerText = isEmptyError;
            return;
        }
        
        try {
            const jsonData = JSON.parse(content);
            const csv = convert(jsonData);
            outputElement.innerText = csv;
        } catch {
            outputElement.innerText = invalidJSONInputError;
        }
    };

    resetButton.onclick = function () {
        inputElement.value = '';
        outputElement.innerText = '';
    };

    copyButton.onclick = function () {
        navigator.clipboard.writeText(outputElement.innerText);
    };
});

