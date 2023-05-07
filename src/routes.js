const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler, deleteNoteByidHandler}=require('./handler');
const routes=[{
    method:'POST',
    path:'/notes',
    handler:addNoteHandler,
},
{
    method:'GET',
    path:'/notes',
    handler:getAllNotesHandler,
},
{
    method:'GET',
    path:'/notes/{id}',
    handler: getNoteByIdHandler,
},
{
    method:'PUT',
    path:'/notes/{id}',
    handler:editNoteByHandler,
},
{
    method:'DELETE',
    path:'/notes/{id}',
    handler:deleteNoteByidHandler,
}
];
// {
//     id:String,
//     title:String,
//     createdAt:String,
//     updateAt:String,
//     tags:array of String,
//     body:String,
// },
//Kriteria menyebutkan, properti id merupakan string dan harus unik, kita akan menggunakan bantuan library pihak ketiga untuk 
//menghasilkan nilainya. nanoid merupakan salah satu library yang populer untuk menangani ini. Jadi, silakan pasang library tersebut dengan perintah.
module.exports=routes;