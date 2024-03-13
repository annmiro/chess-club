(function () {
    const previousButton = document.querySelector(`.project-participants__previous-button-js`);
    const nextButton = document.querySelector(`.project-participants__next-button-js`);
    const currentPage = document.querySelector(`.pagination__current-page-js`);
    const participantNodeList = document.querySelector(`.project-participants__list`);
    let participantTemplate = document.querySelector(`#participant-template`).content;
    let participantTemplateContent = participantTemplate.querySelector(`.project-participants__item`);
    let containerWidth = participantNodeList.getBoundingClientRect().width;

    let currentParticipantIndex = 0;
    const desktopWidth = 1366;

    const participantsList = [
        {
            name: `1Хозе-Рауль Капабланка`,
            title: `Чемпион мира по шахматам`,
        },
        {
            name: `2Эммануил Ласкер`,
            title: `Чемпион мира по шахматам`,
        },
        {
            name: `3Александр Алехин`,
            title: `Чемпион мира по шахматам`,
        },
        {
            name: `4Арон Нимцович`,
            title: `Чемпион мира по шахматам`,
        },
        {
            name: `5Рихард Рети`,
            title: `Чемпион мира по шахматам`,
        },
        {
            name: `6Остап Бендер`,
            title: `Гроссмейстер`,
        },
    ]

    const getAdaptiveItemWidth = (width) => window.innerWidth >= desktopWidth ? width / 3 : width;
    const getPrevIndex = (index) => index > participantsList.length - 1 ? index % participantsList.length : index;



    const setCurrentPage = () => {
        currentPage.textContent = window.innerWidth < desktopWidth ? currentParticipantIndex + 1 : currentParticipantIndex + 1 > 3 ? 6 : 3;
    }

    const addElement = (participant, position) => {
        let clonedContent = participantTemplateContent.cloneNode(true);
        let participantCard = clonedContent.querySelector(`.project-participants__profile-card`);

        clonedContent.style.width = `${getAdaptiveItemWidth(containerWidth)}px`
        clonedContent.classList.add(position)

        participantCard.children[1].textContent = participant.name;
        participantCard.children[2].textContent = participant.title;

        if ([`next`, `current-1`, `current-2`, `current-3`].some(p => p === position)) {
            participantNodeList.appendChild(clonedContent);
        }

        if (position === `previous`) {
            participantNodeList.insertBefore(clonedContent, participantNodeList.firstChild);
        }
    }

    window.addEventListener(`resize`, () => {
        setCurrentPage();
        containerWidth = participantNodeList.getBoundingClientRect().width;

        Array.from(participantNodeList.children).forEach(item => {
            item.style.width = `${getAdaptiveItemWidth(containerWidth)}px`;
        });

        const currentSecond = document.querySelector(`.project-participants__item.current-2`);
        const currentThird = document.querySelector(`.project-participants__item.current-3`);

        if (window.innerWidth < desktopWidth) {
            if (currentSecond && currentThird) {
                participantNodeList.removeChild(currentSecond);
                participantNodeList.removeChild(currentThird);
            }
        } else {
            if (!(currentSecond && currentThird)) {
                addElement(participantsList[getPrevIndex(currentParticipantIndex + 1)], `current-2`);
                addElement(participantsList[getPrevIndex(currentParticipantIndex + 2)], `current-3`);
            }
        }
    }, true)

    setCurrentPage();
    addElement(participantsList[currentParticipantIndex], `previous`);
    addElement(participantsList[currentParticipantIndex], `current-1`);

    if (window.innerWidth >= desktopWidth) {
        addElement(participantsList[currentParticipantIndex + 1], `current-2`);
        addElement(participantsList[currentParticipantIndex + 2], `current-3`);
    }

    addElement(participantsList[currentParticipantIndex], `next`);

    previousButton.addEventListener(`click`, () => {
        currentParticipantIndex = currentParticipantIndex - 1;

        if (currentParticipantIndex < 0) {
            currentParticipantIndex = participantsList.length - 1;
        }

        setCurrentPage();

        if (window.innerWidth < desktopWidth) {
            const previous = document.querySelector(`.project-participants__item.previous`);
            const currentFirst = document.querySelector(`.project-participants__item.current-1`);
            const next = document.querySelector(`.project-participants__item.next`);


            const cardPrevious = previous.querySelector(`.project-participants__profile-card`);
            cardPrevious.children[1].textContent = participantsList[getPrevIndex(currentParticipantIndex)].name;
            cardPrevious.children[2].textContent = participantsList[getPrevIndex(currentParticipantIndex)].title;


            addElement(participantsList[getPrevIndex(currentParticipantIndex)], `previous`);
            previous.classList.remove(`previous`);
            previous.classList.add(`current-1`);
            currentFirst.classList.remove(`current-1`);
            currentFirst.classList.add(`next`);
            participantNodeList.removeChild(next);
        } else {
            const currentSecond = document.querySelector(`.project-participants__item.current-2`);
            const currentThird = document.querySelector(`.project-participants__item.current-3`);
            const previous = document.querySelector(`.project-participants__item.previous`);
            const currentFirst = document.querySelector(`.project-participants__item.current-1`);
            const next = document.querySelector(`.project-participants__item.next`);


            const cardPrevious = previous.querySelector(`.project-participants__profile-card`);
            cardPrevious.children[1].textContent = participantsList[getPrevIndex(currentParticipantIndex)].name;
            cardPrevious.children[2].textContent = participantsList[getPrevIndex(currentParticipantIndex)].title;


            addElement(participantsList[getPrevIndex(currentParticipantIndex)], `previous`);
            previous.classList.remove(`previous`);
            previous.classList.add(`current-1`);
            currentFirst.classList.remove(`current-1`);
            currentFirst.classList.add(`current-2`);
            currentSecond.classList.remove(`current-2`);
            currentSecond.classList.add(`current-3`);
            currentThird.classList.remove(`current-3`);
            currentThird.classList.add(`next`);
            participantNodeList.removeChild(next);

        }


    })

    nextButton.addEventListener(`click`, () => {
        currentParticipantIndex = currentParticipantIndex + 1;

        if (currentParticipantIndex > participantsList.length - 1) {
            currentParticipantIndex = 0;
        }

        setCurrentPage();

        const previous = document.querySelector(`.project-participants__item.previous`);
        const currentFirst = document.querySelector(`.project-participants__item.current-1`);
        const next = document.querySelector(`.project-participants__item.next`);
        const cardNext = next.querySelector(`.project-participants__profile-card`);

        if (window.innerWidth < desktopWidth) {
            cardNext.children[1].textContent = participantsList[getPrevIndex(currentParticipantIndex)].name;
            cardNext.children[2].textContent = participantsList[getPrevIndex(currentParticipantIndex)].title;


            addElement(participantsList[getPrevIndex(currentParticipantIndex)], `next`);
            next.classList.remove(`next`);
            next.classList.add(`current-1`);
            currentFirst.classList.remove(`current-1`);
            currentFirst.classList.add(`previous`);
            participantNodeList.removeChild(previous);
        } else {
            const currentSecond = document.querySelector(`.project-participants__item.current-2`);
            const currentThird = document.querySelector(`.project-participants__item.current-3`);

            cardNext.children[1].textContent = participantsList[getPrevIndex(currentParticipantIndex + 2)].name;
            cardNext.children[2].textContent = participantsList[getPrevIndex(currentParticipantIndex + 2)].title;

            addElement(participantsList[getPrevIndex(currentParticipantIndex + 2)], `next`);

            next.classList.remove(`next`);
            next.classList.add(`current-3`);
            currentThird.classList.remove(`current-3`);
            currentThird.classList.add(`current-2`);
            currentSecond.classList.remove(`current-2`);
            currentSecond.classList.add(`current-1`);
            currentFirst.classList.remove(`current-1`);
            currentFirst.classList.add(`previous`);
            participantNodeList.removeChild(previous);
        }

    })

})();