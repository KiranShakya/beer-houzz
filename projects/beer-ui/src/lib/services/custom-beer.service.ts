import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Beer } from '../models/punk-api.model';

interface CustomBeer {
  id: number;
  name: string;
  genre: string;
  description: string;
}

@Injectable()
export class CustomBeerService {
  private readonly LS_PREFIX = 'CUSTOM_BEER_';
  private readonly DEFAULT_IMG = './assets/imgs/custom-beer.jpg';

  createBeer(
    form: FormGroup<{
      name: FormControl<string>;
      genre: FormControl<string>;
      description: FormControl<string>;
    }>
  ) {
    if (form.invalid) {
      return;
    }
    const formData = { id: Date.now(), ...form.getRawValue() };
    localStorage.setItem(
      `${this.LS_PREFIX}${formData.id}`,
      JSON.stringify(formData)
    );
  }

  getAllBeers(): Observable<Array<Partial<Beer>>> {
    const beers =
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.LS_PREFIX))
        .sort((a, b) => a.localeCompare(b))
        .map(
          (key) => JSON.parse(localStorage.getItem(key) as string) as CustomBeer
        )
        .map((beer) => ({
          ...beer,
          tagline: beer.genre,
          image_url: this.DEFAULT_IMG,
        })) || [];
    return of(beers);
  }
}
