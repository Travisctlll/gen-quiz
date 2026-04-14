import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "../../../../lib/prisma";

export const GET = async () => {
  try {
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: {
        clerkId: session.userId,
      },
    });

    if (!user) {
      const clerkUser = await (await clerkClient()).users.getUser(
        session.userId
      );
      const primaryEmail =
        clerkUser.emailAddresses?.find(
          (email) => email.id === clerkUser.primaryEmailAddressId
        )?.emailAddress ?? clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
      const fullName =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
        clerkUser.username ||
        "";

      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: primaryEmail,
          name: fullName,
        },
      });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err, { status: 500 });
  }
};
