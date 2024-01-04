import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})

export class LabsComponent {
  welcome = 'Welcome to my first app made with Angular 17';
  tasks = signal([
    'Install Angular CLI',
    'Create project',
    'Create components'
  ]);
  name = signal('Ashanty');
  age = 20;

//Property Binding
  disabled = true;
  img = 'https://www.thesprucepets.com/thmb/23TwSeX2CndpHDFt_KUk1j3u1Bw=/2121x1414/filters:fill(auto,1)/GettyImages-135630198-5ba7d225c9e77c0050cff91b.jpg';

  person = signal({
    name: 'Ashanty',
    age: 20,
    avatar: 'https://www.thesprucepets.com/thmb/23TwSeX2CndpHDFt_KUk1j3u1Bw=/2121x1414/filters:fill(auto,1)/GettyImages-135630198-5ba7d225c9e77c0050cff91b.jpg'
  })

  //Event binding
  clickHandler() {
    alert('Hey! you clicked me')
  }

  //Aqui tenemo el signal
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  //Cambiar la edad de forma dinamica
  changeAge(event: Event){
    const input = event.target as HTMLInputElement; //leer el input
    const newValue = input.value;
    this.person.update(prevState => {
      return{
        ...prevState,
        age:parseInt(newValue,10)
      }
    });
  }
}
