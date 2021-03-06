import * as authdata from '../data/authdata.js';


export async function getemailandpass(req, res, next) {
    const {email} = req.params;
    const pass = await authdata.getemailandpass(email);
    if (pass){
        res.status(200).json(pass); 
    }else{
        res.status(404).json({ message: `password not Found` });
    }

}

export async function getOneuser(req, res, next) {
    const {id} = req.params;
    const user = await authdata.getUserById(id);
    if (user){
        res.status(200).json(user); 
    }else{
        res.status(404).json({ message: `user not Found` });
    }

}

export async function selectAlluser(req, res, next) {
    const userslist = await authdata.getAlluser();
    if (userslist){
        res.status(200).json(userslist); 
    }else{
        res.status(404).json({ message: `No user in database` });
    }

}
export async function postuser(req, res, next) {
    const user = await authdata.createuser(req.body.data); 
    return res.status(201).json(user);
}
