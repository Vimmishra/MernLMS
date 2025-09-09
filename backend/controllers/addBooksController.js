import Book from "../models/Book.js";


export const addBooks = async (req,res)=>{

    try{

        const {title, author,isbn,category,totalCopies} = req.body;

        if(!title && !author){
            res.status(400).json({message:"title and author required!"})
        }
         if(!isbn && !category){
            res.status(400).json({message:"isbn and category required!"})
        }

        const existing = await Book.findOne({isbn});

        if(existing){
            res.status(401).json({message:"book already exists!"});
        }

       const addBook = new Book ({title, author,isbn,category,totalCopies});

       await addBook.save();

    }

    catch(err){
        console.log(err)
        res.status(500).json({ message: "internal server error"})
    }
}



export const getBooks = async (req,res)=>{

    try{



        const Books = await Book.find();

if(!Books){

    console.log("No books fetched !")
    res.status(401).json({
        message:"book not found!"
    })

}

        res.status(201).json({
            message:"all books fetched successfully!",
            data: Books
        })

    }

    catch(err){
        console.log(err);

        res.status(500).json({
            message:"internal server error"
        })
    }

}