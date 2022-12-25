import HomeModel from "../models/userModel.js";
import asyncHanlder from "express-async-handler";
import NoteModel from "../models/noteModel.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);


export const getNotes = asyncHanlder(async (req, res) => {
    const notes = await NoteModel.find({ user: req.user._id });
    res.json(notes);
});
export const createNote = asyncHanlder(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    } else {
        const note = new NoteModel({ user: req.user._id, title, content, category });
        const createdNote = await note.save();

        //whatsapp messages
        // setInterval(async () => {
            const accountSid = process.env.ACCOUNT_SID;
            const authToken = process.env.WHATSAPP_AUTH_TOKEN;
            const client = require('twilio')(accountSid, authToken);
            const notes = await NoteModel.find({ user: req.user._id });
            console.log(notes)
            // client.messages
            //     .create({
            //         body: 'Demo message from nodejs from note clouds',
            //         from: 'whatsapp:+14155238886',
            //         to: 'whatsapp:+923111323500'
            //     })
            //     .then(message => console.log(message.sid))
            //     .done();
        // }, 5000);
        //end of whatsapp messages


        res.status(201).json(createdNote);
    }
});

export const getNoteById = asyncHanlder(async (req, res) => {
    const { id } = req.params;
    try {
        const note = await NoteModel.findById(id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ status: "error", message: "Note not found" })
        }
    } catch (error) {
        res.status(404).json({ status: "error", message: "Note not found" })
    }
});

export const updateNote = asyncHanlder(async (req, res) => {
    const { title, content, category } = req.body;
    const { id } = req.params;

    try {
        const note = await NoteModel.findById(id);
        if (note.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Only the auther can update this note");
        } else {
            if (note) {
                note.title = title;
                note.content = content;
                note.category = category;
                const udpatedNote = await note.save();
                res.json(udpatedNote);
            } else {
                res.status(404).json({ status: "error", message: "Note not found" })
            }
        }
    } catch (error) {
        res.status(404).json({ status: "error", message: error })
    }
});

export const deleteNote = asyncHanlder(async (req, res) => {
    const { id } = req.params;

    try {
        const note = await NoteModel.findById(id);
        if (note.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error("Only the auther can update this note");
        } else {
            if (note) {
                await note.remove();
                res.json({ status: "success", message: "Note removed successfully" });
            } else {
                res.status(404).json({ status: "error", message: "Note not found" })
            }
        }
    } catch (error) {
        res.status(404).json({ status: "error", message: error })
    }
});



