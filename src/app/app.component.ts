import { Component } from '@angular/core';
import { FormComponentComponent } from './form-component/form-component.component';
import { WorklistComponentComponent } from './worklist-component/worklist-component.component';
import { RouterOutlet } from '@angular/router';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'intern';
}
