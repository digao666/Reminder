import { db } from '../database/database.js';




export async function getfriends(user_id){
    return db
    .query(`Select * from friend where frn_user_friend_id=?`,[user_id])
    .then((result)=>{
        return result[0]
    })
 
}

export async function addfriends(user_id,friend_id){
    return db
    .query(
    `insert into friend(
    frn_user_friend_id,
    frn_friend_user_id
    ) Values (?,?)`,[
        user_id,
        friend_id
    ])
    .then((result)=>{
        return getfriends(user_id);
    })
    
}

