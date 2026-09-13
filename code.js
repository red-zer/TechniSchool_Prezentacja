let slideTreeCount = 1

function zainBtn() {
    let count = 0
    const slideTwo = document.querySelectorAll(".step")[1]
    slideTwo.onclick = function () {
        if (count == 4) {
            count = 0
            const hideElems = document.querySelectorAll(".zainInfo")
            hideElems.forEach(e => { e.style.transform = "scale(0)" })
        } else {
            count++
            const elem = document.querySelector(`#zainInfo${count}`)
            elem.style.transform = "scale(1)"
        }
    }
}
function slideTreeFun() {
    const silde = document.getElementById("projects3D")
    silde.onclick = slideTreeBtn
}
function slideTreeBtn() {
    const project1 = document.querySelector("#project1")
    const project2 = document.querySelector("#project2")
    console.log(slideTreeCount)
    if (slideTreeCount == 1) {
        project1.style.transform = "scale(1)"
    } else if (slideTreeCount == 2) {
        project2.style.transform = "scale(1)"
    } else {
        project1.style.transform = "scale(0)"

        project2.style.transform = "scale(0)"
    }

    if (slideTreeCount == 3) {
        slideTreeCount = 1
    } else {
        slideTreeCount++
    }
}


zainBtn()
slideTreeFun()