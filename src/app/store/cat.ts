import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { CatInfo } from "../utils/cats";

interface CatStore {
  selectedCat?: CatInfo;
  actions: {
    setSelectedCat: (value: CatInfo) => void;
  };
}

export const useCatStore = create<CatStore>()(
  immer((set) => ({
    selectedCat: undefined,
    actions: {
      setSelectedCat(value) {
        set((state) => {
          state.selectedCat = value;
        });
      },
    },
  }))
);
