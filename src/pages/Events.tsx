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
import EditableText from "../components/EditableText";
import EditableImage from "../components/EditableImage";
import { onAllEvents } from "../services/site";
import { pastEventService } from "../services/siteCollections";
import type { SiteEvent } from "../types/site";
import type { PastEvent } from "../types/collections";
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

const defaultPastEvents = [
  {
    title: "Ramadan Fundraiser 2024",
    description:
      "Raised $12,000 during Ramadan to sponsor 15 orphans for a full year. Over 200 attendees joined us for community iftars.",
  },
  {
    title: "Charity Gala 2024",
    description:
      "Our annual gala brought together 150+ supporters for an evening of inspiration, featuring keynote speakers from IDRF and Islamic Relief.",
  },
  {
    title: "Winter Relief Drive 2023",
    description:
      "Collected $10,000 in donations and winter supplies for families in Syria and Palestine facing harsh conditions.",
  },
];

export default function Events() {
  useScrollReveal();
  const [events, setEvents] = useState<SiteEvent[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [dbPastEvents, setDbPastEvents] = useState<PastEvent[]>([]);

  useEffect(() => {
    const unsub = onAllEvents((data) => {
      setEvents(data);
      setLoaded(true);
    });
    const unsub2 = pastEventService.onItems(setDbPastEvents);
    return () => {
      unsub();
      unsub2();
    };
  }, []);

  const hasDbEvents = events.length > 0;

  return (
    <div className="events-page">
      <ParallaxHero
        imgSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
        contentKey="events.hero.image"
      >
        <EditableText
          as="h1"
          contentKey="events.hero.title"
          fallback="Events"
        />
        <EditableText
          as="p"
          contentKey="events.hero.subtitle"
          fallback="Join us at our next event and be part of the change. From galas to community iftars, there are many ways to get involved."
          multiline
        />
      </ParallaxHero>

      {/* Events List */}
      <section className="section">
        <div className="container">
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="events.upcoming.title"
            fallback="Upcoming Events"
          />
          <EditableText
            as="p"
            className="section-subtitle reveal"
            contentKey="events.upcoming.subtitle"
            fallback="Mark your calendar and join us at one of these events."
          />

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
            <EditableImage
              contentKey="events.banner.image"
              fallback="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&fit=crop&q=80"
              alt="Friends and community members together"
            />
            <div className="events-image-caption">
              <EditableText
                as="p"
                contentKey="events.image.caption"
                fallback="Community is at the heart of everything we do."
              />
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
          <EditableText
            as="h2"
            className="section-title reveal"
            contentKey="events.past.title"
            fallback="Past Event Highlights"
          />
          <EditableText
            as="p"
            className="section-subtitle reveal"
            contentKey="events.past.subtitle"
            fallback="A look back at some of our most impactful gatherings."
          />
          <div className="past-events-grid">
            {(dbPastEvents.length > 0
              ? dbPastEvents
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((e) => ({ title: e.title, description: e.description }))
              : defaultPastEvents
            ).map((pe, i) => (
              <div
                className={`card past-event-card reveal stagger-${i + 1}`}
                key={i}
              >
                <h3>{pe.title}</h3>
                <p>{pe.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
