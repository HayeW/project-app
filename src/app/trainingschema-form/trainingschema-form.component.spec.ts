import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingschemaFormComponent } from './trainingschema-form.component';

describe('TrainingschemaFormComponent', () => {
  let component: TrainingschemaFormComponent;
  let fixture: ComponentFixture<TrainingschemaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingschemaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingschemaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
