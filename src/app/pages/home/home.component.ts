import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { Task } from './../../models/task.model';//Importamos la interfaz

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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

  filter = signal<'all' | 'pending' | 'completed' >('all'); //Muestra las tareas que contengan alguno de esos estados
  tasksByFilter = computed(() => {
    const filter = this.filter(); //Leer el estado del filtro actual
    const tasks = this.tasks(); //Leer el estado de toda la lista de tareas sin filtro
    if(filter === 'pending'){//Si el estado es 'pending'
      return tasks.filter(task => !task.completed)//Traer todas las tareas, que no estan completadas
    }
    if(filter === 'completed'){//Si el estado es 'completed'
      return tasks.filter(task => task.completed)//Traer todas las tareas que esten completadas
    }
    return tasks;
  })

  //controlador para  crear las nuevas tareas
  newTaskCtrl= new FormControl('',{
    //validaciones
    nonNullable:true, // No acepte valores nulos
    validators: [
      Validators.required,
    ]
  });

  //Controla el input
  changeHandler(){
    if(this.newTaskCtrl.valid){//Si es valido lo capturamos
      const value = this.newTaskCtrl.value.trim(); //trim, nos quita espacios al inicio y al final de un string
      if(value !== '' ){// si el valor es diferente de vacio, permitimos la creacion de la tarea
        this.addTask(value);
        this.newTaskCtrl.setValue('') //Vamos a limpiar el campo de escritura
      }
    }
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

  //Activar la tarea en modo edicion
  updateTaskEditingMode(index:number){
    this.tasks.update((prevState) => { //recibimos el estado anterior
      return prevState.map((task, position) => { // iteramos el array
        if (position === index){ //si, la posicion es igual a la de el parametro
          return{// se modifica el estado de la tarea, dependiendo a su estado anterior
            ...task, 
            editing: true
          }
        }
        return {
          ...task,
          editing:false
        };
      })
    })
  }

    //Actualizar el texto editado
    updateTaskText(index:number, event: Event){
      //leemos el input para conocer el titulo de la tarea
      const input = event.target as  HTMLInputElement;
      this.tasks.update((prevState) => { //recibimos el estado anterior
        return prevState.map((task, position) => { // iteramos el array
          if (position === index){ //si, la posicion es igual a la de el parametro
            return{// se modifica el texto
              ...task, 
              title: input.value, // Se le asigna el nuevo valor
              editing: false //sacarlo del modo edicion
            }
          }
          return task;
        })
      })
    }

    //Cambiar el estado del filtro
    changeFilter(filter: 'all' | 'pending' | 'completed'){
      this.filter.set(filter);
    }
}
