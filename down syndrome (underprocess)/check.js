// Get all carousel cards and controls
const cards = document.querySelectorAll('.carousel .card');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');

let currentIndex = 0; // Start with the first card

// Function to show the current card
function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active'); // Remove the active class from all cards
        if (i === index) {
            card.classList.add('active'); // Add active class to the current card
        }
    });
}

// Event listeners for the buttons
prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--; // Move to the previous card
    } else {
        currentIndex = cards.length - 1; // Loop back to the last card
    }
    showCard(currentIndex);
});

nextButton.addEventListener('click', function() {
    if (currentIndex < cards.length - 1) {
        currentIndex++; // Move to the next card
    } else {
        currentIndex = 0; // Loop back to the first card
    }
    showCard(currentIndex);
});

// Initial display of the first card
showCard(currentIndex);

