import { Action, State, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.models';
import { borrar, borrarCompletados, crear, editar, toggle, toggleAll } from './todo.actions';


export const estadoInicial: Todo[] = [new Todo('Salvar el mundo'), new Todo('Reventarlo'), new Todo('volver a salvar el mundo'), new Todo('Comer')];
const _todoReducer = createReducer(
  estadoInicial,
  //En vez de hacer un push al state del nuevo todo, desglosamos los que venian en el state, y mandamos esos elementos sueltos junto con el nuevo todo.
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(borrarCompletados, (state) => state.filter(todo =>!todo.completado)),
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else { return todo; }
    })

  }),
  on(toggleAll, (state, { completado }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado: completado
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      } else { return todo; }
    })
  }),
);
export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
