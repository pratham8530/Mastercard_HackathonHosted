import mongoose from "mongoose";    

const requestSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemsNeeded: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "clothing",
        "electronics",
        "stationery",
        "food",
        "furniture",
        "toys",
        "others",
      ],
      required: true,
    },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
