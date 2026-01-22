const {createAppointment,getDoctorAppointments} = require("../services/appointmentService");

exports.create = async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getByDoctor = async (req, res) => {
  try {
    const appointments = await getDoctorAppointments(req.params.doctorId);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
