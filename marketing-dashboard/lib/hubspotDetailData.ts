// Mock data for HubSpot detail page

export interface PipelineSourceData {
  source: string;
  amount: number;
}

export const totalDealsSourceData: PipelineSourceData[] = [
  { source: 'Organic Social', amount: 3733103.19 },
  { source: 'Referrals', amount: 5364430.33 },
  { source: 'Direct Traffic', amount: 6460710.49 },
  { source: 'Organic Search', amount: 0 },
  { source: 'Paid Social', amount: 0 },
  { source: 'Paid Search', amount: 0 },
  { source: 'Email Marketing', amount: 0 },
  { source: 'Other Campaigns', amount: 383365761.71 },
  { source: 'Offline Sources', amount: 414810344.64 },
  { source: 'Partnerships', amount: 0 },
  { source: 'Affiliates', amount: 0 },
];

export const wonDealsSourceData: PipelineSourceData[] = [
  { source: 'Organic Social', amount: 2133904.89 },
  { source: 'Referrals', amount: 1276.00 },
  { source: 'Direct Traffic', amount: 74013.00 },
  { source: 'Organic Search', amount: 0 },
  { source: 'Paid Social', amount: 0 },
  { source: 'Paid Search', amount: 0 },
  { source: 'Email Marketing', amount: 0 },
  { source: 'Other Campaigns', amount: 23399380.91 },
  { source: 'Offline Sources', amount: 105032567.08 },
  { source: 'Partnerships', amount: 1900325947.00 },
  { source: 'Affiliates', amount: 1414910.00 },
];

export interface DealsBreakdown {
  active: {
    count: number;
    amount: string;
  };
  lost: {
    count: number;
    amount: string;
  };
  won: {
    count: number;
    amount: string;
  };
}

export const dealsBreakdown: DealsBreakdown = {
  active: {
    count: 165,
    amount: '€3,63,81,81...',
  },
  lost: {
    count: 237,
    amount: '€3,48,79,56...',
  },
  won: {
    count: 311,
    amount: '€1,33,27,64...',
  },
};
