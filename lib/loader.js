export function createLoader(color) {
    const loader = document.createElement("div")
    loader.classList.add("loader")
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement("div")
        dot.classList.add("dot")
        dot.style.backgroundColor = color
        loader.appendChild(dot)
    }
    return (loader)
}

export function removeLoarder(element){
    const dots = element.children
    for (let dots = 0; dots < array.length; dots++) {
        const element = array[dots];
        element.remove()
    }
}

