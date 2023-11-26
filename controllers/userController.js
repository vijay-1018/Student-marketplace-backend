const User = require('../models/user.js');

const userController = {};

userController.getAllItems = async (req, res) => 
{
    if(req.query.type=="lost")
    {
        const users = await User.find({type:"lost",acceptedTo: { $eq: "" }}).sort({ date: -1 });
        res.json(users);
    }
    else if(req.query.type=="found")
    {
        const users = await User.find({type:"found",acceptedTo: { $eq: "" }}).sort({ date: -1 });
        res.json(users);
    }
    else
    {
        const users = await User.find({type:"sell",acceptedTo: { $eq: "" }}).sort({ date: -1 });
        res.json(users);
    }
    
  
};

userController.createItem = async (req, res) => {
  try
  {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  }
  catch(error)
  {
    console.log(error);
  }
};

userController.addToWish=async (req, res) => {
    try
    {
        const id=req.body.id;
        const email=req.body.email;
        const flag=req.body.flag;
        console.log(req.body)
        if(flag=="no")
        {
            const resp=await User.findOneAndUpdate(
                { _id: id },
                { $addToSet: { wishlist: email } },
                { new: true }
            )
            console.log(resp);
            res.json(resp);
        }
        else
        {
            const resp=await User.findOneAndUpdate(
                { _id: id },
                { $pull: { wishlist: { $in: email } } },
                { new: true }
            )
            console.log(resp);
            res.json(resp);
        }
    }
    catch(error)
    {
        res.json("");
        console.log(error);
    }
}

userController.getSellType=async (req,res) => {
    try
    {
        const search=req.query.search;
        const sort=req.query.sort;
        const category=req.query.category;
        console.log("search: "+search+" sort: "+sort+" category: "+category);
        if(search=='')
        {
            if( sort=='latest' && category=='all')
            {
                const users = await User.find({type:"sell",acceptedTo: { $eq: "" } }).sort({ date: -1 });
                console.log(" 1");
                res.json(users);
            }
            else if(sort=='latest' && category!='all')
            {
                const users = await User.find({type:"sell",category:category,acceptedTo: { $eq: "" } }).sort({ date: -1 });
                console.log(" 2 ");
                res.json(users);
            }
            else if(sort=='pHtL' && category=='all')
            {
                const users = await User.find({type:"sell",acceptedTo: { $eq: "" } }).sort({ sPrice: -1 });
                console.log("3 ");
                res.json(users);
            }
            else if(sort=='pHtL' && category!='all')
            {
                const users = await User.find({type:"sell",category:category,acceptedTo: { $eq: "" } }).sort({ sPrice: -1 });
                console.log("4 ");
                res.json(users);
            }
            else if(sort=='pLtH' && category=='all')
            {
                const users = await User.find({type:"sell",acceptedTo: { $eq: "" } }).sort({ sPrice: 1 });
                console.log(" 5 ");
                res.json(users);
            }
            else
            {
                const users = await User.find({type:"sell",category:category,acceptedTo: { $eq: "" } }).sort({ sPrice: 1 });
                console.log(" 6 ");
                res.json(users);
            }
        }
        else
        {
            const searchTerms = search.trim().split(/\s+/);
            const searchTerm = new RegExp(searchTerms.join("|"), "i");
            if( sort=='latest' && category=='all')
            {
                const users = await User.find({ product: { $regex: searchTerm } ,type:"sell",acceptedTo: { $eq: "" } }).sort({ date: -1 });
                console.log(" s1");
                res.json(users);
            }
            else if(sort=='latest' && category!='all')
            {
                const users = await User.find({ product: { $regex: searchTerm }, type:"sell",category:category,acceptedTo: { $eq: "" } }).sort({ date: -1 });
                console.log(" s2 ");
                res.json(users);
            }
            else if(sort=='pHtL' && category=='all')
            {
                const users = await User.find({product: { $regex: searchTerm },type:"sell",acceptedTo: { $eq: "" } }).sort({ sPrice: -1 });
                console.log("s3 ");
                res.json(users);
            }
            else if(sort=='pHtL' && category!='all')
            {
                const users = await User.find({product: { $regex: searchTerm },type:"sell",category:category,acceptedTo: { $eq: "" } }).sort({ sPrice: -1 });
                console.log("s4 ");
                res.json(users);
            }
            else if(sort=='pLtH' && category=='all')
            {
                const users = await User.find({product: { $regex: searchTerm },type:"sell",acceptedTo: { $eq: "" } }).sort({ sPrice: 1 });
                console.log(" s5 ");
                res.json(users);
            }
            else
            {
                const users = await User.find({product: { $regex: searchTerm },type:"sell",category:category,acceptedTo: { $eq: "" } }).sort({ sPrice: 1 });
                console.log(" s6 ");
                res.json(users);
            }
        }
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.getLostType=async (req,res) => {
    try
    {
        const search=req.query.search;
        const sort=req.query.sort;
        const category=req.query.category;
        console.log("search: "+search+" sort: "+sort+" category: "+category);
        if(search=='')
        {
            if( sort=='latest' && category=='all')
            {
                const users = await User.find({type:"lost",acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" 1");
                res.json(users);
            }
            else if(sort=='latest' && category!='all')
            {
                const users = await User.find({type:"lost",category:category,acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" 2 ");
                res.json(users);
            }
        }
        else
        {
            const searchTerms = search.trim().split(/\s+/);
            const searchTerm = new RegExp(searchTerms.join("|"), "i");
            if( sort=='latest' && category=='all')
            {
                const users = await User.find({ product: { $regex: searchTerm } ,type:"lost",acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" s1");
                res.json(users);
            }
            else if(sort=='latest' && category!='all')
            {
                const users = await User.find({ product: { $regex: searchTerm }, type:"lost",category:category,acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" s2 ");
                res.json(users);
            }
        }
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.getFoundType=async (req,res) => {
    try{
        const search=req.query.search;
        const sort=req.query.sort;
        const category=req.query.category;
        console.log("search: "+search+" sort: "+sort+" category: "+category);
        if(search=='')
        {
            if( sort=='latest' && category=='all')
            {
                const users = await User.find({type:"found",acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" 1");
                res.json(users);
            }
            else if(sort=='latest' && category!='all')
            {
                const users = await User.find({type:"found",category:category,acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" 2 ");
                res.json(users);
            }
        }
        else
        {
            const searchTerms = search.trim().split(/\s+/);
            const searchTerm = new RegExp(searchTerms.join("|"), "i");
            if( sort=='latest' && category=='all')
            {
                const users = await User.find({ product: { $regex: searchTerm } ,type:"found",acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" s1");
                res.json(users);
            }
            else if(sort=='latest' && category!='all')
            {
                const users = await User.find({ product: { $regex: searchTerm }, type:"found",category:category,acceptedTo: { $eq: "" }}).sort({ date: -1 });
                console.log(" s2 ");
                res.json(users);
            }
        }
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.buyThis=async (req,res) =>{  
    const id=req.body.id;
    const email=req.body.email;
    console.log(req.body);
    try
    {
        const user = await User.findOne({ _id: id, customers: { $in: [email] } });

        if (user) 
        {
            // Email already present in the customers array
            console.log("Email already exists");
            const data={"key":"empty"}
            // Handle the response accordingly
            res.json(data);
        } 
        else
        {
            const resp=await User.findOneAndUpdate(
                { _id: id },
                { $addToSet: { customers: email } },
                { new: true }
            )
            console.log(resp);
            res.json(resp);
        }
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.getWishList=async (req, res) =>{
    const email=req.body.email;
    const query=req.query.type;
    console.log(req.body);
    try{
        if(query=="lost")
        {
            const resp = await User.find({ wishlist: { $in: [email] },type:"lost" ,acceptedTo: { $eq: "" }}).sort({ date: -1 });
            console.log(resp);
            res.json(resp);
        }
        else if(query=="found")
        {
            const resp = await User.find({ wishlist: { $in: [email] },type:"found",acceptedTo: { $eq: "" }}).sort({ date: -1 });
            console.log(resp);
            res.json(resp);
        }
        else if(query=="sell")
        {
            const resp = await User.find({ wishlist: { $in: [email] },type:"sell" ,acceptedTo: { $eq: "" }}).sort({ date: -1 });
            console.log(resp);
            res.json(resp);
        }
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.yourUploads=async (req, res) =>{
    const email=req.body.email;
    console.log(req.body);
    try{
        const resp = await User.find({ email:email }).sort({ date: -1 });
        console.log(resp);
        res.json(resp);
        
    }
    catch(error)
    {
        console.log(error);
    }
}

userController.deleteThis=async (req, res) =>{
    const id=req.body.id;
    console.log(req.body);
    try{
        const resp = await User.findOneAndDelete({ _id:id });
        console.log(resp);
        res.json(resp);
        
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.accept=async(req,res)=>{
    const id=req.body.id;
    const accept=req.body.accept
    console.log(id+" "+accept);
    console.log(typeof(id)+" "+typeof(accept));
    try{
        const resp=await User.findOneAndUpdate(
            { _id: id },
            { acceptedTo: accept },
            { new: true }
        )
        console.log(resp);
        res.json(resp);
    }
    catch(error)
    {
        console.log(error);
    }
}

userController.yourOrders =async(req,res)=>{
    const email=req.body.email;
    console.log(req.body);
    try{
        const resp = await User.find({ customers: { $in: [email] }}).sort({ date: -1 });
        console.log(resp);
        res.json(resp);
        
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

userController.cancelOrder=async(req,res)=>{
    const id=req.body.id;
    const email=req.body.email;
    try
    {
        const resp=await User.findOneAndUpdate(
            { _id: id },
            { $pull: { customers: { $in: email } } },
            { new: true }
        )
        console.log(resp);
        res.json(resp);
    }
    catch(error)
    {
        console.log(error);
        res.json("");
    }
}

module.exports = userController;
