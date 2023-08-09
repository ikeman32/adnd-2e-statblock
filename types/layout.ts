import type { Monster } from "../index"

export interface Layout {
    name: string;
    id: string;
    blocks:'';
}

export interface DefaultLayout extends Layout {
    edited?: boolean;
}