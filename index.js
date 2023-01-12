let cities;

fetch('/cities.json').then(response => response.json()).then(data=> cities = data)

let favourite=[]


const matchingCities = document.createElement('datalist')
matchingCities.setAttribute('id', 'matches')

const input = document.createElement('input')
input.setAttribute('type', 'text')
input.setAttribute('list', 'matches')
input.setAttribute('placeholder','FuckOff')

infoDiv = document.createElement('div')
infoDiv.setAttribute('id', 'infoDiv')

const button = document.createElement('button')
button.innerText= 'Add to favourite'


const mainDiv = document.querySelector('#root')
mainDiv.appendChild(matchingCities)
mainDiv.appendChild(input)
mainDiv.appendChild(button)
mainDiv.appendChild(infoDiv)


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
    infoDiv.innerHTML='';
    fetch(url + e.target.value + '&aqi=yes').
    then(response => response.json()).
    then(data => {
        const p1 = document.createElement('p')
        p1.setAttribute('id', 'city')
        p1.innerText= data.location.name
        const p2 = document.createElement('p')
        p2.innerText= 'Temperature ' + data.current.temp_c + ' °C'
        const p3 = document.createElement('p')
        p3.innerText= data.current.condition.text
        const img = document.createElement('img')
        img.setAttribute('src', data.current.condition.icon)
        const p4 = document.createElement('p')
        p4.innerText= 'Wind ' + data.current.wind_kph + ' kph'
        infoDiv.appendChild(p1)
        infoDiv.appendChild(p2)
        infoDiv.appendChild(p3)
        infoDiv.appendChild(img)
        infoDiv.appendChild(p4)
    input.value =''
    matchingCities.innerHTML= ''
console.log(favourite)}).catch(error => console.log(error))})

let counter=0


button.addEventListener('click', () => {
    if(!favourite.includes(infoDiv.querySelector('#city').innerText)){
    favourite.push(infoDiv.querySelector('#city').innerText)}
    counter=0
})


input.addEventListener('focus', () => {

    if(input.value.length === 0 && favourite.length > 0 && counter === 0){
    favourite.map(x=> {
    const option = document.createElement('option')
    option.setAttribute('value', x); 
    matchingCities.appendChild(option)})
counter = 1};
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

