document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const user = JSON.parse(atob(data.token.split('.')[1]));
        if (user.role === 'admin') {
          window.location.href = 'admin.html';
        } else if (user.role === 'instructor') {
          window.location.href = 'instructor.html';
        }
      } else {
        document.getElementById('error-message').textContent = data.message;
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  });
  