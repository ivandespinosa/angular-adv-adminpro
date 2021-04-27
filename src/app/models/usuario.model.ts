import { environment } from '../../environments/environment';

const base_url = environment.base_url;


export class Usuario {

    constructor(

        public nombre: String,
        public email: String,  
        public password: String,      
        public google?: boolean,
        public img?: string,
        public role?: string,
        public uid?: string
    ) { }

    get imagenUrl() {
        // /upload/usuarios/no-image

        if ( this.img === undefined ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }
        
    }

}