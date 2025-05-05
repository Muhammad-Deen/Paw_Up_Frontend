//The following can be removed if connected to backend - this is the default database but changes when the user interacts and adds/deletes users.
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
//end

// Default - user is not logged in when they run the code. The variable is set as sessionStorage which means when the tab is closed it defaults back.  
let hasLoggedIn = 0;

const signInButton = document.getElementById('signInButton');
const showUsersLink = document.getElementById('showUsersLink');
const deleteUsersLink = document.getElementById('deleteUsersLink');

signInButton.addEventListener('click', function(event) {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const isValidUser = users.some(user => user.email === email && user.password === password);

    if (isValidUser) {
        //Username and password correct - user can login 
        sessionStorage.setItem('hasLoggedIn','1');
        window.location.href = "homepage.html";
    } else {
        // If the login details are incorrect, show an error message
        alert('Incorrect email or password. Please try again.');
    }
});

//Can remove button when the database is set up
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
    //Change the emails that are wanted to be deleted
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


