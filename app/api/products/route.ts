import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app/examples/dynamic-route/data/products.json");

// Tüm ürünleri getir
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const prodID = searchParams.get("prodID");

    const data = await fs.readFile(filePath, "utf8");
    const products = JSON.parse(data);

    if (!prodID) {
      return NextResponse.json(products);
    }

    const product = products.find((p: any) => p.id === prodID);
    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Veri okunurken hata oluştu." }, { status: 500 });
  }
}
