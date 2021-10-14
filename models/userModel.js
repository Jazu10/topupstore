import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      uid: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      classe: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: "user",
      },
      root: {
         type: Boolean,
         required: false,
      },
      avatar: {
         type: String,
         default:
            "https://news.codashop.com/ph/wp-content/uploads/sites/5/2020/09/Alok-min.png",
      },
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
