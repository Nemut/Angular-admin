

export class Usuario {

    // forma 1
    // public nombre;

    // constructor(nombre: string) {
    //     this.nombre = nombre;
    // }

    // Forma abreviada
    constructor(
        public username: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public id?: number
    ) { }

}