import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.models';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef<HTMLInputElement> | undefined;
  chkCompletado: FormControl;
  txtInput: FormControl;
  editando: boolean = false;
  constructor(private store: Store<AppState>) {
    this.chkCompletado = new FormControl(this.todo?.completado);
    this.txtInput = new FormControl(this.todo?.texto, Validators.required)
  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo?.completado);
    this.txtInput = new FormControl(this.todo?.texto, Validators.required);
    this.chkCompletado.valueChanges.subscribe(valor => {
      if (this.todo?.id !== undefined) {
        this.store.dispatch(toggle({ id: this.todo.id }));
      }
    })

  }
  editar(): void {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico?.nativeElement.select();
    })

  }
  saveEdit(): void {
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }
    if (this.txtInput.value === this.todo?.texto) {
      return;
    }
    if (this.todo) {
      this.store.dispatch(editar({
        id: this.todo?.id,
        texto: this.txtInput.value
      }))

    }
  }
  borrar(): void {
    if (this.todo) {
      this.store.dispatch(borrar({ id: this.todo?.id }))
    }

  }

}
