import Resignation from "../models/Resignation.js";

export const getResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find()
      .populate("employeeId", "username")
      .select("employeeId lwd status reason");

    res.status(200).json({ data: resignations });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching resignations" });
  }
};
