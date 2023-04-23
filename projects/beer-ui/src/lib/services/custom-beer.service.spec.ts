import { TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomBeerService } from './custom-beer.service';
import { Beer } from '../models/punk-api.model';

describe('CustomBeerService', () => {
  let service: CustomBeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [CustomBeerService],
    });
    service = TestBed.inject(CustomBeerService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createBeer', () => {
    it('should add the custom beer to local storage', () => {
      const form = new FormGroup({
        name: new FormControl('Test Beer') as FormControl<string>,
        genre: new FormControl('Test Genre') as FormControl<string>,
        description: new FormControl('Test Description') as FormControl<string>,
      });
      const beforeAddCount = localStorage.length;
      service.createBeer(form);
      const afterAddCount = localStorage.length;
      expect(afterAddCount).toEqual(beforeAddCount + 1);
    });

    it('should not add the custom beer to local storage if form is invalid', () => {
      const form = new FormGroup({
        name: new FormControl('Test Beer') as FormControl<string>,
        genre: new FormControl('', [
          Validators.required,
        ]) as FormControl<string>,
        description: new FormControl('Test Description') as FormControl<string>,
      });
      const beforeAddCount = localStorage.length;
      service.createBeer(form);
      const afterAddCount = localStorage.length;
      expect(afterAddCount).toEqual(beforeAddCount);
    });
  });

  describe('getAllBeers', () => {
    it('should return an observable of array of custom beers with tagline and image url added', () => {
      const beer1: Partial<Beer & { genre: string }> = {
        id: 1,
        name: 'Test Beer 1',
        genre: 'Test Genre 1',
        description: 'Test Description 1',
      };
      const beer2: Partial<Beer & { genre: string }> = {
        id: 2,
        name: 'Test Beer 2',
        genre: 'Test Genre 2',
        description: 'Test Description 2',
      };
      localStorage.clear();
      localStorage.setItem(`CUSTOM_BEER_${beer1.id}`, JSON.stringify(beer1));
      localStorage.setItem(`CUSTOM_BEER_${beer2.id}`, JSON.stringify(beer2));

      let result: Array<Partial<Beer>> | undefined;
      service.getAllBeers().subscribe((beers) => (result = beers));
      expect(result?.length).toEqual(2);
      expect(result?.[0].id).toEqual(beer1.id);
      expect(result?.[0].name).toEqual(beer1.name);
      expect(result?.[0].tagline).toEqual(beer1.genre);
      expect(result?.[0].description).toEqual(beer1.description);
      expect(result?.[0].image_url).toEqual('./assets/imgs/custom-beer.jpg');
      expect(result?.[1].id).toEqual(beer2.id);
      expect(result?.[1].name).toEqual(beer2.name);
      expect(result?.[1].tagline).toEqual(beer2.genre);
      expect(result?.[1].description).toEqual(beer2.description);
      expect(result?.[1].image_url).toEqual('./assets/imgs/custom-beer.jpg');
    });

    it('should return an empty array if there is no custom beer in local storage', () => {
      let result: Array<Partial<Beer>> | undefined;
      service.getAllBeers().subscribe((beers) => (result = beers));
      expect(result?.length).toEqual(0);
    });
  });
});
