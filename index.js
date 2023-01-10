const matchingCities = document.createElement('datalist')
matchingCities.setAttribute('id', 'matches')
const option = document.createElement('option')

const input = document.createElement('input')
input.setAttribute('type', 'text')
input.setAttribute('list', 'matches')

const mainDiv = document.querySelector('#root')
mainDiv.appendChild(matchingCities)
mainDiv.appendChild(input)

const p = document.createElement('p')

const url = 'http://api.weatherapi.com/v1/current.json?key=6d546ac361fe4c238f392320230901&q='

input.addEventListener('input', (e) => {
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
    })


/*const option = document.createElement('option')

input.addEventListener('click') 

input.addEventListener('input', (e) => {
const matching = jsonPackage('./cities.json').filter(x=> (new RegExp('^' + e.target.value).test(x.name)))
console.log(matching)
matching.forEach(x=> {option.setAttribute('value', x.city); matchingCities.appendChild(option)})
    
});






/*const option = document.createElement('option')*/