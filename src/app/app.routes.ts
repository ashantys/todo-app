import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

export const routes: Routes = [
    {
        path: 'home', //nombre de la ruta
        component: HomeComponent, //quien lo va reenderizar
    },
    {
        path: 'labs', //nombre de la ruta
        component: LabsComponent, //quien lo va reenderizar
    },
];
