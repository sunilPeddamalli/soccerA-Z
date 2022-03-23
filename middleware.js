module.exports.isLoggedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl
      req.flash('error','Login required. New user need to first register')
      res.redirect('/login')
   } else {
      next();
   }
}

module.exports.validateMatch = (req,res,next) => {
   const result= matchSchema.validate(req.body);
   if(result.error){
       throw new expressError(result.error.details[0].message,400);
   } else{
       next();
   }
};

