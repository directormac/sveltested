export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export type UserLoginInput = Omit<
  User,
  "firstName" | "lastName" | "dateOfBirth"
>;
