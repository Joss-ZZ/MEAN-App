export interface AuthResponse{
    ok?: boolean,
    uid?: string,
    nombre?: string,
    email?: string,
    password?: string,
    img?: string,
    token?: string,
    msg?: string,
    usuariosDB?: Usuario[],
    notasDB?: Nota[]
    notaDB?: Nota
}

export interface Usuario{
    uid?: string,
    nombre: string,
    email: string,
    password?: string,
    img?: string,
    token?: string,
}

export interface Nota{
    _id?: string,
    descripcion?: string,
    usuario?: Usuario
}