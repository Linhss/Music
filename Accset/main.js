const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $('.playlist')

const app = {
    songs: [
        {
            name: 'Bánh Mì Không ',
            singer: ' Đạt G - Uyên DU ',
            path: './music/datg-x-duuyen-official-mv.mp3',
            image:'./Accset/img/Lời-bài-hát-bánh-mì-không.png'
        },
    ],

    render: function () {
        const html = this.songs.map(song => {
            return`
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image})">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

    //   console.log( playlist.innerHTML = html.join(''))
    },

    stast: function(){
        this.render();
    }
    
}

app.stast()