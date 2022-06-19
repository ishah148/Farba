// window.onload = updateHeader();

export const windowScrollListener = window.addEventListener('scroll', function() {
    if(window.pageYOffset){
        document.querySelector('header').classList.add('header--transparent');
        // document.querySelector('.pseudo-header').classList.add('header--transparent');
    }
    
    if(!window.pageYOffset){
        document.querySelector('header').classList.remove('header--transparent');
        // document.querySelector('.pseudo-header').classList.remove('header--transparent');
    }
},{passive: true});

// window.addEventListener('resize',updateHeader);

// function updateHeader(){
//     document.querySelector('header').style.width = document.querySelector('body').offsetWidth + 'px'
// }
