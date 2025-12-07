import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const isBrowser = typeof window !== 'undefined';

const useSavedStore = create(
    devtools(
        persist(
            (set) => ({
                savedSubjects: {},

                setSavedSubject: (subject) =>
                    set((state) => ({
                        savedSubjects: {
                            ...state.savedSubjects,
                            [subject.id]: subject,
                        },
                    })),

                removeSavedSubject: (id) =>
                    set((state) => {
                        const { [id]: removed, ...rest } = state.savedSubjects;
                        return { savedSubjects: rest };
                    }),

                getSavedSubject: (id) =>
                    useSavedStore.getState().savedSubjects[id] || null,

                getAllFilms: () =>
                    Object.values(useSavedStore.getState().savedSubjects),
            }),
            {
                name: 'saved-storage',
                skipHydration: true,
                partialize: (state) => (isBrowser ? { savedSubjects: state.savedSubjects } : {}),
            }
        ),
        {
            name: 'SavedStore',
        }
    )
);

export default useSavedStore;