const register = (req, res) => {
   console.log(req.body);
   res.json({ ok:"register"});
};

const login = (req, res) => {
    res.json({ok: "login ok"});
 };


export {
    login, register
}