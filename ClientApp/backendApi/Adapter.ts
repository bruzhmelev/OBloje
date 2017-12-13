import * as $ from 'jquery';

export class Adapter {

    private static url: string;
    private static id: string | null = null;
    private static xhr: { [path: string]: JQueryXHR } = {};
    private static fakeResult: any = null;

    private static request(url: string, type: string, data: any = null) {
        const config = data
            ? { url, type, data, dataType: 'json' }
            : { url, type };
        if (this.fakeResult !== null) {
            return new Promise((resolve, reject) => resolve(this.fakeResult));
        }
        return new Promise((res, rej) => {
            const id = this.id || url;
            this.xhr[id] = $.ajax(config);
            this.xhr[id].then(
                res,
                (...args: any[]) => {
                    this.rejectHandler.apply(this, args);
                    rej.apply(this, args);
                }
            );
        })
    }

    private static rejectHandler(...args: any[]) {
        console.log(args);
    }

    static get(data?: any): Promise<any> {
        return this.request(this.url, 'GET', data);
    }

    static put(data?: any): Promise<any> {
        return this.request(this.url, 'PUT', data);
    }

    static post(data?: any): Promise<any> {
        return this.request(this.url, 'POST', data);
    }

    static delete(data?: any): Promise<any> {
        return this.request(this.url, 'DELETE', data);
    }

    static path(url: string, id?: string) {
        this.url = url;
        if (id) this.id = id;
        return this;
    }

    static abort(id: string) {
        if (this.xhr[id] != null) {
            this.xhr[id].abort();
        }
    }

    static setFakeResult(result: any) {
        this.fakeResult = result;
    }
}