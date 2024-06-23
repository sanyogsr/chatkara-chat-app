import mongoose, { model, Schema } from "mongoose";

const schema = new Schema(
  {
    content: String,

    attachments: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        tyoe: String,
        required: true,
      },
    },
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    chat: {
      type: String,
      ref: "Chat",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.models.Message || model("Message", schema);
