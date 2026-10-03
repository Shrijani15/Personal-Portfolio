/* =====================================
   PROJECT BUTTON
===================================== */

function showProject(projectName) {
    alert(
        "You selected: " +
        projectName +
        "\n\nProject details can be added later."
    );
}


/* =====================================
   SIGN UP
===================================== */

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;


    /* Check password */

    if (password !== confirmPassword) {

        signupMessage.textContent =
            "Passwords do not match.";

        signupMessage.style.color = "red";

        return;
    }


    /* Get existing users */

    let users =
        JSON.parse(localStorage.getItem("portfolioUsers")) || [];


    /* Check duplicate username */

    const usernameExists = users.some(function(user) {

        return user.username.toLowerCase() ===
               username.toLowerCase();

    });


    if (usernameExists) {

        signupMessage.textContent =
            "Username already exists.";

        signupMessage.style.color = "red";

        return;
    }


    /* Check duplicate email */

    const emailExists = users.some(function(user) {

        return user.email.toLowerCase() ===
               email.toLowerCase();

    });


    if (emailExists) {

        signupMessage.textContent =
            "Email is already registered.";

        signupMessage.style.color = "red";

        return;
    }


    /* Create new user */

    const newUser = {

        name: name,

        email: email,

        username: username,

        password: password

    };


    /* Add user to array */

    users.push(newUser);


    /* Save users in localStorage */

    localStorage.setItem(
        "portfolioUsers",
        JSON.stringify(users)
    );


    /* Success message */

    signupMessage.textContent =
        "Registration successful! You can now login.";

    signupMessage.style.color = "green";


    /* Clear form */

    signupForm.reset();

});


/* =====================================
   LOGIN
===================================== */

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    /* Get users */

    const users =
        JSON.parse(localStorage.getItem("portfolioUsers")) || [];


    /* Find matching user */

    const user = users.find(function(user) {

        return user.username === username &&
               user.password === password;

    });


    /* Login successful */

    if (user) {

        loginMessage.textContent =
            "Login successful!";

        loginMessage.style.color = "green";


        /* Store login session */

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        localStorage.setItem(
            "currentUser",
            user.username
        );


        /* Show profile */

        showUserProfile(user);


        /* Clear login form */

        loginForm.reset();

    }

    else {

        loginMessage.textContent =
            "Invalid username or password.";

        loginMessage.style.color = "red";

    }

});


/* =====================================
   USER PROFILE
===================================== */

const userProfile =
    document.getElementById("userProfile");

const welcomeUser =
    document.getElementById("welcomeUser");

const profileUsername =
    document.getElementById("profileUsername");

const profileEmail =
    document.getElementById("profileEmail");

const authContainer =
    document.getElementById("authContainer");


function showUserProfile(user) {

    /* Hide Sign Up and Login */

    authContainer.style.display = "none";


    /* Show profile */

    userProfile.style.display = "block";


    /* Display user information */

    welcomeUser.textContent =
        "Welcome, " + user.name + "!";

    profileUsername.textContent =
        user.username;

    profileEmail.textContent =
        user.email;
}


/* =====================================
   LOGOUT
===================================== */

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", function() {

    /* Remove login session */

    localStorage.removeItem("isLoggedIn");

    localStorage.removeItem("currentUser");
     /* Hide profile */

    userProfile.style.display = "none";


    /* Show authentication modules */

    authContainer.style.display = "grid";


    loginMessage.textContent =
        "You have been logged out.";

    loginMessage.style.color = "green";

});


/* =====================================
   CHECK LOGIN WHEN PAGE LOADS
===================================== */

window.addEventListener("load", function() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const currentUsername =
        localStorage.getItem("currentUser");


    if (
        isLoggedIn === "true" &&
        currentUsername !== null
    ) {

        const users =
            JSON.parse(
                localStorage.getItem("portfolioUsers")
            ) || [];


        const user = users.find(function(user) {

            return user.username === currentUsername;

        });


        if (user) {

            showUserProfile(user);

        }

    }

});


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        "Thank you, " +
        name +
        "!\n\nYour message has been received."
    );


    contactForm.reset();

});

