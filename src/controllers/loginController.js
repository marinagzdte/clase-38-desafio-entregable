const getLogin = (req, res) => {
    res.render('login')
}

const postLogin = (req, res) => res.redirect('/')

const getLogout = (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => res.redirect('/'))
}

const getLoginError = (req, res) => {
    res.render('autherror', { loginError: true })
}

export { getLogin, postLogin, getLogout, getLoginError }