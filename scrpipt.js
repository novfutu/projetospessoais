const nomeMusic = document.getElementById('music')
const musicas =  document.getElementById('audios')
const nomeBanda = document.getElementById('banda')
const play = document.getElementById('play')
const tempo = document.getElementById('tempo-music')
const click = document.getElementById('progressão')
const imagens = document.getElementById('imagem')
const voltar  = document.getElementById('voltar')
const avançar = document.getElementById('avançar')
const embaralhar = document.getElementById('embaralhar')
const repetição= document.getElementById('repetir')
const tempoPassando = document.getElementById('tempoPassado')
const tempoTotal = document.getElementById('tempoTotal')
const coração = document.getElementById('coração')
const body = document.getElementById('conteudo')

const primoVictoria = {
    nomeMusic : 'Primo victoria',
    nomeBanda : 'Saboton',
    file : 'PrimoVictoria',
    like : false
}

const cobrasFumando = {
    nomeMusic : 'Smoking Snakes',
    nomeBanda : 'Saboton',
    file : 'cobrasFumantes',
    like : false
}

const alados = {
    nomeMusic : 'Winged Hussars',
    nomeBanda : 'Saboton',
    file : 'hurssados',
    like : false
}

const mortos = {
    nomeMusic : 'The Attack Of The Dead',
    nomeBanda : 'Saboton',
    file : 'ataqueMortos',
    like : false
}
const templarios = {
    nomeMusic : 'The Lest Stand',
    nomeBanda : 'Saboton',
    file : 'os189',
    like : false
}
const barão = {
    nomeMusic : 'The Red Baron',
    nomeBanda : 'Saboton',
    file : 'redBaron',
    like : false
}

const playlist = JSON.parse(localStorage.getItem('playlist'))
let index = 0 
let playListNova = [...playlist]

function playListas(){
    imagens.src = `imagens/${playListNova[index].file}.jpg`
    musicas.src = `audios/${playListNova[index].file}.mp3`
    nomeMusic.innerText = playListNova[index].nomeMusic
    nomeBanda.innerText = playListNova[index].nomeBanda
    favoritar()
}

function playMusic() {
    if (tocando){
        musicas.pause()
    } else {
        musicas.play()
    }
    
}
let tocando = false 
let embaralhando = false
let repetindo = false
let like = false
musicas.onplaying = function() {
    tocando = true;
    };
    musicas.onpause = function() {
    tocando = false;
    };

function playPauser(){

        play.querySelector('.bi').classList.remove('bi-play-fill')
        play.querySelector('.bi').classList.add('bi-pause-fill')
        musicas.play()
        tocando = true
}

 function pausarPlayer(){
        play.querySelector('.bi').classList.add('bi-play-fill')
        play.querySelector('.bi').classList.remove('bi-pause-fill')
        musicas.pause()
        tocando = false
}

function pausarPlay(){
    if (tocando === true){
        pausarPlayer()
    } else {
        playPauser()
    }
}

function antecessor(){
    if (index === 0){
        index = playListNova.length - 1
    } else{
        index -= 1 
    }
    playListas()
    playPauser()
   
} 

function sucessor(){
    if (index === playListNova.length - 1) {
        index = 0 
    } else{
        index += 1 

    }
    playListas()
    playPauser()
}

function barraProgress(){
    const tempoPassado = (musicas.currentTime/musicas.duration)*100
    tempo.style.setProperty('--progresso', `${tempoPassado}%`)
    tempoPassando.innerText =  horasMinutos(musicas.currentTime)
}

function mudançaMusica(event){
    const tamanho = click.clientWidth
    const clicar = event.offsetX
    const mudou = (clicar/tamanho) * musicas.duration
    musicas.currentTime = mudou
}

function açãoEmbaralhar(preSfulleArray){

    const size = preSfulleArray.length
    let tamanhoCasa = size -1
    while(tamanhoCasa > 0 ) {
    let randomIndex = Math.floor(Math.random()* size)
    let auxiliar = preSfulleArray[tamanhoCasa]
    preSfulleArray[tamanhoCasa ] = preSfulleArray[randomIndex]
    preSfulleArray[randomIndex] = auxiliar
    tamanhoCasa -=1
}
}

function vamosEmbaralhar(){
    if(embaralhando === false){
        embaralhando = true
        açãoEmbaralhar(playListNova)
        embaralhar.classList.add('botão-clicado')
    } else {
        embaralhando = false
        açãoEmbaralhar(playlist)
        embaralhar.classList.remove('botão-clicado')
    }
}



function vamosRepetir(){
    if(repetindo === false){
        repetindo = true
        repetição.classList.add('botão-clicado')
    } else {
        repetindo = false 
        repetição.classList.remove('botão-clicado')
    }
}

function proximaMusica(){
    if(repetindo === false){
        sucessor()
    } else{
        musicas.play()
    }
    
}

function horasMinutos(originalNumber){
    let horas = Math.floor(originalNumber/ 3600)
    let minutos = Math.floor((originalNumber - horas * 3600)/ 60)
    let segundos = Math.floor(originalNumber - horas * 3600 - minutos* 60)
    return `${minutos.toString().padStart(2, '0')} : ${segundos.toString().padStart(2, '0')}`

    
}

function atualizaçãoTempo(){
    tempoPassando.innerText =  horasMinutos(musicas.currentTime)
}
function tempoAtualizado(){
    horasMinutos(musicas.duration)
    tempoTotal.innerText =   horasMinutos(musicas.duration)
}

function favoritar(){
    if( playListNova[index].like === false){
        coração.querySelector('.bi').classList.remove('bi-heart')
        coração.querySelector('.bi').classList.add('bi-heart-fill')
        

    } else {
        coração.querySelector('.bi').classList.add('bi-heart')
        coração.querySelector('.bi').classList.remove('bi-heart-fill')
        
    }
}

function favoritar2(){
    if( playListNova[index].like === false){
     playListNova[index].like = true
    } else {
     playListNova[index].like = false
    }
    favoritar()
    localStorage.setItem('playlist', JSON.stringify(playListNova))
}


let corAtual = 0;
let corRemovida = false;
const cores = ['cor1', 'cor2', 'cor3', 'cor4', 'cor5', 'cor6'];

function trocarCores() {
    if (!corRemovida) {
        document.body.classList.remove(cores[corAtual]);
        corAtual = (corAtual + 1) % cores.length;
        document.body.classList.add(cores[corAtual]);
    }
}

function removerCores() {
    if (corRemovida) {
        document.body.classList.add(cores[corAtual]);
        corRemovida = false;
    } else {
        document.body.classList.remove(cores[corAtual]);
        corAtual = (corAtual + 1) % cores.length;
        corRemovida = true;
    }
}

play.addEventListener('click', pausarPlay)
musicas.addEventListener('timeupdate', barraProgress) 
musicas.addEventListener('loadedmetadata', tempoAtualizado) 
musicas.addEventListener('ended', proximaMusica)
click.addEventListener('click', mudançaMusica)
playListas()
voltar.addEventListener('click', antecessor)
avançar.addEventListener('click', sucessor)
embaralhar.addEventListener('click', vamosEmbaralhar)
repetição.addEventListener('click', vamosRepetir)
coração.addEventListener('click', favoritar2)
avançar.addEventListener('click', trocarCores)
voltar.addEventListener('click', trocarCores)

