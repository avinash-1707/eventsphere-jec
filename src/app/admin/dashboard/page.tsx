"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // shadcn/ui components
import { Skeleton } from "@/components/ui/skeleton"; // shadcn/ui skeleton for loading
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/types/Event";
import { signOut } from "next-auth/react";
import formatDate from "@/helpers/formatDate";
import { Separator } from "@/components/ui/separator";
import DarkModeToggle from "@/components/ui/ModeToggle";
import { motion } from "motion/react";

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    bannerUrl: "",
    ename: "",
    datetime: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [regLoading, setRegLoading] = useState(false);
  const [regDialogOpen, setRegDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/get-events")
      .then((res) => setEvents(res.data.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log(form);
      await axios.post("/api/create-event", form);
      setOpen(false);
      setForm({ bannerUrl: "", ename: "", datetime: "", description: "" });
      setLoading(true);
      // Refresh events
      const res = await axios.get("/api/get-events");
      setEvents(res.data);
    } catch (err) {
      // Optionally handle error
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  // Fetch registrations for a specific event
  const handleEventClick = useCallback(
    async (event: Event) => {
      setSelectedEvent(event);
      setRegDialogOpen(true);
      setRegLoading(true);
      try {
        // You may want to create a dedicated API route for this, e.g. `/api/event-registrations?id=${event._id}`
        const res = await axios.get(
          `/api/event-registrations?ename=${event.ename}`
        );
        // If your API returns registrations as a populated field:
        setRegistrations(res.data.registrations || []);
      } catch {
        setRegistrations([]);
      } finally {
        setRegLoading(false);
      }
    },
    [setSelectedEvent, setRegDialogOpen, setRegLoading, setRegistrations]
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-200 via-white to-blue-200 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-violet-950 ">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 10, scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between"
        >
          <h1 className="text-4xl md:text-3xl font-bold mb-6">
            Welcome, Admin!
          </h1>
          <DarkModeToggle />
        </motion.div>
        <Separator className="bg-black/80 dark:bg-white/80 mt-3" />
        <div className="flex justify-between items-center my-5">
          <h2 className="text-2xl font-semibold">All Events</h2>
          <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer opacity-80"
                  onClick={() => setOpen(true)}
                >
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="bannerUrl"
                    placeholder="Banner URL"
                    value={form.bannerUrl}
                    onChange={handleChange}
                  />
                  <Input
                    name="ename"
                    placeholder="Event Name"
                    value={form.ename}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="datetime"
                    type="datetime-local"
                    placeholder="Date & Time"
                    value={form.datetime}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    minLength={10}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "Creating..." : "Create"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              className="cursor-pointer border-black/30"
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-lg" />
            ))
          ) : events.length > 0 ? (
            events.map((event, idx) => (
              <Card
                key={idx}
                className="hover:shadow-lg transition bg-gray-400/40 dark:bg-zinc-950/60 cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <CardHeader>
                  <img
                    src={event.bannerUrl}
                    alt="event banner"
                    className="w-full h-64 object-fill"
                  />
                  <CardTitle className="truncate text-xl mt-2">
                    {event.ename}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4.5 text-muted-foreground truncate">
                    {event.description}
                  </p>
                  <p className="text-xs mt-2 text-gray-500">
                    {formatDate(event.datetime.toString())}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No events found.
            </div>
          )}
        </div>

        {/* Registrations Dialog */}
        <Dialog open={regDialogOpen} onOpenChange={setRegDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Registrations for {selectedEvent?.ename}
              </DialogTitle>
            </DialogHeader>
            {regLoading ? (
              <div>Loading...</div>
            ) : registrations.length > 0 ? (
              <ul className="space-y-2">
                {registrations.map((user, idx) => (
                  <li key={user._id || idx} className="border-b pb-2">
                    <div>Name: {user.name || "N/A"}</div>
                    <div>Email: {user.email || "N/A"}</div>
                    <div>Department: {user.department || "N/A"}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No registrations found.</div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
