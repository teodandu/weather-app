const heroImages = [
  "../images/poza5.jpg",
  "../images/poza2.jpg",
  "../images/poza3.jpg"
];

let heroIndex = 0;
const hero = document.querySelector(".hero");

if (hero) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    hero.style.backgroundImage = `url("${heroImages[heroIndex]}")`;
  }, 5000); 
}