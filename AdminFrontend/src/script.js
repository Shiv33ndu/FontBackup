const content = document.querySelector('.content');
const ruler = document.getElementById('ruler');

content.addEventListener('scroll', () => {
    const scrollRatio = content.scrollTop / (content.scrollHeight - content.clientHeight);
    const rulerHeight = ruler.clientHeight;
    const indicatorHeight = 20; // Height of the indicator
    const indicatorTop = scrollRatio * (rulerHeight - indicatorHeight);

    // Ensure the indicator stays within the ruler bounds
    const indicator = ruler.querySelector('.ruler-indicator');
    if (indicator) {
        indicator.style.transform = `translateY(${indicatorTop}px)`;
    } else {
        const newIndicator = document.createElement('div');
        newIndicator.classList.add('ruler-indicator');
        newIndicator.style.transform = `translateY(${indicatorTop}px)`;
        ruler.appendChild(newIndicator);
    }
});
