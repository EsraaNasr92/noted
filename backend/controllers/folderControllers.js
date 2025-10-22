import Folder from "../models/Folder.js";

export const getFolder = async(req, res) => {
    try{
        const folders = await Folder.find();
        res.status(200).json(folders);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};