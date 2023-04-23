import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NgStringPipesModule } from 'ngx-pipes';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatCardModule, MatDialogModule, NgStringPipesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
