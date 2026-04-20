import mongoose from "mongoose";

declare global {
  var mongoose: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conn: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    promise: any;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.warn("Aviso: MONGODB_URI não está definida. O banco de dados não conectará.");
}

// Em ambientes serverless (como Vercel), precisamos fazer o cache da conexão
// para evitar múltiplas conexões concorrentes.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI não definida no .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Conectado ao MongoDB!");
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
