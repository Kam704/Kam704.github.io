<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Timeline App</h1>
    <InformationPopUp v-if="isPopupVisible" @close="closePopup" :popupText="popupText"/>
    <view-switch-button @view-changed="changeView" />
    <timeline v-if="isActive" :events="events" />
    <table-view v-else />
    <div class="unsupported-browser-message" v-if="unsupportedBrowser">
      This application requires a higher version of HTML. Please use a modern web browser to access this site.
    </div>
  </div>
</template>

<script>
import ViewSwitchButton from './components/ViewSwitchButton.vue';
import Timeline from './components/Timeline.vue';
import TableView from './components/TableView.vue';
import InformationPopUp from './components/InformationPopUp.vue';


export default {
  data() {
    return {
      events: [],
      isActive: true,
      isPopupVisible: true,
      popupText: "<h2>Projekt na przedmiot Architektury i Technologie Systemów Internetowych</h2><h3>Aplikacja SPA (Single Page Application) osi czasu w pełni po stronie klienta</h3><p>W ramach przedmiotu ATSUZ została utworzona niniejsza aplikacja pozwalająca na tworzenie prywatnych osi czasu z podziałem na kategorię aktywności. Poniżej przedstawione zostały decyzje projektowe wraz z odpowiadającymi im wymaganiami, które zostały zdefiniowane dla tego projektu:<br />&#10067; Serwis może być zrealizowany na bazie HTML 4.01 lub XHTML (dopuszczalne jest też użycie XML+XSLT). Strony muszą być utworzone poprawnie i mieć poprawne deklaracje typu – będą przepuszczane przez walidator w ramach testu.<br />&#9989; Serwis wykorzystuje HTML w wersji 5, co można sprawdzić poprzez przejrzenie źródła strony. Deklaracja charakterystyczna dla HTML5 wygląda tak:  &lt;!DOCTYPE html&gt; i dokładnie taka deklaracja występuje na niniejszej stronie. Do poprawnego wygenerowania kodu HTML wykorzystany został Framework JavaScript Vue.js.<br />&#10067;Wymagane jest nietrywialne formatowanie przy użyciu CSS. Poprawność reguł CSS również będzie sprawdzana walidatorem.<br />&#9989; Na potrzeby niniejszego projektu przygotowane zostało wiele niestandardowych stylów CSS tzn. formatowanie dla przedmiotów na osi czasu, tła całej strony, legendy czy niniejszego wyskakującego okienka. Formatowanie jest nietrywialne, ponieważ występuje duża ilość dodatkowych animacji, czy adaptacja wyglądu elementów strony do systemowego trybu wyświetlania treści (jasny/ciemny).<br />&#10067;Kompatybilność i „łagodna degradacja” - serwis powinien funkcjonować poprawnie i wyglądać dobrze we wszystkich popularnych przeglądarkach (najnowsze wersje), a korzystanie z serwisu powinno być też możliwe – choć zapewne nie bez zakłóceń w rodzaju nieudanego formatowania – w przeglądarkach starszych lub bardziej prymitywnych pod względem możliwości prezentacyjnych (np. lynx). W przypadku podjęcia decyzji o użyciu XHTML 1.1 wystarczy obsługa przez przeglądarki respektujące ten standard.<br />&#9989; Działanie oraz wygląd serwisu przetestowane zostały na wszystkich popularnych oraz najnowszych silnikach wyszukiwarek tj. Chromium 122, WebKit 617.2.4. W obydwu przypadkach strona wyświetlała się w sposób poprawny oraz zgodny z założeniami.<br />&#10067; Dostępność dla niepełnosprawnych – w szczególności powinna być możliwa nawigacja przy użyciu oprogramowania czytającego (a zatem wszystkie istotne obrazki powinny mieć teksty alternatywne, itp.). Oczywiście biorąc pod uwagę skalę projektu nie możemy przesadzać z rozmachem – np. nie jest wymagane dostarczenie reguł CSS dla medium aural.<br />&#9989; Wszystkie elementy (standardowe oraz niestandardowe), które powinny być możliwe do nawigacji z wykorzystaniem klawiatury (tabulatorów, strzałek, enterów) zostały przystosowane do tego. Dodatkowo każdy element ma dedykowaną etykietę w parametrze aria-label pozwalający na określenie co element zawiera oraz do jakiego obiektu i operacji się odnosi.<br />&#10067; Poza (X)HTML i CSS serwis powinien wykorzystywać co najmniej jedną wybraną technologię spośród przedstawionych na wykładzie (np. skrypty po stronie serwera i/lub klienta, ciasteczka, bazy danych, web serwisy, SSL... - do wyboru).<br />&#9989; W ramach niniejszego projektu zaimplementowana została znaczna liczba skryptów po stronie klienta, dane przechowywane są w przeglądarce w magazynie sesji (Session Storage) oraz dodatkowo strona została zabezpieczona z wykorzystaniem certyfikatu SSL, dzięki czemu zapewniona jest poufność wprowadzanych danych.<br />&#10067; Serwis powinien zawierać dobrze przemyślany, wygodny i spójny system nawigacji. Co więcej, serwis powinien być na tyle duży, aby ten system miał sens – przypominamy o możliwości posiłkowania się wszelkiego rodzaju „materiałem zastępczym”.<br />&#9989; Serwis zawiera przemyślany oraz w mojej ocenie wygodny oraz spójny system nawigacji. Dwa zaimplementowane widoki są nawigowalne w sposób intyicyjny, nie wymagający dodatkowych instrukcji, elementy klikalne po nakierowaniu na nie kursora są podświetlane dając jasny sygnał o możliwej interakcji. Materiał zastępczy został zaimplementowany w postaci przykładowych zdarzeń na osi czasu, dzięki czemu użytkownik od razu po uruchomieniu aplikacji może zweryfikować co jest możliwe do uzyskania oraz wykonania w jej ramach.<br />&#10067; Serwis musi zawierać stronę poświęconą opisowi samego serwisu – jakich technologii użyto, jakie były założenia przy planowaniu nawigacji, oraz dlaczego autor uważa, że strona spełnia wymagania wymienione w tym dokumencie.<br />&#9989; Niniejsze okienko implementuje wymieniony wymóg. Można tutaj przeczytać o wszystkich wymaganych informacjach tzn. jakie technologie zostały użyte, jakie były założenia przy planowaniu nawigacji oraz dlaczego strona spełnia wymagania.<br />&#10067;Przypominamy, że projektowany jest serwis internetowy, a więc strona, z której teoretycznie ktoś miałby korzystać. Nieczytelne zestawienia kolorów, mikroskopijne czcionki, migające irytująco obrazki itp. nie powinny występować – prosimy utworzyć stronę, która nie tyle próbuje pochwycić uwagę gościa (choć to pożądane), ile zaoferować mu wygodny dostęp do poszukiwanych treści.<br />&#9989; W celu jak najlepszej prezentacji strony zaimplementowana została np. adaptacja kolorów do systemowego trybu wyświetlania treści (jasny/ciemny). Kolory dobierane były w taki sposób aby tekst względem tła był jak najbardziej widoczny, natomiast wybrana czcionka była czytelna przy standardowym przybliżeniu (100%).</p><h3>Wykorzystane technologie</h3><p>&#x2022; HTML5<br />&#x2022; Vue.JS<br />&#x2022; CSS3<br />&#x2022; SSL<br />&#x2022; TypeScript<br />&#x2022; JavaScript<br />&#x2022; Session Storage</p><h3>Założenia przy planowaniu nawigacji</h3><p>Najważniejszymi elementami branymi pod uwagę przy planowaniu nawigacji były:<br />&#x2022; Zapewnienie jasnej informacji w momencie kiedy można wejść w interakcję z obiektem - implementacji podświetlenia po najechaniu na obiekt.<br />&#x2022; Tworzenie elementów interfejsu z myślą o osobach niepełnosprawnych - dodawanie etykiet aria-label dla elementów iterowalnych z pomocą klawiatury.<br />&#x2022; Implementacja widoku tabelarycznego pozwalającego na wykonywanie operacji na obiektach takich jak: sortowanie, filtrowanie po dacie, operacje CRUD, ale również dowolne modyfikowanie kategorii oraz przypisanych kolorów</p>"
    };
  },
  components: {
    Timeline,
    ViewSwitchButton,
    TableView,
    InformationPopUp
  },
  methods: {
    getEventsFromSessionStorage() {
      try {    
      const storedEvents = Object.keys(sessionStorage)
      .filter(key => key.startsWith('event_'))
      .map(key => JSON.parse(sessionStorage.getItem(key)));
      return storedEvents;
      } catch (error) {
        console.error('Error loading events from session storage:', error);
        return [];
      }
    },
    changeView(isActive) {
      this.isActive = isActive;
      this.events = this.getEventsFromSessionStorage();
    },
    closePopup() {
      this.isPopupVisible = false;
    },
  },
  mounted() {
    // Load events from session storage

    this.events = this.getEventsFromSessionStorage();
  },
  computed: {
    unsupportedBrowser() {
      // Check if JavaScript is enabled
      return !(typeof window !== 'undefined' && window.document && window.document.createElement);
    }
  }  
};
</script>

<style>
.unsupported-browser-message {
  background-color: #ffcccc;
  border: 2px solid #ff0000;
  color: #ff0000;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
}
</style>