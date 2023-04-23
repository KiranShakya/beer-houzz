import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBeersComponent } from './my-beers.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomBeerService } from '../../services/custom-beer.service';

describe('MyBeersComponent', () => {
  let component: MyBeersComponent;
  let fixture: ComponentFixture<MyBeersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBeersComponent],
      imports: [MatDialogModule],
      providers: [CustomBeerService],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
