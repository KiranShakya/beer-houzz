import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomBeerComponent } from '../custom-beer/custom-beer.component';
import { CustomBeerService } from '../../services/custom-beer.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Beer } from '../../models/punk-api.model';

@Component({
  selector: 'ui-my-beers',
  templateUrl: './my-beers.component.html',
  styleUrls: ['./my-beers.component.scss'],
})
export class MyBeersComponent implements OnInit, OnDestroy {
  // Grid view total columns
  public totalCols = 2;
  public reachedEnd = false;
  public customBeers: Array<Partial<Beer>> = [];
  private readonly destroyed = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly customBeerService: CustomBeerService,
    private readonly breakpointObserver: BreakpointObserver
  ) {}

  async ngOnInit() {
    // We setup responsiveness observer
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe((screenSize) => {
        // Anything smaller that Breakpoints.Small, we go 1 column design
        this.totalCols = screenSize.matches ? 1 : 2;
      });
    this.customBeers = await firstValueFrom(
      this.customBeerService.getAllBeers()
    );
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  addBeer() {
    const dialogRef = this.dialog.open(CustomBeerComponent, { width: '500px' });
    const formGroup = dialogRef.componentInstance.customBeer;

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.customBeerService.createBeer(formGroup);
        this.customBeers = await firstValueFrom(
          this.customBeerService.getAllBeers()
        );
      }
    });
  }
}
