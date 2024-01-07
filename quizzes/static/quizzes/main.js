// var $j = jQuery.noConflict();

console.log('hello world');

const modalBtns = [...document.getElementsByClassName('modal-button')]
const modalBody = document.getElementById('modal-body-confirm')
const startBtn = document.querySelectorAll('#startBtn')

const url = window.location.href

const quizzes = document.querySelectorAll("#quiz-title")
for (let i=0; i < quizzes.length; i++) {
    if (quizzes[i].innerHTML.includes('Phase')) {
        quizzes[i].innerHTML = quizzes[i].innerHTML.slice(9)
    }
}

// modalBtns.forEach(modalBtn=> modalBtn.addEventListener('click', ()=>{
//     const pk = modalBtn.getAttribute('data-pk')
//     const name = modalBtn.getAttribute('data-quiz')
//     const scoreToPass = modalBtn.getAttribute('data-pass')
//
//     modalBody.innerHTML =
//         `<div class="h5 mb-3">Overview of ${name}<div>
//         <div class="text-muted">You have to complete Phase 2 before moving on to Phase 3</div>
//         `
// }))

// console.log(startBtn)
for (let j=0; j < startBtn.length; j++) {
    const pk = startBtn[j].getAttribute('data-pk')
    const quizName = startBtn[j].getAttribute('data-quiz')
    startBtn[j].addEventListener('click', ()=>{
        if (quizName.includes('Phase 1')) {
            window.location.href = url + pk
        }
        else if (quizName.includes('Phase 2')) {
            window.location.href = url + pk + '/phase2'
        }
        else if (quizName.includes('Phase 3')) {
            window.location.href = url + pk + '/phase3'
        }
})
}

function getTopScore(arr, pk) {
    var highestScore = 0;
    // console.log(arr)
    // console.log('num results: ', Object.keys(arr).length)

    for (var i=0, len = Object.keys(arr).length; i<len; i++) {
        if (arr[i]["fields"]["quiz"] == pk) {
            var score = Number(arr[i]["fields"]["score"]);
            // console.log(score)
            if (score > highestScore) {
                highestScore = score;
            }
        }
    }

    return highestScore;
}




document.addEventListener("DOMContentLoaded", function() {
    // Get the number of quizzes and completed quizzes from the template context

    const resultsData = JSON.parse(document.getElementById("results-data").textContent);

    console.log('results: ', resultsData)


    const startBtns = document.querySelectorAll("#startBtn")
    for (let i=0; i < startBtns.length; i++) {
        const quizName = startBtns[i].getAttribute('data-quiz')
        const pk = startBtns[i].getAttribute('data-pk')
        var highestResults = {};
        highestResults[quizName] = getTopScore(resultsData, pk);
        startBtns[i].textContent = `${highestResults[quizName].toFixed(2)}%`
    }


    const quizContainers = document.querySelectorAll("#quiz-container")
    for (let i=0; i<quizContainers.length; i++) {
        var numberOfQuizzes = quizContainers[i].querySelectorAll("#quiz-title").length
        var completed = quizContainers[i].querySelectorAll("#quiz-result")
        var numberCompleted = 0
        for (let i=0; i<completed.length; i++) {
            if (completed[i].textContent.includes("100")) {
                numberCompleted++
            }
        }
        var percentCompleted = numberCompleted / numberOfQuizzes * 100

        const resultDisplay = quizContainers[i].querySelector("#result-display")

        resultDisplay.innerHTML = percentCompleted + "%"
    }

})

