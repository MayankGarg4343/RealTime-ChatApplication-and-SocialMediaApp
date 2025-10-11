import mongoose from "mongoose"; // imported the mongoose package.
import bcrypt from "bcryptjs";// imported bcrypt module.
const userSchema = new mongoose.Schema( // drwn the schema for the sign up.
  {
    fullName: {
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
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnborded: {
      type: Boolean,
      default: false,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
// it tells createdAt, updatedAt

// pre hook we want to encrypt the password.
userSchema.pre("save", async function (next) { // saving the data.
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword){
  const isPasswordCorrect = await bcrypt.compare(enteredPassword,this.password); // check whether the password is correct or not.
  return isPasswordCorrect;
}

const User = mongoose.model("User", userSchema);
export default User;
