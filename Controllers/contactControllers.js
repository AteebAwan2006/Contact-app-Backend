const asyncHandler = require('express-async-handler')// what does this package do? 
const Contact = require('../Models/contactModel');
//@ts-checkdesc get all contacts
//@ro    ute Get /api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{ // why there is not try catch here?
    const contacts=await Contact.find({user_id:req.user.id});
    
    console.log("hello from contactController.js");
    res.status(200).json(contacts);
});
//@ts-checkdesc create  contacts
//@route POST /api/contacts
//@access private

const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is:",req.body)
    const {name,email,phone}=req.body;
    if(!name || !email || !phone)
    {
        return res.status(400).json({message:"All fields are mandatory!"});
    }
    const contacts = await Contact.create({
        name,email,phone,user_id:req.user.id
    });
    console.log("contact",contacts)
   return res.status(201).json(contacts);
});
//@ts-checkdesc get contacts
//@route GET /api/contacts/:id
//@access private

const getContact=asyncHandler(async(req,res)=>{
const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
 res.status(200).json(contact);
});

//@ts-checkdesc update contacts
//@route PUT /api/contacts
//@access private

const updateContact=asyncHandler(async(req,res)=>{

const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user do not have permission to update other user contacts")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true,}

    );
 res.status(200).json(updatedContact);
});
//@ts-checkdesc Delete contacts
//@route Delete /api/contacts
//@access private

const deleteContact=asyncHandler(async(req,res)=>{
    
const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user do not have permission to Delete other user contacts")
    } ;

    await Contact.findByIdAndDelete(req.params.id);

 res.status(200).json(contact);
});

module.exports={getContacts,createContact,getContact,updateContact,deleteContact};