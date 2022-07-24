import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { serialize } from "cookie";
import { resolve } from "path";
import {
  createUserSchema,
  requestOtpSchema,
  verifyOtpSchema,
} from "../../schema/user.schema";
import { createRouter } from "./context";
import * as trpcServer from "@trpc/server";
import { decode64, encode64 } from "../../utils/base64";
import { baseUrl } from "../../constants";
import { sendLoginEmail } from "../../utils/mailer";
import { signJWT } from "../../utils/jwt";
import * as bcrypt from "bcrypt";

export const userRouter = createRouter()
  .mutation("register-user", {
    input: createUserSchema,
    async resolve({ ctx, input }) {
      const { email, name, password } = input;
      const hashPassword = await bcrypt.hash(password, 10);
      if (!hashPassword) {
        throw new trpcServer.TRPCError({
          code: "FORBIDDEN",
          message: "Error on hashing password",
        });
      }
      try {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            name,
            password: hashPassword,
          },
        });

        //create token for verifying email
        const redirect = "/login";
        const token = await ctx.prisma.loginToken.create({
          data: {
            redirect,
            user: {
              connect: {
                email: user.email,
              },
            },
          },
        });

        sendLoginEmail({
          token: encode64(`${token.id}:${user.email}`),
          url: baseUrl,
          email: user.email,
        });

        return { email, name };
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpcServer.TRPCError({
              code: "CONFLICT",
              message: "User already existed",
            });
          }
        }

        throw new trpcServer.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  })
  .mutation("request-otp", {
    input: requestOtpSchema,
    async resolve({ input, ctx }) {
      const { email, redirect } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new trpcServer.TRPCError({
          code: "NOT_FOUND",
          message: "User not fouund",
        });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      sendLoginEmail({
        token: encode64(`${token.id}:${user.email}`),
        url: baseUrl,
        email: user.email,
      });

      return true;
    },
  })
  .query("verify-otp", {
    input: verifyOtpSchema,
    async resolve({ input, ctx }) {
      const decoded = decode64(input.hash).split(":");

      const [id, email] = decoded;

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      });

      if (!token) {
        throw new trpcServer.TRPCError({
          code: "FORBIDDEN",
          message: "Invalid token",
        });
      }

      const updateUser = await ctx.prisma.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: new Date(),
        },
      });

      const jwt = signJWT({
        email: token.user.email,
        id: token.user.id,
      });

      ctx.res.setHeader("Set-Cookie", serialize("token", jwt, { path: "/" }));

      return {
        redirect: token.redirect,
      };
    },
  })
  .query("me", {
    resolve({ ctx }) {
      return ctx.user;
    },
  });
