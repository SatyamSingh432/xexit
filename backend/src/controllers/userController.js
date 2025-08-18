import Resignation from "../models/Resignation.js";
import ResponseModel from "../models/Response.js";

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

export const submitQuestionnaire = async (req, res) => {
  try {
    const { responses } = req.body;
    const employeeId = req.user.id;
    if (!Array.isArray(responses) || responses.length === 0) {
      return res
        .status(400)
        .json({ message: "Responses must be a non-empty array" });
    }

    const responseEntry = new ResponseModel({
      employeeId: employeeId,
      responses: responses,
    });

    await responseEntry.save();
    res
      .status(200)
      .json({ message: "Exit questionnaire submitted successfully" });
  } catch (error) {
    console.error("Response submission error:", error);
    res
      .status(500)
      .json({ message: "Server error during questionnaire submission" });
  }
};

export const getResignationStatus = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const resignation = await Resignation.findOne({ employeeId });

    if (!resignation) {
      return res.status(200).json({ message: "No resignation record found" });
    }

    res.status(200).json({
      resignation_status: resignation.status,
    });
  } catch (error) {
    console.error("Error checking resignation status:", error);
    res.status(500).json({ message: "Server error while checking status" });
  }
};
