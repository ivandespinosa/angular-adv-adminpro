


export class Usuario {

    constructor(

        public nombre: String,
        public email: String,  
        public password: String,      
        public google?: boolean,
        public img?: String,
        public uid?: String
    ) { }

}