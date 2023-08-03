const { Op } = require("sequelize");
const cron = require("node-cron");
const {TrialReceipt} = require("./models/"); 


async function updateTrialStatus() {
  try {
  
    const currentTime = new Date();


    const trialReceiptsToUpdate = await TrialReceipt.findAll({
      where: {
        dateOfTrial: {
          [Op.lte]: currentTime,
        },
      },
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