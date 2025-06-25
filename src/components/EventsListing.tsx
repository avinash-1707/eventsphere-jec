import { Event } from "@/types/Event";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventRegisterModal from "./EventRegisterModal";
import { RegistrationRequest } from "@/types/RegistrationRequest";
import axios from "axios";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function EventsListing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleOpenModal = (eventName: string) => {
    setSelectedEvent(eventName);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const response = await axios.get("/api/get-events");
        setEvents(response.data.data);
      } catch (error) {
        console.log(error, "Unable to fetch events");
      }
    };
    fetchevents();
  }, []);

  const handleRegister = async (data: RegistrationRequest) => {
    try {
      const response = await axios.post("/api/register", data);

      if (response.data.success) {
        toast("✅ Registered", { description: response.data.message });
      } else {
        toast("⚠️ Server responded", { description: response.data.message });
      }
    } catch (error) {
      toast("❌ Registration error", {
        description: "Some error occured while registering!",
      });
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-black/90 dark:text-white/90 font-semibold text-4xl"
      >
        Register for event 👇
      </motion.h1>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 70 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="my-12 w-full max-w-6xl rounded-2xl grid grid-cols-1 lg:grid-cols-3 gap-6 p-6"
      >
        {events.length > 0 ? (
          events.map((event, idx) => (
            <EventCard
              key={idx}
              bannerUrl={event.bannerUrl}
              name={event.ename}
              description={event.description}
              time={event.datetime}
              onRegisterClick={() => handleOpenModal(event.ename)}
            />
          ))
        ) : (
          <p>No events to display</p>
        )}
      </motion.div>
      <EventRegisterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eventName={selectedEvent || ""}
        onRegister={handleRegister}
      />
    </div>
  );
}
