export namespace main {
	
	export class Reward {
	    id: number;
	    type: string;
	    count: number;
	    imageBase64: string;
	
	    static createFrom(source: any = {}) {
	        return new Reward(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.type = source["type"];
	        this.count = source["count"];
	        this.imageBase64 = source["imageBase64"];
	    }
	}
	export class Commission {
	    id: number;
	    description: string;
	    realm: string;
	    completed: boolean;
	    rewards: Reward[];
	
	    static createFrom(source: any = {}) {
	        return new Commission(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.description = source["description"];
	        this.realm = source["realm"];
	        this.completed = source["completed"];
	        this.rewards = this.convertValues(source["rewards"], Reward);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

