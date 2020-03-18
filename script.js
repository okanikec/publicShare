

const countryRequest = new XMLHttpRequest()

countryRequest.addEventListener('readystatechange',(e) => {
    if(e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText)
        data.forEach((info) => {
            
            const p = document.createElement('option')
            p.textContent = info.name
            document.querySelector('select').appendChild(p)
            
           
            
            
        })
    }
})

countryRequest.open('GET','http://restcountries.eu/rest/v2/all')
countryRequest.send()





document.querySelector('#join').addEventListener('submit', function (e) {
    e.target.textContent = 'You clicked me!'
    //console.log("help!")
})