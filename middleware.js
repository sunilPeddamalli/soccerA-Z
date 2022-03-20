module.exports.isLoggedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl
      req.flash('error','Login required. New user need to first register')
      res.redirect('/login')
   } else {
      next();
   }
}