const nav = document.querySelector('.nav')
const aboutSection = document.querySelector('#about')

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const aboutOffectTop = aboutSection.offsetTop;
    if (scrollPosition > aboutOffectTop) {
        nav.classList.add('sticky');
    }else{
        nav.classList.remove('sticky');
    }
})