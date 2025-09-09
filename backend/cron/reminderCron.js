import cron from "node-cron";
import BorrowRecord from "../models/BorrowRecord.js";
import User from "../models/User.js";
import nodemailer from "nodemailer";

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vm45231@gmail.com",   // use your Gmail
    pass: "yybsr hmch uxrc ynnu",     // use App Password (not normal Gmail password)
  },
});

// Runs every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    console.log("📩 Checking for due reminders...");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // one day before due date
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Find records due tomorrow
    const dueSoon = await BorrowRecord.find({
      returnDate: { $gte: tomorrow, $lt: dayAfterTomorrow },
      status: "borrowed",
    });

    for (let record of dueSoon) {
      const student = await User.findOne({ libraryId: record.studentLiberaryId });
      if (!student || !student.email) continue;

      const mailOptions = {
        from: "vm45231@gmail.com",
        to: student.email,
        subject: "📚 Book Return Reminder",
        text: `Hello ${student.name},\n\nThis is a reminder that your borrowed book "${record.bookTitle}" (ISBN: ${record.isbn}) is due tomorrow (${record.returnDate.toDateString()}).\n\nPlease return it on time to avoid a fine.\n\nThank you,\nGuru nanak dev district library.`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Reminder sent to ${student.email}`);
    }
  } catch (err) {
    console.error("❌ Error in reminder cron:", err);
  }
});
