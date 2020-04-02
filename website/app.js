/* Global Variables */
const apiKey = '7c0802a3ab9e59e9d479af1da0b549d6'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
const generate = document.getElementById('generate')
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); 


//NEW CODE: 
const performAction = async (baseURL, zip, apiKey) => {
    try {
        const request = await fetch(
          `${baseURL}?zip=${zip},us&appid=${apiKey}`,
        )
        const items = await request.json()
        const {
          main: {temp: temp},
        } = items
        return temp
      } 
    catch (event) {
        throw event
     }
}


const addData = async (route, data) => {
    try {
        await fetch(route, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } 
    catch (event) {
        throw event
     }
}

const changeUI = async (temperature, newDate, feelings) => {
    date.innerText = `Dates: ${newDate}`
    temp.innerText = `Todays Temp: ${temperature}`
    content.innerText = `Journal Notes: ${feelings}`
  }


generate.addEventListener('click', () => {
    performAction(baseURL, zip.value, apiKey)
      .then(temp => {
        return {date: newDate, temp, content: feelings.value}
      })
      .then(data => {
        addData('/add', data)
        return data
      })
      .then(({temp, date, content}) => 
        changeUI(temp, date, content))
      .catch(event => {
        console.error(event)
      })
  })

