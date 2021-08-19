//See tasks with array format of intergers. for authors in book constant and id in authors constant in database.

//Frame work
const { json } = require("express");
const express = require("express");

//Database
const database = require("./database/index")

//Initializing express
const SMS = express();

//Configurations
SMS.use(express.json());

/*
Route           /
Description     To get all books
Access          Public
Parameters      NONE
Method          GET
 */
SMS.get("/",(req,res)=>
{
 
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


//   "/is" is route 
//   "/:isbn" is paramenter
//Why /is and not directly /isbn because in authot=rs section we have to use the /a. So, they both are treated as one.
SMS.get("/is/:isbn",(req,res)=>
{
    const getSpecificBook = database.books.filter((book)=> book.ISBN ===req.params.isbn);

    if(getSpecificBook.length === 0){
        return res.json({
            //object must have key and a value 
            error: `No book found in the ISBN of ${req.params.isbn}`,
        });

    }
    return res.json({book: getSpecificBook});
});

/*
Route         /c
Description   To get specific books based on cat 
Access        Public
Parameters    category
Method        GET
 */

SMS.get("/c/:category",(req,res)=>
{
    //includes: it will work when when have array of strings/integer i.e. single enetities i.e. not like array of objects. It will indise category array and compare each value. If match s found it wi;ll return true.
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

// -----------------------------------------------------------------------------------------------------------------------------

//Authors
/*
Route       /a
Description //To get all authors
Access      //Public
Parameters  //NONE
Method      //GET
 */

//We had root as isbn thats why we have to use /is/:isbn
SMS.get("/a",(req,res)=>
{
 
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

// SMS.get("/a/a/:id",(req,res)=>
// {
//     const getSpecificBook = database.authors.filter((authors)=> authors.id ===req.params.id);

//     if(getSpecificBook.length === 0){
//         return res.json({
//             error: `No book found of id of ${req.params.id}`,
//         });

//     }
//     return res.json({authors: getSpecificBook});
// });

/*
Route       /a
Description //To get a list of authors based on book's ISBN
Access      //PUBLIC
Parameters  //isbn
Method      //GET
 */
SMS.get("/author/:isbn",(req,res)=>
{
    const getSpecificAuthors= database.authors.filter((author)=> author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthors.length===0){
    return res.json({
        error: `No author found for the book ${req.params.isbn}`,
    });
}

return res.json({authors: getSpecificAuthors});
});

//------------------------------------------------------------------------------------------------------------------------------
/*
Route       /ps
Description //To get all publications
Access      //Public
Parameters  //NONE
Method      //GET
 */
SMS.get("/publication",(req,res)=>
{
    //hello changes
    return res.json({publications: database.publications});
}
);











// -----------------------------------------------------------------------------------------------------------------------------
/*
Route       /book/new
Description add new books
Access      //Public
Parameters  //NONE
Method      //POST
 */
//Two ways to do this 
//1. Write all 8 properties of books objects like this:
//SMS.post("book/new/:ISBN/title/authors/language/pubDate/numOfPage/category",(req,res)=>
//Or 
//Note: When we run a url in browser it uses get method to fetch data. But right now we are using post. So, we need a tool known as postman.
SMS.post("/book/new",(req,res)=>
{
    //Till now we have used request parameter but now we will use request body
    //to access request body
    //Destructuring this: "const newBook= req.body.newBook" to given below;
    const {newBook}= req.body;
    //To append data to an array
    database.books.push(newBook);

    return res.json({books: database.books,message: "Book was added"});
}
);
// Postman code
// { 
//     "newBook": {
//         "ISBN": "12345ONE",
//         "title": "Getting started with HTML",
//         "authors": [
//             1
//         ],
//         "language": "en",
//         "pubDate": "2021-07-07",
//         "numOfPage": 225,
//         "category": [
//             "fiction",
//             "tech",
//             "programming",
//             "web dev"
//         ],
//         "publication": 1
//     }
// }

/*
Route       /author/new
Description add new author
Access      //Public
Parameters  //NONE
Method      //POST
 */
//SMS.post("book/new/:ISBN/title/authors/language/pubDate/numOfPage/category",(req,res)=>
SMS.post("/author/new",(req,res)=>
{
    //to access request body
    const {newAuthor}= req.body;

    database.authors.push(newAuthor);

    return res.json({auhtors: database.authors,message: "Author was added"});
}
);
// Postman code
// { 
//     "newAuthor": {
//         "id": "3",
//         "name": "John",
//         "books": []
//     }
// }

/*
Route       /book/update/
Description update title of a book
Access      //Public
Parameters  isbn
Method      //PUT
 */
SMS.put("/book/update/:isbn",(req,res)=>
{
    //forEach=>directly modifies the data in array
    //Map=>will get new array => replace the whole array
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
        book.title = req.body.bookTitle;
        return;
        }
    });
  return res.json({books: database.books});
});
// Postman code
// { 
//     "bookTitle":"Hello Mern"
// }


/*
Route       /book/author/update/:isbn
Description update title of a book
Access      //Public
Parameters  isbn
Method      //PUT
 */
SMS.put("/book/author/update/:isbn",(req,res)=>
{//When we add a new book we have to make sure that we update the author as well.

    //Update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
        return book.authors.push(req.body.newAuthor);
        }
    });

    //Upadte the author database
    database.authors.forEach((author)=>{
        if(author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });
  return res.json({
      books: database.books,
       authors: database.authors,
        message:"New author was added"});
});
//Postman code
// {
//     "newBook": {
//         "ISBN" : "12345NEW",
//         "title": "Getting started with MERN",
//         "authors": [1],
//         "language" : "en",
//         "pubDate": "2021-07-07",
//         "numOfPage": 225,
//         "category": ["fiction","tech","programming","web dev"],
//         "publication":1
// }
// }
// {
//     "newAuthor":{
//         "id":3,
//         "name":"John",
//         "books":[]
//     }
// }
// {
//     "newAuthor":3
    
// }

/*
Route       /publication/update/book
Description update/add a new book to publication
Access      //Public
Parameters  isbn
Method      //PUT
 */
SMS.put("/publication/update/book/:isbn",(req,res)=>
{
    //update the publication database
    database.publications.forEach((publication)=>{
        if(publication.id===req.body.pubID){
            return publication.books.push(req.params.isbn);
        }
    });
    database.books.forEach((book)=>
    {
        if(book.ISBN===req.params.isbn){
            book.publication = req.body.pubID;
            return;
        }
    });
    return res.json({books:database.books,
    publiactions:database.publications,
    message:"Successfully updated publication",
});
});

/*
Route       /book/delete
Description delete a book
Access      //Public
Parameters  isbn
Method      //DELETE
 */
SMS.delete("/book/delete/:isbn",(req,res)=>{
//If we use map, we have to replace the whole array object, whole  i.e. book object completely -> we will use this
//But if we use forEach, we can directly edit at single point and modify master database
const updatedBookDatabase = database.books.filter((book)=>book.ISBN !== req.params.isbn);
//Whether isbn is equal to isbn parameter given in the url. If not equal then put put it in updatedBookDatabase. If eqaul dont do anything.We just replaced the object with the parameter which did not match, so automatically other one got deleted.
database.books=updatedBookDatabase;
return res.json({books:database.books});

});

// *
// Route       /book/delete/author
// Description delete an author from a book 
// Access      //Public
// Parameters  isbn
// Method      //DELETE
//  */

SMS.delete("/book/delete/author/:isbn/:authorID",(req,res)=>
{ //Update book database
    database.books.forEach((book)=>
    {
        if(book.ISBN === req.params.isbn)
        {
            const newAuthorList=book.authors.filter((author)=> author !== parseInt(req.params.authorID));
            book.authors =newAuthorList;
            return;
        }
    
});
//Update the author database
database.authors.forEach((author)=>{
    if(author.id === parseInt(req.params.authorID)){
    const newBooksList = author.books.filter((book)=>book !== req.params.isbn);

        author.books=newBooksList;
        return;
    }
});
return res.json({
message:"author was deleted",    
book: database.books,
author:database.authors,

});
});



//Recheck the above query, its half done
// *
// Route       /publication/delete
// Description delete a publication
// Access      //Public
// Parameters  id
// Method      //DELETE
//  */
SMS.delete("/publication/delete/:id",(req,res)=>{
    //If we use map, we have to replace the whole array object, whole  i.e. book object completely -> we will use this
    //But if we use forEach, we can directly edit at single point and modify master database
    const updatedPublicationDatabase = database.publications.filter((publication)=>publication.id !== parseInt(req.params.id));
    //Whether isbn is equal to isbn parameter given in the url. If not equal then put put it in updatedBookDatabase. If eqaul dont do anything.We just replaced the object with the parameter which did not match, so automatically other one got deleted.
    database.publications=updatedPublicationDatabase;
    return res.json({
        publications:database.publications,
    message:"Successfully deleted publication",});
    
    });

  
/*
Route       /publication/delete/book
Description delete a book from publication
Access      //Public
Parameters  isbn,pub ID
Method      //DELETE
 */

SMS.delete("/publication/delete/book/:isbn/:pubID",(req,res)=>
{
    //Update publication databse
    database.publications.forEach((publication) => {
      
        if(publication.id === parseInt(req.params.pubID)){
            const newBooksList = publication.books.filter(
                (book)=>book!==req.params.isbn
            );
            publication.books= newBooksList;
            return;
        }
    });

    //Update book database
    database.books.forEach((book) => {
      
        if(book.isbn == parseInt(req.params.isbn)){
            book.publication=0;
            return;
        }
    });

    return res.json({
    book: database.books,
    publications:database.publications,
    message:"Successfully deleted a book from publication",});
});


SMS.listen(5500, ()=> console.log("Server running!!!!!"));


