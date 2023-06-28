
var form = document.getElementById('myform');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    var search = document.getElementById("Search").value;
    var username = search.split(' ').join('');
    getUserProjects(username);
})
function addParagraph(text, isbold = false) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    if (isbold == true) {
        paragraph.style.fontWeight = 'bold';
    }
    paragraph.style.textAlign = 'center';
    document.body.appendChild(paragraph);
}
async function getUserProjects(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const projects = await response.json();

        if (projects.length > 0) {
            const divElem = document.createElement('div');
            addParagraph(`Projects for User ${username}:`, true);
            projects.forEach((project) => {
                addParagraph(`-> ${project.name}`);
            });
        } else {
            addParagraph(`No projects found for User ${username}.`);
        }
    } catch (error) {
        addParagraph(`Error retrieving projects for User ${username}:`, error.message);
    }
}



