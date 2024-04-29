function loginAdmin() {
    const email = document.getElementById("emailLogin");
    const senha = document.getElementById("senhaAdmin");
    const url = "https://apippgbio-or3c.vercel.app/login";

    let data = {
        email: email.value,
        senha: senha.value
    }

    if (email != (null || "") && senha != (null || "")) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include',  Certificar de alterar nas outras requisições
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        Swal.fire({
                            titleText: "Falha na autenticação: login ou senha inválido!",
                            text: "Verifique seu email, senha e tente novamente!",
                            icon: "error"
                        });
                        throw new Error('Falha na autenticação');
                    } else {
                        Swal.fire({
                            titleText: "Tivemos um problema!",
                            text: "Tente novamente!",
                            icon: "warning"
                        });
                        throw new Error('Erro na requisição');
                    }
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.setItem('token', data.Token);
                sessionStorage.setItem('autor', data.autor);
                console.log('Sucesso:', data);

                Swal.fire({
                    titleText: "Login bem-sucedido!",
                    html: "Redirecionando para a página do Editor.",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.href = 'https://cassiasantos.github.io/PPG-Biociencias-UFOPA/form-cadastros.html';
                });


            })
            .catch(err => {
                // Lógica a ser executada em caso de erro
                console.error('Erro na requisição:', err.message);
            });
    }
}
