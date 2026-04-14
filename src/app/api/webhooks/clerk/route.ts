import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export const POST = async (req: NextRequest) => {
  try {
    const event = await verifyWebhook(req);
    if (event.type === "user.created") {
      const user = event.data;
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.email_addresses?.[0]?.email_address ?? "",
          name: user.first_name + " " + user.last_name,
        },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err, "error from server");
    return NextResponse.json({ err }, { status: 500 });
  }
};
