import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from './../../models/task.model';//Importamos la interfaz

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

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Create project',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Create components',
      completed: false
    },
  ]);

  //Controla el input
  changeHandler(event: Event){
    const input= event.target as HTMLInputElement; //Leemos el nuevo evento tecleado
    const newTask = input.value; //guardamos el valor ingresado
    this.addTask(newTask);
  }
   
  /* Agregar una tarea: Va a recibir un titulo como string, al cual se le asigna un id y un estado de acompletado*/
  addTask(title: string){
    const newTask ={
      id:Date.now(),
      title,
      completed:false,
    };
    /*¿Cómo ingresar esa nueva tarea al Array? Hacemos un update que nos permite contener
    las tareas anteriores y agregar las nuevas tareas. Esto con la función flecha*/
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

//Actualizar la tarea
 updateTask(index: number){
    this.tasks.update((tasks) => { //recibimos el estado anterior
      return tasks.map((task, position) => { // iteramos el array
        if (position === index){ //si, la posicion es igual a la de el parametro
          return{// se modifica el estado de la tarea, dependiendo a su estado anterior
            ...task, 
            completed: !task.completed
          }
        }
        return task;
      }) //map, recorre todos los elementos de el array
    })
  }

}
