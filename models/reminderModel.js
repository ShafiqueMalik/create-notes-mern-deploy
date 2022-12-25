import mongoose from "mongoose";
const reminderSchema = mongoose.Schema({
    reminderMessage: {
        type: String,
        required: true,
    },
    remindAt: {
        type: String,
        required: true
    },
    isReminded: {
        type: Boolean,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }
},
    {
        timestamps: true
    }
);



const ReminderModel = mongoose.model("Reminder", reminderSchema);
export default ReminderModel;
