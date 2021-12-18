class PublishError extends Error {
    constructor(){
        super()
    }
}


export class DevtoError extends PublishError {
    constructor(){
        super();
        this.message = "Failed to publish to Dev.to"
        this.name = "dev.to publish error"
    }
}

export class HashnodeError extends PublishError {
    constructor(){
        super();
        this.message = "Failed to publish to hashnode",
        this.name = "hashnode publish error";
    }
}