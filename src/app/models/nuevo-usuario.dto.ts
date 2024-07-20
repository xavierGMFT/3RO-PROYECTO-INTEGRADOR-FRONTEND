export class NuevoUsuarioDto {

    id?: string;

    nombreUsuario?: string;

    email?: string;

    password?: string;

    constructor( nombreUsuario: string, email: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
    }
}
