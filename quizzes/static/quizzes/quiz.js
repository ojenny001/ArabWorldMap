// Return Button Script
var returnButton = document.getElementById('returnButton')
const countryName = returnButton.getAttribute('countryName')
const host = window.location.origin
const returnURL = host + '/' + countryName + '/progress'

console.log(host)
console.log('Return url: ', returnURL)
returnButton.href = returnURL


// var $j = jQuery.noConflict();

console.log('hello world quiz')
const url = window.location.href
const quizBox = document.getElementById('quiz-box')
const quizContainer = document.getElementById('quiz-container')
const quizContainerHeader = document.getElementById('quiz-container-header')
const scoreBox = document.getElementById('score-box')
const resultBox = document.getElementById('result-box')
const multimediaBox = document.getElementById('multimedia-box')
var submitButton = document.getElementById('submitButton')



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

    const score_needed_to_pass = quizContainer.getAttribute('score_needed_to_pass')

    console.log('Quiz: ', quiz)
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

        quizContainerHeader.innerHTML += `
            <h2 align="center">${quiz}</h2>
            <br>
            <p>Score Needed to Pass: ${score_needed_to_pass}%</p>`

        submitButton.type = "submit";
        submitButton.innerHTML +=  `Submit`

        $.ajax({
            type: 'GET',
            url: `${url}data`,
            success: function(response){
                console.log(response)
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
    }

    else if (quiz.includes("Phase 1")) {
        if (quiz.includes("Location")) {
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
        quizContainerHeader.innerHTML += `
            <h2 align="center">${quiz}</h2>
            <br>
            <p>Score Needed to Pass: ${score_needed_to_pass}%</p>`

        submitButton.type = "submit";
        submitButton.innerHTML +=  `Submit`

        $.ajax({
            type: 'GET',
            url: `${url}data`,
            success: function(response){
                console.log(response)
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

    }

    else if (quiz.includes("Phase 2")) {
        if (quiz.includes("Location")) {
            multimediaBox.innerHTML += `<h3><b>Text on ${quizCountry}'s Location</b></h3>
            <div class="text-container">
                <p>
                    <b>Libya,</b> country located in North Africa. Most of the country lies in the Sahara desert, and
                    much of its population is concentrated along the coast and its immediate hinterland,
                    where Tripoli (Ṭarābulus), the de facto capital, and Banghāzī (Benghazi), another major city,
                    are located.
                    <br>
                    <br>
                    Libya comprises three historical regions—Tripolitania in the northwest, Cyrenaica in the
                    east, and Fezzan in the southwest. The Ottoman authorities recognized them as separate
                    provinces. Under Italian rule, they were unified to form a single colony, which gave way to
                    independent Libya. For much of Libya’s early history, both Tripolitania and Cyrenaica were
                    more closely linked with neighbouring territories than with one other.
                    <br>
                    <br>
                    Before the discovery of oil in the late 1950s, Libya was considered poor in natural
                    resources and severely limited by its desert environment. The country was almost entirely
                    dependent upon foreign aid and imports for the maintenance of its economy; the
                    discovery of petroleum dramatically changed this situation. The government long exerted
                    strong control over the economy and attempted to develop agriculture and industry with
                    wealth derived from its huge oil revenues. It also established a welfare state, which
                    provides medical care and education at minimal cost to the people. Although Libya’s long-
                    ruling leader Muammar al-Qaddafi espoused an idiosyncratic political ideology rooted in
                    socioeconomic egalitarianism and direct democracy, Libya in practice remained an
                    authoritarian state, with power concentrated among members of Qaddafi’s inner circle of
                    relatives and security chiefs. Opposition to the Qaddafi regime reached an unprecedented
                    level in 2011, developing into an armed revolt that forced Qaddafi from power.
                    <br>
                    <br>
                    Libya is bounded by the Mediterranean Sea on the north, Egypt on the east, Sudan on the
                    southeast, Niger and Chad on the south, and Tunisia and Algeria on the west. Libya is
                    underlain by basement rocks of Precambrian age (from about 4 billion to 540 million years
                    ago) mantled with marine and wind-borne deposits. The major physical features are
                    the Nafūsah Plateau and the Al-Jifārah (Gefara) Plain in the northwest, the Akhḍar
                    Mountains (“Green Mountains”) in the northeast, and the Saharan plateau, which occupies
                    much of the rest of the country. The Al-Jifārah Plain covers about 10,000 square miles
                    (26,000 square km) of Libya’s northwestern corner. It rises from sea level to about 1,000
                    feet (300 metres) at the foothills of the Nafūsah Plateau. Composed of sand dunes, salt
                    marshes, and steppe, the plain is home to most of Libya’s population and to its largest
                    city, Tripoli. The Nafūsah Plateau is a limestone massif that stretches for about 212 miles
                    (340 km) from Al-Khums on the coast to the Tunisian border at Nālūt. West of Tarhūnah it
                    rises steeply from the Al-Jifārah Plain, reaching elevations between 1,500 and 3,200 feet
                    (450 and 975 metres).
                </p>
            </div>`
        }


        submitButton.type = "button";
        submitButton.innerHTML +=  `Start Conversation`

        console.log(url)

        document.getElementById('submitButton').onclick =
            function redirect() {window.location.href = (url + 'phase2');
        };


    }




})

