const signUpbtn = document.querySelector(".SignUpbtn");
const loginContainer = document.querySelector(".login-container");

function displayLogInForm() {
    loginContainer.innerHTML = `
        
        <h2>Login</h2>
        <form id="loginForm" action="/login" method="post">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btnLogIn">Login</button>
            <p>Not a member? <button type="button" class="SignUpbtn">Sign Up</button></p>
        </form>
        <div class="signUpBody"></div>
       
    `;
    
    let btnSignUp = document.querySelector(".SignUpbtn");
    btnSignUp.addEventListener("click", displaySignUp);
    
    let loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        
        if (username !== "" && password !== "") {
            alert(`Welcome ${username}!  `);
            
        } else {
            alert("Please fill in both username and password.");
        }
    });
}

function displaySignUp() {
    loginContainer.innerHTML = `
        <div class="signup-container">
            <h2>Sign Up</h2>
            <form id="signupForm" action="/signup" method="post">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>
                <button type="submit">Sign Up</button>
                <button type="button" class="btnbackToLogIn" style="margin-top: 20px">Back to Log-In</button>
            </form>
            <p id="error-message" class="error-message"></p>
        </div>
    `;
    
    let btnbackToLogIn = document.querySelector(".btnbackToLogIn");
    btnbackToLogIn.addEventListener("click", displayLogInForm);

    let signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", function(event) {
       event.preventDefault();
        
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        
        if (username !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                alert("You have signed up!");
                
            } else {
                alert("Passwords do not match.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    });
}

signUpbtn.addEventListener("click", displaySignUp);

displayLogInForm();
