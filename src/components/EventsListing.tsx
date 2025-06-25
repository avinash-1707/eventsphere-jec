import { Event } from "@/types/Event";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventRegisterModal from "./EventRegisterModal";
import { RegistrationRequest } from "@/types/RegistrationRequest";
import axios from "axios";

const events: Event[] = [
  {
    bannerUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Nf7C7WJpGBrHY8NMlu5izG0-ZH9_RCPUXw&s",
    ename: "Hacktober fest",
    description: "This event consists of hackathon",
    datetime: new Date(),
  },
  {
    bannerUrl:
      "https://miro.medium.com/v2/resize:fit:578/1*7Pjk4lUge51rficIGz8b0Q.jpeg",
    ename: "Whatver",
    description: "Random ass hackathon",
    datetime: new Date(),
  },
];

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
        console.log("✅ Registered:", response.data.message);
      } else {
        console.warn("⚠️ Server responded:", response.data.message);
      }
    } catch (error: any) {
      console.error(
        "❌ Registration error:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-black/90 dark:text-white/90 font-semibold text-4xl">
        Register for event 👇
      </h1>
      <div className="my-12 w-full max-w-6xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
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
      </div>
      <EventRegisterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eventName={selectedEvent || ""}
        onRegister={handleRegister}
      />
    </div>
  );
}
