import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer, Cache, PunkApiRequestOptions } from '../models/punk-api.model';
import { h64 } from 'xxhashjs';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class PunkApiService {
  private readonly REST_ENDPOINT = 'https://api.punkapi.com/v2/beers';
  private readonly CACHE_SEED = Date.now();
  private readonly CACHE_EXPIRES_IN_MINUTES = 5;

  private cache = new Map<string, Cache<Observable<Array<Beer>>>>();

  constructor(private readonly http: HttpClient) {}

  public getFilteredBeers(
    filterOptions: Partial<PunkApiRequestOptions> = {},
    size = 10,
    page = 1
  ): Observable<Array<Beer>> {
    const fullParams = { ...filterOptions, per_page: size, page };
    // Cache using hash
    const cacheKey = this.getCacheKey(fullParams);
    if (!cacheKey) {
      // The filterOptions is invalid! Why bother sending false response?
      console.error(
        'PunkApiService: The filterOptions provided to getFilteredBeers() is invalid!'
      );
      return of([]);
    }
    if (this.cache.has(cacheKey)) {
      const cache = this.cache.get(cacheKey);
      if (cache && Date.now() < cache.expires) {
        // We have cached value, and it is fresh
        console.log('PunkApiService: Returned from cache');
        return cache.value;
      }
    }
    // No cache available, create one
    const expiry = new Date(Date.now());
    expiry.setMinutes(expiry.getMinutes() + this.CACHE_EXPIRES_IN_MINUTES);
    this.cache.set(cacheKey, {
      value: this.http
        .get<Array<Beer>>(this.REST_ENDPOINT, {
          params: fullParams,
        })
        .pipe(shareReplay(1)),
      expires: expiry.getTime(),
    });

    // We know we will have value in cache at this point, so using as to inform TS about it
    const fromCache = this.cache.get(cacheKey) as Cache<
      Observable<Array<Beer>>
    >;
    return fromCache.value;
  }

  private getCacheKey(filterOptions: Record<string, unknown>): string {
    let stringifiedJSON: string;
    try {
      stringifiedJSON = JSON.stringify(filterOptions);
    } catch (error) {
      // The request was invalid, so sending empty string!
      return '';
    }
    return h64(stringifiedJSON, this.CACHE_SEED).toString();
  }
}
