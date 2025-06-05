
document.addEventListener('DOMContentLoaded', () => {
  const stepOptionsMap = {
    1: ['תיאום פגישה', 'אישור תשלום'],
    2: ['סקיצה ראשונית', 'סקיצה סופית'],
    3: ['תיאום מדידה', 'עדכון מידות'],
    4: ['התחלת תפירה', 'בדיקת בדים'],
    5: ['התאמה ראשונה', 'תיקונים'],
    6: ['מסירה ללקוחה', 'אישור קבלה']
  };

  const steps = document.querySelectorAll('.step-btn');
  const optionsContainer = document.getElementById('step-options-container');
  let currentStep = 1;

  function renderOptions(stepNum) {
    const options = stepOptionsMap[stepNum] || [];
    optionsContainer.innerHTML = '';
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.flexWrap = 'wrap';
    form.style.gap = '1rem';
    form.style.justifyContent = 'center';

    options.forEach(opt => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      label.appendChild(checkbox);
      label.append(' ' + opt);
      form.appendChild(label);
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'הבא';
    nextBtn.className = 'btn save-highlight';
    nextBtn.style.marginTop = '1.5rem';
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep <= steps.length) {
        steps[currentStep - 1].style.backgroundColor = '#ccc';
        steps[currentStep - 1].disabled = true;
        currentStep++;
        if (currentStep <= Object.keys(stepOptionsMap).length) {
          renderOptions(currentStep);
        } else {
          optionsContainer.innerHTML = '<p>כל השלבים הושלמו 🎉</p>';
        }
      }
    });

    form.appendChild(nextBtn);
    optionsContainer.appendChild(form);
  }

  steps.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step);
      currentStep = step;
      renderOptions(step);
    });
  });

  renderOptions(currentStep);
});
