document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("root");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    let user = storedUser;

    function render() {
        if (!user) {
            root.innerHTML = SignUp();
        } else {
            root.innerHTML = Profile(user);
        }
    }

 
      

   function SignUp() {
        return `
        
        <div class="header-container">
            <h4 class="header">Header</h4>
            <div class="button-container">
                <button id="signup-btn" class="top-right-btn">Signup</button>
                <button id="profile-btn" class="top-right-btn">Profile</button>
            </div>
        </div>
        <hr class="spacer">

        
        
 <h2>Sign Up</h2>
                <form id="signup-form">
                    <div class="form-group">
                        <label for="fullName"></label>
                        <input type="text" id="fullName" name="fullName" placeholder="Full name">
                    </div> <hr>
                    <div class="form-group">
                        <label for="email"></label>
                        <input type="email" id="email" name="email" placeholder="Email address">
                    </div>  <hr>
                    <div class="form-group">
                        <label for="password"></label>
                        <input type="password" id="password" name="password" placeholder="Password">
                    </div>  <hr>
                    <div class="form-group">
                        <label for="confirmPassword"></label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password">
                    </div>  <hr>
                    <button type="submit">Sign Up</button>
                    <div id="message"></div>
                </form>
            </div>
        `;
    }

    function Profile(user) {
        return `
            <div>
            <div class="header-container">
            <h4 class="header">Header</h4>
            <div class="button-container">
                <button id="signup-btn" class="top-right-btn">Signup</button>
                <button id="profile-btn" class="top-right-btn">Profile</button>
            </div>
        </div>
        <hr class="spacer">

                <h2>Profile</h2>
                <p>Full Name: ${user.fullName}!</p>
                <p>Email : ${user.email}</p>
                <p>Password : ${user.password}</p>

                <button id="logout-btn">Logout</button>
            </div>
        `;
    }
    

    function handleSignUp(formData) {
        // Check for empty fields
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            showMessage("Error : All fields are mandatory", "error");
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            showMessage("Passwords do not match", "error");
            return;
        }

        // Save user data and render profile
        localStorage.setItem("user", JSON.stringify(formData));
        user = formData;
        showMessage("Successfully signed up!", "success");
        render();
    }

    function handleLogout() {
        localStorage.removeItem("user");
        user = null;
        render();
    }

            // Save user data and render profile
            function showMessage(message, type) {
                const messageElement = document.getElementById("message");
                messageElement.textContent = message;
                messageElement.className = "message " + type;
            }
        

    root.addEventListener("submit", function (event) {
        event.preventDefault();
        if (event.target.id === "signup-form") {
            const formData = {
                fullName: event.target.fullName.value,
                email: event.target.email.value,
                password: event.target.password.value,
                confirmPassword: event.target.confirmPassword.value
            };
            handleSignUp(formData);
        }
    });

    root.addEventListener("click", function (event) {
        if (event.target.id === "logout-btn") {
            handleLogout();
        }
    });

    // Add event listener for beforeunload event
    window.addEventListener("beforeunload", function(event) {
        // Save current state to localStorage
        localStorage.setItem("currentState", JSON.stringify({ user }));

        // Remove user data from localStorage
        localStorage.removeItem("user");
    });

    // Check if there's a saved state in localStorage and restore it
    const savedState = JSON.parse(localStorage.getItem("currentState"));
    if (savedState && savedState.user) {
        user = savedState.user;
    }

    render();
});



