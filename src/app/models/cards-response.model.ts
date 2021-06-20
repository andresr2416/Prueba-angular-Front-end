import { DataUsuario } from "./data-usuario.model";

export class CardsResponse  {
    public page: number;
    public per_page: number;
    public total: number;
    public total_pages: number;
    public data: DataUsuario[];
}
