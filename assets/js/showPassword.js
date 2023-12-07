  /**
   * visualização da senha.
   */
function showPassword() {
    let input = document.querySelector('#senhaAdmin');
    if(input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }
}
