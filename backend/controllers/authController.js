import * as authdata from '../../data/authdata.js';


export async function getemailandpass(req, res, next) {
    const {email} = req.body;
    const pass = await authdata.getemailandpass(email);
    if (pass){
        res.status(200).json(pass); 
    }else{
        res.status(404).json({ message: `password not Found` });
    }

}

export async function getOneuser(req, res, next) {
    const {id} = req.params;
    const user = await authdata.getOneuser(id);
    if (user){
        res.status(200).json(user); 
    }else{
        res.status(404).json({ message: `user not Found` });
    }

}

export async function postuser(req, res, next) {
    const{data} = req.body;
    const user = await authdata.createuser(data);

    return res.status(201).json(user);

}