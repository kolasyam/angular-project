import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklistComponentComponent } from './worklist-component.component';

describe('WorklistComponentComponent', () => {
  let component: WorklistComponentComponent;
  let fixture: ComponentFixture<WorklistComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorklistComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorklistComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
