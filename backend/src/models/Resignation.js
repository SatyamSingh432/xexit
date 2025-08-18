import mongoose from "mongoose";

const ResignationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lwd: { type: String, required: true }, //  "YYYY-MM-DD"
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Resignation = mongoose.model("Resignation", ResignationSchema);
export default Resignation;
