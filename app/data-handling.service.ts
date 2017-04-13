import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DataHandling {
  constructor(private http: Http) { }

  add(handset) {
    return this.http.post('handsets', handset)
      .map(response => { });
  }
  get(handset) {
    let searchCategory = new URLSearchParams();
    searchCategory.append('handset', handset);
    return this.http.get('handsets', { search: searchCategory }).map(response => {
      return response.json().handsets;
    });
  }
  delete(handset) {
    return this.http.delete(`handsets/${handset.id}`)
      .map(response => {});
  }
}