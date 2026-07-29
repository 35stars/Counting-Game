

const increaseBtn = document.getElementById('inc-btn')
const decreaseBtn = document.getElementById('dec-btn')
const quantityEl = document.getElementById('quantity')
const subBtn = document.getElementById('sub-btn')
const resetBtn = document.getElementById('res-btn')
const img = document.querySelector('img')
const h1 = document.querySelector('h1')
const showBtn = document.getElementById('show-btn')
const iframeEl = document.querySelector('.video')
const name = document.getElementById('name')
const enterBtn = document.getElementById('enter-btn')

const inputName = document.querySelector('body > section:last-child > div:last-child')

inputName.style.display = 'none'

const animals = ['dogs','mice','cats','kittens']
const images = ['2.jpg','3.jpg','4.jpg','5.jpg']
img.src = images[0]

iframeEl.classList.add('show')
showBtn.textContent = 'Hide Video'

showBtn.addEventListener('click',()=>{

	showBtn.textContent = 'Show Video'

	if(iframeEl.classList.contains('show')){
		iframeEl.classList.remove('show')
	}
	else {
		iframeEl.classList.add('show')
		showBtn.textContent = 'Hide Video'
	}
})

let quantity = 0
let index = 0
let points = 0

h1.textContent = `How many ${animals[index]} are there in the picture?`;

increaseBtn.addEventListener('click',()=> 
	quantity = increaseQty(quantity,quantityEl)
)

decreaseBtn.addEventListener('click',()=> 
	quantity = decreaseQty(quantity,quantityEl)
)

subBtn.addEventListener('click',()=>{

	if(img.src.endsWith(images[0]) && quantity == 6){
		++points
		changePhoto()
		quantity = nextQuestion(quantity,quantityEl)
	}
	else if(img.src.endsWith(images[1]) && quantity == 3){
		++points
		changePhoto()
		quantity = nextQuestion(quantity,quantityEl)
	}
	else if(img.src.endsWith(images[2]) && quantity == 3){
		++points
		changePhoto()
		quantity = nextQuestion(quantity,quantityEl)
	}
	else if(img.src.endsWith(images[3]) && quantity == 5){

		index = 0
		quantity = 0

		++points

		img.src = images[index]

		quantityEl.textContent = quantity

		if(hasPassed()){
			inputName.style.display = 'block'
			
			h1.textContent = `Please enter your name below to get your points.`
		}
		else {
			hasPassed()
			let pt = points < 2 ? 'point' : 'points'
			h1.textContent = `I'm sorry. You only got ${points} ${pt}. Better luck next time.`
		}
	}
	else if(img.src.endsWith(images[0]) && quantity != 6 ){
		alertMsg()
		removePoints()
	}
	else if(img.src.endsWith(images[1]) && quantity != 3){
		alertMsg()
		removePoints()
	}
	else if(img.src.endsWith(images[2]) && quantity != 3){
		alertMsg()
		removePoints()
	}
	else if(img.src.endsWith(images[3]) && quantity !=5){
		alertMsg()
		removePoints()
	}
})


resetBtn.addEventListener('click',()=>{

	index = 0
	points = 0
	quantity = 0

	img.src = images[index]

	quantityEl.textContent = quantity

	inputName.style.display = 'none'
	
	h1.textContent = `How many ${animals[index]} are there in the picture?`;
})

enterBtn.addEventListener('click',()=>{

	if(isValidName(name)){
		h1.textContent = `Congrats ${name.value}! You got ${points} points, You passed the test!`
		return
	}

	h1.textContent = 'Invalid name. Letters only.'
})

function isValidName(name){
	return /^[a-zA-Z\s]+$/.test(name.value)
}


function hasPassed(){

	if(points > 2){
		quantity = 0
		return true
	}
	return false
}

function increaseQty(qty,element){
	qty++
	element.textContent = qty
	return qty
}

function decreaseQty(qty,element){
	qty--

	if(qty < 0){
		qty = 0
	}

	element.textContent = qty
	return qty
}

function changePhoto(){
	index++
	img.src = images[index]
}

function nextQuestion(qty,qtyEl){
	
	qty = 0
	h1.textContent = `How many ${animals[index]} are there in the picture?`;
	qtyEl.textContent = qty

	return qty
}


function removePoints(){
	points--
	points = points < 0 ? 0 : points
}

function alertMsg(){
	alert('Wrong number. Please try again!')
}