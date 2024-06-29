document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const rankButton = document.getElementById('rankButton');
    const sortButton = document.getElementById('sortButton');
    const fileInput = document.getElementById('fileInput');
    const resultText = document.getElementById('resultText');
    
    let sortOrder = 'Ascending';

    rankButton.addEventListener('click', rankWords);
    sortButton.addEventListener('click', toggleSortOrder);
    fileInput.addEventListener('change', attachFile);

    function rankWords() {
        const text = textInput.value.trim();
        if (!text) {
            alert('Please enter some text or attach a file.');
            return;
        }

        const words = text.split(/\s+/);
        const wordCounts = words.reduce((counts, word) => {
            counts[word] = (counts[word] || 0) + 1;
            return counts;
        }, {});

        const sortedWordCounts = Object.entries(wordCounts).sort((a, b) => {
            return sortOrder === 'Ascending' ? a[1] - b[1] : b[1] - a[1];
        });

        resultText.value = sortedWordCounts.map(([word, count]) => `${word}: ${count}`).join('\n');
    }

    function toggleSortOrder() {
        sortOrder = sortOrder === 'Ascending' ? 'Descending' : 'Ascending';
        sortButton.textContent = sortOrder;
        rankWords();
    }

    function attachFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            textInput.value = e.target.result;
        };

        reader.readAsText(file);
    }
});
