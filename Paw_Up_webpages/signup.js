const emails = ['use1@gmail.com','use2@hotmail.com'];

const signUpButton = document.getElementById('signUpButton');

signUpButton.addEventListener('click', function(event) {
    const name = document.getElementById('nameSignUp').value;
    const email = document.getElementById('emailSignUp').value;
    const password = document.getElementById('passwordSignUp').value;
    
    isEmailValid(email);
    isValidPassword(password);
            
});

function isValidPassword(password){
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[^\w\s]/.test(password);
    const hasSpace = /\s/.test(password); 

    let message = 'Password validation:\n';

    if (hasUpper && hasDigit && hasSymbol && !hasSpace) {
        alert('✅ All criteria met!');
    } else {
        if (hasUpper) message += '- ✅ Contains an uppercase letter\n';
        else message += '- ❌ Must include at least one uppercase letter\n';

        if (hasDigit) message += '- ✅ Contains a number\n';
        else message += '- ❌ Must include at least one number\n';

        if (hasSymbol) message += '- ✅ Contains a symbol\n';
        else message += '- ❌ Must include at least one symbol\n';

        if (!hasSpace) message += '- ✅ Does NOT contain spaces\n';
        else message += '- ❌ Must NOT contain spaces\n';

        alert(message);
    }
}

function isEmailValid(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emails.includes(email)){
        alert("Email in database - proceed to log in")
    }
    else{
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address in the correct format (e.g., example@domain.com).");
        } else {
            alert("Email is valid!");
        }
    }

}