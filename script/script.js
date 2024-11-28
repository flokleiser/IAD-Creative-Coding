//*DO NOT CHANGE THIS FILE*//
var student;

fetch("student.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    student = data;
    createProjectCard();
  })
  .catch((error) => {
    console.error("There was a problem fetching the data:", error);
  });

function createProjectCard() {
  document.querySelector(".header-container h2").innerHTML = student.name;
  for (let i = 0; i < student.projects.length; i++) {
    let section = document.createElement("section");
    let articles = [];
    section.id = `${student.projects[i].folder}`;
    section.classList.add("project-container", "container");
    section.innerHTML = `
      <div class="division"></div>
      <div class="content-text">
        <h1>${student.projects[i].folder}</h1>
      </div>`;
    document.querySelector(".projects-container").appendChild(section);
    let article = document.createElement("article");
    article.classList.add("project");

    for (let j = 0; j < student.projects[i].projectNumber; j++) {
      let childId = student.projects[i].folder + (j + 1);

      let titleColor = (j % 2 === 0) ? "black" : "white";
      let titleBackgroundColor = (j === 1) ? "rgba(0,0,0,0.75)" : (j === 0 ? "rgba(255,255,255,0.75)" : " ");
     
      articles.push(`
        <div class="card" id="${childId}"  onclick="openProject()"
          style="background: url(./projects/${
            student.projects[i].folder
          }/project${j + 1}/thumbnail.webp) center center/cover">
          <div class="project-info">
            <div class="project-bio">
              <h3 style="color: ${titleColor}; background-color: ${titleBackgroundColor}">project${j + 1}</h3>
            </div>
          </div>
        </div>
      `);
    }
    article.innerHTML = articles.join("");
    document
      .querySelector(`[id="${student.projects[i].folder}"]`)
      .appendChild(article);

    const cards = article.querySelectorAll(".card");
    cards.forEach((card, index) => {
      const projectFolder = student.projects[i].folder;
      const projectNumber = index + 1;

      card.addEventListener("mouseenter", () => {
        card.style.backgroundImage = `url(./projects/${projectFolder}/project${projectNumber}/thumbnail.gif)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.backgroundImage = `url(./projects/${projectFolder}/project${projectNumber}/thumbnail.png)`;
      });
    });
  }
}

function fileExists(url) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  return http.status != 404;
}
