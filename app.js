const currentCard = document.getElementById("currentCard")
const cardCont = document.getElementById("cardCont")
const state ={
    cards: [],
    currentCard: null
}

addEventListener("hashchange", (e) => {
    selectCard()
})

function selectCard(){
    const name = decodeURI(window.location.hash.slice(1))
    const singleCard = state.cards.find((card) => {
        return card.name === name;
    })
    if(singleCard){
        state.currentCard = singleCard
        currentCard.innerHTML = `<h1> ${state.currentCard.name} </h1>
    <img src=${state.currentCard.card_images[0].image_url} />`
    } else {
        currentCard.innerHTML = ""
    }
}

function renderCardsList(){
    const cardsHtml = state.cards.map((card) => {
        return `<a href='#${card.name}'>${card.name}</a><br>`
    })
    cardCont.innerHTML = cardsHtml.join('')
}

async function getCards(){
    const cardData = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
    const cards = await cardData.json();
    for (let i = 0; i < 100; i++) {
        state.cards.push(cards.data[i])
    }
}

async function render(){
    await getCards()
    renderCardsList()
    selectCard()
}
render()
