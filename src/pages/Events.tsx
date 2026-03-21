import { useEffect, useState } from "react";
import ParallaxHero from "../components/ParallaxHero";
import {
  CalendarBlank,
  Clock,
  MapPin,
  Confetti,
  Lightbulb,
  ForkKnife,
} from "@phosphor-icons/react";
import useScrollReveal from "../hooks/useScrollReveal";
import { getEvents } from "../services/site";
import type { SiteEvent } from "../types/site";
import type { ReactNode } from "react";
import "./Events.css";

/* Fallback events shown when none are in the DB */
const fallbackEvents: {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    title: "Annual Charity Gala",
    date: "March 2025",
    time: "6:00 PM",
    location: "Federation Hall, UWaterloo",
    description:
      "Our biggest fundraising event of the year featuring guest speakers and dinner.",
    icon: <Confetti size={36} weight="duotone" />,
  },
  {
    title: "Orphan Awareness Week",
    date: "April 2025",
    time: "All Week",
    location: "SLC, UWaterloo",
    description:
      "A week of workshops, talks, and social media campaigns to raise awareness.",
    icon: <Lightbulb size={36} weight="duotone" />,
  },
  {
    title: "Community Iftar",
    date: "Ramadan 2025",
    time: "Sunset",
    location: "PAC, UWaterloo",
    description:
      "Breaking fast together while raising funds for orphan sponsorship.",
    icon: <ForkKnife size={36} weight="duotone" />,
  },
];

export default function Events() {
  useScrollReveal();
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const hasDbEvents = events.length > 0;

  return (
    <div className="events-page">
      <ParallaxHero imgSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80">
        <h1>Events</h1>
        <p>
          Join us at our next event and be part of the change. From galas to
          community iftars, there are many ways to get involved.
        </p>
      </ParallaxHero>

      {/* Events List */}
      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">Upcoming Events</h2>
          <p className="section-subtitle reveal">
            Mark your calendar and join us at one of these events.
          </p>

          {!loaded ? (
            <div className="events-loading">
              <p>Loading events...</p>
            </div>
          ) : hasDbEvents ? (
            <div className="events-list">
              {events.map((event, i) => (
                <div
                  className={`event-row card reveal stagger-${(i % 6) + 1}`}
                  key={event.id}
                >
                  <div className="event-row-date">
                    <CalendarBlank size={24} weight="duotone" />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-row-body">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div className="event-row-meta">
                      <span>
                        <Clock size={14} weight="bold" /> {event.time}
                      </span>
                      <span>
                        <MapPin size={14} weight="bold" /> {event.location}
                      </span>
                    </div>
                  </div>
                  {event.isFeatured && (
                    <span className="event-featured-badge">Featured</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Fallback static events */
            <div className="events-grid-fallback">
              {fallbackEvents.map((e, i) => (
                <div
                  className={`card event-card-fallback reveal stagger-${i + 1}`}
                  key={i}
                >
                  <span className="event-fallback-icon">{e.icon}</span>
                  <div className="event-fallback-date">{e.date}</div>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                  <div className="event-row-meta">
                    <span>
                      <Clock size={14} weight="bold" /> {e.time}
                    </span>
                    <span>
                      <MapPin size={14} weight="bold" /> {e.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Image Banner */}
      <section className="section events-image-section">
        <div className="container">
          <div className="events-image-banner image-hover-zoom reveal-blur">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&fit=crop&q=80"
              alt="Friends and community members together"
              loading="lazy"
            />
            <div className="events-image-caption">
              <p>Community is at the heart of everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Highlight */}
      <section
        className="section"
        style={{ background: "var(--bg-alt, var(--bg-secondary, #f5f0eb))" }}
      >
        <div className="container">
          <h2 className="section-title reveal">Past Event Highlights</h2>
          <p className="section-subtitle reveal">
            A look back at some of our most impactful gatherings.
          </p>
          <div className="past-events-grid">
            <div className="card past-event-card reveal stagger-1">
              <h3>Ramadan Fundraiser 2024</h3>
              <p>
                Raised $12,000 during Ramadan to sponsor 15 orphans for a full
                year. Over 200 attendees joined us for community iftars.
              </p>
            </div>
            <div className="card past-event-card reveal stagger-2">
              <h3>Charity Gala 2024</h3>
              <p>
                Our annual gala brought together 150+ supporters for an evening
                of inspiration, featuring keynote speakers from IDRF and Islamic
                Relief.
              </p>
            </div>
            <div className="card past-event-card reveal stagger-3">
              <h3>Winter Relief Drive 2023</h3>
              <p>
                Collected $10,000 in donations and winter supplies for families
                in Syria and Palestine facing harsh conditions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
