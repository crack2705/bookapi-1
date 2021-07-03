//See tasks with array format of intergers. for authors in book constant and id in authors constant in database.

//Frame work
const express = require("express");

//Database
const database =require("./database/index")

//Initializing express
const SMS = express();

//Configurations
SMS.use(express.json());

/*
Route       /
Description //To get all books
Access      //Public
Parameters  //NONE
Method      //GET
 */
SMS.get("/",(req,res)=>
{
    //hello changes
    return res.json({books: database.books});
}
);

/*/
Route       /is
Description //To get specific book based on ISBN
Access      //Public
Parameters  isbn
Method      //GET
 */

SMS.get("/is/:isbn",(req,res)=>
{
    const getSpecificBook = database.books.filter((book)=> book.ISBN ===req.params.isbn);

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found in the ISBN of ${req.params.isbn}`,
        });

    }
    return res.json({book: getSpecificBook});
});

/*
Route       /category
Description //To get specific books based on category 
Access      //Public
Parameters  category
Method      //GET
 */

SMS.get("/c/:category",(req,res)=>
{
    const getSpecificBooks = database.books.filter((book)=> book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0){
        return res.json({
            error: `No book found in the category of ${req.params.category}`,
        });

    }
    return res.json({book: getSpecificBooks});
});


/*
Route       /a
Description //To get specific books based on authors
Access      //Public
Parameters  //author
Method      //GET
 */

SMS.get("/a/:authors",(req,res)=>
{
    const getSpecificBooks = database.books.filter((book)=> book.authors.includes(req.params.authors));
    

    if(getSpecificBooks.length === 0){
        return res.json({
            error: `No book found of the author of ${req.params.authors}`,
        });

    }
    return res.json({book: getSpecificBooks});
});



//Authors
/*
Route       /a
Description //To get all authors
Access      //Public
Parameters  //NONE
Method      //GET
 */
SMS.get("/a",(req,res)=>
{
    //hello changes
    return res.json({authors: database.authors});
}
);

/*/
Route       /a
Description //To get specific author based on id
Access      //Public
Parameters  isbn
Method      //GET
 */

SMS.get("/a/a/:id",(req,res)=>
{
    const getSpecificBook = database.authors.filter((authors)=> authors.id ===req.params.id);

    if(getSpecificBook.length === 0){
        return res.json({
            error: `No book found of id of ${req.params.id}`,
        });

    }
    return res.json({authors: getSpecificBook});
});

/*
Route       /author
Description //To get a list of authors based on book's ISBN
Access      //PUBLIC
Parameters  //isbn
Method      //GET
 */
SMS.get("/a/:isbn",(req,res)=>
{
    const getSpecificAuthors= database.authors.filter((authors)=> authors.books.includes(req.params.isbn)
    );
    if(getSpecificAuthors.length===0){
    return res.json({
        error: `No author found for the book ${req.params.isbn}`,
    });
}

return res.json({authors: getSpecificAuthors});
});

/*
Route       /ps
Description //To get all publications
Access      //Public
Parameters  //NONE
Method      //GET
 */
SMS.get("/ps",(req,res)=>
{
    //hello changes
    return res.json({publications: database.publications});
}
);
SMS.listen(3000, ()=> console.log("Server running"));
