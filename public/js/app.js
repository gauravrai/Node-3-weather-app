
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch('/weather/?address='+search.value+'')
        .then((response)=>{
            response.json().then((data)=>{
                if(data.hasOwnProperty('error')){
                    messageOne.textContent = data.error.info
                    messageTwo.textContent = ""
                }
                else{
                    messageOne.textContent = ""
                    messageTwo.textContent = data.location + ", " + data.forecast
                }
            })
    })
})