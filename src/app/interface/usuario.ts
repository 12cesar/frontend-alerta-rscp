// Generated by https://quicktype.io

export interface ResultUser {
    ok:   boolean;
    user: User[];
}
export interface ResultUserInd {
    ok:   boolean;
    user: User;
}

export interface User {
    id:        number;
    name:      string;
    lastname:  string;
    usuario:     string;
    password:  string;
    active:    number;
    createdAt: string;
    updatedAt: string;
    rolId:     number;
    rol:       Rol;
}

export interface Rol {
    role: string;
    id:   number;
}
