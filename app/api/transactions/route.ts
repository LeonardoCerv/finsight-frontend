import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${backendUrl}/api/transactions`);
    
    const text = await res.text();
    console.log("FastAPI Response Status:", res.status);
    console.log("FastAPI Response Text:", text.substring(0, 200)); 
    
    if (!res.ok) {
      console.error("FastAPI returned error:", text);
      return NextResponse.json(
        { error: "Error from FastAPI", details: text }, 
        { status: res.status }
      );
    }
    
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      console.error("Response was:", text);
      return NextResponse.json(
        { error: "Invalid JSON response from FastAPI", response: text }, 
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error("Error desde FastAPI:", error);
    return NextResponse.json(
      { error: "No se pudo obtener las transacciones", details: String(error) }, 
      { status: 500 }
    );
  }
}