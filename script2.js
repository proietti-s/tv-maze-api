"use strict";

const showsAPI = "https://api.tvmaze.com/shows";

let scores = document.querySelector(".scoreBox");
let noScores = document.querySelector(".noScores");

const input_form = document.querySelector(".formBox_input");
const btn_form = document.querySelector(".formBox_btn");

const show_details = document.querySelector(".infoBox");

const logo = document.querySelector(".logo");

//----------get all shows--------------//
const getAllShows = function () {
  fetch(showsAPI)
    .then((res) => res.json())
    .then((data) => {
      printAll(data);
    });
};

getAllShows();

//----------------Chiamata Get by Search--------------//
const getShowsBySrc = function () {
  scores.innerHTML = "";
  noScores.innerHTML = "";

  fetch(`https://api.tvmaze.com/search/shows?q=${input_form.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        scores.innerHTML = "";
        noScores.style.display = "block";
        noScores.innerHTML = `Scrivi bene o scrivi qualcosa, cazzone!`;
      } else {
        printBySrc(data);
      }
    });
};

btn_form.addEventListener("click", function () {
  getShowsBySrc();
});

//-------GET SHOW'S INFO-------------------//

const getInfoById = function (id) {
  fetch(`${showsAPI}` + `/${id}`)
    .then((res) => res.json())
    .then((data) => printInfo(data));
};

//--------PRINT FUNCTIONS-----------

const printAll = function (data) {
  for (const score of data) {
    //console.log(score.show);
    const show = score;

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
        <button type="button" class="btn_info" onClick = "getInfoById(${
          show.id
        })">
        <span class="material-icons-outlined">info</span>
        </button>
        </div>`;
  }
};

const printBySrc = function (data) {
  show_details.innerHTML = "";
  show_details.style.display = "none";

  scores.style.display = "grid";
  scores.innerHTML = "";

  for (const score of data) {
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
            <button type="button" class="btn_info" onClick = "getInfoById(${
              show.id
            })">
        <span class="material-icons-outlined">info</span>
    </button>
            </div>`;
  }

  input_form.value = "";
};

const printInfo = function (data) {
  let info = data;
  console.log(info);
  scores.innerHTML = "";
  scores.style.display = "none";
  show_details.style.display = "block";
  show_details.innerHTML += `
    <did class="global_info">
        <img class="info_img" src="${
          info.image === null ? "/img/no-image.png" : info.image.medium
        }" alt="">
        <div class="info_details">
            ${info.summary}
            <p><b>Official Site:</b>${
              info.officialSite === null ? `Unknown` : info.officialSite
            }</p>
        </div>
    </did>
    `;
  /* info.image --- name 
    summary
    officialSite
    */
};
/* 
logo.addEventListener('click', function(){
    getAllShows()
}) */
