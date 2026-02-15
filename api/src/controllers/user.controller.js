export const updateUser = async (req, res) => {
  // Account update logic
  try {
    console.log(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  // Account delete logic
  try {
    console.log(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
