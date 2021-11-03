import { db } from '../../database/database.js';


export async function getAllreminders(user_id){
    return db
        .query(`Select * from reminder where frn_user_id=?`,[user_id])
        .then((result)=>{
            return result[0]
        })
    
}


export async function getAllsubtaskes(reminder_id){
    return db
        .query(`Select * from subtask where frn_reminder_id=?`,[reminder_id])
        .then((result)=>{
            return result[0]
        })
    
}

export async function getAlltages(reminder_id){
    return db
        .query(`Select * from tag where frn_reminder_id=?`,[reminder_id])
        .then((result)=>{
            return result[0]
        })
    
}

export async function getOnereminder(user_id,reminder_id){
    return db
    .query(
        `select * from reminder where reminder_id=? and frn_user_id=?`,
        [
            reminder_id,
            user_id,
        ]
    ).then((result)=>{
        return result[0]
    })
}

export async function createreminders(user_id,data){
    const {
           reminder_id,
           title,
           description,
           completed,
           reminderTime,
           subtasks,
           tags
        }=data;
    return db
    .execute(
        `insert into reminder(
            reminder_id,
            frn_user_id,
            title,
            description,
            completed,
            create_date,
            reminder_date
        ) Values (?,?,?,?,?,?,?,?)`
        ,
        [   
            reminder_id,
            user_id,
            title,
            description,
            completed,
            new Date().toLocaleDateString().replace('/','-').replace('/','-'),
            reminderTime,
        ]
    ).then((result) =>{
        createsubtask(result[0].insertId,subtasks);
        createtags(result[0].insertId,tags)
        getOnereminder(result[0].insertId,user_id);
    });

    
    
}

export async function createsubtask(reminder_id,data){
    return db
    .execute(
        `insert into subtask(
            subtask_id,
            frn_reminder_id,
            title,
            completed
        )values (?,?,?,?)
          `,
          [
            data.subtask_id,
            reminder_id,
            data.title,
            data.completed,
          ]
    )


    
}

export async function createtags(reminder_id,data){
    return db
    .execute(
        `insert into tag(
            tag_id,
            frn_reminder_id,
            tag
        )values (?,?,?)
          `,
          [
            data.tag_id,
            reminder_id,
            data.tag,
          ]
    )


    
}


export async function updatereminders(reminder_id,user_id,data){
    const {
        title,
        description,
        completed,
        reminderTime,
        subtasks,
        tags}=data;
    return db
    .execute(
        `update reminder
         Set
         title=?,
         description=?,
         completed=?,
         reminderTime=?
         where 
         reminder_id=? and frn_user_id=?`,
         [
            title,
            description,
            completed,
            reminderTime,
            reminder_id,
            user_id,
         ]
    ).then((result)=>{
        updatesubtask(result[0].updateID,subtasks);
        updatetags(result[0].updateID,tags);
        getOnereminder(result[0].updateID,user_id);
    })
    
}

export async function updatesubtask(reminder_id,data){
    return db
    .execute(
        `update subtask
         Set
         title=?,
         completed=?
         where
         subtask_id=? and frn_reminder_id=?
          `,
          [
            data.title,
            data.completed,
            data.subtask_id,
            reminder_id,
          ]
    )
 
}

export async function updatetags(reminder_id,data){
    return db
    .execute(
        `update tag
         Set
         tag=?
         where
         tag_id=? and frn_reminder_id=?
          `,
          [
            data.tag,
            data.tag_id,
            reminder_id,
          ]
    )
  
}


export async function deletereminders(user_id,reminder_id){
    return db
    .execute(
        `delete from reminder
         where reminder_id=? and frn_user_id=?`,
         [
             reminder_id,
             user_id,
         ]
    )

    
}