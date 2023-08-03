const Sequelize = require('sequelize');
const cron = require("node-cron");
const {TrialReceipt} = require("./models/"); 


async function updateTrialStatus() {
  try {


    const trialReceiptsToUpdate = await TrialReceipt.findAll({
      where: Sequelize.literal(
        'DATE_ADD(dateOfTrial, INTERVAL 2 HOUR) <= NOW()'
      ),
    });


    for (const trialReceipt of trialReceiptsToUpdate) {

      trialReceipt.trialStatus = "Finished"; 
      await trialReceipt.save(); 
    }

    console.log("TrialStatus update successful!");
  } catch (error) {
    console.error("Error updating trialStatus:", error);
  }
}

const cronSchedule = "* * * * *"; 


cron.schedule(cronSchedule, () => {
  updateTrialStatus();
});