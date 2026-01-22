const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    startTime: {
      type: Date,
      required: true,
      index: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "cancelled", "completed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

// Prevent overlapping appointments at the database level (best-effort)
AppointmentSchema.index({
  doctorId: 1,
  startTime: 1,
  endTime: 1,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
