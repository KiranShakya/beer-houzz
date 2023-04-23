import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomBeerComponent } from './custom-beer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('CustomBeerComponent', () => {
  let component: CustomBeerComponent;
  let fixture: ComponentFixture<CustomBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomBeerComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
