import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const isBrowser = typeof window !== 'undefined';

const useFilmStore = create(
    devtools(
        persist(
            (set) => ({
                filmSubjects: {},

                setFilmSubject: (subject) =>
                    set((state) => ({
                        filmSubjects: {
                            ...state.filmSubjects,
                            [subject.id]: subject,
                        },
                    })),

                removeFilmSubject: (id) =>
                    set((state) => {
                        const { [id]: removed, ...rest } = state.filmSubjects;
                        return { filmSubjects: rest };
                    }),

                clearAllFilms: () => set({ filmSubjects: {} }),

                getFilmSubject: (id) =>
                    useFilmStore.getState().filmSubjects[id] || null,

                getAllFilms: () =>
                    Object.values(useFilmStore.getState().filmSubjects),
            }),
            {
                name: 'film-storage',
                skipHydration: true,
                partialize: (state) => (isBrowser ? { filmSubjects: state.filmSubjects } : {}),
            }
        ),
        {
            name: 'FilmStore',
        }
    )
);

export default useFilmStore;