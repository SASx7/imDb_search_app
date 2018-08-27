let movie_name;
let movie_date;
let movie_ID;
let ajax_url;



$(document).ready(()=>{
    
    $('.switch-search').click(function(){
        
        $('div#searchByName').css('display','none');
        $('div#searchByID').css('display','flex');
        $('#switchtoID').css('display','none');
        $('#switch-search-Name').css('display','flex');
        });

        $('#switch-search-Name').click(function(){
            console.log("click2");
            $('div#searchByID').css('display','none');
            $('div#searchByName').css('display','flex');
            $('#switchtoID').css('display','flex');
            $('#switch-search-Name').css('display','none');
        });
        

       
    $('.start-search').click(function(){
        
        movie_name = $('#search-name').val();
        movie_date = $('#search-year').val();
        movie_ID = $('#search-ID').val();



        if(movie_ID == ""){
            ajax_url = 'http://www.omdbapi.com/?t='+ movie_name+ '&y='+ movie_date+'&apikey=b650211a';
        }
        else{
            ajax_url = 'http://www.omdbapi.com/?i='+ movie_ID+ '&apikey=b650211a';
        }
             
        getAllData();
        
    });

    $('#search-again').click(function(){
        location.reload(true);
    })

         
    
});

let getAllData = () =>{
    $.ajax({
        type:'GET',
        dataType:'json',
        async:'true',
        url: ajax_url,

        success: (response) => {
            console.log(response);

            if(response.Response == "True")
            
            {

            
                
                if (response.Ratings.length != 0){
                    console.log("This is true")
                     IMDB_rating = response.Ratings[0].Value;
                }
                else{
                     IMDB_rating = "unrated";
                }
                let poster = response.Poster;
                if(poster==""){
    
                    poster = "img/default.png";
                }
                
            

            let card = `<div class="results">
                            <div class="card mb-3">
                                <img class="card-img-top" src= ${poster} alt="Card image cap">
                            <div class="card-body">
                                <p class="card-text"></p>
                            </div>
                            </div>
                        </div>

                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                        More Info
                        </button>`

            let tempRow = ` <div class="card-title">
                                     <div class="col"><h5> ${response.Title}</h5></div>
                                </div>`


            let plot = ` <div class="row">
                                    <div class="col-sm-4"><p>Plot: </p></div>
                                    <div class="col-sm-8"><p>${response.Plot}</p></div>
                         </div>
                         <div class="row">
                                    <div class="col-sm-4"><p>Country: </p></div>
                                    <div class="col-sm-8"><p>${response.Country}</p></div>
                         </div>
                         <div class= "row">
                                <div class="col-sm-4"><p>Language: </p></div>
                                <div class="col-sm-8"><p>${response.Language}</p></div>
                            </div>
                         <div class="row">
                                    <div class="col-sm-4"><p>Year: </p></div>
                                    <div class="col-sm-8"><p>${response.Released}</p></div>
                         </div>
                         <div class="row">
                                    <div class="col-sm-4"><p>Director: </p></div>
                                    <div class="col-sm-8"><p>${response.Director}</p></div>
                         </div>
                         <div class= "row">
                                <div class="col-sm-4"><p>Rated: </p></div>
                                <div class="col-sm-8"><p>${response.Rated}</p></div>
                            </div>
                         <div class="row">
                                    <div class="col-sm-4"><p>IMD rating: </p></div>
                                    <div class="col-sm-8"><p>${IMDB_rating}</p></div>
                         </div>
                         ` 

            let moreInfo = `<div class= "row">
                                <div class="col-sm-4"><p>Cast: </p></div>
                                <div class="col-sm-8"><p>${response.Actors}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>Writer: </p></div>
                                <div class="col-sm-8"><p>${response.Writer}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>Runtime: </p></div>
                                <div class="col-sm-8"><p>${response.Runtime}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>Genre: </p></div>
                                <div class="col-sm-8"><p>${response.Genre}</p></div>
                            </div>
                            
                            <div class= "row">
                                <div class="col-sm-4"><p>Meta-Score: </p></div>
                                <div class="col-sm-8"><p>${response.Metascore}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>DVD Release Date: </p></div>
                                <div class="col-sm-8"><p>${response.DVD}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>Production: </p></div>
                                <div class="col-sm-8"><p>${response.Production}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>Awards: </p></div>
                                <div class="col-sm-8"><p>${response.Awards}</p></div>
                            </div>
                            <div class= "row">
                                <div class="col-sm-4"><p>Box-Office: </p></div>
                                <div class="col-sm-8"><p>${response.BoxOffice}</p></div>
                            </div>
                            <div class= "row web">
                                <div class="col-sm-4"><p>Website: </p></div>
                                <div class="col-sm-8"><p>${response.Website}</p></div>
                            </div>

            
            `
            
            
            $(card).insertAfter('.placeholder')
            $(tempRow).insertBefore('.card-body');
            $(plot).insertAfter('.card-text')
           
            $(moreInfo).insertAfter('.moreInfo')
           
          
            $(".start-search").attr("disabled", true)
            $("#search-again").css('display','block')

        }

        else{
            alert("Could not find movie, try again");
        }
           

           
  
        },

        error: (err)=>{
            alert(err.responseJSON.error.message);
        },

        

    });

   

    
    

}

