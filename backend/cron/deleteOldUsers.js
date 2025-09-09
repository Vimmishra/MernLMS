import cron from "node-cron";
import User from "../models/User.js";

// Runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const result = await User.deleteMany({
      role: "user", // ✅ only delete users, not admins
      createdAt: { $lt: oneYearAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`🗑 Deleted ${result.deletedCount} old users`);
    }
  } catch (err) {
    console.error("Error deleting old users:", err);
  }
});


































/*
import cron from "node-cron";
import User from "../models/User.js";

// Runs every minute
cron.schedule("* * * * *", async () => {
  try {
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);

    const result = await User.deleteMany({
      role: "user", // ✅ only delete users, not admins
      createdAt: { $lt: threeMinutesAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`🗑 Deleted ${result.deletedCount} users older than 3 minutes`);
    }
  } catch (err) {
    console.error("Error deleting users:", err);
  }
});

*/ 