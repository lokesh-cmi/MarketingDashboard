// Mock data for HubSpot dashboard

export interface ContactLifecycleData {
  stage: string;
  digital: number;
  events: number;
  total: number;
}

export const contactLifecycleData: ContactLifecycleData[] = [
  { stage: '(No value)', digital: 1, events: 0, total: 1 },
  { stage: 'Subscriber', digital: 6, events: 0, total: 6 },
  { stage: 'Lead', digital: 3657, events: 1700, total: 5357 },
  { stage: 'Marketing Qualified Lead', digital: 2582, events: 0, total: 2582 },
  { stage: 'Sales Qualified Lead', digital: 992, events: 700, total: 1692 },
  { stage: 'Opportunity', digital: 290, events: 0, total: 290 },
  { stage: 'Customer', digital: 1113, events: 400, total: 1513 },
  { stage: 'Evangelist', digital: 368, events: 200, total: 568 },
  { stage: 'Not relevant', digital: 1214, events: 600, total: 1814 },
  { stage: 'Other', digital: 921, events: 400, total: 1321 },
];

export interface DealsMetrics {
  totalDeals: number;
  totalAmount: string;
  activeDeals: number;
  activeAmount: string;
  lostDeals: number;
  lostAmount: string;
  wonDeals: number;
  wonAmount: string;
}

export const dealsMetrics: DealsMetrics = {
  totalDeals: 685,
  totalAmount: '€8,14,85,481.08',
  activeDeals: 165,
  activeAmount: '€3,63,81,81...',
  lostDeals: 237,
  lostAmount: '€3,48,79,56...',
  wonDeals: 311,
  wonAmount: '€1,33,27,64...',
};
