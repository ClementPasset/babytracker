const LoginForm = ({ setisLogged }) => {

    const handleSumbit = (e) => {
        e.preventDefault();
        let userName = e.target[0].value;
        let password = e.target[1].value;
        if (userName && password) {
            fetch(process.env.REACT_APP_API_URL + 'user/login/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    password
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (!res.error) {
                        localStorage.setItem('isLogged', JSON.stringify(res));
                        setisLogged(res);
                    }
                })
                .catch(error => console.log(error))
        } else {
            alert('Merci de renseigner un nom d\'utilisateur et un mot de passe');
        }
    }

    return (
        <form onSubmit={handleSumbit} className="loginForm">
            <label htmlFor="username">Nom d'utilisateur : <input id="username" name="username" type="text" placeholder="Nom d'utilisateur" /></label>
            <label htmlFor="password">Mot de passe : <input id="password" name="password" type="password" placeholder="Mot de passe" /></label>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;