import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogComponent } from './detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgStringPipesModule } from 'ngx-pipes';

describe('DetailDialogComponent', () => {
  let component: DetailDialogComponent;
  let fixture: ComponentFixture<DetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailDialogComponent],
      imports: [MatDialogModule, NgStringPipesModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
