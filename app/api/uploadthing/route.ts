// app/api/uploadthing/route.ts
import { createRouteHandler as createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Ekspor handler route untuk app router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
