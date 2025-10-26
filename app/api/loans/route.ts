import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${backendUrl}/api/loans`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("FastAPI returned error:", errorText);
      return NextResponse.json(
        { error: "Error from FastAPI", details: errorText }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching loans:", error);
    return NextResponse.json(
      { error: "No se pudo obtener los préstamos", details: String(error) }, 
      { status: 500 } 
    );
  }
}