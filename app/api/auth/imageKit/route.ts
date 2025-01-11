import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const { privateKey, publicKey, urlEndpoint } = config.env.imagekit;

const imagekit = new ImageKit({
  privateKey,
  publicKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
