//Array of objects
const books =[
    {
        ISBN : "12345ONE",
        title: "Getting started with MERN",
        authors: [1],
        language : "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","tech","programming","web dev"],
        publication:1
    },
    {
        ISBN : "12345",
        title: "Getting started with python",
        authors: [2],
        language : "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","tech","web dev"],
    },
]
const authors=[
    {
        id:"1",
        name: "Somya",
        books:["12345ONE"],

    },
    {
        id:"2",
        name: "Priyesh",
        books: ["12345ONE","12345"],
    },
];

const publications = [
    {
        id:"1",
        name:"Chakra",
        books:["12345ONE"],
    },
];

//To export the data in nodejs
module.exports= { books, authors, publications};

//Postman: http client tool
//CLient->help to manage API and sent http request and generate auto documentation