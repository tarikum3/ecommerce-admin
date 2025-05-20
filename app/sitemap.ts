import { MetadataRoute } from "next";
export const dynamic = "force-dynamic";
type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // let fetchedRoutes: Route[] = [];

  // try {
  //   fetchedRoutes = (
  //     await Promise.all([collectionsPromise, productsPromise])
  //   ).flat();
  // } catch (error) {
  //   throw JSON.stringify(error, null, 2);
  // }

  // return [...routesMap, ...fetchedRoutes];
  return [...routesMap];
}
