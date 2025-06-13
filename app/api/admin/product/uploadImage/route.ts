import { NextRequest, NextResponse } from "next/server";

import {
  uploadImageToSupabase,
  createTempImage,
} from "@lib/services/prismaServices";

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const files = formData.getAll("image") as File[];

    // Validate files array is not empty
    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Process the first file
    const fileToStorage = files[0];

    // Upload file to Supabase
    const uploadData = await uploadImageToSupabase(fileToStorage);

    // Create temp image record
    const tempImage = await createTempImage(uploadData.path);

    // Return response with created TempImage data
    return NextResponse.json(tempImage);
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: err.message || "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
