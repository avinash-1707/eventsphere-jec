import { Department } from "@/model/UserModel";

export interface User {
  name: string;
  email: string;
  department: Department;
  isAdmin: boolean;
}
