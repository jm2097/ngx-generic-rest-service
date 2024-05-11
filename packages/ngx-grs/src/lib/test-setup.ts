import { Injectable } from '@angular/core';
import { NgxGenericRestService } from './ngx-generic-rest.service';

export type TestApiResponse<T> = {
	items: T[];
	total: number;
};

export type TestEntity = {
	id?: string | number;
	foo?: string;
	bar?: number;
};

@Injectable({ providedIn: 'root' })
export class TestService extends NgxGenericRestService {
	constructor() {
		super({
			baseUrl: 'inline-base-url',
			resourceName: 'inline-resource-name',
		});
	}
}
