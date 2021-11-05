import { db } from '../database/database.js';



export async function getUserByEmailIdAndPassword(email){
    return db
        .query(`Select password from user where email=?`,[email])
        .then((result)=>{
            return result[0]
        })
}


export async function getUserById(id){
    return db
    .query(`Select * from user where id=?`,[id])
    .then((result)=>{
        return result[0]
    })

}

export async function createuser(data){
    const {email,password,profilePic} = data
    return db
    .query(
    `insert into user(
     email,
     password,
     profilePic
    ) Values (?,?,?)`,[
        email,
        password,
        profilePic
    ])
    .then((result)=>{
        getUserById(result[0].insertId);
    })

}