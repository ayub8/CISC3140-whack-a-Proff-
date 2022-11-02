document.addEventListener('DOMContentLoaded', async () => {

    const ul = document.querySelector('#winners');
    const fetchAnswer = document.querySelector('#fetch-answer');
    const dropDown = document.querySelector('#auto-complete');
    const fetchQuestion = document.querySelector('#fetch-question');
    const answerTextBox = document.querySelector('#answer-text-box');
    const submitButton = document.querySelector('#submit-button');
    const randomlySelectedCountryText = document.querySelector('#random-country');
    const answer = document.querySelector('#answer');
    const form = document.querySelector('#form');
    const scoreBoard = document.querySelector('#scoreboard');
    const trivia = document.querySelector('#trivia');
    const warning = document.querySelector('#warning');
    const finalScore = document.querySelector('#final-score');
    const token = document.querySelector('#token');
    const currentWinner = document.querySelector('#current-winner');
    const registration = document.querySelector('#registration');
    const scoreBoardForm = document.querySelector('#scoreboard-form');
    const starter = document.querySelector('#starter');
    const greenArrow = document.querySelector('#green-arrow');
    const hammer = document.createElement('img');
    const moles = document.querySelector('#moles');
    const checks = document.querySelectorAll('.footer i');
    const duration = document.querySelector('#duration');
    hammer.src = "./assets/images/hammer.png";
    let theWinnerIdx;
    let step = 0;

    const stopwatch = new Stopwatch();
    const mole1 = new Mole();
    const mole2 = new Mole();
    const mole3 = new Mole();
    const mole4 = new Mole();
    const mole5 = new Mole();

    //*** functions related to scoreboard ***/ 
    const humanize = (number) => {
        if (number % 100 >= 11 && number % 100 <= 13)
            return number + "th";

        switch (number % 10) {
            case 1: return number + "st";
            case 2: return number + "nd";
            case 3: return number + "rd";
        }

        return number + "th";
    }

    const renderWinners = async (winner) => {

        // cache local elements
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const pWhite = document.createElement('p');
        pWhite.classList.add('scoreboard-mask');

        // update inner text
        const formattedPlace = humanize(place);
        h4.innerText = `${formattedPlace} Place ...........................................................................................................................................................................`;
        h3.innerText = winner.name;
        p.innerText = winner.score;

        // append elements and classes
        const newLi = li.appendChild(h4);
        newLi.appendChild(h3);
        newLi.appendChild(p);
        newLi.appendChild(pWhite);
        pWhite.classList.add('unveil');
        newLi.classList.add('flex');
        ul.appendChild(li);
    }

    // init
    const init = async () => {
        winners = await indexWinners();
    }

    const render = () => {
        winners.forEach((theWinner) => {
            winner = renderWinners(theWinner);
            place++;
        });
    }

    await init();
    render();

    //*** functions related to fetch ***/
    //select a random criteria for the random country
    const setRandomCriteria = async () => {
        randomCountry = await getRandomCountry();

        //random int between 0 and 2
        randomNumberBetweenOneAndTwo = Math.floor(Math.random() * (criteriaKeys.length));
        return criteriaKeys[randomNumberBetweenOneAndTwo];
    }

    //get the value of the randomly selected criteria for the randomly selected country
    const setAnswerToRandomCriteria = async () => {

        randomCriteria = await setRandomCriteria();
        switch (randomCriteria) {
            case 'capital':
                currentAnswer = randomCountry['capital'];
                break;
            case 'language':
                currentAnswer = randomCountry['languages'][0]['name'];
                break;
            case 'currency':
                currentAnswer = randomCountry['currencies'][0]['name'];
                break;
        }
    }

    const moveRight = () => {
        token.classList.add('move-rotate-right');
    }

    token.addEventListener('click', async () => {
        moveRight();
        scoreBoard.classList.add('slide-to-left');

        // await setCountryDetails();
        await startWhacking();

        setTimeout(() => {
            ul.classList.add('hidden');
            scoreBoard.classList.add('hidden');
            starter.classList.add('hidden');
            duration.classList.add('block');
            stopwatch.start();
        }, 1000);

        // setTimeout(() => {
        //     scoreBoard.classList.add('hidden');
        //     starter.classList.add('hidden');
        //     duration.classList.add('block');
        //     stopwatch.start();
        // }, 1500);
    });
    // await setAnswerToRandomCriteria();

    //take the random country and its random criteria and inject into the UI. 
    // const setCountryDetails = async () => {
    //     await setAnswerToRandomCriteria();
    //     await setAllCriteria();
    //     randomlySelectedCountryText.innerText = `What is the ${randomCriteria} of ${randomCountry.name}?`;
    // }
    //
    // //takes the answer to the random criteria and uinjects it into the UI.
    // const getAnswer = () => {
    //     dropDown.innerText = '';
    //     answerTextBox.value = currentAnswer;
    // }
    //
    // //eventListeners
    // //choose an item from the dropdown menu
    // dropDown.addEventListener('click', (e) => {
    //     answerTextBox.value = e.target.innerText;
    //     dropDown.innerText = '';
    // });
    //
    // //setup a random question and updates the UI with that question
    // fetchQuestion.addEventListener('click', async (e) => {
    //     e.preventDefault();
    //     stopwatch.addPenalty(10);
    //     form.reset();
    //     dropDown.innerText = '';
    //     answer.innerText = '';
    //     await setCountryDetails();
    // });
    //
    // //shows the answer to the random question
    // fetchAnswer.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if (currentAnswer) {
    //         stopwatch.addPenalty(100);
    //         getAnswer();
    //     }
    //     else {
    //         alert('OOOPS, this answer does not exist. \nI will get you another question at no charge!', 'red-font');
    //         dropDown.innerText = '';
    //         answer.innerText = '';
    //         setTimeout(async () => {
    //             await setCountryDetails();
    //         }, 1000);
    //     }
    // });
    //
    // //creates the dropdown menu if at least 3 letters are entered to give the user options to choose from
    // answerTextBox.addEventListener('input', async (e) => {
    //     const formattedAnswer = answerTextBox.value.toLowerCase().trim();
    //     dropDown.innerText = '';
    //     answer.innerText = '';
    //     await setAllCriteria();
    //
    //
    //     const selectCriterias = allCriteria[randomCriteria].filter(selectCriteria => {
    //         if (formattedAnswer.length >= 3)
    //             return selectCriteria.toLowerCase().match(formattedAnswer);
    //     });
    //
    //     selectCriterias.map(selectCriteria => {
    //         const p = document.createElement('p');
    //         p.innerText = selectCriteria;
    //         return dropDown.appendChild(p);
    //     });
    // });

    const getChecksVisible = () => {

        for (let i = 0; i <= step; ++i) {

            checks[i].classList.add('visible');
            checks[i].classList.add('animate');
        }
    }

    //warnings
    const alert = (warningMessage, color) => {
        warning.innerText = warningMessage;
        warning.classList.add(color);
        warning.classList.toggle('animate-warning');
        setTimeout(() => {
            warning.classList.remove(color);
            warning.classList.remove('animate-warning');
        }, 1000);
    }

    //get the index of the guest player after the game is overs
    const winnerIndex = async () => {
        const theWinners = await indexAllWinners();
        theWinnerIdx = await theWinners.findIndex(player => {
            return player.score > Number(duration.innerText);
        });
    }

    const setScore = async () => {
        step++;
        if (step === 5) {
            moles.classList.add('block');
            trivia.classList.add('slide-to-right');
            trivia.classList.add('hidden');
            setTimeout(() => {
                greenArrow.classList.add('block');
            }, 1500);
            setTimeout(() => {
                window.scrollTo({
                    top: 1200,
                    behavior: 'smooth'
                });
            }, 4000);
        }
        if (step === 5) {
            stopwatch.stop();
            await winnerIndex();
            finalScore.innerText = `You came in ${humanize(theWinnerIdx + 1)} with the time of ${duration.innerText} seconds.`;
            setTimeout(() => {
                ul.classList.add('hidden');
                greenArrow.classList.remove('block');
                moles.classList.remove('block');
                starter.classList.remove('block');
                registration.classList.add('block');
            }, 2000);
            setTimeout(() => {
                scoreBoard.classList.add('block');
                scoreBoard.classList.add('slide-to-right2');
            }, 2500);
        }
    }

    const startWhacking = async () => {
            moles.classList.add('block');
            setTimeout(() => {
                greenArrow.classList.add('block');
            }, 1500);
            setTimeout(() => {
                window.scrollTo({
                    top: 2000,
                    behavior: 'smooth'
                });
            }, 2500);

        if (step === 10) {
            stopwatch.stop();
            await winnerIndex();
            finalScore.innerText = `You came in ${humanize(theWinnerIdx + 1)} with the time of ${duration.innerText} seconds.`;
            setTimeout(() => {
                ul.classList.add('hidden');
                registration.classList.add('block');
            }, 1000);
            setTimeout(() => {
                scoreBoard.classList.add('block');
                scoreBoard.classList.add('slide-to-right2');
            }, 2000);
        }
    }

    scoreBoardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentWinnerStats = {
            name: currentWinner.value,
            score: duration.innerText,
        }
        create(currentWinnerStats);
        setTimeout(() => {
            location.reload();
        }, 500);
    });

    //submits the user's answer
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        dropDown.innerText = '';
        if (!answerTextBox.value) {
            alert('Please enter an answer!', 'red-font');
        }
        else if (answerTextBox.value === currentAnswer) {
            console.log('Winning');
            alert('You got it!', 'green-font');
            form.reset();
            getChecksVisible();
            setScore();
            setTimeout(() => {
                setCountryDetails();
            }, 1000);
        }
        else if (answerTextBox.value !== currentAnswer) {
            stopwatch.addPenalty(5);
            alert('Wrrrrroooooooooooong!!! You got a 5 second penalty. \nBetter luck next time. :)', 'red-font');
        }
    });

    // design the whack-a-mole
    mole1.createHoles(5);
    mole1.createHoles(3);
    mole1.createHoles(4);

    mole1.popUp();
    mole2.popUp();
    mole3.popUp();
    mole4.popUp();
    mole5.popUp();

    mole1.icon.addEventListener('click', () => {
        mole1.die();
        getChecksVisible();
        setScore();
    });

    mole2.icon.addEventListener('click', () => {
        mole2.die();
        getChecksVisible();
        setScore();
    });

    mole3.icon.addEventListener('click', () => {
        mole3.die();
        getChecksVisible();
        setScore();
    });

    mole4.icon.addEventListener('click', () => {
        mole4.die();
        getChecksVisible();
        setScore();
    });

    mole5.icon.addEventListener('click', () => {
        mole5.die();
        getChecksVisible();
        setScore();
    });

    hammer.classList.add('hammer');
    moles.appendChild(hammer);
    const moveHammer = (e) => {
        hammer.style.top = e.pageY - 100 + 'px';
        hammer.style.left = e.pageX - 20 + 'px';
    }

    moles.addEventListener('mousemove', moveHammer);
    moles.addEventListener('click', () => {
        moles.classList.add('no-cursor');
        hammer.classList.add('rotate-left-animation');
        setTimeout(() => {
            hammer.classList.remove('rotate-left-animation');
        }, 50);
    });

});
