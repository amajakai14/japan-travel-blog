// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "../db/client";
import { NextApiRequest } from "next";
import { verifyJWT } from "../../utils/jwt";

interface CtxUser {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;

  if (token) {
    try {
      const verified = verifyJWT<CtxUser>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }
}

export const createContext = ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const user = getUserFromRequest(req);
  return {
    req,
    res,
    prisma,
    user,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
