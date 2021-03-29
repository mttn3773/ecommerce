import { Document, Model } from "mongoose";
type QueryString = {
  [key: string]: string | string[];
};

export async function applyQueryFeatures<T extends Document>(
  model: Model<T>,
  queryString: QueryString
): Promise<{ data: T[]; count: number }> {
  const filters = parseFilters(queryString);
  const sort = parseSort(queryString);
  const page = queryString.page ? queryString.page : 1;
  const count = await model.count(filters as any);
  const data = await model
    .find(filters as any)
    .sort(sort)
    .skip((parseInt(page as string) - 1) * 6)
    .limit(6);

  return { data, count };
}

const parseFilters = (queryString: QueryString) => {
  const category =
    queryString.category !== "all" ? { category: queryString.category } : {};
  const subcategory = queryString.subcategory
    ? { subcategory: queryString.subcategory }
    : {};
  return { ...category, ...subcategory };
};

const parseSort = (queryString: QueryString) => {
  if (!queryString.sort) return;
  if ((queryString["sort"] as string).split(": ")[0] === "price") {
    if ((queryString["sort"] as string).split(": ")[1] === "lowest") {
      return "price";
    }
    if ((queryString["sort"] as string).split(": ")[1] === "highest") {
      return "-price";
    }
  }
  if (queryString.sort === "newest") return "-createdAt";
  if (queryString.sort === "oldest") return "createdAt";
};
