document.addEventListener('DOMContentLoaded', function () {
    const errorMessage = document.querySelector('.error');

    if (errorMessage.innerHTML !== '') {
        setTimeout(function () {
            errorMessage.innerHTML = '';
        }, 3000)
    }
})