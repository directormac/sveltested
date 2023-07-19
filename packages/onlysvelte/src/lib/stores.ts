import { writable } from "svelte/store";
import type { User } from "./types";

export const currentUserStore = writable<User>({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
});
