import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { PunkApiService } from '../../services/punk-api.service';
import { Beer, PunkApiRequestOptions } from '../../models/punk-api.model';

@Component({
  selector: 'ui-all-beers',
  templateUrl: './all-beers.component.html',
  styleUrls: ['./all-beers.component.scss'],
})
export class AllBeersComponent implements OnInit, OnDestroy {
  // Grid view total columns
  public totalCols = 2;
  public beers: Array<Partial<Beer>> = [];
  public reachedEnd = false;
  private readonly destroyed = new Subject<void>();
  // TODO: Make this page size configurable
  private pageSize = 10;
  private currentPage = 0;
  // TODO: Make this filter dynamic.
  private filter: Partial<PunkApiRequestOptions> = {};

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly punkApiService: PunkApiService
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

    // This is the first time we are getting some beers
    this.beers = await firstValueFrom(
      this.punkApiService.getFilteredBeers(
        this.filter,
        this.pageSize,
        ++this.currentPage
      )
    );
    /**
     * Check if the response had less items than requested items
     * if less, we reached the end
     * */
    this.reachedEnd = this.beers.length < this.pageSize;
  }

  async loadMore() {
    const moreBeers = await firstValueFrom(
      this.punkApiService.getFilteredBeers(
        this.filter,
        this.pageSize,
        ++this.currentPage
      )
    );
    this.beers = [...this.beers, ...moreBeers];
    /**
     * Check if the response had less items than requested items
     * if less, we reached the end
     * */
    this.reachedEnd = moreBeers.length < this.pageSize;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
