let cities;

fetch('/cities.json').then(response => response.json()).then(data=> cities = data)

let favourite=[]


const matchingCities = document.createElement('datalist')
matchingCities.setAttribute('id', 'matches')

const input = document.createElement('input')
input.setAttribute('type', 'text')
input.setAttribute('list', 'matches')
input.setAttribute('placeholder','Search...')
document.body.style.backgroundColor = "#38bafe";

const button = document.createElement('button')
button.innerText= 'Add to favourite'

infoDiv = document.createElement('div')
infoDiv.setAttribute('id', 'infoDiv')

const card = document.createElement("div")
card.setAttribute("class", "rcorners1");




const mainDiv = document.querySelector('#root')
mainDiv.setAttribute("id", "mainDiv");
mainDiv.appendChild(matchingCities)
mainDiv.appendChild(infoDiv)

const titleContainer = document.createElement("div");
titleContainer.setAttribute("class", "titleContainer");
titleContainer.appendChild(document.querySelector("#mainTitle"));
titleContainer.appendChild(input);
titleContainer.appendChild(button)
mainDiv.appendChild(titleContainer);


const url = 'http://api.weatherapi.com/v1/current.json?key=6d546ac361fe4c238f392320230901&q='


    input.addEventListener('input', (e) =>{
        
        matchingCities.innerHTML= ''

        if(e.target.value.length > 2){

        
            cities.map(x=> {if ((new RegExp('^' + e.target.value, 'i')).test(x.name) &&
            !matchingCities.querySelector(`option[value='${x.name}']`)){
            const option = document.createElement('option')
            option.setAttribute('value', x.name); 
            matchingCities.appendChild(option)}})}})


        
    input.addEventListener('change', (e) =>{
    card.innerHTML='';
    fetch(url + e.target.value + '&aqi=yes').
    then(response => response.json()).
    then(data => {
        const p1 = document.createElement('p')
        p1.setAttribute('class', 'p1')
        p1.innerText= data.location.name
        const p2 = document.createElement('p')
        p2.setAttribute('class', 'p2')
        p2.innerText= data.current.temp_c + ' °C'
        const p3 = document.createElement('p')
        p3.setAttribute('class', 'p3')
        p3.innerText= data.current.condition.text
        const img = document.createElement('img')
        img.setAttribute('src', data.current.condition.icon)
        img.setAttribute("class", "img");
        const p4 = document.createElement('p')
        p4.innerText= 'Wind ' + data.current.wind_kph + ' kph'
        p4.setAttribute("class", "p4");  
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(p3);
        card.appendChild(img);
        card.appendChild(p4);
        titleContainer.appendChild(card);
    input.value =''
    matchingCities.innerHTML= ''
    
console.log(favourite)}).catch(error => console.log(error))})



button.addEventListener('click', () => {
    if(!favourite.includes(card.querySelector('.p1').innerText)){
    favourite.push(card.querySelector('.p1').innerText)}
})



input.addEventListener('focus', () => {
matchingCities.innerHTML=''
    if(input.value.length === 0 && favourite.length > 0){
    favourite.map(x=> {
    const option = document.createElement('option')
    option.setAttribute('value', x); 
    matchingCities.appendChild(option)})};
    })




/* input.addEventListener('input', (e) => {
    option.remove()
    p.remove()
    fetch(url + e.target.value + '&aqi=yes').
    then(response => response.json()).
    then(data => {
        option.setAttribute('value', data.location.name)
        matchingCities.appendChild(option)
        if(input.value === option.value){
            p.innerText= data.current.temp_f
        mainDiv.appendChild(p)
    }})      
    }) */


