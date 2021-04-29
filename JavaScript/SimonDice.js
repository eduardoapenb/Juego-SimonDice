const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 5;

swal('Hola');

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguenteNivel, 500);
    
  }
  
  
  inicializar() {
    
    this.siguenteNivel = this.siguenteNivel.bind(this);
    this.elegirColor =  this.elegirColor.bind(this);
    this.toggleEmpezar();
    //btnEmpezar.classList.toggle('hide')
    //btnEmpezar.classList.add('hide');
    this.nivel = 1;
    this.Colores = {
      celeste, violeta, naranja, verde
    }
    
  }   
  
  generarSecuencia(){
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
  } 

  siguenteNivel(){
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();

  }

   numeroAColor(numero){
    switch(numero){
      case 0:
        return 'celeste'
      case 1: 
        return 'violeta'
      case 2: 
        return 'naranja'
      case 3: 
        return 'verde'  

    }
   }

   colorAnumero(color){
    switch(color){
      case 'celeste':
        return 0
      case  'violeta': 
        return 1
      case 'naranja': 
        return 2
      case 'verde': 
        return 3  

    }
   }



  iluminarSecuencia(){
    for(let i = 0; i< this.nivel;i++){
      const color = this.numeroAColor(this.secuencia[i]);
      setTimeout(()=>this.iluminarColor(color), 1000*i);


    }

  }

  iluminarColor(color){
    this.Colores[color].classList.add('light');
    setTimeout(()=> this.apagarColor(color), 350);

  }
  
  apagarColor(color){
    this.Colores[color].classList.remove('light');
  }


  agregarEventosClick(){

    this.Colores.celeste.addEventListener('click', this.elegirColor);
    this.Colores.verde.addEventListener('click', this.elegirColor);
    this.Colores.violeta.addEventListener('click', this.elegirColor);
    this.Colores.naranja.addEventListener('click',this.elegirColor);

  }

  eliminarEventosClick(){
    this.Colores.celeste.removeEventListener('click', this.elegirColor);
    this.Colores.verde.removeEventListener('click', this.elegirColor);
    this.Colores.violeta.removeEventListener('click', this.elegirColor);
    this.Colores.naranja.removeEventListener('click',this.elegirColor);

  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.colorAnumero(nombreColor);
    this.iluminarColor(nombreColor);

    if (numeroColor === this.secuencia[this.subNivel]){
       this.subNivel++;
       if (this.subNivel === this.nivel){
          this.nivel++;
          this.eliminarEventosClick();
        if (this.nivel === (ULTIMO_NIVEL + 1) ){
          this.ganarJuego();

        } else{
          setTimeout(this.siguenteNivel, 1000);
        }


       }

    } else{
      this.perderJuego()

    }

  }

  ganarJuego(){
    swal('You Win', 'Felicidades, ¡ganaste!', 'success')
    .then(()=>{
       this.inicializar();
    })

  }


  perderJuego(){
    swal('You Lose', 'Sorry, perdiste :( ', 'error')
    .then(()=>{
       this.eliminarEventosClick() 
       this.inicializar();
    })

  }

  toggleEmpezar(){
    if (btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide');
    }

  }



} //*class

function empezarJuego() {
  //alert('El juego va a comenzar')  
  window.juego = new Juego();
}

