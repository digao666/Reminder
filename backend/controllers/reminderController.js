import * as remindersdata from '../../data/remindersdata.js';


export async function getAllreminders(req, res, next) {
    const {userid} = req.params;

    const reminders = await remindersdata.getAllreminders(userid);
    if (reminders) {
        res.status(200).json(reminders);
      } else {
        res.status(404).json({ message: `reminders not Found` });
    }

}

export async function getOnereminders(req, res, next) {
    const {userid, reminderid} = req.params;

    const reminder = await remindersdata.getOnereminder(userid,reminderid)
    if (reminder) {
        res.status(200).json(reminder);
      } else {
        res.status(404).json({ message: `reminder not Found` });
    }
}

export async function Createreminders(req, res, next) {
    const {userid} = req.params;
    const {data} = req.body;

    const reminder = await remindersdata.Createreminders(userid,data)
    return res.status(201).json(reminder);
}


export async function Updatereminders(req, res, next) {
    const {userid, reminderid} = req.params;
    const {data} = req.body;

    const reminder = await remindersdata.Updatereminders(reminderid,userid,data)
    if (reminder) {
        res.status(200).json(reminder);
      } else {
        res.status(404).json({ message: `reminder not Found` });
    }
}


export async function Deletereminders(req, res, next) {
    const {userid, reminderid} = req.params;
    const check = await remindersdata.getOnereminder(userid,reminderid)
    if (check) {
        const reminder = await remindersdata.Deletereminders(userid,reminderid)
        return res.status(200).json({ message: `reminder is deleted` });
      } else {
        res.status(404).json({ message: `reminder not Found` });
    }
    
}