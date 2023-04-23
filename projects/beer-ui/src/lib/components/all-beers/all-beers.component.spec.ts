import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBeersComponent } from './all-beers.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '../card/card.component';
import { MatCardModule } from '@angular/material/card';
import { PunkApiService } from '../../services/punk-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('AllBeersComponent', () => {
  let component: AllBeersComponent;
  let fixture: ComponentFixture<AllBeersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBeersComponent, CardComponent],
      imports: [MatGridListModule, MatCardModule, HttpClientModule],
      providers: [PunkApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(AllBeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
