import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import formatDate from "@/helpers/formatDate";
import { Button } from "./ui/button";

interface EventCardProps {
  bannerUrl: string;
  name: string;
  description: string;
  time: Date;
  onRegisterClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  bannerUrl,
  name,
  description,
  time,
  onRegisterClick,
}) => (
  <Card className="w-full  h-fit bg-green-100/80 dark:bg-purple-900/10 border border-zinc-200 dark:border-zinc-800 shadow-md transition-all">
    <CardHeader className="p-0">
      <img
        src={bannerUrl}
        alt={name}
        className="w-11/12 h-80 object-fit rounded-t-md mx-4"
      />
    </CardHeader>
    <CardContent className="p-4">
      <CardTitle className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {name}
      </CardTitle>
      <CardDescription className="text-md text-zinc-600 dark:text-zinc-400 mb-4">
        {description}
      </CardDescription>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {formatDate(time.toString())}
      </div>
    </CardContent>
    <CardFooter>
      <Button
        onClick={onRegisterClick}
        className="w-full hover:scale-105 bg-lime-600/80 hover:bg-lime-800/80 dark:bg-purple-700/70 dark:hover:bg-purple-600/80 text-black/90 dark:text-white/90"
      >
        Register
      </Button>
    </CardFooter>
  </Card>
);

export default EventCard;
