// auth.js
const { Auth } = aws_amplify;

aws_amplify.Amplify.configure({
  Auth: {
    region: 'eu-north-1',
    userPoolId: 'eu-north-1_xsp0gbkHP',
    userPoolWebClientId: 'qqjenfu97dhad073nk9d62bvb'
  }
});

const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password'); 
  const phone = formData.get('phone');
  const firstName = formData.get('first_name');
  const lastName = formData.get('last_name');

  try {
    const { user } = await aws_amplify.Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email,
        phone_number: '+972' + phone, // AWS requires E.164 format
        given_name: firstName,
        family_name: lastName,
      }
    });
    alert("Registration successful! Please check your email to confirm.");
  } catch (error) {
    console.error('Error signing up:', error);
    alert(error.message || 'Error registering user');
  }
});
