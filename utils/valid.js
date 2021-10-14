const valid = (uid, name, email, password, cf_password) => {
   console.log(password, cf_password);
   if (!name || !email || !uid || !password)
      return "Please enter all the fields!";

   // if (!validateEmail(email)) return "Invalid Email format!";
   if (uid.length !== 9) return "Invalid Freefire id";

   if (password.length < 6) return "Password must be atleast of 6 characters!";

   if (password !== cf_password) return "Confirm Password did not match!";
};

function validateEmail(email) {
   const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

export default valid;
