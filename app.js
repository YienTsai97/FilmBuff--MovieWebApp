const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const popularGallery = document.querySelector("#popular");
const upcomingGallery = document.querySelector("#upcoming");
const photoCollect = document.querySelector(".photo-colle");
const searchGallery = document.querySelector("#search");
const searchBackBtn = document.querySelector(".search-back-btn");

$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    $('.nav').toggleClass('header-dark');
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

$('.switch').click(function () {
    $('body').toggleClass("lightmode");
    $('body').toggleClass("darkmode");
})

$(window).scroll(function () {
    affix()
});

function affix() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');

    } else {
        $('.nav').removeClass('affix');
    }
}


$('h2').click(function () {
    $(this).next('section').slideToggle();
});

$('.search-result-title').click(function () {
    $(this).next('section').slideToggle();
});



//API option
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWE5M2M5YjY3ZmJhZDdlY2ExODVkMGI2NmNhYzlkNyIsIm5iZiI6MTcyMzA2MTU2MC4wMjQ5NDksInN1YiI6IjY2YjMyYTQ0M2NkN2YxMDgwNzI3ZDA0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bwIR1tfq8uF5A9cC5Mogq0ekMJ1mrjyJ8vWml1RkU8E",
    },
};

//Search movie
async function search(keyword) {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${keyword}&page=1`,
            options
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const sectionSearch = document.createElement("section");
sectionSearch.classList.add("photo-colle__gallery");
searchGallery.appendChild(sectionSearch);

async function builtSearchGallery() {
    searchData = await search(`${searchInput.value}`);
    searchDataArrey = searchData.results;
    searchDataArrey.forEach(function (item) {
        const div = document.createElement("div");
        div.classList.add("photo-colle__gallery-item-search");

        const figure = document.createElement("figure");
        figure.addEventListener("click", () => itemPage(item));

        const img = document.createElement("img");
        img.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${item.poster_path}`
        );
        figure.appendChild(img);

        div.appendChild(figure);
        sectionSearch.appendChild(div);

        searchBackBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 512 512"><path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3l0 41.7 0 41.7L459.5 440.6zM256 352l0-96 0-128 0-32c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-64z"/></svg>'

        function backtoHome() {
            popularGallery.style = "display:block";
            upcomingGallery.style = "display:block";
            searchGallery.style = "display:none";
            div.remove();
        }

        searchBackBtn.addEventListener("click", async function () {
            backtoHome()
        });

        //Home Btn
        const HomeBtn = document.querySelector('.home-btn')
        HomeBtn.addEventListener('click', function () {
            backtoHome()
        })
    });
}

searchBtn.addEventListener("click", async function () {
    await builtSearchGallery();
    searchGallery.style = "display:block";
    popularGallery.style = "display:none";
    upcomingGallery.style = "display:none";
});

//Individual item PG
function itemPage(item) {
    const main = document.querySelector("main");
    const divOverlay = document.createElement("div");
    const divModal = document.createElement("div");
    const divModalLeft = document.createElement("div");
    const divModalRight = document.createElement("div");
    const imgOverlay = document.createElement("img");
    const imgPoster = document.createElement("img");
    const itemPageBackBtn = document.createElement("button");
    const movieTitle = document.createElement("h3");
    const movieContent = document.createElement("h4");
    const releaseDate = document.createElement("p");

    const photoColleWrap = document.querySelector(".photo-colle");
    photoColleWrap.style = "display:none";

    divOverlay.className = "overlay";
    divModal.className = "modal";
    divModalLeft.className = "modalLeft";
    divModalRight.className = "modalRight";
    imgOverlay.className = "imgOverlay";
    imgPoster.classname = "imgPoster";
    main.append(divOverlay);
    divOverlay.append(imgOverlay);
    divOverlay.append(divModal);
    divModal.append(divModalLeft);
    divModal.append(divModalRight);
    divModalLeft.append(imgPoster);

    divModalRight.append(itemPageBackBtn);
    itemPageBackBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="60" width="45" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
    itemPageBackBtn.addEventListener("click", () => {
        photoColleWrap.style = "display:block";
        divOverlay.remove();
    });
    divModalRight.append(movieTitle);
    movieTitle.innerHTML = `${item.title}`;
    divModalRight.append(releaseDate);
    releaseDate.innerHTML = `${item.release_date}`;
    divModalRight.append(movieContent);
    movieContent.innerHTML = `${item.overview}`;

    if (item.backdrop_path === null) {
        imgOverlay.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/original${item.poster_path}`
        );
    } else {
        imgOverlay.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/original${item.backdrop_path}`
        );
    }
    imgPoster.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500${item.poster_path}`
    );
}

//Now Playing
async function popular() {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
            options
        );
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(err);
    }
}

const sectionPopular = document.createElement("section");
sectionPopular.classList.add("photo-colle__gallery");
popularGallery.appendChild(sectionPopular);

//Upcoming
async function upcoming() {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
            options
        );
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(err);
    }
}

const sectionUpcoming = document.createElement("section");
sectionUpcoming.classList.add("photo-colle__gallery");
upcomingGallery.appendChild(sectionUpcoming);

//Built Gallery: NowPlaying & Upcoming
async function builtGallery() {
    popularData = await popular();
    popularData.forEach(function (item) {
        const div = document.createElement("div");
        div.classList.add("photo-colle__gallery-item");

        const figure = document.createElement("figure");
        figure.addEventListener("click", () => itemPage(item));

        const img = document.createElement("img");
        img.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${item.poster_path}`
        );
        figure.appendChild(img);

        div.appendChild(figure);
        sectionPopular.appendChild(div);
    });

    upcomingData = await upcoming();
    upcomingData.forEach(function (item) {
        const div = document.createElement("div");
        div.classList.add("photo-colle__gallery-item");

        const figure = document.createElement("figure");
        figure.addEventListener("click", () => itemPage(item));

        const img = document.createElement("img");
        img.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${item.poster_path}`
        );
        figure.appendChild(img);

        div.appendChild(figure);
        sectionUpcoming.appendChild(div);
    });
}
builtGallery();









