import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AllBreedResponse } from '../models/all-breed-response';
import { BreedImageResponse } from '../models/breed-image-response';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(private http: HttpClient ) { }

  getAllBreeds = () : Promise<AllBreedResponse> =>
    firstValueFrom(this.http.get<AllBreedResponse>("https://dog.ceo/api/breeds/list/all"));

  getImagesFromBreed = (breed: string) : Promise<BreedImageResponse> =>
    firstValueFrom(this.http.get<BreedImageResponse>(`https://dog.ceo/api/breed/${breed}/images`));
}
