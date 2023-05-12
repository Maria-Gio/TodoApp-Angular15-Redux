import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFiltro } from 'src/app/filtro/filtro.actions';
import { borrar, borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'pendientes', 'completados'];
  pendientes: number = 0;
  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })

  }
  cambiarFiltro(filtro: filtrosValidos): void {
    this.store.dispatch(setFiltro({ filtro: filtro }))
    console.log(this.filtroActual);
  }
  clearTodos(): void {
    this.store.dispatch(borrarCompletados())
  }
}
