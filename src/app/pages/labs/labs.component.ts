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
}
