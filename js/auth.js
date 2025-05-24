// auth.js
const { Auth } = aws_amplify;

aws_amplify.Amplify.configure({
  Auth: {
    region: 'eu-north-1',
    userPoolId: 'eu-north-1_xsp0gbkHP',
    userPoolWebClientId: 'qqjenfu97dhad073nk9d62bvb'
  }
});

async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    console.log('Logged in:', user);
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
