import { db } from '../database/database.js';


export async function getAllreminders(user_id){
    return db
        .query(`Select * from reminder where frn_user_reminder_id=?`,[user_id])
        .then((result)=>{
            return result[0]
        })
}


export async function getAllsubtaskes(reminder_id){
    return db
        .query(`Select * from subtask where frn_reminder_subtask_id=?`,[reminder_id])
        .then((result)=>{
            return result[0]
        })
}

export async function getonesubtaskes(reminder_id,id){
    return db
        .query(`Select * from subtask where frn_reminder_subtask_id=? and subtask_id=?`,[reminder_id,id])
        .then((result)=>{
            return result[0]
        })
}


export async function getAlltages(reminder_id){
    // console.log(reminder_id)
    return db
        .query(`Select * from tag where frn_reminder_tag_id=?`,[reminder_id])
        .then((result)=>{
            return result[0]
        })
}

export async function getOnereminder(user_id,reminder_id){
    return db
    .query(
        `select * from reminder where reminder_id=? and frn_user_reminder_id=?`,
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
           reminder_date,
           subtask,
           tags
        }=data;

    // console.log(data)
    return db
    .execute(
        `insert into reminder(
            reminder_id,
            frn_user_reminder_id,
            title,
            description,
            completed,
            create_date,
            reminder_date
        ) Values (?,?,?,?,?,?,?)`
        ,
        [   
            reminder_id,
            user_id,
            title,
            description,
            completed,
            new Date().toLocaleDateString('en-CA').replace('/','-').replace('/','-'),
            reminder_date,
        ]
    ).then((result) =>{
        for(let i =0; i<subtask.length; i++ ){
            createsubtask(result[0].insertId,subtask[i]);
        }
        let saver=tags.join(",")
        createtags(result[0].insertId,saver);
        return getOnereminder(user_id,reminder_id);
    });
}

export async function createsubtask(reminder_id,data){
    // console.log(data.id)
    return db
    .execute(
        `insert into subtask(
            subtask_id,
            frn_reminder_subtask_id,
            title,
            completed
        )values (?,?,?,?)
          `,
          [
            data.id,
            reminder_id,
            data.title,
            data.completed,
          ]
    )
}

export async function createtags(reminder_id,data){
    // console.log(data)
    return db
    .execute(
        `insert into tag(
            frn_reminder_tag_id,
            tag
        )values (?,?)
          `,
          [
            reminder_id,
            data,
          ]
    )
}

export async function updatereminders(reminder_id,user_id,data,auto_id){
    const {
        title,
        description,
        completed,
        reminder_date,
        subtask,
        tags}=data;
        // console.log(data)
    return db
    .execute(
        `update reminder
         Set
         title=?,
         description=?,
         completed=?,
         reminder_date=?
         where 
         reminder_id=? and frn_user_reminder_id=?`,
         [
            title,
            description,
            completed,
            reminder_date,
            reminder_id,
            user_id,
         ]
    ).then(async ()=>{
        for(let i = 0; i < subtask.length; i++ ){
            // console.log(subtask[i])
            let test = await  getonesubtaskes(auto_id,subtask[i].id)
            
            if(test[0]){
                
                updatesubtask(auto_id,subtask[i]);
            }else{
                
                createsubtask(auto_id,subtask[i])
            }

        }

        let saver=tags.join(",")
        // console.log(saver)
        updatetags(auto_id,saver);
        return getOnereminder(user_id,reminder_id);
    })
}

export async function updatesubtask(reminder_id,data){
    // console.log(reminder_id)
    return db
    .execute(
        `update subtask
         Set
         title=?,
         completed=?
         where
         subtask_id=? and frn_reminder_subtask_id=?
          `,
          [
            data.title,
            data.completed,
            data.id,
            reminder_id,
          ]
    )
}

export async function updatetags(reminder_id,data){
    console.log(reminder_id)
    console.log(data)
    return db
    .execute(
        `update tag
         Set
         tag=?
         where
         frn_reminder_tag_id=?
          `,
          [
            data,
            reminder_id,
            
          ]
    )
}

export async function deletereminders(user_id,reminder_id){
    return db
    .execute(
        `delete from reminder
         where reminder_id=? and frn_user_reminder_id=?`,
         [
             reminder_id,
             user_id,
         ]
    ) 
}



// export async function deleteTime(user_id, reminder_id){
//     return db
//     .execute(
//         `
//         update reminder
//         set reminder_date = ""
//         where user_id = ? and reminder_id = ?
//         `,
//         [
//             user_id,
//             reminder_id
//         ]
//     )
// }
