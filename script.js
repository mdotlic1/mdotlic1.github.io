let temp1 = document.getElementById("temp1")
let cnt = temp1.content.cloneNode(true)
let container = document.getElementById("container")
let mainTitle = document.getElementById("mainTitle");
let searchLabel = document.getElementById("searchLabel");
let all = document.getElementById("all");
let watched = document.getElementById("watched");
let notWatched = document.getElementById("notWatched");
let counter = document.getElementById("counter");

let count = 0;

all.checked = true;

let title = cnt.getElementById("title");
let img = cnt.getElementById("img");
let rtng = cnt.getElementById("rating");
let crw = cnt.getElementById("crew");
let watchedCb = cnt.getElementById("watched");


function imdb250(selection){

    container.innerHTML = '';
    document.title = selection == "Top250Movies/" ? 'Top 250 Movies' : 'Top 250 TV Shows';
    mainTitle.innerHTML = selection == "Top250Movies/" ? 'Top 250 Movies' : 'Top 250 TV Shows';
    searchLabel.innerHTML = selection == "Top250Movies/" ? 'Search for a movie' : 'Search for a TV show';
    let url = 'https://imdb-api.com/en/API/' + selection + apiKey;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if(xhr.status === 200){
            let data = JSON.parse(xhr.responseText);
            console.log(data)
            

            for(let i = 0; i < data.items.length; i++){


                title.innerHTML = data.items[i].rank + ". " + data.items[i].fullTitle;
                img.src = data.items[i].image;
                rtng.innerHTML = data.items[i].imDbRating + "/10" + " <i>(" + data.items[i].imDbRatingCount + " votes)</i>";
                crw.innerHTML = data.items[i].crew;
                
                title.id = "title" + i + selection;
                img.id = "img" + i + selection;
                crw.id = "crew" + i + selection;
                rtng.id = "rating" + i + selection;
                watchedCb.id = "watched" + i + selection + data.items[i].id;

                container.appendChild(cnt.cloneNode(true));

                let clickableTitle = document.getElementById("title" + i + selection);
                let clickablePoster = document.getElementById("img" + i + selection); 
                let clickableCrew = document.getElementById("crew" + i + selection);
                let clickableRating = document.getElementById("rating" + i + selection);

                let watchedCBToggle = document.getElementById("watched" + i + selection + data.items[i].id);

                if(localStorage.getItem(watchedCBToggle.id) != null){
                    if(localStorage.getItem(watchedCBToggle.id) == "true"){
                        watchedCBToggle.checked = true;
                        watchedCBToggle.parentElement.parentElement.classList.add("watched");
                    }else{
                        watchedCBToggle.checked = false;
                        watchedCBToggle.parentElement.parentElement.classList.remove("watched");
                    }
                }

                clickableTitle.addEventListener("click", ()=>{
                    window.location.assign("https://www.imdb.com/title/" + data.items[i].id) 
                })

                clickablePoster.addEventListener("click", ()=>{

                    let xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', 'https://imdb-api.com/en/API/YouTubeTrailer' + '/' + apiKey + '/' + data.items[i].id);
                    xhr2.onload = function () {
                        if(xhr2.status === 200){
                            let data2 = JSON.parse(xhr2.responseText);
                            console.log(data2)
                            let ytLink = data2.videoUrl;
                            window.location.assign(ytLink) 
                        }
                    }
                    xhr2.send();
                });

                clickableCrew.addEventListener("click", () => {
                    let castUrl = 'https://www.imdb.com/title/' + data.items[i].id + '/fullcredits/?ref_=tt_cl_sm'
                    window.location.assign(castUrl)
                  });

                clickableRating.addEventListener("click", () => {
                    let ratingUrl = 'https://www.imdb.com/title/' + data.items[i].id + '/reviews?ref_=tt_urv'
                    window.location.assign(ratingUrl)
                  });

                watchedCBToggle.addEventListener("click", () => {
                    watchedCBToggle.parentElement.parentElement.classList.toggle("watched");
                    if(all.checked === true)
                        all.click();
                    if(watched.checked === true)
                        watched.click();
                    if(notWatched.checked === true)
                        notWatched.click();
                    if(watchedCBToggle.checked === true){
                        localStorage.setItem(watchedCBToggle.id, "true");
                    }else
                    {
                        localStorage.setItem(watchedCBToggle.id, "false");
                    }
                });

            }
            if(localStorage.getItem("watchedFilter")!=null){
                if(localStorage.getItem("watchedFilter")=="all"){
                    all.click()
                }
                if(localStorage.getItem("watchedFilter")=="watched"){
                    watched.click()
                }
                if(localStorage.getItem("watchedFilter")=="notWatched"){
                    notWatched.click()
                }
            }

            if(container.innerHTML == ''){
                localStorage.removeItem("apiKey");
                let warningMessage = document.createElement("h1");
                warningMessage.classList.add("warningMessage");
                warningMessage.innerHTML = "Please try a different API key.";
                mainContainer.appendChild(warningMessage);
                let refresh = document.createElement("button");
                refresh.classList.add("refresh");
                refresh.innerHTML = "Try different API key";
                mainContainer.appendChild(refresh);
                refresh.addEventListener("click", ()=>{
                    location.reload();
                });
            }
                
            
        }
    }
    xhr.send();
}

imdb250("Top250Movies/");

let movies = document.getElementById("movies");
let shows = document.getElementById("shows");

movies.addEventListener("click", () => {
    movies.style.fontWeight = "bold";
    shows.style.fontWeight = "normal";

    imdb250("Top250Movies/");
});

shows.addEventListener("click", () => {
    shows.style.fontWeight = "bold";
    movies.style.fontWeight = "normal";

    imdb250("Top250TVs/");
});

const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    let titles = document.querySelectorAll("[data-title]"); 

    titles.forEach(title => {
      const isVisible = title.innerHTML.toLowerCase().includes(value)
      title.parentNode.classList.toggle("hide", !isVisible)
    })
  })

    all.addEventListener("click", () => {
        counter.style.display = "none";
        searchInput.value = '';
        let titles = document.querySelectorAll("[data-title]"); 
        titles.forEach(title => {
            title.parentNode.classList.remove("hideWatched")
            title.parentNode.classList.remove("hide")
        });
        localStorage.setItem("watchedFilter", "all");
    });

    watched.addEventListener("click", () => {
        count = 0;
        counter.style.display = "initial";
        searchInput.value = '';
        let titles = document.querySelectorAll("[data-title]"); 
        titles.forEach(title => {
            if(title.parentNode.classList.contains("watched")){
                title.parentNode.classList.remove("hideWatched")
                title.parentNode.classList.remove("hide")
                count++;
            } else {
                title.parentNode.classList.add("hideWatched")
            }
        });
        localStorage.setItem("watchedFilter", "watched");
        counter.innerHTML = "Watched: " + count;
    });

    notWatched.addEventListener("click", () => {
        count = 0;
        counter.style.display = "initial";
        searchInput.value = '';
        let titles = document.querySelectorAll("[data-title]"); 
        titles.forEach(title => {
            if(!title.parentNode.classList.contains("watched")){
                title.parentNode.classList.remove("hideWatched")
                title.parentNode.classList.remove("hide")
                count++;
            } else {
                title.parentNode.classList.add("hideWatched")
            }
        });
        localStorage.setItem("watchedFilter", "notWatched");
        counter.innerHTML = "Not Watched: " + count;
    });
