import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Beer } from '../../models/punk-api.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  public beer: Partial<Beer>;

  constructor(private readonly dialog: MatDialog) {}

  viewMore() {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      width: '800px',
    });
    dialogRef.componentInstance.beer = this.beer;
  }
}
