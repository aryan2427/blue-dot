// types/index.ts

export type Role = "candidate" | "employer" | "aggregator" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface Candidate extends User {
  age: number;
  gender: string;
  location: string;
  education: string;
  skills: string[];
  experience: string;
  resumeUrl?: string;
}

export interface Employer extends User {
  companyName: string;
  industry: string;
  address: string;
  employeeCount: number;
  gstNumber?: string;
}

export interface Aggregator extends User {
  organizationName: string;
  orgType: "ngo" | "training_institute" | "placement_agency";
  coverageArea: string;
  participantCount: number;
}

export interface Job {
  id: string;
  employerId: string;
  companyName: string;
  role: string;
  requiredSkills: string[];
  location: string;
  salary: string;
  openings: number;
  status: "active" | "closed";
  createdAt: string;
}

export interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  status: "pending" | "shortlisted" | "rejected";
  appliedAt: string;
}