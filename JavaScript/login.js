const correctEmail = 'user@example.com'
const correctPassword = 'password123!'

const signInButton = document.getElementById('signInButton');

signInButton.addEventListener('click', function(event) {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    if (email === correctEmail && password === correctPassword) {
        window.location.href = "homepage.html"; 

    } else {
        // If the login details are incorrect, show an error message
        alert('Incorrect email or password. Please try again.');
    }
});