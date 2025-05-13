import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extend the built-in session interface with custom fields
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
    }
  }
  
  /**
   * Extend the built-in user interface with custom fields
   */
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT token interface with custom fields
   */
  interface JWT {
    userId: string;
    role: string;
  }
} 