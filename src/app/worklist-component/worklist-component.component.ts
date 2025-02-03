import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressComponentComponent } from '../progress-component/progress-component.component';
interface WorkoutData {
  userName: string;
  workoutTypes: string[];
  workoutMinutes: number;
}
@Component({
  selector: 'app-worklist-component',
  imports: [FormsModule, CommonModule, ProgressComponentComponent],
  templateUrl: './worklist-component.component.html',
  styleUrl: './worklist-component.component.css',
})
export class WorklistComponentComponent {
  @ViewChild('progressChart') progressChart!: ProgressComponentComponent;
  workouts: WorkoutData[] = [];
  filteredWorkouts: WorkoutData[] = [];
  paginatedWorkouts: WorkoutData[] = [];
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  // Search and filter
  searchTerm = '';
  selectedWorkoutType = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  constructor() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      this.workouts = JSON.parse(storedWorkouts);
      this.filterWorkouts();
    }
  }

  filterWorkouts() {
    this.filteredWorkouts = this.workouts.filter((workout) => {
      const nameMatch = workout.userName
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const typeMatch =
        !this.selectedWorkoutType ||
        workout.workoutTypes.includes(this.selectedWorkoutType);
      return nameMatch && typeMatch;
    });

    this.totalPages = Math.ceil(
      this.filteredWorkouts.length / this.itemsPerPage
    );
    this.currentPage = 1;
    this.updatePaginatedWorkouts();
  }

  updatePaginatedWorkouts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedWorkouts = this.filteredWorkouts.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedWorkouts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedWorkouts();
    }
  }

  onItemsPerPageChange() {
    this.totalPages = Math.ceil(
      this.filteredWorkouts.length / this.itemsPerPage
    );
    this.currentPage = 1;
    this.updatePaginatedWorkouts();
  }
  showProgressChart(userName: string) {
    this.progressChart.showChart(userName, this.workouts);
  }
}
