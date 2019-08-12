{
    
    let newuser = () => {
        location.href = "cadastro";
    }
    let userlogin = () => {
        location.href = "login";
    }
    let elements = {};
    let site = document.getElementById('site');

    if (typeof localStorage.getItem("info") != "string") {
        
        site.innerHTML = `
            <img src='src/planta.jpg' alt="image">
            <p id="Welcome">Bem-vindo ao Recycle Speed!</p>
            <p id='centralizado'>
                <button id='cadastro' class='button1'>Cadastro</button>
                <button id='login' class='button1'>Login</button>
            </p>
        `;
        elements = {
            cadastro : document.getElementById('cadastro'),
            login: document.getElementById('login')
        };
        elements.cadastro.addEventListener('click',() => {
            newuser();
        });
        elements.login.addEventListener('click',() => {
            userlogin();
        })
    } else {
        site.innerHTML = `
            <button id='button2' class='button2'>Iniciar o app.</button>
        `;
        document.getElementById('button2').addEventListener(() => {
            map();
        })
        function map() {
            location.href = 'map';
        }
    }
}