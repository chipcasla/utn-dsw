export class Cliente {
  constructor(
    public dni: string,
    public nombre: string,
    public apellido: string,
    public telefono: string,
    public mail: string,
    public id: number | null
  ) {}
}