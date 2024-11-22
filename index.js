let player = {
    name: "Damian",
    chips: 100
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")


function updateChipsDisplay() { // Function to update the player's chips display
    playerEl.textContent = player.name + ": R" + player.chips //Change from $ to R
}

updateChipsDisplay()// Initial display of player's chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.chips >= 10) { // Check if player has enough chips to start a new game
        isAlive = true
        hasBlackJack = false 
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        player.chips -= 10 // Deduct 10 chips for starting a new game
        updateChipsDisplay()//Update chip count
        renderGame()
    } else {
        messageEl.textContent = "Not enough chips to start a new game!"
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += 50 // Add 50 chips for getting Blackjack
        updateChipsDisplay()
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}