const itemsModel = require('../model/item');

const getItems = (req, res) =>{
 itemsModel.find()
 .then(data =>{
     return res.json({ success: true, item: data, user: req.user})
 }).catch(err =>{
     return res.json({success: false, error: err})
 })
}

const getItemsByID = (req,res) =>{
    const {id} = req.params;
    itemsModel.findOne({_id:id})
    .then(data =>{
        return res.json({ success:true, item:data})
    }).catch(err =>{
        return res.json({ success: false, error:err})
    })
}

const newItem = (req, res) =>{
    const Item = new itemsModel();
    Item.itemname = req.body.itemname;
    Item.description = req.body.description;

    Item.save(err =>{
        return res.json({ success: true})
    })
}

const updateItem = (req,res) =>{
    const {id} = req.params;
    const { itemname, description } = req.body;
    itemsModel.findOneAndUpdate(id,{itemname, description})
    .then(data =>{
        return res.json({ success: true, item:data, user: req.user})
    }).catch(err =>{
        res.json({success:false, error:err})
    })
}

const deleteItem = (req, res) =>{
    const {id } = req.params;
    itemsModel.findOneAndDelete({_id:id})
    .then(data =>{
        return res.json({success:true})
    }).catch(err =>{
        return res.json({ success:false, error: err})
    });
};



module.exports = {
    getItems,
    getItemsByID,
    newItem,
    updateItem,
    deleteItem
}