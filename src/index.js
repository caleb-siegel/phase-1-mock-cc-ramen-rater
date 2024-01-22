// declare variables for html elements
let menu = document.querySelector(`#ramen-menu`)
let featuredImage = document.querySelector(`.detail-image`)
let featuredName = document.querySelector(`.name`)
let featuredRestaurant = document.querySelector(`.restaurant`)
let featuredRating = document.querySelector(`#rating-display`)
let featuredComment = document.querySelector(`#comment-display`)
let createName = document.querySelector("#new-name")
let createRestaurant = document.querySelector("#new-restaurant")
let createImage = document.querySelector("#new-image")
let createRating = document.querySelector("#new-rating")
let createComment = document.querySelector("#new-comment")
let createRamen = document.querySelector("#new-ramen")
let editRamen = document.querySelector(`#edit-ramen`)

// create function for changing the data in the featured section
function changeData(item) {
    featuredImage.src = item['image'];
    featuredName.textContent = item[`name`];
    featuredRestaurant.textContent = item[`restaurant`];
    featuredRating.textContent = item[`rating`];
    featuredComment.textContent = item[`comment`];
};

// default the first ramen to the main image
document.addEventListener(`DOMContentLoaded`, (event) => {
    fetch("http://localhost:3000/ramens/")
    .then(response => response.json())
    .then(ramens => {
        event.preventDefault()
        changeData(ramens[0])
    })
})

// add the images to the top and allow functionality to click on the image and then see the full data in the main section
fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(ramens => {
    ramens.forEach(ramen => {
        let img = document.createElement(`img`)
        img.src = ramen[`image`]
        img.id = ramen[`name`]
        menu.append(img)
                
        img.addEventListener(`click`, (event) => {
            event.preventDefault()
            changeData(ramen)
        })
        })
    })    

// Add new ramen to the list and make it clickable
createRamen.addEventListener("submit", (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: createName.value,
            restaurant: createRestaurant.value,
            image: createImage.value,
            rating: createRating.value,
            comment: createComment.value
        })
    })
    .then(response => response.json())
    .then(newRamen => {
        let newImg = document.createElement(`img`)
        newImg.src = newRamen.image
        newImg.id = newRamen[`name`]
        menu.append(newImg)
        
        newImg.addEventListener(`click`, (event) => {
            event.preventDefault()
            changeData(newRamen)
        })
    })
})

// Update featured ramen's rating and comment

// editRamen.addEventListener(`submit`, (event) => {
//     event.preventDefault()
//     console.log(document.querySelector("#new-comment").value)
//     let newRating = document.querySelector(`#new-rating`)
//     featuredRating.textContent = newRating.value
    // featuredComment.textContent = document,querySelector(`#new-comment`)
// })

// editRamen.addEventListener("submit", (event) => {
//     event.preventDefault()
//     fetch(`http://localhost:3000/ramens/:id`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             comment: document.querySelector(`#new-comment`).value,
//             rating: document.querySelector(`#new-rating`).value
//         })
//     })
//     .then(response => response.json())
//     .then(editedRamen => {
//         changeData(newRamen)
//     })
// })