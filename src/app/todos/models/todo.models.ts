export class Todo {
  public id: number = 0;
  public texto: string = '';
  public completado: boolean = false;
  constructor(text: string) {
    this.texto = text;
    this.id = Math.random();
    this.completado = false;
  }
}
