const cron = require('node-cron');
const Task = require('./models/task');
const User = require('./models/user');
const twilio = require('twilio');

const twilioClient = twilio(`${process.env.ACCOUNT_SID}`, `${process.env.AUTH_TOKEN}`);

cron.schedule('0 * * * *', async () => {
    try {
        
        const overdueTasks = await Task.find({ due_date: { $lt: new Date() }, status: { $ne: 'DONE' } }).exec();

      
        const users = await User.find({}).sort({ priority: 1 }).exec();

        
        for (const user of users) {
            
            for (const task of overdueTasks) {
                
                if (task.user_id.toString() === user._id.toString()) {
                    try {
                        
                        const call = await twilioClient.calls.create({
                            to: user.phone_number,
                            from: process.env.TWILE_NUMBER,
                            url: 'http://demo.twilio.com/docs/voice.xml', 
                        });
                        console.log(`Call initiated to ${user.phone_number}. Call SID: ${call.sid}`);
                        break; 
                    } catch (error) {
                        console.error(`Error calling ${user.phone_number}:`, error);
                       
                        continue;
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in voice calling cron job:', error);
    }
});
