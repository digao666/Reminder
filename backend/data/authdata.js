import { db } from '../database/database.js';

export async function getemailandpass(email){
    return db
        .query(`Select * from user where email=?`,[email])
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

export async function getAlluser() {
    return db
    .query(`Select id from user`)
    .then((result)=>{
        return result
    })

}

export async function createuser(data){
    let datalist = [data.email,data.password,data.profilePic]
    return db
    .query(
    `insert into user(
     email,
     password,
     profilePic
    ) Values (?)`,
    [datalist]
    )
    .then((result)=>{
        getUserById(result[0].insertId);
    })

}
