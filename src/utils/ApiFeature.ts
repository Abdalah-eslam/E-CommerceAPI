import aqp from "api-query-params";

class Apifeature {
    query: any;
    queryString: any;
    page: any = 1;
    limit: number = 10;
    sort: any;
    fields: any;
    filters: any;
    total: number =0;
    
    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
const { page, limit, sort, fields, ...filters } = this.queryString
        this.page = Number(page) || 1;
        this.limit = Number(limit) || 10;
        this.sort = sort;
        this.fields = fields;
        this.filters = filters;
}

filter() {
    const filterObj = aqp(this.filters);
this.query = this.query.find(filterObj.filter|| {});
    return this;
}

sorting(){
    const {sort} = aqp(this.queryString);
    this.query = this.query.sort(sort|| {});
    return this;
}
limitFields(){
    const {projection} = aqp(this.queryString);
    this.query = this.query.select(projection|| {});
    return this;
}

pagination(){
    const  {limit} = aqp(this.queryString);
    const page = Number(this.queryString.page) || 1;
    this.page =  page;
    this.limit = Number(limit) || 10;
    const skip = (this.page - 1) * this.limit;
    this.query = this.query.skip(skip).limit(this.limit);
    console.log('this.page',this.page);
    console.log('this.limit',this.limit);
    console.log('this.filters',this.filters);
    console.log('this.sort',this.sort);
    console.log('this.fields',this.fields);
    return this;
}

async count (model :any) {
    const filterObj = aqp(this.filters);
    this.total =await model.countDocuments(filterObj.filter|| {}); 
    console.log('this.total',this.total);
    return this;

}






}



export default Apifeature