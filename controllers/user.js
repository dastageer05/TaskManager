const User = require("../models/user");
const { createHmac } = require("crypto");

exports.Signin = (req, res) => {
  return res.render("signin");
};
exports.Signup = (req, res) => {
  return res.render("signup");
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const profileImageURL = req.file
    ? `/profile/${req.file.filename}`
    : "/profile/userAvtar.png";
  try {
    await User.create({
      profileImageURL,
      firstName,
      lastName,
      email,
      password,
    });

    return res.redirect("/user/signin");
  } catch (error) {
    return res.render("signup", {
      error: "This email is already Registered try diffrent email.",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

exports.editUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  return res.render("editUser", {
    user: user,
  });
};

exports.about = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  return res.render("about", {
    user: user,
  });
};

exports.EditUser = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  const { firstName, lastName, email } = req.body;
  const profileImageURL = req.file
    ? `/profile/${req.file.filename}`
    : `${user.profileImageURL}`;
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        profileImageURL: profileImageURL,
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    }
  );
  return res.redirect(`/user/about/${user._id}`);
};

exports.changePassword = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  return res.render("changepassword", {
    user: user,
  });
};

exports.ChangePassword = async (req, res) => {
  const user = await User.findById(req.params.id).populate("_id");
  const {oldpassword, newpassword} = req.body;
  try{
  const password = await User.matchPassword(user._id, oldpassword, newpassword)
     await User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            password: password,
          },
        }
      );
    return res.redirect(`/user/about/${user._id}`);
  }catch{
    res.render('changepassword', {
      error: "Incorrect Password",
      user: user,
    })
  }
  }
;