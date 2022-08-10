const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')

const app  = {
    currentIndex: 0,    // current index officially definedBy
    songs: [
        {
            name: 'Bánh Mì Không',
            singer: 'Đạt G - Uyên DU',
            path:'./music/datg-x-duuyen-official-mv.mp3',
            image: './img/banh-mi-khong.jpg'
        },
        {
            name: 'Lối Nhỏ',
            singer: 'Đen Vâu',
            path:'./music/loi-nho-ft-phuong-anh-dao-m-v.mp3',
            image: './img/Loi-nho.jpg'
        },
    ],
    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
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

        $('.playlist').innerHTML = htmls.join(''); 
    }, 
    defineproperty: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    headleEvenl: function(){
        const cdWidth = cd.offsetWidth
        //sử lí phóng to thu nhỏ cd 
        document.onscroll   = function(events) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
         //sử lí khi click play 
        playBtn.onclick = function(){
            audio.play()
            player.classList.add('playing')
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
           
    },

    stast: function(){
        // định nghĩa các thuộc tình cho objects
        this.defineproperty()
        // Lắng nghe / xử lí các sự kiện trong (DOM events)
        this.headleEvenl();
        // tải thông tin bài hát đầu tiên vào UI 
        this.loadCurrentSong()
        //render playlist
        this.render();
    },
}

app.stast()   

