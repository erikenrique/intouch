module.exports = function (app, passport, db) {

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    db.collection('contacts')
      .find({ userId: req.user._id }) // getting contacts for only that logged in user
      .toArray((err, contacts) => {
        if (err) return console.error(err);
        res.render('profile.ejs', {
          user: req.user,
          contacts
        });
      });
  });


  app.get('/contacts/:id', isLoggedIn, (req, res) => {
    const contactId = new require('mongodb').ObjectID(req.params.id);
    db.collection('contacts').findOne({ _id: contactId, userId: req.user._id }, (err, contact) => {
      if (err) return res.send(err);
      res.json(contact);
    });
  });

  // ADD A CONTACT /////////////////////////////////////////////////////////////////////
  app.post('/contacts', isLoggedIn, (req, res) => {
    const contact = {
      userId: req.user._id, 
      name: req.body.name,
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      whereMet: req.body.whereMet,
      whenMet: req.body.whenMet,
      lastMessaged: req.body.lastMessaged,
      numConversations: parseInt(req.body.numConversations) || 0,
      comments: req.body.comments,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin
    };
    db.collection('contacts').insertOne(contact, (err) => {
      if (err) return console.error(err);
      res.redirect('/profile');
    });
  });

  // EDIT CONTACT /////////////////////////////////////////////////////////////////////
  app.put('/contacts/:id', isLoggedIn, (req, res) => {
    const contactId = new require('mongodb').ObjectID(req.params.id);
    const updatedContact = {
      name: req.body.name,
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      whereMet: req.body.whereMet,
      whenMet: req.body.whenMet,
      lastMessaged: req.body.lastMessaged,
      numConversations: parseInt(req.body.numConversations) || 0,
      comments: req.body.comments,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin
    };
    db.collection('contacts').updateOne(
      { _id: contactId, userId: req.user._id },
      { $set: updatedContact },
      (err) => {
        if (err) return console.error(err);
        res.send("contact updated!");
      }
    );
  });


  // DELETE CONTACT /////////////////////////////////////////////////////////////////////
  app.delete('/contacts/:id', isLoggedIn, (req, res) => {
    const contactId = new require('mongodb').ObjectID(req.params.id);
    db.collection('contacts').deleteOne({ _id: contactId, userId: req.user._id }, (err) => {
        if (err) {
            console.error(err);
            return res.send('Error deleting contact');
        }
        res.send("contact deleted");
    });
});



  // AUTHENTICATION ROUTES ===================================================
  // Login
  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // Signup
  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // Logout
  app.get('/logout', (req, res) => {
    req.logout(() => {
      console.log('User has logged out!');
    });
    res.redirect('/');
  });
};

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
