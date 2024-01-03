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
  deleteTask(index: number){
    /* Para eliminar una tarea con la mejor practica. Debemos de traer la lista de tareas.
    Una vez con la lista de tareas, entonces con la función flecha las filtramos por cualquier elemento
    que no sea el index que hemos llamado por parametro . Es en donde aplicamos la lógica: 
    si la posicion es diferente a la que nos envian por parametro
    */ 
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }
}
