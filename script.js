"use strict";

let scores = document.querySelector(".scoreBox");
let noScores = document.querySelector(".noScores");

const input_form = document.querySelector(".formBox_input");
const btn_form = document.querySelector(".formBox_btn");

/* const bau = document.createElement('div');
bau.classList.add('ciccio');
scores.appendChild(bau);
console.log(scores)
 */
if (scores.innerHTML === "") {
  noScores.style.display = "block";
  noScores.innerHTML = `Welcome!`;
}

const searchShows = function () {
  if (!input_form.value) {
    scores.innerHTML = "";
    noScores.innerHTML = `<p class=>Scrivi qualcosa cojone!!!</p>`;
  } else {
    scores.innerHTML = "";
    noScores.innerHTML = "";

    fetch(`https://api.tvmaze.com/search/shows?q=${input_form.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          scores.innerHTML = "";
          noScores.innerHTML = `Scrivi bene dio bono!`;
        }

        for (const score of data) {
          //console.log(score.show);
          const show = score.show;

          scores.innerHTML += `
            <div class="scoreBox_show">
            <img class="list_img" src="${
              show.image === null ? "/img/no-image.png" : show.image.medium
            }" alt="picture">
            <ul class="list_description">
                <li><b>${show.name}</b></li>
                <li><b>Genres:</b> ${
                  show.genres.length === 0 ? "Unknown" : show.genres
                }</li>
                <li><b>Rating:</b> ${
                  show.rating.average === null ? "No Rate" : show.rating.average
                }</li>
            </ul>
            <button type="button" class="btn_info" onClick = "getInfo()">
        <span class="material-icons-outlined">info</span>
    </button>
            </div>`;
        }

        input_form.value = "";
      });
  }
};

btn_form.addEventListener("click", function () {
  searchShows();
});


