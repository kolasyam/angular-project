import { Routes } from '@angular/router';
import { FormComponentComponent } from './form-component/form-component.component';
import { WorklistComponentComponent } from './worklist-component/worklist-component.component';
// import { ProgressComponentComponent } from './progress-component/progress-component.component';
export const routes: Routes = [
  { path: '', component: FormComponentComponent },
  { path: 'list', component: WorklistComponentComponent },
  // { path: 'progress', component: ProgressComponentComponent },
  { path: '**', redirectTo: '' },
];
