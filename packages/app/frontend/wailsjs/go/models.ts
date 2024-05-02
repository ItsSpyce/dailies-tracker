export namespace main {
	
	export class Commission {
	    id: number;
	    description: string;
	    realm: string;
	    completed: boolean;
	    rewards: string;
	
	    static createFrom(source: any = {}) {
	        return new Commission(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.description = source["description"];
	        this.realm = source["realm"];
	        this.completed = source["completed"];
	        this.rewards = source["rewards"];
	    }
	}

}

