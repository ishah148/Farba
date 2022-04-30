// window.onload = updateHeader();

window.addEventListener('scroll', function() {
    if(pageYOffset){
        document.querySelector('header').classList.add('header--transparent');
        document.querySelector('.pseudo-header').classList.add('header--transparent');
    }
    
    if(!pageYOffset){
        document.querySelector('header').classList.remove('header--transparent');
        document.querySelector('.pseudo-header').classList.remove('header--transparent');
    }
});

// window.addEventListener('resize',updateHeader);

// function updateHeader(){
//     document.querySelector('header').style.width = document.querySelector('body').offsetWidth + 'px'
// }
