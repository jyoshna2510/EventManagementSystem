import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    if (event.registeredUsers.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.registeredUsers.push(req.user.id);
    await event.save();

    const registration = await Registration.create({ event: event._id, user: req.user.id });
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.registeredUsers = event.registeredUsers.filter(u => u.toString() !== req.user.id);
    await event.save();

    await Registration.findOneAndDelete({ event: event._id, user: req.user.id });
    res.json({ message: "Registration cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
