console.log("this is my index file");

//initialize the news api parameters
source = 'the-times-of-india';
let apiKey = 'f3d94fbe2a7a4c4b935c9356c9d4af1c';

let newshtml = "";

//grab the news container
newsaccordion = document.getElementById('newsaccordion');


//create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(articles);
        articles.forEach(function (element, index) {
            news = `
            <div class="card" id="hello">
                <div class="card-header" id="heading${index}">
                    <h5 class="mb-0">
                        <button class="btn btn-link collpased" type="button" data-toggle="collapse" data-target="#collapse${index}"
                            aria-expanded="true" aria-controls="collapse${index}">
                            <b>Breaking News: ${index + 1} </b> ${element["title"]}
                        </button>
                    </h5>
                </div>

                <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                    data-parent="#newsaccordion">
                    <div class="card-body" id="hello" >${element["content"]}. <a href="${element["url"]}" target="_blank">Read more here</a>
                    </div>
                </div>
            </div>`;
            // <div class="card" > </div>

            newshtml += news;
        });
        newsaccordion.innerHTML = newshtml;
    }
    else {
        console.log("some error occured");
    }
}
xhr.send();


let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    console.log('input event fired');
    let noteCards = document.getElementsByClassName('card');
    Array.from(noteCards).forEach(function (element) {
        let cardtxt = element.getElementsByClassName('collapse')[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardtxt);
    })
});
