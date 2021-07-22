const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', function(){
    const searchInput = document.querySelector('#search-input')
    fetch(`http://www.omdbapi.com/?apikey=c9d24a80&s=${searchInput.value}`)
        .then(res => res.json())
        .then(res => {
            const movies = res.Search
            let cards = ""
            movies.map( m =>{
                cards += showCard(m)
            })
            const movieContainer = document.querySelector('.movie-container')
            movieContainer.innerHTML = cards

            // ketika tombol detail di klick
            const detailButton = document.querySelectorAll('.detail-button')
            detailButton.forEach( btn =>{
                // console.log(btn)
                btn.addEventListener('click', function(){
                    const imdbid = this.dataset.imdbid
                    fetch(`http://www.omdbapi.com/?apikey=c9d24a80&i=${imdbid}`)
                        .then(res => res.json())
                        .then(res => {
                            const modalBody = document.querySelector('.modal-body')
                            modalBody.innerHTML = showModal(res)
                        })
                })
            })
        })
    // console.log(searchInput.value)
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

