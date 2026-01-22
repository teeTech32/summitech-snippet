const redis = require("../redis/redisClient");
const Appointment = require("../models/appointmentModel");

//Checks if an appointment conflicts with existing ones
 
async function hasConflict(doctorId, startTime, endTime) {
  return Appointment.exists({
    doctorId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });
}

//Creates a new appointment with validation and caching
 
async function createAppointment({ patientId, doctorId, startTime, endTime }) {
  if (!patientId || !doctorId || !startTime || !endTime) {
    throw new Error("Missing required fields");
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error("Invalid appointment time range");
  }

  const conflict = await hasConflict(doctorId, startTime, endTime);
  if (conflict) {
    throw new Error("Appointment conflict detected");
  }

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    startTime,
    endTime,
  });

  // Invalidate cache for doctor's schedule
  await redis.del(`doctor:${doctorId}:appointments`);

  return appointment;
}

//Retrieves cached appointments for a doctor
 
async function getDoctorAppointments(doctorId) {
  const cacheKey = `doctor:${doctorId}:appointments`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const appointments = await Appointment.find({ doctorId }).sort("startTime");

  await redis.set(cacheKey, JSON.stringify(appointments), "EX", 60);

  return appointments;
}

module.exports = {
  createAppointment, 
  getDoctorAppointments
};
