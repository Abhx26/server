import Hall from "../model/hallSchema.js"; // Import the Sequelize model for Hall

const createHall = async (req, res, next) => {
  try {
    const { name, location, capacity, amenities, description, hallCreater } = req.body;

    if (!name || !location || !capacity || !amenities || !description || !hallCreater) {
      return res.status(422).json({ error: "Please fill all details" });
    }

    if (capacity <= 0) {
      return res.status(422).json({ error: "Please enter a valid capacity greater than zero" });
    }

    const hall = await Hall.create({ name, location, capacity, amenities, description, hallCreater });

    res.status(201).json({ message: 'Hall created successfully' });
  } catch (error) {
    next(error);
  }
};

const getHalls = async (req, res, next) => {
  try {
    const halls = await Hall.findAll();
    res.json({ halls });
  } catch (error) {
    next(error);
  }
};

const getHallById = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findByPk(hallId); // Use findByPk for primary key lookup
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }
    res.json({ hall });
  } catch (error) {
    next(error);
  }
};

const updateHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;
    const { name, location, capacity, amenities, description } = req.body;
    const currentUserMail = req.rootUser.email; // Renamed to avoid conflict
    const masterAdminmail = process.env.REACT_APP_MASTER_ADMIN;

    const hall = await Hall.findByPk(hallId);

    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    if (hall.hallCreater !== currentUserMail && currentUserMail !== masterAdminmail) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedHall = await hall.update({ name, location, capacity, amenities, description });

    res.json({ hall: updatedHall });
  } catch (error) {
    next(error);
  }
};

const deleteHall = async (req, res, next) => {
  try {
    const { hallId } = req.params;

    // Validate the hall ID
    if (!hallId || isNaN(hallId)) {
      return res.status(400).json({ message: 'Invalid hall ID' });
    }

    // Find the hall by primary key
    const hall = await Hall.findByPk(hallId);
    if (!hall) {
      return res.status(404).json({ message: 'Hall not found' });
    }

    // Delete the hall
    await hall.destroy();
    res.status(200).json({ message: 'Hall deleted successfully' });
  } catch (error) {
    console.error('Error while deleting hall:', error.message);
    next(error); // Forward error to error-handling middleware
  }
};

export default { createHall, getHalls, getHallById, updateHall, deleteHall };
