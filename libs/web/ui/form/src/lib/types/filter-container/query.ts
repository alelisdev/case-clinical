export enum FilterOperator {
  Equal,
  Between,
  In
}

export class FilterExpression {
  key: string;
  operator: FilterOperator;
  value: any;
}

export class FetchQuery {
  state: {
    filterExpressions: FilterExpression[],
    selectExpressions: any[],
    groupExpressions: any[],
    orderExpressions: any[],
    calculation: false,
    rawMode: false,
    withDead: false,
    validateRefs: true,
    limit: null,
    offset: null,
  };

  constructor(state) {
    this.state = {
      filterExpressions: state.filterExpressions || [],
      selectExpressions: state.selectExpressions || [],
      groupExpressions: state.groupExpressions || [],
      orderExpressions: state.orderExpressions || [],
      calculation: false,
      rawMode: false,
      withDead: false,
      validateRefs: true,
      limit: null,
      offset: null,
      ...state
    };
  }

  filter(expr) {
    return new FetchQuery({
      ...this.state,
      filterExpressions: [...this.state.filterExpressions, expr]
    });
  }

  unfilter(exprs) {
    const exprSet = new Set(exprs);
    return new FetchQuery({
      ...this.state,
      filterExpressions: this.state.filterExpressions.filter(
        expr => !exprSet.has(expr.key)
      )
    });
  }

  select(exprs = []) {
    if (!Array.isArray(exprs)) {
      exprs = [exprs];
    }

    const query = new FetchQuery({ ...this.state, selectExpressions: exprs });
    query.state.calculation = false;
    return query;
  }

  // calculate(expr) {
  //   const query = this.select({ result: expr });
  //   query.state.calculation = true;
  //   return query;
  // }

  groupBy(exprs) {
    if (!Array.isArray(exprs)) {
      exprs = [exprs];
    }

    return new FetchQuery({
      ...this.state,
      groupExpressions: [...this.state.groupExpressions, ...exprs]
    });
  }

  orderBy(exprs) {
    if (!Array.isArray(exprs)) {
      exprs = [exprs];
    }

    return new FetchQuery({
      ...this.state,
      orderExpressions: [...this.state.orderExpressions, ...exprs]
    });
  }

  limit(num) {
    return new FetchQuery({ ...this.state, limit: num });
  }

  offset(num) {
    return new FetchQuery({ ...this.state, offset: num });
  }

  raw() {
    return new FetchQuery({ ...this.state, rawMode: true });
  }

  withDead() {
    return new FetchQuery({ ...this.state, withDead: true });
  }

  withoutValidatedRefs() {
    return new FetchQuery({ ...this.state, validateRefs: false });
  }

  options(opts) {
    return new FetchQuery({ ...this.state, tableOptions: opts });
  }

  serialize() {
    return this.state;
  }
}

function getPrimaryOrderBy(query, defaultOrderBy) {
  const orderExprs = query.serialize().orderExpressions;
  if (orderExprs.length === 0) {
    if (defaultOrderBy) {
      return { order: 'asc', ...defaultOrderBy };
    }
    return null;
  }

  const firstOrder = orderExprs[0];
  if (typeof firstOrder === 'string') {
    return { field: firstOrder, order: 'asc' };
  }
  // Handle this form: { field: 'desc' }
  const [field] = Object.keys(firstOrder);
  return { field, order: firstOrder[field] };
}
