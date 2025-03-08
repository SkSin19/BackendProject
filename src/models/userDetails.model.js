import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Refers to the User collection
      unique: true, // Ensures one-to-one mapping between user and userDetails
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Non-Binary', 'Other'],
    },
    interestedIn: {
      type: String,
      required: true,
      enum: ['Men', 'Women', 'Everyone'],
    },
    personality: {
      type: String,
      required: true,
      enum: ['Introvert', 'Ambivert', 'Extrovert'],
    },
    interests: [
      {
        type: String,
        required: true,
      },
    ],
    relationshipType: {
      type: String,
      required: true,
      enum: ['Long Term', 'Casual', 'Hookup', 'Marriage'],
    },
  },
  { timestamps: true }
);

userSchema.index({ user: 1 }, { unique: true }); // Ensures unique user per userDetails

export const UserDetail = mongoose.model("UserDetail", userSchema);

  