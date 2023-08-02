const { Op } = require("sequelize");
const cron = require("node-cron");
const {TrialReceipt} = require("./models/"); // Import the TrialReceipt model

// Function to update trialStatus
async function updateTrialStatus() {
  try {
    // Get the current time
    const currentTime = new Date();

    // Find all records where the dateOfTrial is before or equal to the current time
    const trialReceiptsToUpdate = await TrialReceipt.findAll({
      where: {
        dateOfTrial: {
          [Op.lte]: currentTime,
        },
      },
    });

    // Update the trialStatus for each matched record
    for (const trialReceipt of trialReceiptsToUpdate) {
      // Perform your logic here to update the trialStatus based on your requirements
      trialReceipt.trialStatus = "Finished"; // Replace "UPDATED_STATUS" with the desired status value
      await trialReceipt.save(); // Save the updated record back to the database
    }

    console.log("TrialStatus update successful!");
  } catch (error) {
    console.error("Error updating trialStatus:", error);
  }
}

const cronSchedule = "* * * * *"; // This cron expression represents "every minute"

// Schedule the function to run periodically
cron.schedule(cronSchedule, () => {
  updateTrialStatus();
});