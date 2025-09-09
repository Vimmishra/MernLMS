

import User from "../models/User.js";



export const createUser = async (req, res) => {
  try {
    const { name, email, studentLiberaryId,contact } = req.body;

    // ✅ check required fields
    if (!email || !name || !studentLiberaryId || !contact) {
      return res.status(400).json({ message: "Did not receive details" });
    }

    // ✅ check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { studentLiberaryId }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Student already registered" });
    }

  
   
    const newUser = new User({
      email,
      name,
      studentLiberaryId,
      contact,
     
    });

    await newUser.save();

    return res
      .status(201)
      .json({ LiberaryStudents: newUser, message: "Student created successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error!" });
  }
};



export const getAllUsers = async(req,res)=>{

try{

  const allUsers = await User.find({role:"user"})
  if(!allUsers){
    console.log("could not fetch all users!");
    res.status(401).json({
      message:"could not fetch users"
    })
  }

  res.status(201).json({
    message:"users fetched succeefully!",
    data: allUsers,
  })

}
catch(err){
  console.log(err)
  res.status(500).json({
    message:"some error occured while fetching users"
  })
}
}



export const removeUser = async (req, res)=>{

try{

  const {id} = req.params;

   if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid or missing user id" });
    }

  const response = await User.findByIdAndDelete(id);



  if(!response){
    return res.status(401).json({
      message: "error while deleting user!"
    })
  }

  return res.status(201).json({
    message:"User removed successfully!"
  })

}
catch(err){
  console.log(err);
  return res.status(500).json({message:"internal server error while deleting user!"})
}
}