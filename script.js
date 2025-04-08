const form = document.getElementById('form');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    clearErrors();
    
    const name = document.getElementById('userName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const termsOfUse = document.getElementById('termsOfUse');
    
    let isValid = true;

    if (name.value.trim().length < 2) {
        isValid = false;
        showError(name, 'Имя должно содержать хотя бы 2 символа.');
    }
    
    if (email.value.trim() === '') {
        isValid = false;
        showError(email, 'Email не может быть пустым.');
    }

    if (password.value.trim().length < 6) {
        isValid = false;
        showError(password, 'Пароль должен содержать хотя бы 6 символов.');
    }

    if (!termsOfUse.checked) {
        isValid = false;
        showError(termsOfUse, 'Необходимо согласиться с условиями.');
    }
    
    if (!isValid) {
        return;
    }
    
 const formData = new FormData(form)
 fetch('https://jsonplaceholder.typicode.com',{
    method:'POST',
    body: formData
 })
 .then(response=>response.json())
 .then(data=>{
    alert('Форма успешно отправлена!')
 })
 .catch(error=>{
    alert('Ошибка отправки')
    console.error(error)
 })
});

function showError(inp, mess) {
    const error = document.createElement('div');
    error.className = 'error';
    error.textContent = mess;
    inp.classList.add('error-input');
    inp.parentNode.appendChild(error);
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.remove());
    const inputs = document.querySelectorAll('.error-input');
    inputs.forEach(input => input.classList.remove('error-input'));
}