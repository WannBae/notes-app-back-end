const {nanoid}=require('nanoid');
const notes=require('./notes.js')
const getAllNotesHandler=()=>({
    status:'success',
    data:{
        notes,
    },
});
const getNoteByIdHandler=(request,h)=>{
    const {id}=request.params;
    const note=notes.filter((n)=>n.id===id)[0];
        if(note !== undefined){
            return{
                status:'success',
                data:{
                    note,
                },
            };
        }
    const response=h.response({
        status:'fail',
        message:'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};
const editNoteByHandler=(request,h)=>{
    const {id}=request.params;
    const {title,tags,body}=request.payload;
    const updatedAt=new Date().toISOString();
    
    const index=notes.findIndex((note)=>note.id===id);
    if(index!==-1){
        notes[index]={
            ...notes[index],title,tags,body,updatedAt,
        };
        const response=h.response({
            status:'success',
            message:'Catatan Berhasil Diperbarui',
        });
        response.code(200);
        return response;
    }
    const response=h.response({
        status:'fail',
        message:'Gagal memperbarui catatan. ID tidak ditemukan',
    });
    response.code(404);
    return response;
};

const addNoteHandler=(request,h)=>{
    const{title,tags,body}=request.payload;
//Client mengirim data catatan (title, tags, dan body) yang akan disimpan dalam bentuk JSON melalui body request.
    const id=nanoid(16);
    //yaitu berfungsi untuk memberikan id acak sebanyak 16 baris
    const createdAt=new Date().toISOString();
    const updatedAt=createdAt;
    const newNote={
        title,tags,body,id,createdAt,updatedAt,
    };
    notes.push(newNote);
    const isSuccsess=notes.filter((note)=>note.id===id).length>0;
    //Kemudian, kita gunakan isSuccess untuk menentukan respons yang diberikan server. Jika isSuccess bernilai true, maka beri respons berhasil. Jika false, maka beri respons gagal.
    if(isSuccsess){
        const response=h.response({
            status:'sucsess',
            message:'Catatan berhasil ditambahkan',
            data:{
                noteId:id,
            },
        });
        response.code(201);
        return response;
    }
    const response=h.response({
        status:'fail',
        message:'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const deleteNoteByidHandler=(request,h)=>{
    const {id}=request.params;

    const index=notes.findIndex((note)=>note.id===id);
    if(index!==-1){
        notes.splice(index,1);
        const response=h.response({
            status:'success',
            message:'Catatan berhasil dihapus',
        });

        response.code(200);
        return response;
    }
    const response=h.response({
        status:'fail',
        message:'Catatan gagal dihapus, id tidak ditemukan',
    });
    response.code(404);
    return response;
}


//properti createdAt dan updatedAt
//Karena kasus sekarang adalah menambahkan catatan baru, maka nilai kedua properti tersebut seharusnya sama. Jadi, kita bisa secara mudah memberikan nilai new Date().toISOString();.
module.exports={addNoteHandler, getAllNotesHandler, getNoteByIdHandler,editNoteByHandler,deleteNoteByidHandler};