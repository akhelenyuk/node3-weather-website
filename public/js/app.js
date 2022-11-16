console.log('Client side Javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = ' From JS with Love'

weatherForm.addEventListener('submit', (e) => { // e = event
    e.preventDefault()

    const location = search.value

    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'
    fetch(`/weather?address=${location}`).then((response) => {
        const jsonResp = response.json()

        jsonResp.then((data) => {
            if (data.error) {
                messageOne.textContent = ''
                return messageTwo.textContent = data.error
            }
            messageOne.textContent = ''
            messageTwo.textContent = data.forecast
        })
    })
})
