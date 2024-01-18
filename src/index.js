// write your code here 
fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(ramens => {
    ramens.forEach(ramen => {
        let img = document.createElement(`img`)
        img.setAttribute(`src`, ramen[`image`])
        img.setAttribute(`id`, ramen[`name`])
        document.querySelector(`#ramen-menu`).append(img)    
        
        img.addEventListener(`click`, (event) => {
            event.preventDefault()
                    document.querySelector(`.detail-image`).setAttribute(`src`, ramen[`image`])
                    document.querySelector(`.name`).textContent = ramen[`name`]
                    document.querySelector(`.restaurant`).textContent = ramen[`restaurant`]
                    document.querySelector(`#rating-display`).textContent = ramen[`rating`]
                    document.querySelector(`#comment-display`).textContent = ramen[`comment`]
        })
        })
    })    

document.querySelector("#new-ramen").addEventListener("submit", (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector("#new-name").value,
            restaurant: document.querySelector("#new-restaurant").value,
            image: document.querySelector("#new-image").value,
            rating: document.querySelector("#new-rating").value,
            comment: document.querySelector("#new-comment").value
        })
    })
    .then(response => response.json())
    .then(newRamen => {
        let newImg = document.createElement(`img`)
        newImg.setAttribute(`src`, newRamen.image)
        newImg.setAttribute(`id`, newRamen[`name`])
        document.querySelector(`#ramen-menu`).append(newImg)
    })
})