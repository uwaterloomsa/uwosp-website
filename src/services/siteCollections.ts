import { createCollection } from "./collections";
import type {
  FAQ,
  OrphanProfile,
  PastSponsorship,
  TeamMember,
  TimelineItem,
  CampaignEvent,
  FinanceReport,
  VolunteerCharity,
  VolunteerRole,
  PastEvent,
} from "../types/collections";

export const faqService = createCollection<FAQ>("faqs");
export const orphanService = createCollection<OrphanProfile>("orphans");
export const pastSponsorshipService =
  createCollection<PastSponsorship>("pastSponsorships");
export const teamService = createCollection<TeamMember>("teamMembers");
export const timelineService = createCollection<TimelineItem>("timelineItems");
export const campaignEventService =
  createCollection<CampaignEvent>("campaignEvents");
export const financeReportService =
  createCollection<FinanceReport>("financeReports");
export const volunteerCharityService =
  createCollection<VolunteerCharity>("volunteerCharities");
export const volunteerRoleService =
  createCollection<VolunteerRole>("volunteerRoles");
export const pastEventService = createCollection<PastEvent>("pastEvents");
