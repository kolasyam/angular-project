import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
interface WorkoutData {
  userName: string;
  workoutTypes: string[];
  workoutMinutes: number;
}
@Component({
  selector: 'app-progress-component',
  imports: [CommonModule],
  templateUrl: './progress-component.component.html',
  styleUrl: './progress-component.component.css',
})
export class ProgressComponentComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: Chart | null = null;
  isVisible = false;
  userName = '';

  showChart(userName: string, workouts: WorkoutData[]) {
    this.userName = userName;
    this.isVisible = true;

    // Filter workouts for this user
    const userWorkouts = workouts.filter((w) => w.userName === userName);

    // Calculate total minutes per workout type
    const workoutMinutes: { [key: string]: number } = {};
    userWorkouts.forEach((workout) => {
      workout.workoutTypes.forEach((type) => {
        workoutMinutes[type] =
          (workoutMinutes[type] || 0) + workout.workoutMinutes;
      });
    });

    // Create chart data
    const labels = Object.keys(workoutMinutes);
    const data = Object.values(workoutMinutes);

    setTimeout(() => {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Minutes',
              data: data,
              backgroundColor: 'rgba(147, 197, 253, 0.8)',
              borderColor: 'rgb(147, 197, 253)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Minutes',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    });
  }

  close() {
    this.isVisible = false;
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
