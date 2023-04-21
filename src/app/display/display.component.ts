import { Component, OnInit, Inject } from '@angular/core';
import { DogService } from '../services/dog.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  speciesFormControl = new FormControl('');
  species = [""];
  images = [""]
  currentSpecies = "";
  currentIndex = 0;

  constructor(private dogService: DogService,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document) {
    this.speciesFormControl.valueChanges.subscribe(async newSpecies => {
      this.currentSpecies = newSpecies ?? "";
      var imageResponse = await this.dogService.getImagesFromBreed(newSpecies ?? "");
      this.images = imageResponse.message;
    })
  }

  async ngOnInit(): Promise<void> {
    var response = await this.dogService.getAllBreeds();
    this.species = Object.keys(response.message);
  }

  get getCurrentImage() {
    return this.images[this.currentIndex];
  }

  handlePageEvent(event: PageEvent) {
    this.currentIndex = event.pageIndex;
  }

  get getImageLength() {
    return this.images.length;
  }

  initiatePet() {
    this._snackBar.open(`YOU PETTED A ${this.currentSpecies.toUpperCase()} :)`, "Wow, what a feeling.");
  }

  navigateToWikipedia() {
    this.document.location.href = 'https://en.wikipedia.org/wiki/Dog';
  }

}
