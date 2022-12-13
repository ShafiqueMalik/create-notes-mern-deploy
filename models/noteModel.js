import mongoose from "mongoose";
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
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



const NoteModel = mongoose.model("Note", noteSchema);
export default NoteModel;
