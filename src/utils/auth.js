import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession } from "next-auth";

export const authOptions = {

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

      checks: ['none'],
    }),
  ],


//   callbacks:{
//     jwt: async({token})=>{
  
//       const userInfo = await prisma.user.findUnique({
//         where: {
//           email: token.email 
//         }
  
//       })
//       if (userInfo){
//         userInfo.emailVerified = undefined
//       }
//       token.user = userInfo
  
//       return token
  
//     },
  
//     session: async({session, token}) => {
  
//       session.user = token.user
  
//       return session
  
//     }
    
//   },
//   session:{
//     strategy: "jwt"
//   },
  
 };

export const getAuthSession = () => getServerSession(authOptions);
