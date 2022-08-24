let timer;
let deleteFirstPhotoDelay;

// fetching the name,breed data of dogs
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json()
    createBreedList(data.message);
}
start()

//listing the data to html
const createBreedList = (breedlist) => {
    document.getElementById("breed").innerHTML = `<select onchange = "changeBreed(this.value)">
<option >SELECT CHANNEL </option>
${Object.keys(breedlist).map(function (breed) {
        return `<option>${breed}</option>`
    }).join('')}
</select>
`
}
//giving info to the console 
async function changeBreed(breed) {
    if (breed != "choose a dog") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        slideShow(data.message);
    }
}
//fetching the images 
function slideShow(images) {
    let currentPosition = 0
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    if (images.length > 1) {
        document.getElementById('ss').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>`
        currentPosition += 2

        timer = setInterval(nextSlide, 3000)

        if (images.length == 2) currentPosition = 0;

    } else {
        document.getElementById('ss').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide");"></div>`

    }
    //adding the images dynamically 
    function nextSlide() {
        document.getElementById('ss').insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`)

        deleteFirstPhotoDelay = setTimeout(function () {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}





























