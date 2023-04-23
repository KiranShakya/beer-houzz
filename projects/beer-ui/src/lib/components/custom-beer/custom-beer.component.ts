import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ui-custom-beer',
  templateUrl: './custom-beer.component.html',
  styleUrls: ['./custom-beer.component.scss'],
})
export class CustomBeerComponent {
  public customBeer = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(28),
    ]) as FormControl<string>,
    genre: new FormControl('', [
      Validators.required,
      Validators.maxLength(36),
    ]) as FormControl<string>,
    description: new FormControl('', [
      Validators.required,
    ]) as FormControl<string>,
  });

  public get invalidNameMessage(): string {
    const errors = this.customBeer.get('name')?.errors as ValidationErrors;
    return errors['maxlength'] ? 'Too long' : 'Beer name is required.';
  }
  public get invalidGenreMessage(): string {
    const errors = this.customBeer.get('genre')?.errors as ValidationErrors;
    return errors['maxlength'] ? 'Too long' : 'Genre is required.';
  }
}
