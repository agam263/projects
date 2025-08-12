fetch('DataSet.json')
    .then(response => response.json())
    .then(data => {

        console.log(data.cityItineraries[0].city); 
        console.log(data.cityItineraries[1].days[0]); 

    })
    .catch(error => console.error('Error in fetching the JSON file:', error));
    
   
    function openPlanPage() {
        const destination = document.getElementById('destination').value;
        const days = document.getElementById('days').value;
      
        if (destination && days) {
          document.getElementById('loading-indicator').style.display = 'block';
          setTimeout(() => {
            window.location.href = `plan.html?destination=${destination}&days=${days}`;
          }, 2000);
        } else {
          alert('Please fill in all fields!');
        }
      }

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const email = document.getElementById('loginEmail').value.trim(); 
          const password = document.getElementById('loginPassword').value.trim();

    
          const storedEmail = localStorage.getItem('email');
          const storedPassword = localStorage.getItem('password');

          if (email === storedEmail && password === storedPassword) {
            localStorage.setItem('currentUser', email); 
              alert('Login successful!');
              window.location.href = 'index.html';
          } else {
              alert('Invalid email or password. Please try again.');
          }
      });
  }

  if (signupForm) {
      signupForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const email = document.getElementById('signupEmail').value.trim();
          const password = document.getElementById('signupPassword').value.trim();
          const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();

          if (password !== confirmPassword) {
              alert('Passwords do not match!');
              return;
          }

          localStorage.setItem('email', email);
          localStorage.setItem('password', password);

          alert('Signup successful! You can now log in.');
          window.location.href = 'login.html';
      });
  }
});
