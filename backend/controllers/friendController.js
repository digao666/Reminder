import * as frienddata from '../data/friendsdata.js';


export async function getallfriends(req, res, next) {
    
    const {userid} = req.params;

    const friends = await frienddata.getfriends(userid)
    if(friends){
        res.status(200).json(friends);
    } else{
        res.status(404).json({ message: `friends not Found` });
    }
    
}


export async function createfriend(req, res, next) {
    const {userid} = req.params;
    const {data} = req.body;
    const friend = await frienddata.addfriends(userid,data.friendid)
    return res.status(201).json(friend);

   
}