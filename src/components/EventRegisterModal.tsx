import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Department } from "@/model/UserModel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistrationRequest } from "@/types/RegistrationRequest";

interface EventRegisterModalProps {
  open: boolean;
  onClose: () => void;
  eventName: string;
  onRegister: (formData: RegistrationRequest) => void;
}

export default function EventRegisterModal({
  open,
  onClose,
  eventName,
  onRegister,
}: EventRegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState<Department | "">("");

  const handleSubmit = () => {
    const formData = {
      name,
      email,
      department: dept as Department,
      isAdmin: false,
      eventName,
    };

    onRegister(formData);
    setName("");
    setEmail("");
    setDept("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Register for
            <div className="text-3xl my-2">{eventName}</div>
          </DialogTitle>
          <DialogDescription>Enter your details below.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Select
          value={dept}
          onValueChange={(value) => setDept(value as Department)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Your Department 👇</SelectLabel>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Information Technology">
                Information Technology
              </SelectItem>
              <SelectItem value="Artificial intelligence & DS">
                Artificial intelligence & DS
              </SelectItem>
              <SelectItem value="Electronics & Communication">
                Electronics & Communication
              </SelectItem>
              <SelectItem value="Electrical Engineering">
                Electrical Engineering
              </SelectItem>
              <SelectItem value="Mechanical Engineering">
                Mechanical Engineering
              </SelectItem>
              <SelectItem value="Civil Engineering">
                Civil Engineering
              </SelectItem>
              <SelectItem value="Industrial Production">
                Industrial Production
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
