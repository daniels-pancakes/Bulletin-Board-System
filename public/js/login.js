const loginHandling = async (event) => {
    event.preventDefault();

    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    if (user_name && password) {
        try {
            let response;
            if (event.target.id ==='login-button') {
                response = await fetch('/api/users/login', {
                    method: 'POST',
                    body: JSON.stringify({ user_name, password }),
                    headers: { 'Content-Type': 'application/json' }
                });
            } else if (event.target.id === 'reg-button') { 
                response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ user_name, password }),
                headers: { 'Content-Type': 'application/json' },
                });
            }

            if (response.ok) {
                console.log('Login successful');
                document.location.replace('/');
                } else {
                console.log(response);
                console.error('Failed to login.', error);
                }
        } catch (error) {
            console.error('Error during login:', error);
        }
    } else {
        console.error('Username or password is missing.');
    }
};
document.querySelector('#login-button').addEventListener('click', loginHandling);
document.querySelector('#reg-button').addEventListener('click', loginHandling);

