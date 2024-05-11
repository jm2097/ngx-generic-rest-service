# ngx-grs

![NPM Version](https://img.shields.io/npm/v/ngx-grs)
[![NPM downloads](https://img.shields.io/npm/dt/ngx-grs.svg?style=flat-square)](https://www.npmjs.com/package/ngx-grs)

## Installation

```consola
npm install ngx-grs

or

pnpm add ngx-grs

or

yarn add ngx-grs

or

bun add ngx-grs
```

## Usage

1. Create an Angular service and extend it with the `NgxGenericRestService` class:

   ```ts
   @Injectable({ providedIn: "root" })
   export class PlanetsService extends NgxGenericRestService {}
   ```

2. Call the constructor of the `NgxGenericRestService` class and provide the `baseUrl` and `resourceName`:

   ```ts
   @Injectable({ providedIn: "root" })
   export class PlanetsService extends NgxGenericRestService {
      constructor() {
        super({
          baseUrl: "https://dragonball-api.com/api"
          resourceName: "planets",
        });
      }
   }
   ```

3. Use the service somewhere in your code:

   ```ts
   type ApiResponse<T> =
     | {
         items: T[];
         links: {
           first: string;
           last: string;
           next: string;
           previous: string;
         };
         meta: {
           currentPage: number;
           itemCount: number;
           itemsPerPage: number;
           totalItems: number;
           totalPages: number;
         };
       }
     | undefined;

   type Planet = {
     id: number;
     name: string;
     isDestroyed: boolean;
     description: string;
     image: string;
     deletedAt: Date | null;
   };

   type PlanetCreate = Pick<
     Planet,
     "name" | "isDestroyed" | "description" | "image"
   >;

   type PlanetUpdate = Partial<PlanetCreate>;

   @Component({
     selector: "app-root",
     standalone: true,
     templateUrl: "./app.component.html",
   })
   export class SomeComponent implements OnInit {
     #planetsService = inject(PlanetsService);

     planets = signal<ApiResponse<Planet>>(undefined);

     ngOnInit(): void {
       this.#planetsService
         .list<ApiResponse<Planet>>()
         .subscribe(this.planets.set);
     }

     create(planet: PlanetCreate): void {
       this.#planetsService.add<PlanetCreate, Planet>(planet).subscribe();
     }

     update(id: number, planet: PlanetUpdate): void {
       this.#planetsService
         .update<PlanetUpdate, Planet>(id, planet)
         .subscribe();
     }

     delete(id: number): void {
       this.#planetsService.delete<Planet>(id).subscribe();
     }
   }
   ```

## Default HttpClient request options

| Option          | Description                                                                    | Used by                           |
| --------------- | ------------------------------------------------------------------------------ | --------------------------------- |
| headers         | Headers to be attached to a Request                                            | List, Single, Add, Update, Delete |
| params          | Query parameters to be included in a Request.                                  | List, Single, Add, Update, Delete |
| observe         | Determines the return type, according to what you are interested in observing. | List, Single, Add, Update, Delete |
| reportProgress  | Whether this request should be made in a way that exposes progress events.     | List, Single, Add, Update, Delete |
| responseType    | The expected response type of the server.                                      | List, Single, Add, Update, Delete |
| withCredentials | Whether this request should be sent with outgoing credentials (cookies).       | List, Single, Add, Update, Delete |

## Custom HTTP options

| Option     | Description                                                                        | Used by                           |
| ---------- | ---------------------------------------------------------------------------------- | --------------------------------- |
| urlRewrite | Rewrites the entire request API URL                                                | List, Single, Add, Update, Delete |
| urlPostfix | Adds a postfix to the API URL (useful to specify sub-resources)                    | List, Single, Add, Update, Delete |
| method     | Helps the service to understand if it is a PUT or a PATCH request (PUT by default) | Update                            |
| mapFn      | Transforms the API response to the desired output                                  | List, Single, Add, Update, Delete |
