const cron = require('node-cron');
const Task = require('./models/task');


cron.schedule('0 0 * * *', async () => {
    try {
        
        const tasks = await Task.find({}).exec();

        
        tasks.forEach(async (task) => {
            const currentDate = new Date();
            const dueDate = new Date(task.due_date);

            
            const differenceInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

            
            if (differenceInDays === 0) {
                task.priority = 0;
            } else if (differenceInDays > 0 && differenceInDays <= 2) {
                task.priority = 1;
            } else if (differenceInDays >= 3 && differenceInDays <= 4) {
                task.priority = 2;
            } else {
                task.priority = 3;
            }

        
            await task.save();
        });

        console.log('Task priorities updated successfully.');
    } catch (error) {
        console.error('Error updating task priorities:', error);
    }
});
