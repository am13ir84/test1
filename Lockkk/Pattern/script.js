let selectedDots = [];
let confirmedPattern = false;

document.querySelectorAll('.pattern-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const dotIndex = dot.getAttribute('data-index');
    if (!confirmedPattern) {
      if (!selectedDots.includes(dotIndex)) {
        selectedDots.push(dotIndex);
        dot.style.backgroundColor = '#8b4513';
      } else {
        selectedDots.pop();
        dot.style.backgroundColor = '#fada5e';
      }
    }
  });
});

const resetPatternDots = () => {
  document.querySelectorAll('.pattern-dot').forEach(dot => {
    dot.style.backgroundColor = '#fada5e';
    dot.classList.remove('confirmed', 'wrong');
  });
};

document.getElementById('confirmBtn').addEventListener('click', () => {
  const storedPattern = localStorage.getItem('pattern');
  if (storedPattern) {
    if (selectedDots.join('') === storedPattern) {
      confirmedPattern = true;
      document.querySelectorAll('.pattern-dot').forEach(dot => {
        dot.classList.add('confirmed');
        setTimeout(() =>{
          
      }, 350);
      });
      document.getElementById('message').classList.remove('hidden');
      setTimeout(() => {
        window.location.href = './NewPage/new.html';
        resetPatternDots();
      }, 2000);
    } else {
      document.querySelectorAll('.pattern-dot').forEach(dot => {
        dot.classList.add('wrong');
        dot.style.backgroundColor = '#fada5e';
        setTimeout(() => {
          dot.classList.remove('wrong');
        }, 700);
      });
      document.getElementById('message').classList.remove('hidden');
    }
  } else {
    localStorage.setItem('pattern', selectedDots.join(''));
  }
});

document.getElementById('forgetBtn').addEventListener('click', () => {
  localStorage.removeItem('pattern');
  selectedDots = [];
  confirmedPattern = false;
  resetPatternDots();
  window.location.href = './Pin/forget.html';
  document.getElementById('message').classList.remove('hidden');
});