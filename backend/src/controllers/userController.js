import Resignation from "../models/Resignation.js";

export const submitResignation = async (req, res) => {
  try {
    const { lwd } = req.body;
    const employeeId = req.user.id;

    const lwdDate = new Date(lwd);
    if (isNaN(lwdDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    const existingResignation = await Resignation.findOne({
      employeeId,
      status: "pending",
    });
    if (existingResignation) {
      return res
        .status(400)
        .json({ message: "You already have a pending resignation request" });
    }

    const resignation = new Resignation({
      employeeId: employeeId,
      lwd: lwd,
    });

    await resignation.save();
    res.status(200).json({
      data: {
        resignation: {
          _id: resignation._id,
        },
      },
    });
  } catch (error) {
    console.error("Resignation submission error:", error);
    res
      .status(500)
      .json({ message: "Server error during resignation submission" });
  }
};
