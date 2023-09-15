// var $j = jQuery.noConflict();

console.log('hello world quiz')
const url = window.location.href
const quizBox = document.getElementById('quiz-box')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
const multimediaBox = document.getElementById('multimedia-box')



document.addEventListener("DOMContentLoaded", function() {

    const quiz = multimediaBox.getAttribute('quiz')
    const quizCountry = multimediaBox.getAttribute('quiz_country')
    const historical_image1 = multimediaBox.getAttribute('historical_image1')
    const historical_image2 = multimediaBox.getAttribute('historical_image2')
    const historical_image3 = multimediaBox.getAttribute('historical_image3')
    const image1_desc = multimediaBox.getAttribute('image1_desc')
    const image2_desc = multimediaBox.getAttribute('image2_desc')
    const image3_desc = multimediaBox.getAttribute('image3_desc')
    const video = multimediaBox.getAttribute('video')

    if (quiz.includes("Pre-Quiz")) {
        multimediaBox.innerHTML += `<h3><b>${quizCountry}'s Historical Places</b></h3>
            <div class="row">
                <div class="column">
                    <img src=${historical_image1} alt="Historical_Image1" style="width:100%">
                    <div class="description">${image1_desc}</div>
                </div>

                <div class="column">
                    <img src=${historical_image2} alt="Historical_Image1" style="width:100%">
                    <div class="description">${image2_desc}</div>
                </div>

                <div class="column">
                    <img src=${historical_image3} alt="Historical_Image1" style="width:100%">
                    <div class="description">${image3_desc}</div>
                </div>
            </div>`
    }

    else if (quiz.includes("Location")) {
        multimediaBox.innerHTML += `<h3><b>Video on ${quizCountry}'s Location</b></h3>
            <div align="center">
                <iframe width="420" height="315"
                src=${video}>
                </iframe>
            </div>`
    }

    else if (quiz.includes("Culture-Politics")) {
        multimediaBox.innerHTML += `<h3><b>Video on ${quizCountry}'s Culture-Politics</b></h3>
            <div align="center">
                <iframe width="420" height="315"
                src=${video}>
                </iframe>
            </div>`
    }

    else if (quiz.includes("Language-Religion")) {
        multimediaBox.innerHTML += `<h3><b>Video on ${quizCountry}'s Language-Religion</b></h3>
            <div align="center">
                <iframe width="420" height="315"
                src=${video}>
                </iframe>
            </div>`
    }

    else if (quiz.includes("Population")) {
        multimediaBox.innerHTML += `<h3><b>Video on ${quizCountry}'s Population</b></h3>
            <div align="center">
                <iframe width="420" height="315"
                src=${video}>
                </iframe>
            </div>`
    }

    else if (quiz.includes("History-Economy")) {
        multimediaBox.innerHTML += `<h3><b>Video on ${quizCountry}'s History-Economy</b></h3>
            <div align="center">
                <iframe width="420" height="315"
                src=${video}>
                </iframe>
            </div>`
    }


})

$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function(response){
        // console.log(response)
        const data = response.data
        data.forEach(el => {
            for (const [question, answers] of Object.entries(el)){
                quizBox.innerHTML += `
                    <hr>
                    <div class="mb-2">
                        <b>${question}</b>
                    </div>
                `
                answers.forEach(answer=>{
                    quizBox.innerHTML += `
                    <div>
                        <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
                        <lable for="${question}">${answer}</lable>
                    </div>`
                })
            }
        });
    },
    error: function(error){
        console.log(error)
    }
})

const quizForm = document.getElementById('quiz-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const sendData = () => {
    const elements = [...document.getElementsByClassName('ans')]
    const data = {}
    data['csrfmiddlewaretoken'] = csrf[0].value
    elements.forEach(el=>{
        if (el.checked) {
            data[el.name] = el.value
        } else {
            if (!data[el.name]) {
                data[el.name] = null
            }
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}submit/`,
        data: data,
        success: function(response){
            // console.log(response)
            const results = response.results
            console.log(results)
            quizForm.classList.add('not-visible')

            scoreBox.innerHTML = `${response.passed ? 'Great job, you got a perfect score on the pre-assessment quiz. ' +
                'You have unlocked the Phase 1 Location module. Keep up the great work! <br>' : 'Please retake the quiz. You need a 100% to continue through the phases.'} 
                <br> Your result is ${response.score.toFixed(2)}%<br>`

            results.forEach(res=>{
                const resDiv = document.createElement("div")
                for (const [question, resp] of Object.entries(res)){
                    // console.log(question)
                    // console.log(resp)
                    // console.log('***')

                    resDiv.innerHTML += question
                    const cls = ['container', 'p-3', 'text-light', 'h6']
                    resDiv.classList.add(...cls)

                    if (resp=='not answered') {
                        resDiv.innerHTML += ' - not answered'
                        resDiv.classList.add('bg-danger')
                    }
                    else {
                        const answer = resp['answered']
                        const correct = resp['correct_answer']

                        if (answer == correct) {
                            resDiv.classList.add('bg-success')
                            resDiv.innerHTML += ` answered: ${answer}`
                        }
                        else {
                            resDiv.classList.add('bg-danger')
                            resDiv.innerHTML += ` | correct answer: ${correct}`
                            resDiv.innerHTML += ` | answered: ${answer}`
                        }
                    }
                }
                // const body = document.getElementsByTagName('BODY')[0]
                // body.append(resDiv)
                resultBox.append(resDiv)
            })
        },
        error: function(error){
            console.log(error)
        }
    })
}

quizForm.addEventListener('submit', e=>{
    e.preventDefault()

    sendData()
})
