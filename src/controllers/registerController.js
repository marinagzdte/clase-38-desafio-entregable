const getRegister = (req, res) => {
    res.render('register');
}

const postRegister = (req, res) => { res.redirect('/login') }

const getRegisterError = (req, res) => {
    res.render('autherror', { registerError: true })
}

export { getRegister, postRegister, getRegisterError }