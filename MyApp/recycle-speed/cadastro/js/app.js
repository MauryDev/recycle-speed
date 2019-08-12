{
    let site = document.getElementById('site');
    let elements = {};

    let xmlhttp = new XMLHttpRequest();
    let theUrl = "http://localhost:3000/";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var res = JSON.parse(xmlhttp.responseText);
            if (res.sucess) {
                localStorage.setItem('info',JSON.stringify({
                    "Nome": res.Nome,
                    "id": res.id,
                    "email": res.email
                },null,4));
                site.innerHTML = `
                    <p id='sucess'>Cadastro com sucesso</p>
                `;
                setTimeout(() =>  {
                    location.href = location.href.replace('/cadastro','');
                },1000);
            } else {
                document.getElementById('error').innerHTML = "Erro no login";
            }
        } 
    }
    
    if (typeof localStorage.getItem("info") != "string") {
        // O HTML da página
        site.innerHTML = `
            <div class='center'>
                <p class='texto'>
                <span>Nome:</span><input id='name' type='text'><br>
                <span>Email: </span><input id='email' type="email"><br>
                <span>Senha: </span><input id='senha' type="password"><br>
                <button id='cadastro'>Inscrever-se</button>
                </p>
            </div>
            <p id='error'></p>
        `;
        // Elementos da página
        elements = {
            username : document.getElementById('name'),
            email: document.getElementById('email'),
            senha: document.getElementById('senha'),
            button: document.getElementById('cadastro')
        }
        // Eventos da página
        elements.button.addEventListener('click',() => {
            if (elements.email.value.replace(/( )/g,"").search('@gmail.com') < 1) {
                return;
            }
            if (elements.senha.value.length < 8) {
                return;
            }
            if (elements.username.value.length < 3) {
                return;
            }
            xmlhttp.open("POST", theUrl+"newuser",true);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send(JSON.stringify({
                "email": elements.email.value,
                "senha": elements.senha.value,
                "username": elements.username.value
            }));
        });
    } else {
        site.innerHTML = `
        <div class='center'>
            <p id='sucess'>Você já está cadastrando.</p>
        </div>`;
        setTimeout(() => {
            location.href = 'http://localhost:3000';
        },1000);
    }
}
