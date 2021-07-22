$('#search-button').on('click', function(){
    $.ajax({
        url:`http://www.omdbapi.com/?apikey=c9d24a80&s=${$('#search-input').val()}`,
        success: result => {
            const movies = result.Search
            let card = ""
            movies.map(m =>{
                card += showCard(m) 
            })
    
            /** 
             * jquery tolong carikan saya element yang memiliki class movie-container dan
             * masukan element card ke dalam class movie-container
             * */ 
            $('.movie-container').html(card)
    
            // ketika tombol detail diklick
            /** 
             * jquery tolong carikan saya element yang memiliki class modal-detail-button dan
             * ketika tombolnya di click jalankan funtion berikut.
             * */ 
            $('.detail-button').on('click', function(){
                const imdbID = $(this).data('imdbid') 
                $.ajax({
                     url:`http://www.omdbapi.com/?i=${imdbID}&apikey=c9d24a80`,
                     success: m => {
                         let modal = showModal(m)
                        $('.modal-body').html(modal) 
                     },
                     error: e => {
                         console.log(e)
                     }
                 })
            })
        },
        error: e =>{
            console.log(e)
        }
    })
})



function showCard (m) {
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="" class="btn btn-primary detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
                    </div>
                </div>
            </div>`
}

function showModal(m) {
    return `    <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${m.Poster}" alt="" class="img-fluid">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item">Judul Film : ${m.Title}</li>
                                <li class="list-group-item">Tahun : ${m.Year}</li>
                                <li class="list-group-item">Director : ${m.Director}</li>
                                <li class="list-group-item">Actors : ${m.Actors}</li>
                                <li class="list-group-item">Country: ${m.Country}</li>
                            </ul>
                        </div>
                    </div>
                </div>`
}
