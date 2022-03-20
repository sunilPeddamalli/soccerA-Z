module.exports.isLoggedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){
      req.flash('error','Login required. New user need to first Sign-up')
      res.redirect('/login')
   } else {
      next();
   }
}