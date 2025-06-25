import { Department } from "@/model/UserModel";

export interface RegistrationRequest {
  name: string;
  email: string;
  department: Department;
  eventName: string;
}
