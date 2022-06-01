export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export function isUser(user: unknown): user is User {
  return !!(user as User).first_name && !!(user as User).last_name;
}
