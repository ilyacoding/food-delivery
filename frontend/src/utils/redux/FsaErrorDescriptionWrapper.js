class FsaErrorDescriptionWrapper extends Error {
    constructor(errorDescription) {
        super();
        this.errorDescription = errorDescription;
    }
}

export default FsaErrorDescriptionWrapper;