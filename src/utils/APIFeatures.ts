import { Document, Query } from "mongoose";

type QueryString = {
  [key: string]: string | string[];
};

export class APIFeatuers<T extends Document> {
  public query: Query<T[], T>;
  private queryString: QueryString;
  constructor(query: Query<T[], T>, queryString: QueryString = {}) {
    this.queryString = queryString;
    this.query = query;
  }
  filtering() {
    if (this.queryString.category && this.queryString.category !== "all")
      this.query.find({ category: this.queryString.category } as any);

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const value = this.queryString.sort === "newest" ? "" : "-";
      this.query.sort(`${value}createdAt`);
    }
    return this;
  }
  paginating() {
    if (this.queryString.page) {
      const { page } = this.queryString;
      this.query.skip((parseInt(page[0]) - 1) * 6).limit(6);
    }
    return this;
  }
  debug() {
    return this.queryString;
  }
}
