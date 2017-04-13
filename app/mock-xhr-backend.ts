import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('handsets?category=') >= 0 || request.url === 'handsets') {
            var category;
            if (request.url.indexOf('?') >= 0) {
              category = request.url.split('=')[1];
              if (category === 'undefined') category = '';
            }
            var handsets;
            if (category) {
              handsets = this._handsets.filter(handset => handset.category === category);
            } else {
              handsets = this._handsets;
            }
            responseOptions = new ResponseOptions({
              body: { handsets: JSON.parse(JSON.stringify(handsets)) },
              status: 200
            });
          } else {
            var id = parseInt(request.url.split('/')[1]);
            handsets = this._handsets.filter(handset => handset.id === id);
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(handsets[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var handset = JSON.parse(request.text().toString());
          handset.id = this._getNewId();
          this._handsets.push(handset);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this._deleteHandset(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  _deleteHandset(id) {
    var handset = this._handsets.find(handset => handset.id === id);
    var index = this._handsets.indexOf(handset);
    if (index >= 0) {
      this._handsets.splice(index, 1);
    }
  }

  _getNewId() {
    if (this._handsets.length > 0) {
      return Math.max.apply(Math, this._handsets.map(handset => handset.id)) + 1;
    }
  }

  _handsets = [
    {
      id: 0,
      name: "Firebug",
      category: "Series",
      category1: "Science Fiction",
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 1,
      name: "Firebug",
      category: "Series",
      category1: "Science Fiction",
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 2,
      name: "The Small Tall",
      category: "Movies",
      category1: "Comedy",
      year: 2015,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 3,
      name: "The Redemption",
      category: "Movies",
      category1: "Action",
      year: 2016,
      watchedOn: null,
      isFavorite: false
    }, {
      id: 4,
      name: "Hoopers",
      category: "Series",
      category1: "Drama",
      year: null,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 5,
      name: "Happy Joe: Cheery Road",
      category: "Movies",
      category1: "Action",
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false
    }
  ];
}