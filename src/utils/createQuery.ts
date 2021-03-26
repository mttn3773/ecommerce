import { Document, Model } from "mongoose";
type QueryString = {
  [key: string]: string | string[];
};

export async function applyQueryFeatures<T extends Document>(
  model: Model<T>,
  queryString: QueryString
): Promise<{ data: T[]; count: number }> {
  const category =
    queryString.category !== "all" ? { category: queryString.category } : {};
  const subcategory = queryString.subcategory
    ? { subcategory: queryString.subcategory }
    : {};
  const filters = { ...category, ...subcategory };
  const sort = queryString.sort === "newest" ? "createdAt" : "-createdAt";
  const page = queryString.page ? queryString.page : 1;
  const count = await model.count(filters as any);
  const data = await model
    .find(filters as any)
    .skip((parseInt(page as string) - 1) * 6)
    .sort(sort)
    .limit(6);

  return { data, count };
}
