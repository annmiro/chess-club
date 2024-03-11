(function () {
    const previousButton = document.querySelector(`.project-participants__previous-button-js`);
    const nextButton = document.querySelector(`.project-participants__next-button-js`);
    const currentPage = document.querySelector(`.pagination__current-page-js`);
    let participantTemplate = document.querySelector('#participant-template').content;
    const participantNodeList = document.querySelector(`.project-participants__list`)
    // let containerWidth = window.innerWidth;

    let currentParticipantIndex = 0;

    console.log('works');

    const participantsList = [
        {
            name: '1Хозе-Рауль Капабланка',
            title: 'Чемпион мира по шахматам',
        },
        {
            name: '2Эммануил Ласкер',
            title: 'Чемпион мира по шахматам',
        },
        {
            name: '3Александр Алехин',
            title: 'Чемпион мира по шахматам',
        },
        {
            name: '4Арон Нимцович',
            title: 'Чемпион мира по шахматам',
        },
        {
            name: '5Рихард Рети',
            title: 'Чемпион мира по шахматам',
        },
        {
            name: '6Остап Бендер',
            title: 'Гроссмейстер',
        },
    ]

    // window.addEventListener('resize', () => {
    //     containerWidth = participantNodeList.getBoundingClientRect().width;
    // }, true)

    const addElement = (participant, position) => {
        let participantTemplateContent = participantTemplate.querySelector('.project-participants__item');
        let clonedContent = participantTemplateContent.cloneNode(true);
        let participantCard = clonedContent.querySelector('.project-participants__profile-card');

        clonedContent.classList.add(position)

        participantCard.children[1].textContent = participant.name;
        participantCard.children[2].textContent = participant.title;

        if (position === `next` || position === `current`) {
            participantNodeList.appendChild(clonedContent);
        }

        if (position === `previous`) {
            participantNodeList.insertBefore(clonedContent, participantNodeList.firstChild);
        }
    }

    addElement(participantsList[currentParticipantIndex], `previous`);
    addElement(participantsList[currentParticipantIndex], `current`);
    addElement(participantsList[currentParticipantIndex], `next`);

    previousButton.addEventListener('click', () => {
        const getPrevIndex = (index) => index < 0 ? participantsList.length - 1 : index;

        currentParticipantIndex = currentParticipantIndex - 1;

        if (currentParticipantIndex < 0) {
            currentParticipantIndex = participantsList.length - 1;
        }

        currentPage.textContent = currentParticipantIndex + 1;

        const previous = document.querySelector(`.project-participants__item.previous`);
        const current = document.querySelector(`.project-participants__item.current`);
        const next = document.querySelector(`.project-participants__item.next`);


        const cardPrevious = previous.querySelector('.project-participants__profile-card');
        cardPrevious.children[1].textContent = participantsList[getPrevIndex(currentParticipantIndex)].name;
        cardPrevious.children[2].textContent = participantsList[getPrevIndex(currentParticipantIndex)].title;


        addElement(participantsList[getPrevIndex(currentParticipantIndex)], `previous`);
        previous.classList.remove(`previous`);
        previous.classList.add(`current`);
        current.classList.remove(`current`);
        current.classList.add(`next`);
        participantNodeList.removeChild(next);

    })

    nextButton.addEventListener('click', () => {
        const getPrevIndex = (index) => index < 0 ? participantsList.length - 1 : index;

        currentParticipantIndex = currentParticipantIndex + 1;

        if (currentParticipantIndex > participantsList.length - 1) {
            currentParticipantIndex = 0;
        }

        currentPage.textContent = currentParticipantIndex + 1;

        const previous = document.querySelector(`.project-participants__item.previous`);
        const current = document.querySelector(`.project-participants__item.current`);
        const next = document.querySelector(`.project-participants__item.next`);


        const cardNext = next.querySelector('.project-participants__profile-card');
        cardNext.children[1].textContent = participantsList[getPrevIndex(currentParticipantIndex)].name;
        cardNext.children[2].textContent = participantsList[getPrevIndex(currentParticipantIndex)].title;


        addElement(participantsList[getPrevIndex(currentParticipantIndex)], `next`);
        next.classList.remove(`next`);
        next.classList.add(`current`);
        current.classList.remove(`current`);
        current.classList.add(`previous`);
        participantNodeList.removeChild(previous);
    })

})();