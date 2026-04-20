import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Tenta estabelecer a conexão usando o nosso arquivo de configuração do Mongoose
    await dbConnect();
    
    // Verifica o estado da conexão (1 significa conectado)
    const readyState = mongoose.connection.readyState;
    const dbName = mongoose.connection.name;
    
    // Obtém as coleções existentes no banco
    const collections = await mongoose.connection.db?.listCollections().toArray();
    
    return NextResponse.json({ 
      status: "Conectado com sucesso ao MongoDB!", 
      database: dbName,
      estado: readyState === 1 ? "Ativo" : "Inativo",
      colecoes: collections?.map(c => c.name) || []
    });
  } catch (e) {
    return NextResponse.json({ 
      status: "Erro na conexão", 
      error: e instanceof Error ? e.message : "Erro desconhecido" 
    }, { status: 500 });
  }
}
