export interface TSessionUser {
  name: string;
  email: string;
  image?: string | null;
  role: "user" | "author" | "admin";
}

