let movie_name;

$(document).ready(()=>{
    
         

         
         movie_name = prompt("Enter the name of the movie");

         getAllData();
    
});

let getAllData = () =>{
    $.ajax({
        type:'GET',
        dataType:'json',
        async:'true',
        url:'http://www.omdbapi.com/?t='+ movie_name+ '&apikey=b650211a',

        success: (response) => {
            console.log(response);
        },

        error: (err)=>{
            console.log(err.responseJSON.error.message);
        },



    });
}