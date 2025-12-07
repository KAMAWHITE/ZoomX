import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useCategoryStore = create(
    devtools(
        persist(
            (set, get) => ({
                categorySubject: {},

                setCategorySubject: (category) =>
                    set((state) => ({
                        categorySubject: {
                            ...state.categorySubject,
                            [Date.now()]: category,
                        },
                    })),

                removeCategorySubject: () => set({ categorySubject: {} }),

                getCategorySubject: () =>
                    Object.values(get().categorySubject),
            }),
            {
                name: 'category-storage',
            }
        ),
        { name: 'CategoryStore' }
    )
);

export default useCategoryStore;