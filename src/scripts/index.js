import gsap from 'gsap';

const tl = gsap.timeline();

const enlightenmentItems = document.querySelectorAll('.active_item');

const next = document.querySelector('.arrow .next');
const prev = document.querySelector('.arrow .previous');

const currentHeadingLeft = document.querySelector('#headingLeft');
const currentHeadingRight = document.querySelector('#headingRight');
const currentLevelOfEnlightenment = document.querySelector('#enlightenment');

/** Create arrays to dynamically update copy from array using the custom data attribute * */

const stepsToEnlightenment = [
    '',
    'Step 1 of 8 on the path to enlightenment',
    'Step 2 of 8 on the path to enlightenment',
    'Step 3 of 8 on the path to enlightenment',
    'Step 4 of 8 on the path to enlightenment',
    'Step 5 of 8 on the path to enlightenment',
    'Step 6 of 8 on the path to enlightenment',
    'Step 7 of 8 on the path to enlightenment',
    'Step 8 of 8 on the path to enlightenment',
    '',
];

const copy = [
    '',
    `Talent is given true skill is earned`,
    `Be flexible to change and sturdy in conviction`,
    `Use many skills yet work as one`,
    `To master anything find interest in everything`,
    `Individuals flourish if culture and wisdom are shared`,
    `Train for perfection but aim for more`,
    `Take pride in your work but do not seek praise`,
    `Temporary sacrifice brings lasting results`,
];

let currentActive = 0;
currentHeadingLeft.innerText = copy[currentActive];
currentHeadingRight.innerText = copy[currentActive];
currentLevelOfEnlightenment.innerText = stepsToEnlightenment[currentActive];

const init = () => {
    runAll();
};

const setActiveClass = (activeElement) => {
    const active = document.querySelector('.active_item.active');
    active.classList.remove('active');
    enlightenmentItems[currentActive].classList.add('active');
};
const updateCopy = () => {
    currentActive %= enlightenmentItems.length;

    /** Dynamically update copy from array using the custom data attribute * */
    currentLevelOfEnlightenment.dataset.nextStep = stepsToEnlightenment[currentActive];
    currentHeadingLeft.dataset.nextHeadingLeft = copy[currentActive];
    currentHeadingRight.dataset.nextHeadingRight = copy[currentActive];

    currentLevelOfEnlightenment.innerText = stepsToEnlightenment[currentActive];

    tl.add('copy-start');
    tl.fromTo(
        currentLevelOfEnlightenment,
        { autoAlpha: 0 },
        { duration: 0.65, autoAlpha: 1, ease: 'power2.out' },
        'copy-start'
    );

    // create condition for syncopated show/hide of middle section copy
    if (
        currentActive === 1 ||
        currentActive === 2 ||
        currentActive === 6 ||
        currentActive === 7 ||
        (currentActive === 8 && currentActive < enlightenmentItems.length - 1)
    ) {
        currentHeadingLeft.innerText = copy[currentActive];
        tl.fromTo(
            currentHeadingLeft,
            { autoAlpha: 0 },
            {
                duration: 0.65,
                autoAlpha: 1,
                ease: 'power2.out',
            },
            'copy-start'
        ).set(currentHeadingRight, { autoAlpha: 0, ease: 'power2.in' }, '<');
    } else if (currentActive === enlightenmentItems.length - 1) {
        tl.to(
            [currentHeadingLeft, currentHeadingRight, currentLevelOfEnlightenment, '.arrow .next'],
            { duration: 0.125, autoAlpha: 0, ease: 'power2.in' },
            '<'
        ).fromTo(
            ['.contact_container', '#headingTopRight'],
            { x: 1100 },
            { duration: 0.65, autoAlpha: 1, x: 0, ease: 'power2.out' },
            'start'
        );
    } else {
        currentHeadingRight.innerText = copy[currentActive];
        tl.fromTo(
            currentHeadingRight,
            { autoAlpha: 0 },
            {
                duration: 0.65,
                autoAlpha: 1,
                ease: 'power2.out',
            },
            'copy-start'
        ).set(currentHeadingLeft, { autoAlpha: 0, ease: 'power2.in' }, '<');
    }
};

const moveBackground = () => {
    if (currentActive < enlightenmentItems.length - 1) {
        tl.add('start');
        if (currentActive === 1 || currentActive === 2) {
            tl.to('.wrapper', { duration: 0.65, backgroundPositionX: `-=750px`, ease: 'none' }, 'start');
        } else if (currentActive === 7) {
            tl.to('.wrapper', { duration: 0.65, backgroundPositionX: `-9000px`, ease: 'none' }, 'start');
        } else {
            tl.to('.wrapper', { duration: 0.65, backgroundPositionX: `-=1500px`, ease: 'none' }, 'start');
            tl.to('.arrow .previous', { duration: 0.65, autoAlpha: 1, ease: 'power2.out' }, '<');
        }

        tl.to(['#headingTopLeft', '.bottom_copy'], { autoAlpha: 0, ease: 'power2.in' }, 'start');

        currentActive++;
        updateCopy(currentActive);
        setActiveClass(currentActive);
    }
};

const navigateBackward = () => {
    const mainBg = document.querySelector('.wrapper');
    const bgPos = window.getComputedStyle(mainBg, null).backgroundPositionX;
    const backgroundPosX = parseInt(bgPos);
    if (currentActive > 0) {
        tl.add('reset');
        if (backgroundPosX < 0 || backgroundPosX <= -7000) {
            tl.to('.wrapper', { duration: 0.65, backgroundPosition: '+=1500px 0', ease: 'none' }, 'reset');
        }

        if (currentActive <= 1) {
            tl.to(['#headingTopLeft', '.bottom_copy'], { duration: 0.65, autoAlpha: 1, ease: 'power2.in' }, 'reset');
        }

        currentActive--;
        updateCopy(currentActive);
        setActiveClass(currentActive);
    }
};

const backToStart = () => {
    tl.add('resetAll').to('.wrapper', { duration: 0.65, backgroundPositionX: '0', ease: 'none' }, 'resetAll');
    tl.to('.arrow .next', { duration: 0.65, autoAlpha: 1, ease: 'power2.out' }, 'start');

    tl.to(['#headingTopLeft', '.bottom_copy'], { duration: 0.65, autoAlpha: 1, ease: 'power2.in' }, 'resetAll');
    tl.to(
        [
            currentHeadingLeft,
            currentHeadingRight,
            currentLevelOfEnlightenment,
            '.arrow .previous',
            '.contact_container',
            '#headingTopRight',
        ],
        {
            duration: 0.3,
            autoAlpha: 0,
            ease: 'power2.in',
        },
        'resetAll'
    );

    currentActive = 0;
    currentHeadingLeft.innerText = copy[currentActive];
    currentHeadingRight.innerText = copy[currentActive];
    currentLevelOfEnlightenment.innerText = stepsToEnlightenment[currentActive];
    setActiveClass(currentActive);
};

const preloadAnimation = () => {
    /** Animation for preloader * */
    tl.add('start')
        .to('.loader', { autoAlpha: 1 }, 'start')
        .from(
            '.monk_image',
            {
                duration: 1.4,
                opacity: 0,
                scale: 0,
                transformOrigin: '50% 50%',
                ease: 'elastic.out(1, 0.3)',
            },
            '>'
        )
        .from('.copy_one', { duration: 0.3, opacity: 0, scale: 0, ease: 'bounce.out' }, '<+=.26')
        .to('.copy_exclamation', { duration: 0.3, autoAlpha: 1 }, '<')
        .from('.copy_two', {
            duration: 0.2,
            x: -5,
            width: 0,
            opacity: 0,
            transformOrigin: 'left',
            ease: 'none',
        })
        .to('.copy_exclamation', { duration: 0.125, display: 'none' }, '<')
        .to(
            '.monk_image',
            {
                duration: 0.65,
                y: '-=35',
                ease: 'sine.inOut',
                yoyo: true,
                repeat: 1,
            },
            '<-.125'
        )
        .to(
            ['.copy_one', '.copy_two', '.monk_image', '.loader'],
            { duration: 0.25, autoAlpha: 0, display: 'none' },
            '>'
        )
        .add('loader_end', '-=.75');

    /** Animation IN for main content * */
    tl.add('main_start', '<loader_end').set(
        ['.wrapper', '#headingTopLeft', '.bottom_copy'],
        { autoAlpha: 1, ease: 'power2.out' },
        'main_start+=.4'
    );
};

const runAll = () => {
    preloadAnimation();
    next.addEventListener('click', (e) => {
        moveBackground();
    });

    prev.addEventListener('click', (e) => {
        navigateBackward();
    });

    enlightenmentItems[0].addEventListener('click', () => {
        backToStart();
    });
};

window.onload = () => init();
