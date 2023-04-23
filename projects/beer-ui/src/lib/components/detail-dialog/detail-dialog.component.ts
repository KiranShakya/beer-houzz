import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../models/punk-api.model';

@Component({
  selector: 'ui-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.scss'],
})
export class DetailDialogComponent implements OnInit {
  @Input()
  public beer: Partial<Beer>;

  public ingredients: Array<{ name: string; details: unknown }>;
  public columns = ['name', 'details'];

  ngOnInit() {
    if (this.beer?.ingredients) {
      const allIngredients = (
        Object.keys(this.beer.ingredients) as Array<
          keyof typeof this.beer.ingredients
        >
      ).map((name) => ({
        name,
        details: this.beer.ingredients && this.beer.ingredients[name],
      }));
      this.ingredients = allIngredients;
    }
  }
}
