const movieNameRef = document.getElementById("input_movie");
const searchBtn = document.getElementById("btn_search");
const result = document.getElementById("result");

const getMovie = async () => {
  const movieName = movieNameRef.value;
  const url = `https://omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (!movieName.length) {
    return (result.innerHTML = `<h3 class="msg">Enter Movie, please.<h3/>`);
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.Plot);
    if (data.Response == "True") {
      result.innerHTML = `
        <div class="info">
            <img src=${data.Poster} class="poster">
            <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                    <img src="img/star_icon.png">
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Year}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast:</h3>
        <p>${data.Actors}</p>
      `;
    } else {
      result.innerHTML = `<h3 class="msg">${data.Error}<h3>`;
    }
  } catch (error) {
    result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
  }
};
searchBtn.addEventListener("click", getMovie);
