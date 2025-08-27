import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterEvents = async (req, res) => {
  const { date, location } = req.query;
  try {
    const query = {};
    if (date) query.date = date;
    if (location) query.location = location;
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.approved = true;
    await event.save();
    res.json({ message: "Event approved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
