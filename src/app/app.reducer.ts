import { ActionReducerMap } from "@ngrx/store";
import { Todo } from "./todos/models/todo.models";
import { filtrosValidos } from "./filtro/filtro.actions";
import { todoReducer } from "./todos/todo.reducer";
import { filtroReducer } from "./filtro/filtro.reducer";

export interface AppState {
  todos: Todo[],
  filtro:filtrosValidos

}
export const appReducers: ActionReducerMap<AppState>={
  todos:todoReducer,
  filtro: filtroReducer
}
