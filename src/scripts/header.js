// window.onload = updateHeader();
const header = document.querySelector('.header');

if (/Mobi/i.test(window.navigator.userAgent)) {
    if (window.innerHeight < window.innerWidth) {
        header.classList.add('invisible');
    } else {
        header.classList.remove('invisible');
    }
}

export const windowScrollListener = window.addEventListener('scroll', function () { //! addEventListener returns nothing, default export doesn't work, HOW TO IMPORT THIS SHIT CORRECTLY
    if (window.pageYOffset) {
        header.classList.add('header--transparent');
        // document.querySelector('.pseudo-header').classList.add('header--transparent');
    }

    if (!window.pageYOffset) {
        header.classList.remove('header--transparent');
        // document.querySelector('.pseudo-header').classList.remove('header--transparent');
    }
}, { passive: true });

// window.addEventListener('resize',updateHeader);

// function updateHeader(){
//     document.querySelector('header').style.width = document.querySelector('body').offsetWidth + 'px'
// }



window.screen.orientation.addEventListener('change', function () {
    if (/Mobi/i.test(window.navigator.userAgent)) {
        if (window.innerHeight < window.innerWidth) {
            header.classList.add('invisible');
        } else {
            header.classList.remove('invisible');
        }
    }
})

