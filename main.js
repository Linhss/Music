const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const cdThumb = $('.cd-thumb');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
            name: 'Bánh Mì Không ',
            singer: ' Đạt G - Uyên DU ',
            path: './music/banh-mi-khong.mp3',
            image:'./img/bmk.png'
        },
        {
            name: 'Lối Nhỏ ',
            singer: ' Đen vâu',
            path: './music/loi-nho-ft-phuong-anh-dao-m-v.mp3',
            image:'./img/ln.png'
        },
        {
            name: 'Ánh Nắng Của Anh ',
            singer: 'Đức Phúc',
            path: './music/anh-nang-cua-anh.mp3',
            image:'./img/anca.png'
        },
        {
            name: 'Duyên Mình Lỡ',
            singer: 'Hương Tràm',
            path: './music/duyen-minh-lo.mp3',
            image:'./img/duyen_minh_lo.png'
        },
        {
            name: 'Làm Người Yêu Anh Nhé BaBy',
            singer: 'Ba Chú Bộ Đội',
            path: './music/lam-nguoi-yeu-anh-nhe.mp3',
            image:'./img/lnyanbb.png'
        },
        {
            name: 'Mượn Rượi Tỏ Tình Cover',
            singer: 'Thanh Nhi',
            path: './music/muon-ruou-to-tinh.mp3',
            image:'./img/mrtt.png'
        },
    ],

    render: function () {
        const html = this.songs.map((song, index) => {
            return`
            <div class="song ${index === this.currentIndex? 'active' : ''}" data-index="${index}">
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
    playlist.innerHTML = html.join('')

    },
    definePropertes: function () {

        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]    
            }
        })
    },

    HandleEvents: function(){

        const cd = $('.cd')
        const _this = this
        const cdWidth = cd.offsetWidth

        // sử lí quay cd / dừng cd 

        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause();

        //phóng to thu nhỉ cd 
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
     
      // sử lí khi click play

        playBtn.onclick = function(){
            if (_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        // khi được play
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add("playing")
            cdThumbAnimate.play()
        }
        // khi được pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove("playing")
            cdThumbAnimate.pause()
        }

        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //sử lí khi tua 
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime

        }

        // khi next song 
        nextBtn.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
         // khi prev song 
         prevBtn.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play();
        }
        // sử lí bật tắt random song
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);

        }

        // sử lí phát lại một song 
            repeatBtn.onclick = function() {
                _this.isRepeat = !this.isRepeat
                repeatBtn.classList.toggle('active', this.isRepeat) ;
            }

        // sử lí next song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat){
                audio.play() ;
            } else {
                nextBtn.click()
            }
            
        };

        //lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                // sử lí click vào song 
                if (songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
                // sử lí khi click vào song option
            }

        };
    },

    loadCurrentSong: function(){
        const heading = $('header h2')
        const cdThumb = $('.cd-thumb')
        const audio = $('#audio')

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    scrollToActiveSong: function() {
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },

    nextSong: function () {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--;
        if(this.currentIndex  < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function(){
        let newIndex
        do {
            newIndex  = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },


    stast: function(){
        // định nghĩa các thuộc tính cho Object
        this.definePropertes()
    //lắng nghe và sử lí các sự kiện 
        this.HandleEvents();
        //tải thông tin bài hát đầu tiền vào UI
        this.loadCurrentSong();
        //return playlist
        this.render();
    }
    
}

app.stast()