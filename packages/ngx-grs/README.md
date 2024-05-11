# ngx-grs

[![NPM downloads](https://img.shields.io/npm/dt/ngx-grs.svg?style=flat-square)](https://www.npmjs.com/package/ngx-grs)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/juanmesa2097/ngx-grs/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/juanmesa2097/ngx-grs/blob/main/CONTRIBUTING.md)

## Installation

```consola
npm install ngx-grs
```

or

```consola
yarn add ngx-grs
```

## Usage

1. Create Angular service (e.g., tasksService):

   ```consola
   ng generate service tasks
   ```

2. Extend Angular service from `NgxGenericRestService`:

   ```ts
   @Injectable({ providedIn: "root" })
   export class TasksService extends NgxGenericRestService {}
   ```

3. Call the constructor of the `NgxGenericRestService` class and provide the `baseUrl` and `resourceName`:

   ```ts
   @Injectable({ providedIn: "root" })
   export class TasksService extends NgxGenericRestService {
     constructor() {
       super({
         baseUrl: "https://example.com/api", // environment.apiUrl
         resourceName: "tasks", // API controller
       });
       // endpoint: https://example.com/api/tasks
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
