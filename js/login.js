let selectedRole = null;

function openModal() {
  document.getElementById('loginModal').style.display = 'flex';
  document.getElementById('login-step1').style.display = 'block';
  document.getElementById('login-step2').style.display = 'none';
}

function closeModal() {
  document.getElementById('loginModal').style.display = 'none';
}

function selectRole(role) {
  selectedRole = role;
  document.getElementById('login-step1').style.display = 'none';
  document.getElementById('login-step2').style.display = 'block';
  document.getElementById('login-title').innerText =
    role === 'client' ? 'התחברות כלקוחה' : 'התחברות כמעצבת';
  document.getElementById('social-login').style.display =
    role === 'client' ? 'block' : 'none';
}

function submitLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('אנא מלאי את כל השדות');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('כתובת המייל אינה תקינה');
    return;
  }

  // כאן ייכנס בעתיד API אמיתי
  console.log(`Logging in as ${selectedRole}...`, { email, password });

  if (selectedRole === 'client') {
    window.location.href = 'pages/client-dashboard.html';
  } else if (selectedRole === 'designer') {
    window.location.href = 'pages/admin-dashboard.html';
  }
}

function loginWith(provider) {
  alert(`בעתיד: התחברות עם ${provider}`);
}
