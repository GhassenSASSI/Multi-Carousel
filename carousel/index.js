let items = document.getElementsByClassName("item")
const controls = document.getElementsByClassName("controls")
const prevBtn = document.getElementById("prev")

controls[0].style.top = `calc(50% - ${prevBtn.offsetHeight / 2}px)`

function goPrev(){
    let itemsArray = Array.from(items)
    let itemsCopy = []

    enableDisableControls(true)

    const innerCopy = document.createElement("div")

    createCopies(itemsArray, itemsCopy, innerCopy)

    for (let i = 0; i < itemsCopy.length; i++) {
        itemsCopy[i].style.transform = `translateX(${items[i].offsetWidth}px)`
    }

    for (let i = 0; i < items.length; i++) {
        items[i].style.visibility = 'hidden';
    }

    setTimeout(() => {
        items[items.length / 2 - 1].parentNode.insertBefore(items[items.length / 2 - 1], items[0])
        innerCopy.parentNode.removeChild(innerCopy)
        for (let i = 0; i < items.length; i++) {
            items[i].style.visibility = 'visible'
        }
        enableDisableControls(false)
    }, 500)
}

function goNext(){
    let itemsArray = Array.from(items)
    let itemsCopy = []

    enableDisableControls(true)

    const innerCopy = document.createElement("div")

    createCopies(itemsArray, itemsCopy, innerCopy)

    for (let i = 0; i < itemsCopy.length; i++) {
        itemsCopy[i].style.transform = `translateX(${items[i].offsetWidth * -1}px)`
    }

    for (let i = 0; i < items.length; i++) {
        items[i].style.visibility = 'hidden';
    }

    setTimeout(() => {
        insertAfter(items[0], items[items.length / 2 - 1])
        innerCopy.parentNode.removeChild(innerCopy)
        for (let i = 0; i < items.length; i++) {
            items[i].style.visibility = 'visible'
        }
        enableDisableControls(false)
    }, 500)
}

function insertAfter(el, refrenceNode){
    refrenceNode.parentNode.insertBefore(el, refrenceNode.nextSibling)
}

function createCopies(elementsToCopy, copiesArray, innerCopy){
    const inner = document.getElementsByClassName("inner")
    innerCopy.classList.add('inner-copy')
    document.body.appendChild(innerCopy)
    innerCopy.style.height = `${inner[0].offsetHeight}px`
    innerCopy.style.width = `${inner[0].offsetWidth}px`
    innerCopy.style.top = `${inner[0].offsetTop}px`
    innerCopy.style.left = `${inner[0].offsetLeft}px`

    for (let i = 0; i < elementsToCopy.length; i++) {
        const clonedItem = elementsToCopy[i].cloneNode(true)
        innerCopy.appendChild(clonedItem)
        clonedItem.classList.add('element-copy')
        clonedItem.style.height = `${elementsToCopy[i].offsetHeight}px`
        clonedItem.style.maxWidth = `${elementsToCopy[i].offsetWidth}px`
        clonedItem.style.minWidth = `${elementsToCopy[i].offsetWidth}px`
        copiesArray.push(clonedItem)
    }
}

function enableDisableControls(value){
    document.getElementById("prev").disabled = value;
    document.getElementById("next").disabled = value;
}