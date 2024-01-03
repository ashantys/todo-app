import { Component } from '@angular/core';
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
  tasks = [
    'Install Angular CLI',
    'Create project',
    'Create components'
  ];
  name = 'Ashanty';
  age = 20;
  disabled = true;
  img = 'https://www.thesprucepets.com/thmb/23TwSeX2CndpHDFt_KUk1j3u1Bw=/2121x1414/filters:fill(auto,1)/GettyImages-135630198-5ba7d225c9e77c0050cff91b.jpg';

  person = {
    name: 'Ashanty',
    age: '20',
    avatar: 'https://www.thesprucepets.com/thmb/23TwSeX2CndpHDFt_KUk1j3u1Bw=/2121x1414/filters:fill(auto,1)/GettyImages-135630198-5ba7d225c9e77c0050cff91b.jpg'
  }

}
