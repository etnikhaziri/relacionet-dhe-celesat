const slides = [...document.querySelectorAll('.slide')];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('slideCounter');
const progress = document.getElementById('progressBar');
const dotsContainer = document.getElementById('dots');
const menu = document.getElementById('sideMenu');
const menuBtn = document.getElementById('menuBtn');
const menuItems = [...menu.querySelectorAll('button[data-go]')];
let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Shko te slajdi ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index));
  dotsContainer.appendChild(dot);
});
const dots = [...dotsContainer.querySelectorAll('button')];

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
    if (i === currentSlide) slide.scrollTop = 0;
  });
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  menuItems.forEach((item, i) => item.classList.toggle('active', i === currentSlide));
  counter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${slides.length}`;
  progress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
}
prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
menuBtn.addEventListener('click', () => menu.classList.toggle('open'));
menuItems.forEach(item => item.addEventListener('click', () => { showSlide(Number(item.dataset.go)); menu.classList.remove('open'); }));
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); showSlide(currentSlide + 1); }
  else if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
  else if (event.key === 'Escape') menu.classList.remove('open');
});

const questions = [
  { q: 'Cili është funksioni kryesor i Primary Key?', a: ['Të identifikojë në mënyrë unike çdo rresht', 'Të ruajë fotografi', 'Të lidhë internetin me databazën', 'Të fshijë tabelën'], correct: 0, why: 'Primary Key identifikon çdo rekord në mënyrë unike.' },
  { q: 'Cila veti duhet të ketë një Primary Key?', a: ['Mund të përsëritet', 'Mund të jetë NULL', 'Duhet të jetë unik dhe jo NULL', 'Duhet të jetë gjithmonë tekst'], correct: 2, why: 'Vlera e Primary Key nuk përsëritet dhe nuk mund të jetë NULL.' },
  { q: 'Çfarë është Foreign Key?', a: ['Emri i databazës', 'Një fushë që referon çelësin primar të një tabele tjetër', 'Një rresht bosh', 'Një lloj raporti'], correct: 1, why: 'Foreign Key referon Primary Key në një tabelë tjetër dhe krijon lidhje mes tabelave.' },
  { q: 'Çfarë tregon relacioni 1 : 1?', a: ['Një rekord lidhet me shumë rekorde', 'Shumë rekorde lidhen me shumë rekorde', 'Një rekord lidhet me vetëm një rekord tjetër', 'Nuk ekziston lidhje'], correct: 2, why: 'Në relacionin një-me-një, një rekord lidhet me vetëm një rekord në tabelën tjetër.' },
  { q: 'Cili është shembull i relacionit 1 : N?', a: ['Një student dhe një kartelë', 'Një klasë dhe shumë studentë', 'Shumë studentë dhe shumë lëndë', 'Një person dhe një numër unik'], correct: 1, why: 'Një klasë mund të ketë shumë studentë, prandaj ky është relacion 1 : N.' },
  { q: 'Si realizohet zakonisht relacioni M : N?', a: ['Duke fshirë njërën tabelë', 'Duke përdorur vetëm një kolonë tekst', 'Duke hequr çelësat primarë', 'Përmes një tabele ndërmjetëse'], correct: 3, why: 'Relacioni shumë-me-shumë realizohet zakonisht përmes një tabele ndërmjetëse.' },
  { q: 'Në shembullin PERSON, STUDENT dhe MËSUES, cili është super-tipi?', a: ['STUDENT', 'PERSON', 'MËSUES', 'Asnjëri'], correct: 1, why: 'PERSON është super-tipi sepse përmban atributet e përbashkëta.' },
  { q: 'Çfarë është nëntipi?', a: ['Një tabelë pa kolona', 'Një çelës i huaj', 'Një kategori më specifike që trashëgon atributet e super-tipit', 'Një relacion 1 : 1'], correct: 2, why: 'Nëntipi është kategori më specifike që trashëgon identifikuesin dhe atributet e super-tipit.' },
  { q: 'DepartmentID te tabela Employees referon DepartmentID te tabela Departments. Çfarë lloj çelësi është?', a: ['Foreign Key', 'Primary Key', 'Super-tipi', 'Nëntipi'], correct: 0, why: 'DepartmentID te Employees është Foreign Key sepse i referohet çelësit primar te Departments.' },
  { q: 'Në tabelën Enrollments, StudentID dhe SubjectID përdoren së bashku për identifikimin e rreshtit. Si quhet ky çelës?', a: ['Çelës i huaj i vetëm', 'Çelës i përbërë (Composite Key)', 'Super-tipi', 'NULL'], correct: 1, why: 'Kur dy ose më shumë fusha identifikojnë së bashku një rresht, kemi çelës të përbërë.' }
];

let score = 0;
const answered = Array(questions.length).fill(false);
const questionSlides = [...document.querySelectorAll('.question-slide')];
questionSlides.forEach((slide, qIndex) => {
  const q = questions[qIndex];
  const title = slide.querySelector('.question-text');
  const list = slide.querySelector('.answer-list');
  const feedback = slide.querySelector('.quiz-feedback');
  const status = slide.querySelector('.question-status');
  const bar = slide.querySelector('.quiz-progress div');
  title.textContent = q.q;
  bar.style.width = `${((qIndex + 1) / questions.length) * 100}%`;
  q.a.forEach((answer, aIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-option';
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + aIndex)}</span><span class="answer-text"></span><span class="answer-mark"></span>`;
    button.querySelector('.answer-text').textContent = answer;
    button.addEventListener('click', () => {
      if (answered[qIndex]) return;
      answered[qIndex] = true;
      status.textContent = 'U përgjigje';
      [...list.children].forEach((option, i) => {
        option.disabled = true;
        if (i === q.correct) { option.classList.add('correct'); option.querySelector('.answer-mark').textContent = '✓'; }
        else if (i === aIndex) { option.classList.add('incorrect'); option.querySelector('.answer-mark').textContent = '×'; }
      });
      if (aIndex === q.correct) {
        score++;
        feedback.textContent = `Saktë! ${q.why}`;
        feedback.classList.add('is-correct');
      } else {
        feedback.textContent = `Përgjigjja e saktë është: ${q.a[q.correct]}. ${q.why}`;
        feedback.classList.add('is-incorrect');
      }
      if (qIndex === questions.length - 1) document.getElementById('showResultBtn').disabled = false;
    });
    list.appendChild(button);
  });
});

function showResult() {
  const result = document.getElementById('quizResult');
  result.hidden = false;
  document.querySelector('.question-slide:last-child .quiz-panel').hidden = true;
  document.getElementById('finalScore').textContent = `${score}/10`;
  document.getElementById('resultTitle').textContent = score >= 9 ? 'Shkëlqyeshëm!' : score >= 7 ? 'Punë shumë e mirë!' : score >= 5 ? 'Mirë, vazhdo të ushtrohesh!' : 'Vazhdo të ushtrohesh!';
  document.getElementById('resultMessage').textContent = score >= 7 ? 'Ke njohuri të mira për çelësat dhe relacionet në bazat e të dhënave.' : 'Rishiko temat dhe provo kuizin përsëri. Me ushtrime do të përmirësohesh.';
  document.getElementById('resultIcon').textContent = score >= 7 ? '★' : '✦';
  document.getElementById('showResultBtn').disabled = true;
}
document.getElementById('showResultBtn').addEventListener('click', showResult);
document.getElementById('quizRestart').addEventListener('click', () => location.reload());
showSlide(0);
