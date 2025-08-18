import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responses: [
    {
      questionText: { type: String, required: true },
      response: { type: String, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

const Response = mongoose.model("Response", ResponseSchema);
export default Response;
