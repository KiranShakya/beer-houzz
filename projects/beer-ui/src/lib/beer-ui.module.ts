import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { AllBeersComponent } from './components/all-beers/all-beers.component';
import { MyBeersComponent } from './components/my-beers/my-beers.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PunkApiService } from './services/punk-api.service';
import { NgStringPipesModule } from 'ngx-pipes';
import { DetailDialogComponent } from './components/detail-dialog/detail-dialog.component';
import { IngredientDetailsPipe } from './components/detail-dialog/pipes/ingredient-details.pipe';
import { CustomBeerComponent } from './components/custom-beer/custom-beer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomBeerService } from './services/custom-beer.service';
import { JoinPipe } from './components/detail-dialog/pipes/join.pipe';

@NgModule({
  declarations: [
    CardComponent,
    AllBeersComponent,
    MyBeersComponent,
    DetailDialogComponent,
    IngredientDetailsPipe,
    JoinPipe,
    CustomBeerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    NgStringPipesModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [CardComponent, AllBeersComponent, MyBeersComponent],
  providers: [PunkApiService, CustomBeerService],
})
export class BeerUiModule {}
