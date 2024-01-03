// Return Button Script
var returnButton = document.getElementById('returnButton')
const url = window.location.href
var returnURL = url.replace('/phase2','')

returnButton.href = returnURL

// Load questions
// slides = document.getElementById('mySlides')
const slideshow = document.getElementById('slideshow-container')
const csrf = slideshow.getAttribute('csrf')
$.ajax({
    type: 'GET',
    url: `${url}data`,
    success: function(response){
        console.log("Response: ", response)
        const data = response.data
        data.forEach(el => {
            console.log("Element: ", el)
            for (const [question, answer] of Object.entries(el)) {
                var slide = document.createElement("div");
                console.log('Question: ', question)
                slide.setAttribute("id", "mySlides");
                slide.setAttribute("class", "mySlides");
                slide.insertAdjacentHTML("afterbegin",
                    `
                    <img class="center" src="https://static.vecteezy.com/system/resources/previews/014/024/805/original/happy-two-cute-kids-little-boys-talking-each-other-with-speech-bubble-vector.jpg" alt="Conversation" style="width:80%;">
                    <div class="overlay" id="overlay"">${question}</div>

                    <canvas class="canvas" id="canvas"></canvas>
                    <label for="name">Type Your Response Here:</label>
                    <input type="text" id="response">

                    <form id="quiz-form" class="mt-3 mb-3">
                        ${csrf}
                        <br>
                        <button class="btn btn-success" id="submitButton" align="center"></button>
                    </form>
                `)

                slideshow.appendChild(slide);
                const overlay = document.getElementById("overlay")
                const text = document.getElementById('response');
                const canvas = document.getElementById('canvas');
                const context = canvas.getContext('2d');
                const fontSize = 32;
                var maxWidth = 250;
                var lineHeight = 25;
                var x = (canvas.width - maxWidth) / 2;
                var y = 60;

                function wrapText(context, text, x, y, maxWidth, lineHeight) {
                    var words = text.split(' ');
                    var line = '';

                    for(var n = 0; n < words.length; n++) {
                      var testLine = line + words[n] + ' ';
                      var metrics = context.measureText(testLine);
                      var testWidth = metrics.width;
                      if (testWidth > maxWidth && n > 0) {
                        context.fillText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                      }
                      else {
                        line = testLine;
                      }
                    }

                    context.fillText(line, x, y);
                    }

                overlay.font = `${fontSize}px arial`;
                context.font = `${fontSize}px arial`;

                text.addEventListener('input', function(event) {
                    const textValue = event.target.value;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    wrapText(context, textValue, x, y, maxWidth, lineHeight)
                });


                // Submit Button Script
                var submitButton = document.getElementById('submitButton')

                submitButton.type = "submit";
                submitButton.innerHTML +=  `Submit Response`
            }

            let slideIndex = 1;
            showSlides(slideIndex);

            // Next/previous controls
            function plusSlides(n) {
              showSlides(slideIndex += n);
            }

            // Thumbnail image controls
            function currentSlide(n) {
              showSlides(slideIndex = n);
            }

            function showSlides(n) {
                let i;
                const slides = document.getElementsByClassName("mySlides")
                console.log('Slides length: ', slides.length)

                // const dots = document.getElementsByClassName("dot");
                if (n > slides.length) {
                    slideIndex = 1
                }
                if (n < 1) {
                    slideIndex = slides.length
                }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                // for (i = 0; i < dots.length; i++) {
                //     dots[i].className = dots[i].className.replace(" active", "");
                // }

                slides[slideIndex-1].style.display = "block";
                // dots[slideIndex-1].className += " active";
            }


            const nextBtn = document.getElementById("next")
            const prevBtn = document.getElementById("prev")

            nextBtn.onclick = plusSlides(1)
            prevBtn.onclick = plusSlides(-1)

        });
    },
    error: function(error){
        console.log(error)
    }
})




//
//     const element = document.getElementById("div1");
//     element.appendChild(para);
//     $('.slideshow-container').append('<div class="mySlides">' +
//         '<img src="https://static.vecteezy.com/system/resources/previews/014/024/805/original/happy-two-cute-kids-little-boys-talking-each-other-with-speech-bubble-vector.jpg">' +
//         '<div class="overlay" id="overlay" quiz="{{ obj.name }}"></div>' +
//         '<canvas class="canvas" id="canvas"></canvas>' +
//         '<label for="name">Type Your Response Here:</label>' +
//         '<input type="text" id="response">' +
//         '<form id="quiz-form" class="mt-3 mb-3">' +
//         '{%  csrf_token %}' +
//         '<br>' +
//         '<button class="btn btn-success" id="submitButton" align="center"></button>' +
//         '</form>' +
//         '</div>');
// }
//
// // // Question Slideshow Script
// // let questionIndex = 1;
// // showQuestions(questionIndex);
// //
// // // Next/previous controls
// // function plusSlides(n) {
// //   showQuestions(questionIndex += n);
// // }
// //
// // // Thumbnail image controls
// // function currentSlide(n) {
// //   showQuestions(questionIndex = n);
// // }
//
// // function showQuestions(n) {
// //   let i;
// //
// //
// //   let slides = document.getElementsByClassName("mySlides");
// //   let dots = document.getElementsByClassName("dot");
// //   if (n > slides.length) {slideIndex = 1}
// //   if (n < 1) {slideIndex = slides.length}
// //   for (i = 0; i < slides.length; i++) {
// //     slides[i].style.display = "none";
// //   }
// //   for (i = 0; i < dots.length; i++) {
// //     dots[i].className = dots[i].className.replace(" active", "");
// //   }
// //   slides[slideIndex-1].style.display = "block";
// //   dots[slideIndex-1].className += " active";
// // }
//
//
//
// Editable Response Text Field Script

//
//
// // <div className="mySlides">
// //     <div className="numbertext">1 / 3</div>
// //
// //     <img className="center"
// //          src="https://static.vecteezy.com/system/resources/previews/014/024/805/original/happy-two-cute-kids-little-boys-talking-each-other-with-speech-bubble-vector.jpg"
// //          alt="Conversation" style="width:80%;">
// //         <div className="overlay" id="overlay" quiz="{{ obj.name }}"></div>
// //
// //         <canvas className="canvas" id="canvas"></canvas>
// //         <label htmlFor="name">Type Your Response Here:</label>
// //         <input type="text" id="response">
// //
// //             <form id="quiz-form" className="mt-3 mb-3">
// //                 {%  csrf_token %}
// //                 <br>
// //                     <button className="btn btn-success" id="submitButton" align="center"></button>
// //             </form>
// // </div>
// function showQuestions(n) {
//       let i;
//       let slides = document.getElementsByClassName("mySlides");
//       let dots = document.getElementsByClassName("dot");
//       if (n > slides.length) {slideIndex = 1}
//       if (n < 1) {slideIndex = slides.length}
//       for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//       }
//       for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//       }
//       slides[slideIndex-1].style.display = "block";
//       dots[slideIndex-1].className += " active";
//     }
//
// const quizForm = document.getElementById('quiz-form')
// const csrf = document.getElementsByName('csrfmiddlewaretoken')
//
// const sendData = () => {
//     const data = {}
//     data['csrfmiddlewaretoken'] = csrf[0].value
//
//     console.log(data)
//     data['Response'] = text.value
//
//     $.ajax({
//         type: 'POST',
//         url: `${url}submit/`,
//         data: data,
//         success: function(response){
//             console.log("Response: ", response)
//             const results = response.results
//             console.log(results)
//
//             quizForm.classList.add('not-visible')
//
//             scoreBox.innerHTML = `${response.passed ? 'Great job, you got a perfect score on the pre-assessment quiz. ' +
//                 'You have unlocked the Phase 1 Location module. Keep up the great work! <br>' : 'Please retake the quiz. You need a 100% to continue through the phases.'}
//                 <br> Your result is ${response.score.toFixed(2)}%<br>`
//
//             results.forEach(res=>{
//                 const resDiv = document.createElement("div")
//                 for (const [question, resp] of Object.entries(res)){
//                     // console.log(question)
//                     // console.log(resp)
//                     // console.log('***')
//
//                     resDiv.innerHTML += question
//                     const cls = ['container', 'p-3', 'text-light', 'h6']
//                     resDiv.classList.add(...cls)
//
//                     if (resp=='not answered') {
//                         resDiv.innerHTML += ' - not answered'
//                         resDiv.classList.add('bg-danger')
//                     }
//                     else {
//                         const answer = resp['answered']
//                         const correct = resp['correct_answer']
//
//                         if (answer == correct) {
//                             resDiv.classList.add('bg-success')
//                             resDiv.innerHTML += ` answered: ${answer}`
//                         }
//                         else {
//                             resDiv.classList.add('bg-danger')
//                             resDiv.innerHTML += ` | correct answer: ${correct}`
//                             resDiv.innerHTML += ` | answered: ${answer}`
//                         }
//                     }
//                 }
//                 // const body = document.getElementsByTagName('BODY')[0]
//                 // body.append(resDiv)
//                 resultBox.append(resDiv)
//             })
//         },
//         error: function(error){
//             console.log(error)
//         }
//     })
// }
//
// quizForm.addEventListener('submit', e=>{
//     e.preventDefault()
//
//     sendData()
// })