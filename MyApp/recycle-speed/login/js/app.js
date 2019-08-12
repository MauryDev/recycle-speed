{
    let site = document.getElementById("site");
    let elements = {};
    let api = new XMLHttpRequest();
    let theUrl = "http://localhost:3000/";
    api.onreadystatechange = function() {
        if (api.readyState == 4 && api.status == 200) {
            if (api.responseText == 'Sucess') {
                localStorage.setItem('info',{});
                site.innerHTML = `
                    <div class='center'>
                        <p id='sucess'>Login com sucesso</p>
                    </div>
                `;
                setTimeout(() =>  {
                    location.href = location.href.replace('/login','');
                },1000);
            } else {
                alert('Erro no login');
            }
        }
    }

    if (typeof localStorage.getItem("info") != "string") {
        // Site elementos
        site.innerHTML = `
            <div class='center'>
                <span class='texto'>Email: <input id='email' type='text'></span><br>
                <span class='texto'>Senha: <input id='senha' type='password'></span><br>
                <button id='login'>Login</button>
            </div>
        `;
        // Elementos da pagina
        elements = {
            senha: document.getElementById('senha'),
            email: document.getElementById("email"),
            login: document.getElementById('login')
        };
        // Eventos
        elements.login.addEventListener("click",() => {
            if (elements.email.value.replace(/( )/g,"").search('@gmail.com') < 1) {
                console.error('Email inválido');
                return;
            }
            if (elements.senha.value.length < 8) {
                console.error("Senha Curta demais!");
                return;
            }
            api.open("POST", theUrl+"users",true);
            api.setRequestHeader("Content-Type", "application/json");
            api.send(JSON.stringify({
                "email": elements.email.value,
                "senha": elements.senha.value
            }));
        });
    } else {
        site.innerHTML = `
            <div class='center'>
                <p id='sucess'>Você já se cadastrou no app.</p>
            </div>
        `;
        setTimeout(() => {
            location.href = location.href.replace('/login',"");
        },1000);
    }
}
