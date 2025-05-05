const signUpButton = document.getElementById('signUpButton');
const showUsersLink = document.getElementById('showUsersLink');
const deleteUsersLink = document.getElementById('deleteUsersLink');

//Can remove when DB is connected
if (!localStorage.getItem('users')) {
    const defaultUsers = [
      { email: 'user1@example.com', password: 'password123!' },
      { email: 'user2@example.com', password: 'Hello123!' },
      { email: 'test.user@example.com', password: 'TestPass789@' },
      { email: 'demo@example.com', password: 'Demo1234#' },
      { email: 'fake.email@example.com', password: 'fakePass!23' },
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}
//End

signUpButton.addEventListener('click', function(event) {
    const name = document.getElementById('nameSignUp').value;
    const email = document.getElementById('emailSignUp').value;
    const password = document.getElementById('passwordSignUp').value;
    
    const emailValid = isEmailValid(email);
    const passValid = isValidPassword(password);

    if (emailValid === 1 && passValid === 1){
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password }); // You might want to hash the password!
        localStorage.setItem('users', JSON.stringify(users));

        alert("Signup successful! Redirecting to login...");
        window.location.href = 'login.html';
    }          
});

function isValidPassword(password){
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[^\w\s]/.test(password);
    const hasSpace = /\s/.test(password); 

    let message = 'Password validation:\n';

    if (hasUpper && hasDigit && hasSymbol && !hasSpace) {
        //alert('✅ All criteria met!');
        return 1;
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
        return 0;
    }
}

function isEmailValid(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const users = JSON.parse(localStorage.getItem('users') || []);
    const existingEmails = users.map(user => user.email);

    if(existingEmails.includes(email)){
        alert("Email in database - proceed to log in")
        return 0;
    }
    else{
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address in the correct format (e.g., example@domain.com).");
            return 0;
        } else {
            //alert("Email is valid!");
            return 1;
        }
    }
}

//Can remove button 
showUsersLink.addEventListener('click', function(event) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        alert("No users found.");
        return;
    }

    const userList = users
      .map(user => `• Email: ${user.email}\n  Password: ${user.password}`)
      .join('\n\n');

    alert(`Registered Users:\n\n${userList}`);
});

deleteUsersLink.addEventListener('click', function(event) {
    const emailsToDelete = [
        "mia@example.com",
        "mia2@example.com"
    ];

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Filter out users whose email is in the emailsToDelete array
    users = users.filter(user => !emailsToDelete.includes(user.email));

    // Update localStorage
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Selected users have been deleted.");
    
});