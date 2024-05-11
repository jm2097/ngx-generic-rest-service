import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type {
	HttpAddOptions,
	HttpConfig,
	HttpDeleteOptions,
	HttpGetListOptions,
	HttpGetSingleOptions,
	HttpMethod,
	HttpUpdateOptions,
} from './ngx-generic-rest.types';
import { extractRequestOptions, mapResponse, resolveUrl } from './ngx-generic-rest.utils';

export class NgxGenericRestService {
	#httpClient = inject(HttpClient);

	constructor(protected httpConfig: HttpConfig) {
		this.httpConfig = httpConfig;
	}

	get url(): string {
		const { baseUrl, resourceName } = this.httpConfig;
		return `${baseUrl}/${resourceName}`;
	}

	/**
	 * Exposes HTTP client service to allow custom HTTP requests
	 * @returns HTTP client service
	 */
	getHttpClient(): HttpClient {
		return this.#httpClient;
	}

	/**
	 * Performs a GET HTTP request
	 * @param options custom specific HTTP options for GET list requests
	 * @returns generic type | list of objects
	 */
	list<ResponseType>(options?: HttpGetListOptions): Observable<ResponseType> {
		const method: HttpMethod = 'GET';
		const url = resolveUrl(this.url, options);
		const requestOptions = extractRequestOptions(options);

		return this.#httpClient.request<ResponseType>(method, url, requestOptions).pipe(mapResponse(options));
	}

	/**
	 * Performs a GET HTTP request
	 * @param options custom specific HTTP options for GET single requests
	 * @returns generic type | single object
	 */
	single<ResponseType>(id: string | number, options?: HttpGetSingleOptions): Observable<ResponseType> {
		const method: HttpMethod = 'GET';
		const url = resolveUrl(this.url, options, id.toString());
		const requestOptions = extractRequestOptions(options);

		return this.#httpClient.request<ResponseType>(method, url, requestOptions).pipe(mapResponse(options));
	}

	/**
	 * Performs a POST HTTP request (flexible for bulk inserting)
	 * @param options custom specific HTTP options for Add requests
	 * @returns generic type | single object or list of objects
	 */
	add<BodyType, ResponseType = BodyType>(body: BodyType, options?: HttpAddOptions): Observable<ResponseType> {
		const method: HttpMethod = 'POST';
		const url = resolveUrl(this.url, options);
		const requestOptions = { ...extractRequestOptions(options), body };

		return this.#httpClient.request<ResponseType>(method, url, requestOptions).pipe(mapResponse(options));
	}

	/**
	 * Performs a PUT | PATCH HTTP request (flexible for bulk updating)
	 * @param options custom specific HTTP options for Update requests
	 * @returns generic type | single object or list of objects
	 */
	update<BodyType, ResponseType = BodyType>(
		id: string | number,
		body: BodyType,
		options?: HttpUpdateOptions,
	): Observable<ResponseType> {
		const method: HttpMethod = options?.method || 'PUT';
		const url = resolveUrl(this.url, options, id.toString());
		const requestOptions = { ...extractRequestOptions(options), body };

		return this.#httpClient.request<ResponseType>(method, url, requestOptions).pipe(mapResponse(options));
	}

	/**
	 * Performs a DELETE HTTP request (flexible for bulk deleting)
	 * @param options custom specific HTTP options for Delete requests
	 * @returns generic type | single object or list of objects
	 */
	delete<ResponseType>(id: string | number, options?: HttpDeleteOptions): Observable<ResponseType> {
		const method: HttpMethod = 'DELETE';
		const url = resolveUrl(this.url, options, id.toString());
		const requestOptions = extractRequestOptions(options);

		return this.#httpClient.request<ResponseType>(method, url, requestOptions).pipe(mapResponse(options));
	}
}
