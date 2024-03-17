export const events = [
    {
      id: 1,
      start_date: '2023-01-01',
      end_date: '2024-01-01',
      event_name: 'Nauka fikołków',
      description: 'Nauka salta do tyłu była dość trudna ale najtrudniej było nauczyć się salta do przodu.',
      color: "green",
      category: "hobby",
    },
    {
      id: 2,
      start_date: '2022-01-01',
      end_date: '2024-01-01',
      event_name: 'Jazda konno',
      description: 'Wyczynowa jazda konno, udział w wielu światowych turniejach.',
      color: "green",
      category: "hobby",
    },
    {
        id: 3,
        start_date: '2021-02-01',
        end_date: '2024-01-01',
        event_name: 'Praca w wielkiej korporacji',
        description: 'Spełnione marzenie o pracy w wielkiej korporacji, nie zawiodłem się. Robią tu wiele ciekawych rzeczy.',
        color: "red",
        category: "work",
      },
      {
        id: 4,
        start_date: '2022-07-01',
        end_date: '2025-01-01',
        event_name: 'Praca w JanuszEx',
        description: 'Początki kariery są cięzkie dlatego podjąłem pracę w małej firmie.',
        color: "red",
        category: "work",
      },
      {
        id: 5,
        start_date: '2023-01-01',
        end_date: '2023-02-01',
        event_name: 'Wielkie odkurzanie domu',
        description: 'Umiejętność, którą udało mi się posiąść w trakcie studiów, nie będę ukrywał jestem z tego niesamowicie dumny.',
        color: "blue",
        category: "home",
      },
      {
        id: 6,
        start_date: '2019-02-01',
        end_date: '2022-01-01',
        event_name: 'Zakup telewizora',
        description: 'Od tego dnia zacząłem być nałogowym kanapowcem.',
        color: "blue",
        category: "home",
      },
  ];
export const categories = [
    {
      id: 1,
      color: "red",
      category: "work",
    },
    {
      id: 2,
      color: "blue",
      category: "home",
    },
    {
        id: 3,
        color: "green",
        category: "hobby",
      },
      {
        id: 4,
        color: "gray",
        category: "experience",
      },
  ];
  sessionStorage.clear()
  events.forEach((event) => {
    sessionStorage.setItem(`event_${event.id}`, JSON.stringify(event));
  });
  categories.forEach((category) => {
    sessionStorage.setItem(`category_${category.id}`, JSON.stringify(category));
  });