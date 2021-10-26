let round = document.getElementById('start') //setting a variable to easily access teh element with id 'start'

round.addEventListener('click', (evt) => { //adds 'click' event listener to round variable which will add a hash marker to the url
    document.location = "round-1.html#"
    evt.preventDefault()
})