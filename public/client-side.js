document.addEventListener('DOMContentLoaded', function () {
    const errorMessage = document.querySelector('.error');
    const successMessage = document.querySelector('.success');

    if (errorMessage.innerHTML !== '' && successMessage.innerHTML !== '') {
        setTimeout(function () {
            errorMessage.innerHTML = '';
            successMessage.innerHTML = '';
        }, 3000)
    }
})