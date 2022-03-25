const User = require('../models/user');

module.exports.renderRegisterForm = (req,res)=>{
   res.render('user/register')
}

module.exports.registerUser = async (req,res,next)=> {
   try{
      const {username, email, password} = req.body;
      const user = new User ({username, email});
      const registeredUser = await User.register(user,password);
      req.logIn(registeredUser, err => {
         if(err) return next(err);
         req.flash('success', `Welcome ${req.user.username} 🙂`)
         res.redirect('/matches')
      });   
   }
   catch(e){
      req.flash('error', 'A user with given username or email-id is already registered');
      res.redirect('/register')
   }
}

module.exports.renderLoginForm = (req,res)=>{
   res.render('user/login');
};

module.exports.loginUser = (req,res)=>{
   req.flash('success', `Welcome ${req.user.username} 🙂`);
   res.redirect(req.session.returnTo || '/matches');
   delete req.session.returnTo;   
}

module.exports.logout = (req,res)=> {
   req.logOut();
   req.flash('success', `logged you out 🔒 `);
   delete req.session.returnTo;
   res.redirect('/matches');
}