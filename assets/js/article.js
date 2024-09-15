async function fetchMarkdown(file) {
    // Use the Google Apps Script endpoint
    const url = `https://script.google.com/macros/s/AKfycbwJwd_EJdp2aMJwrDFKzcOmdZPXZoVSG3D51Lbu8NCCyR89UBYzCqtfWOazLXNdFLlg/exec?file=${file}`;
    const response = await fetch(url);
    const markdown = await response.text();
    return markdown;
}

// Function to render the Markdown content as HTML
async function renderArticle(file) {
    const markdown = await fetchMarkdown(file);
    if (markdown) {
        // Convert Markdown to HTML using the `marked` library
        const html = marked.parse(markdown);
        // Set the HTML content inside the container
        document.getElementById('articles-container').innerHTML = html;
    }
}

// Load a specific article
renderArticle('test.md');


// https://script.google.com/macros/s/AKfycbwgIYWuwBxoHJizYu80uHPTIwQ-yZEaMwT2Y0EXXmxozFixFZLpKvkYN3tbD7-4fLj7/exec