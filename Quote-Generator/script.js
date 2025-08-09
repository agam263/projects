// Quote data
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu"
    },
    {
        text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        author: "Zig Ziglar"
    },
    {
        text: "The mind is everything. What you think you become.",
        author: "Buddha"
    },
    {
        text: "The best way to predict the future is to invent it.",
        author: "Alan Kay"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Unknown"
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },
    {
        text: "What you do today can improve all your tomorrows.",
        author: "Ralph Marston"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    }
];

// DOM elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const tweetBtn = document.getElementById('tweet-btn');
const quoteBox = document.querySelector('.quote-box');

let currentQuote = '';

// Generate random quote
function generateQuote() {
    // Add loading state
    quoteBox.classList.add('loading');
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        
        currentQuote = quote;
        
        // Animate quote change
        quoteElement.style.opacity = '0';
        authorElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.textContent = quote.text;
            authorElement.textContent = `- ${quote.author}`;
            
            quoteElement.style.opacity = '1';
            authorElement.style.opacity = '1';
            
            // Add success animation
            quoteBox.classList.remove('loading');
            quoteBox.classList.add('success');
            
            setTimeout(() => {
                quoteBox.classList.remove('success');
            }, 600);
        }, 200);
    }, 500);
}

// Copy quote to clipboard
async function copyQuote() {
    if (!currentQuote) return;
    
    const textToCopy = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Show success feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#28a745';
        copyBtn.style.color = 'white';
        copyBtn.style.borderColor = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '#f8f9fa';
            copyBtn.style.color = '#333';
            copyBtn.style.borderColor = '#e9ecef';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy quote to clipboard');
    }
}

// Tweet quote
function tweetQuote() {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    const url = encodeURIComponent(window.location.href);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}&hashtags=quotes,inspiration`;
    
    window.open(tweetUrl, '_blank', 'width=600,height=400');
}

// Event listeners
generateBtn.addEventListener('click', generateQuote);
copyBtn.addEventListener('click', copyQuote);
tweetBtn.addEventListener('click', tweetQuote);

// Generate initial quote on page load
document.addEventListener('DOMContentLoaded', () => {
    generateQuote();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        generateQuote();
    }
});

// Add some CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    #quote, #author {
        transition: opacity 0.2s ease;
    }
`;
document.head.appendChild(style);
