import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal([
    'Install Angular CLI',
    'Create project',
    'Create components'
  ]);

  changeHandler(event: Event){
    const input= event.target as HTMLInputElement; //Leemos el nuevo evento tecleado
    const newTask = input.value; //guardamos el valor ingresado
    /*¿Cómo ingresar esa nueva tarea al Array? Hacemos un update que nos permite contener
    las tareas anteriores y agregar las nuevas tareas. Esto con la función flecha
    */
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  //Eliminamos la tarea
}
