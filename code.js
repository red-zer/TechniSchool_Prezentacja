let slideTreeCount = 0

let zainCount = 0

function zainBtn() {
    if (zainCount == 4) {
        zainCount = 0
        document.querySelectorAll(".zainInfo").forEach(e => { e.style.transform = "scale(0)" })
    } else {
        zainCount++
        const elem = document.querySelector(`#zainInfo${zainCount}`)
        if (elem) elem.style.transform = "scale(1)"
    }
}

/* Kliknięcie GDZIEKOLWIEK na stronie obsługuje aktywny slajd.
   Capture + stopPropagation: Chrome potrafi "trafić" kliknięciem w inny krok 3D
   (impress.js wtedy przeskoczyłby do niego), więc przejmujemy zdarzenie sami. */
function globalClickHandler(event) {
    if (event.target.closest && event.target.closest("#tapetaWrap")) return // iframe/✕ obsługują się same
    if (event.button !== 0) return

    const steps = Array.from(document.querySelectorAll(".step"))
    const active = document.querySelector(".step.active")
    const index = steps.indexOf(active)

    if (index === 1) {
        event.stopPropagation()
        zainBtn()
    } else if (index === 2) {
        event.stopPropagation()
        slideTreeBtn()
    }
}

function slideTreeFun() {
    document.addEventListener("click", globalClickHandler, true)
}

/* Tapeta jako plaska nakladka na <body>, poza scena 3D impress.js */
function scaleTapeta() {
    const iframe = document.getElementById("tapetaShowCaseIf")
    if (!iframe) return
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
    iframe.style.transform = `translate(-50%, -50%) scale(${s})`
}

function openTapeta() {
    if (document.getElementById("tapetaWrap")) return
    const wrap = document.createElement("div")
    wrap.id = "tapetaWrap"

    const iframe = document.createElement("iframe")
    iframe.id = "tapetaShowCaseIf"
    iframe.src = "tapeta.html"

    const close = document.createElement("button")
    close.id = "tapetaClose"
    close.type = "button"
    close.textContent = "✕"
    close.title = "Zamknij tapetę"
    close.onclick = function (e) {
        e.stopPropagation()
        closeTapeta()
        slideTreeCount = 3 // następne kliknięcie zresetuje slajd
    }

    wrap.appendChild(iframe)
    wrap.appendChild(close)
    document.body.appendChild(wrap)
    scaleTapeta()
    window.addEventListener("resize", scaleTapeta)
}

function closeTapeta() {
    const wrap = document.getElementById("tapetaWrap")
    if (wrap) wrap.remove()
    window.removeEventListener("resize", scaleTapeta)
}

function slideTreeBtn() {
    const project1 = document.querySelector("#project1")
    const project2 = document.querySelector("#project2")

    if (slideTreeCount == 0) {
        project1.style.transform = "scale(1)"
    } else if (slideTreeCount == 1) {
        project2.style.transform = "scale(1)"
    } else if (slideTreeCount == 2) {
        openTapeta()
    } else {
        project1.style.transform = "scale(0)"
        project2.style.transform = "scale(0)"
        closeTapeta()
    }

    if (slideTreeCount == 3) {
        slideTreeCount = 0
    } else {
        slideTreeCount++
    }
}

slideTreeFun()
