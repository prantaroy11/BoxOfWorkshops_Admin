/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface NewsletterStore {
  selectedCampaign: any | null;
  setSelectedCampaign: (campaign: any | null) => void;
}

export const useNewsletterStore = create<NewsletterStore>((set) => ({
  selectedCampaign: null,
  setSelectedCampaign: (campaign) => set({ selectedCampaign: campaign }),
}));
