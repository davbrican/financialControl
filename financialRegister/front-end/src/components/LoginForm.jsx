const Login = () => {

    return (
        <div className="login">
            <h1>Log in</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login;