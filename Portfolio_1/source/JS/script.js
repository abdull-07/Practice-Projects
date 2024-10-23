// * Make navbar stacky

const nav = document.querySelector('.nav')
const aboutSection = document.querySelector('#about')

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const aboutOffectTop = aboutSection.offsetTop;
    if (scrollPosition > aboutOffectTop) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
})

// ! Add the animation

// Get the typing elements
const typingElement = document.querySelector('.typing');
const typingElement2 = document.querySelector('.typing-2');

// Define the words to type
const words = ['Designer', 'Developer', 'Add your own skills', 'Project Manager'];

// Function to type the words
function typeWords(element, words) {
    let wordIndex = 0;
    let letterIndex = 0;
    let typingSpeed = 100;
    let erasingSpeed = 50;

    function type() {
        if (wordIndex < words.length) {
            if (letterIndex < words[wordIndex].length) {
                element.textContent += words[wordIndex][letterIndex];
                letterIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, 2000);
            }
        }
    }

    function erase() {
        if (letterIndex > 0) {
            element.textContent = element.textContent.slice(0, -1);
            letterIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            wordIndex++;
            if (wordIndex < words.length) {
                setTimeout(type, 500);
            } else {
                wordIndex = 0;
                setTimeout(type, 500);
            }
        }
    }

    type();
}

// Call the function for both typing elements
typeWords(typingElement, words);
typeWords(typingElement2, words);