import * as remindersdata from '../data/remindersdata.js';


export async function getAllreminders(req, res, next) {
    const {userid} = req.params;
    // let Allreminderes=[]
    const reminders = await remindersdata.getAllreminders(userid);
    if (reminders) {

        for(let i =0; i<reminders.length; i++ ){
            let tags = await remindersdata.getAlltages(reminders[i].id);
            let subtask=await remindersdata.getAllsubtaskes(reminders[i].id);
            tags[0]["tag"]=tags[0]["tag"].split(",")
            reminders[i]["subtask"]=subtask
            reminders[i]["tags"]=tags
        }
        res.status(200).json(reminders);
      } else {
        res.status(404).json({ message: `reminders not Found` });
    }

}

export async function getOnereminders(req, res, next) {
    const {userid, reminderid} = req.params;
    const reminder = await remindersdata.getOnereminder(userid, reminderid)
    // console.log(req.params)
    if (reminder) {
        let tags = await remindersdata.getAlltages(reminder[0].id);
        let subtask=await remindersdata.getAllsubtaskes(reminder[0].id);
        // console.log(tags)
        tags[0]["tag"]=tags[0]["tag"].split(",")
        reminder[0]["subtask"]=subtask
        reminder[0]["tags"]=tags
        // console.log(reminder)
        res.status(200).json(reminder);
      } else {
        res.status(404).json({ message: `reminder not Found` });
    }
}

export async function Createreminders(req, res, next) {
    const {userid} = req.params;
    const {data} = req.body;
    const reminder = await remindersdata.createreminders(userid,data)
    return res.status(201).json(reminder);
}


export async function Updatereminders(req, res, next) {
    const {userid, reminderid} = req.params;
    
    const {data} = req.body;

    const auto_id = await remindersdata.getOnereminder(userid, reminderid)
    // console.log(auto_id)
 

    const reminder = await remindersdata.updatereminders(reminderid,userid,data,auto_id[0].id)
    if (reminder) {
        res.status(200).json(reminder);
      } else {
        res.status(404).json({ message: `reminder not Found` });
    }

    // res.status(404).json({ message: `reminder not Found` })
}


export async function Deletereminders(req, res, next) {
    const {userid, reminderid} = req.params;
    const check = await remindersdata.getOnereminder(userid,reminderid)
    if (check) {
        const reminder = await remindersdata.deletereminders(userid,reminderid)
        return res.status(200).json({ message: `reminder is deleted` });
      } else {
        res.status(404).json({ message: `reminder not Found` });
    }
}

export async function DeleteTime(req, res, next) {
    const { userid, reminderid } = req.params;
    const check = await remindersdata.getOnereminder(userid,reminderid)
    if(check) {
        const reminder = await remindersdata.deleteTime(userid,reminderid)
        return res.status(200).json({message: `reminder time is removed`});
    } else {
        res.status(404).json({ message: `reminder not Found `})
    }
}