const PaginationStateProvider = class {
    constructor(baseRoute, page, lastPage, totalItemsCount){
        this.baseRoute = baseRoute;
        this.currentPage = page;
        this.lastPage = lastPage;
        this.totalItemsCount = totalItemsCount;
    }

    get routeToFirst() {
        return `${this.baseRoute}/1`;
    }

    get routeToPrev() {
        return `${this.baseRoute}/${this.currentPage - 1}`;
    }

    get routeToNext() {
        return `${this.baseRoute}/${this.currentPage + 1}`;
    }

    get routeToLast() {
        return `${this.baseRoute}/${this.lastPage}`;
    }

    get isToFirstActive() {
        return this.currentPage > 1;
    }

    get isToPrevActive() {
        return this.currentPage > 1;
    }

    get isToNextActive() {
        return this.currentPage < this.lastPage;
    }

    get isToLastActive() {
        return this.currentPage < this.lastPage;
    }
};

export default PaginationStateProvider;