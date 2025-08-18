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

export const concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;

    const resignation = await Resignation.findById(resignationId);
    if (!resignation) {
      return res.status(404).json({ message: "Resignation not found" });
    }

    resignation.status = approved ? "approved" : "rejected";

    if (approved && lwd) {
      const lwdDate = new Date(lwd);
      if (isNaN(lwdDate.getTime())) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }
      resignation.lwd = lwd;
    }

    await resignation.save();
    res.status(200).json({
      message: `Resignation ${approved ? "approved" : "rejected"} successfully`,
    });
  } catch (error) {
    console.error("Conclude resignation error:", error);
    res
      .status(500)
      .json({ message: "Server error while processing resignation" });
  }
};
