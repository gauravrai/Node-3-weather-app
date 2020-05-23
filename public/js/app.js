console.log(1)



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch('http://api.weatherstack.com/current?access_key=5106cd31fffa760bc05c54610ac5361f&query='+search.value+'&units=f')
        .then((response)=>{
            response.json().then((data)=>{
                if(data.hasOwnProperty('error')){
                    messageOne.textContent = data.error.info
                    messageTwo.textContent = ""
                }
                else{
                    messageOne.textContent = ""
                    messageTwo.textContent = data.location.name + ", " + data.current.weather_descriptions[0]
                }
            })
    })
})