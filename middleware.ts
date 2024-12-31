import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Tentukan rute yang bersifat publik
const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Rute selain yang diizinkan harus menggunakan autentikasi
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Lewati file internal Next.js dan semua file statis
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Jalankan middleware untuk semua rute API
    "/(api|trpc)(.*)",
  ],
};
