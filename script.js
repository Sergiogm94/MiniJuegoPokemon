// Mini juego estilo pokemon.

class Pokemon{
    constructor(nombre, tipo){
        this.nombre = nombre;
        this.tipo = tipo;
        this.vida = 100;
        this.movimientos = [];
    }

    aprenderMovimiento(nombreMovimiento){
        this.movimientos.push(nombreMovimiento)
    }

    recibirDanio(cantidad){
        this.vida -=cantidad;
        if(this.vida < 0){
            this.vida = 0
        }
    }

    estaVivo(){
        return this.vida > 0;
    }

    mostrarEstado(){
        let emoji = this.obtenerEmoji();
        return `${emoji} ${this.nombre} - HP: ${this.vida}/100`
    }

    obtenerMovimientoAleatorio(){
        let indice = Math.floor(Math.random() * this.movimientos.length);
        return this.movimientos[indice];
    }

    obtenerEmoji(){
        let emoji;
            if(this.tipo == "Eléctrico"){
                emoji = "⚡"
            } else if(this.tipo == "Fuego"){
                emoji = "🔥"
            } else if(this.tipo == "Agua"){
                emoji = "💧"
            } else {
                emoji = "⚪"
            }
        return emoji;
    }

    atacar(objetivo, indiceMovimiento = null){
        let movimiento;
         
        if (indiceMovimiento === null) {
        movimiento = this.obtenerMovimientoAleatorio();
        } else {
        movimiento = this.movimientos[indiceMovimiento];
        }

        let multiplicador = this.calcularMultiplicador(
            movimiento.tipo,
            objetivo.tipo
        );

        let mensaje = this.obtenerMensajeEficacia(multiplicador);

        let danioFinal = movimiento.danio * multiplicador;

        objetivo.recibirDanio(danioFinal);
             let emoji = this.obtenerEmoji();

       return `${emoji} ${this.nombre} usa ${movimiento.nombre} y hace ${danioFinal} de daño. ${mensaje}`
        }  
    
    calcularMultiplicador(tipoMovimiento, tipoDefensor){
        if(tipoMovimiento == "Eléctrico" && tipoDefensor == "Agua"){
            return 2;
        }
        if(tipoMovimiento == "Agua" && tipoDefensor == "Fuego"){
            return 2;
        }
        if(tipoMovimiento == "Fuego" && tipoDefensor == "Agua"){
            return 0.5;
        }
        return 1;
    }

    obtenerMensajeEficacia(multiplicador){
        if(multiplicador == 2){
            return "¡Es muy eficaz!";
        } else if (multiplicador == 0.5){
            return "No es muy eficaz...";
        } else {
            return "";
        }
    }
};

class Movimiento{
    constructor(nombre, danio, tipo){
        this.nombre = nombre;
        this.danio = danio;
        this.tipo = tipo;
    }
}

class Combate{
    constructor(pokemon1, pokemon2){
        this.pokemon1 = pokemon1;
        this.pokemon2 = pokemon2;
        this.turno = 1;
    }

    mostrarEstado(){
        return `==========Turno ${this.turno} =========\n ${this.pokemon1.mostrarEstado()} \n ${this.pokemon2.mostrarEstado()}`  
    }

    jugarTurno(){
        console.log(this.mostrarEstado());
        console.log(this.pokemon1.atacar(this.pokemon2));
        if(this.pokemon2.estaVivo()){
            console.log(this.pokemon2.atacar(this.pokemon1));
        }
        this.turno++;
    }

    hayGanador(){
        if(!this.pokemon2.estaVivo()){
           return this.pokemon1
        } else if(!this.pokemon1.estaVivo()){
           return this.pokemon2
        } else {
            return null;
        }
    }

    iniciar(){
        console.log("⚔️ ¡Comienza el combate!")
        while(!this.hayGanador()){
            this.jugarTurno();
        }
            let ganador = this.hayGanador();
            console.log(`🏆 ¡Gana ${ganador.nombre}!`);
    }
}

// Pokemon.
let pikachu = new Pokemon("Pikachu", "Eléctrico");
let squirtle = new Pokemon("Squirtle", "Agua");
let charmander = new Pokemon("Charmander", "Fuego");
//Movimientos.
let placaje = new Movimiento("Placaje", 15, "Normal");
let arañazo = new Movimiento("Arañazo", 15, "Normal");
let impactrueno = new Movimiento("Impactrueno", 20, "Eléctrico");
let rayo = new Movimiento("Rayo", 50, "Eléctrico");
let ascuas = new Movimiento("Ascuas", 20, "Fuego");
let lanzallamas = new Movimiento("Lanzallamas", 50, "Fuego");
let burbuja = new Movimiento("Burbuja", 20, "Agua");
let pistolaAgua = new Movimiento("Pistola de Agua", 50, "Agua");
// Combates.
let combate = new Combate(pikachu, charmander);

pikachu.aprenderMovimiento(impactrueno);
pikachu.aprenderMovimiento(placaje);
pikachu.aprenderMovimiento(rayo);
charmander.aprenderMovimiento(lanzallamas);
charmander.aprenderMovimiento(arañazo);
charmander.aprenderMovimiento(ascuas);
squirtle.aprenderMovimiento(burbuja);
squirtle.aprenderMovimiento(arañazo);
squirtle.aprenderMovimiento(pistolaAgua);

//console.log(pikachu);
//console.log(charmander);
//console.log(combate.jugarTurno());

combate.iniciar();

