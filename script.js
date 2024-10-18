const api_key = "10c7318b51af4cd69db1e32696cf11da";

import {subtleColors} from './constants.js';
import {countries} from './constants.js';
import {languages} from './constants.js';

const cardcont = document.getElementById("card-container");

const noContent = document.getElementById("no-content");
noContent.innerHTML = "";

function showNews(data){
    
    data.forEach((news)=>{

        const card = document.createElement("div");
        card.classList.add("card");

        const source = document.createElement("span");
        source.classList.add("source");
        source.innerText = news.source.name;

        const image = document.createElement("img");
        image.classList.add("image");
        image.src = news.urlToImage;
        image.alt = news.title;

        const title = document.createElement("h2");
        title.classList.add("title");
        title.innerText = news.title;

        const author = document.createElement("span");
        author.className="author published";
        author.innerText = `${news.author} . ${news.publishedAt}`

        const desc = document.createElement("p");
        desc.classList.add("description");
        desc.innerText = news.description

        card.append(source,image,title,author,desc);
        cardcont.append(card);

    })
}
function loadNews(data){
    console.log("Loading News...",data)
    const newArr = data.articles.filter(newsobj => newsobj.urlToImage!==null);
    console.log(newArr);
    if(newArr.length == 0){
        noContent.innerHTML = "<p>No Contents with these parameters.</p>";
    }
    else{
        showNews(newArr);
    }
}
// function loadNews(data){
//     console.log("Loading News...",data)
//     const newArr = data.articles.filter(newsobj => newsobj.urlToImage===null);
//     console.log(newArr);
//     if(newArr.length == 0){
//         cardcont.innerHTML = "";
//         noContent.innerHTML = "<p>No Contents with these parameters.</p>";
//     }
//     else{
//         showNews(newArr);
//     }
// }

const btn = document.querySelector("#btn")

const dropdown = document.querySelector("#dropdown");
let selectedDrop = dropdown.value;

const language = document.querySelector("#languages");
let selectedLang = language.value;

const searchIn = document.querySelector("#searchIn");
let selectSearchIn = searchIn.value;


dropdown.addEventListener('change',(e)=>{
    selectedDrop = dropdown.value;
});

languages.forEach((obj)=>{
    // console.log(obj);
    const opt = document.createElement("option");

    opt.setAttribute("value",obj.code);
    opt.innerText = obj.language;

    language.appendChild(opt);
})
language.addEventListener('change',(e)=>{
    selectedLang = language.value;
});

searchIn.addEventListener('change',(e)=>{
    selectSearchIn = searchIn.value;
});



btn.addEventListener("click",(e)=>{
    e.preventDefault();
    cardcont.innerHTML = "";
    noContent.innerHTML = "";  // Made everyhing that is on the window disapper.

    const body = document.querySelector("body");
    body.style.backgroundColor = subtleColors[Math.floor(Math.random()*subtleColors.length)].color;
    
    const search = document.querySelector("#search");
    const searchkeyword = search.value;
    console.log("keyword is :",searchkeyword);
    if(searchkeyword === ""){
        noContent.innerHTML = "<p>Please enter a keyword to search.</p>";
    }
    else{
        fetch(`https://newsapi.org/v2/everything?q=${searchkeyword}&language=${selectedLang}&sortBy=${selectedDrop}&searchIn=${selectSearchIn}&apiKey=10c7318b51af4cd69db1e32696cf11da`)
        .then((res) => res.json())
        .then(loadNews);
    }

})