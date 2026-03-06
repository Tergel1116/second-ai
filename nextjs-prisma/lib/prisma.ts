import { connect } from "http2";
import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.PRISMA_DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

export default prisma;
