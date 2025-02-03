import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface WorkoutData {
  userName: string;
  workoutTypes: string[];
  workoutMinutes: number;
}
@Component({
  selector: 'app-form-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.css',
})
export class FormComponentComponent {
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  formData: WorkoutData = {
    userName: '',
    workoutTypes: [],
    workoutMinutes: 0,
  };

  onWorkoutTypeChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.formData.workoutTypes.push(value);
    } else {
      const index = this.formData.workoutTypes.indexOf(value);
      if (index !== -1) {
        this.formData.workoutTypes.splice(index, 1);
      }
    }
  }

  onSubmit() {
    // Store in localStorage
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    workouts.push(this.formData);
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Console log the details
    console.log('Form Submitted:', this.formData);
    console.log('All Workouts:', workouts);

    // Reset form
    this.formData = {
      userName: '',
      workoutTypes: [],
      workoutMinutes: 0,
    };
    window.location.href = '/list';
  }
}
