//Array of objects
let books =[
    {
        ISBN : "12345ONE",
        title: "Getting started with MERN",
        authors: [1,2],
        language : "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","tech","programming","web dev"],
        publication:1
    },
    {
        ISBN : "12345",
        title: "Getting started with python",
        authors: [1,2],
        language : "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","tech","web dev"],
        publication:1
    },
]
const authors=[
    {
        id:1,
        name: "Somya",
        books:["12345ONE","12345"],

    },
    {
        id:2,
        name: "Priyesh",
        books: ["12345ONE"],
    },
];

let publications = [
    {
        id:1,
        name:"Chakra",
        books:["12345ONE"],
    },
    {
        id:2,
        name:"Somya Webdev",
        books:[""]
    }
];

//To export the data in nodejs
module.exports= { books, authors, publications};

//Postman: http client tool
//CLient->help to manage API and sent http request and generate auto documentation