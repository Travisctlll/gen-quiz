import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/api/webhooks/clerk")) {
    return;
  }

  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|api/webhooks/clerk|.*\\.(?:css|js|png|jpg|jpeg|svg|ico|woff2?)).*)",
  ],
};
