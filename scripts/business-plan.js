(function () {
    const businessPlan = [
        [
            {
                id: 1,
                name: `Строительство железнодорожной магистрали Москва-Васюки`,
            },
            {
                id: 2,
                name: `Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов`,
            },
        ],
        [
            {
                id: 3,
                name: `Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет`,
            },
        ],
        [
            {
                id: 4,
                name: `Строительство дворца для турнира`,
            },
            {
                id: 5,
                name: `Размещение гаражей для гостевого автотранспорта`,
            },
        ],
        [
            {
                id: 6,
                name: `Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов`,
            },
        ],
        [
            {
                id: 7,
                name: `Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн`,
            },
        ],
    ];

    let currentSlideIndex = 0;
    const desktopWidth = 1366;
    const isDesktop = window.innerWidth >= desktopWidth;

    const previousButton = document.querySelector(`.project-business-plan__previous-js`);
    const nextButton = document.querySelector(`.project-business-plan__next-js`);
    const businessPlanBullet = document.querySelector('#business-plan-bullet');
    const bulletsList = document.querySelector(`.project-business-plan__bullets-js`);
    const contentBlock = document.querySelector(`.project-business-plan__list-block`);

    const addElement = (slide, plan, size) => {
        const businessPlanItemTemplate = document.querySelector(`#business-plan-item`).content;
        const businessPlanItem = businessPlanItemTemplate.querySelector(`.project-business-plan__item`);
        let clonedItem = businessPlanItem.cloneNode(true);

        if (size) {
            clonedItem.classList.add(size);
        }

        const businessPlanCard = clonedItem.querySelector(`.project-business-plan__card`);

        businessPlanCard.children[0].textContent = plan.id;
        businessPlanCard.children[1].textContent = plan.name;

        slide.appendChild(clonedItem);
    }

    const addSlider = () => {
        const sliderTemplateContent = document.querySelector(`#business-plan-slider`).content;
        const slider = sliderTemplateContent.querySelector(`.project-business-plan__slider-list`);

        const clonedSlider = slider.cloneNode(true);

        contentBlock.appendChild(clonedSlider);
    }

    const addSlideWithPlans = (slide, position) => {
        const slider = document.querySelector(`.project-business-plan__slider-list`);
        const slideTemplateContent = document.querySelector(`#business-plan-slide-item`).content;
        const slideItem = slideTemplateContent.querySelector(`.project-business-plan__slide`);
        const clonedSlide = slideItem.cloneNode(true);

        const businessPlanContent = document.querySelector(`#business-plan-list`).content;
        const businessPlanList = businessPlanContent.querySelector(`.project-business-plan__list`);
        const clonedPlanList = businessPlanList.cloneNode(true);

        clonedSlide.appendChild(clonedPlanList);
        clonedSlide.classList.add(position);

        if (position === `previous`) {
            slider.insertBefore(clonedSlide, slider.firstChild);
        } else {
            slider.appendChild(clonedSlide);
        }

        slide.forEach(slideItem => {
            addElement(clonedPlanList, slideItem, `project-business-plan__item--${slide.length > 1 ? 'double' : 'single'}`);
        });

    }

    const addBullet = (cssClass) => {
        const bulletContent = businessPlanBullet.content;
        const bulletItem = bulletContent.querySelector(`.pagination__item`);
        let clonedContent = bulletItem.cloneNode(true);

        if (cssClass && cssClass.length > 0) {
            clonedContent.classList.add(cssClass);
        }

        bulletsList.appendChild(clonedContent);
    }

    const createBulletsList = () => {
        for (let i = 0; i < businessPlan.length; i++) {
            addBullet(i === 0 ? `pagination-item--current` : ``);
        }
    }

    const setCurrentBullet = () => {
        Array.from(bulletsList.children).forEach((b, i) => {
            if (i === currentSlideIndex) {
                b.classList.add(`pagination-item--current`);
            } else {
                b.classList.remove(`pagination-item--current`);
            }
        })
    }

    const setNavButtonStatus = () => {
        nextButton.disabled = currentSlideIndex === businessPlan.length - 1;
        previousButton.disabled = currentSlideIndex === 0;
    }

    const setDesktopPlanList = () => {
        const businessPlanContent = document.querySelector(`#business-plan-list`).content;
        const businessPlanList = businessPlanContent.querySelector(`.project-business-plan__list`);


        const clonedPlanList = businessPlanList.cloneNode(true);
        clonedPlanList.classList.add(`project-business-plan__list--desktop`)

        contentBlock.appendChild(clonedPlanList);

        businessPlan.flat().forEach(slideItem => {
            addElement(clonedPlanList, slideItem);
        });
    }

    const setMobileSlider = () => {
        addSlider();
        addSlideWithPlans(businessPlan[businessPlan.length - 1], `previous`);
        addSlideWithPlans(businessPlan[currentSlideIndex], `current`);
        addSlideWithPlans(businessPlan[currentSlideIndex + 1], `next`);
    }

    createBulletsList();
    setCurrentBullet();
    setNavButtonStatus();

    nextButton.addEventListener(`click`, () => {
        const getNextElement = () => businessPlan[currentSlideIndex + 1 !== businessPlan.length ? currentSlideIndex + 1 : businessPlan.length - 1];

        currentSlideIndex = currentSlideIndex + 1;

        setCurrentBullet();
        setNavButtonStatus();

        const sliderList = document.querySelector(`.project-business-plan__slider-list`);
        const nextSlide = contentBlock.querySelector(`.project-business-plan__slide.next`);
        const currentSlide = contentBlock.querySelector(`.project-business-plan__slide.current`);
        const previousSlide = contentBlock.querySelector(`.project-business-plan__slide.previous`);

        sliderList.removeChild(previousSlide);
        nextSlide.classList.remove(`next`);
        nextSlide.classList.add(`current`);
        currentSlide.classList.remove(`current`);
        currentSlide.classList.add(`previous`);
        addSlideWithPlans(getNextElement(), `next`);
    })

    previousButton.addEventListener(`click`, () => {
        currentSlideIndex = currentSlideIndex - 1;

        const getPreciousElement = () => businessPlan[currentSlideIndex - 1 >= 0 ? currentSlideIndex - 1 : businessPlan.length - 1];

        setCurrentBullet();
        setNavButtonStatus();

        const sliderList = document.querySelector(`.project-business-plan__slider-list`);
        const nextSlide = contentBlock.querySelector(`.project-business-plan__slide.next`);
        const currentSlide = contentBlock.querySelector(`.project-business-plan__slide.current`);
        const previousSlide = contentBlock.querySelector(`.project-business-plan__slide.previous`);

        sliderList.removeChild(nextSlide);
        previousSlide.classList.remove(`previous`);
        previousSlide.classList.add(`current`);
        currentSlide.classList.remove(`current`);
        currentSlide.classList.add(`next`);
        addSlideWithPlans(getPreciousElement(), `previous`);
    })

    if (isDesktop) {
        setDesktopPlanList();
    } else {
        setMobileSlider();
    }

    window.addEventListener(`resize`, () => {
        const desktopPlanList = document.querySelector(`.project-business-plan__list--desktop`);
        const sliderList = document.querySelector(`.project-business-plan__slider-list`);

        if (window.innerWidth >= desktopWidth) {
            if (sliderList) {
                contentBlock.removeChild(sliderList);
            }

            if (!desktopPlanList) {
                setDesktopPlanList();
            }
        } else {
            if (desktopPlanList) {
                contentBlock.removeChild(desktopPlanList);
            }

            if (!sliderList) {
                setMobileSlider()
            }
        }
    })
})();