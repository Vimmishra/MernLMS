import News from "../models/News.js";

// CREATE NEWS
export const createNews = async (req, res) => {
  try {
    const { title, description, disappearIn } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please enter title and description" });
    }

    // Calculate expiry date
    let expiresAt = null;
    const now = new Date();
    if (disappearIn === "24h") 
  expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 2 minutes
    else if (disappearIn === "2d") expiresAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    else if (disappearIn === "1w") expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const addNews = new News({ title, description, disappearIn, expiresAt });

    await addNews.save();

    return res.status(201).json({ message: "News created successfully!", news: addNews });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL NEWS (removes expired ones automatically)
export const getNews = async (req, res) => {
  try {
    // Delete expired news before fetching
    await News.deleteMany({ expiresAt: { $lte: new Date() } });

    const news = await News.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "News fetched successfully",
      news,
    });
  } catch (err) {
    console.error("❌ Get News Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE NEWS
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("❌ Delete News Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
