LEGENDA*:
[   ] - TO DO
[ X ] - FINISHED/DONE

[ X ] ETAP 1: (Wykonane przez użytkownika)

[ X ] ETAP 2: BAZA DANYCH & STAN (Mózg Pamięciowy)

	- Cel: Szybkie i bezbłędne zapisywanie metadanych zeszytów.
	- Akcje: `store/useNotebookStore.ts` (Zustand + persist + react-native-mmkv).
	- Typy: `Notebook { id, title, coverTexture, createdAt, updatedAt }`.

[ X ] ETAP 3: THE ATELIER (Ekran główny)

	- Cel: Luksusowa siatka zeszytów (2 kolumny).
	- Akcje: `app/index.tsx` — Tamagui layout (`YStack`/`XStack`), haptics, FAB "Nowy Zeszyt".

[ X ] ETAP 4: SILNIK CYFROWEGO PAPIERU (PaperCanvas)

	- Cel: Płynne rysowanie 120 FPS z obsługą nacisku i palm rejection.
	- Akcje: `components/PaperCanvas.tsx` — Skia Canvas, `useTouchHandler`, mapowanie `force` → `strokeWidth`, przechowywanie ścieżek w pamięci.

[ X ] ETAP 5: SCRIBE BAR (Pasek narzędzi)

	- Cel: Pływający, szklany panel narzędzi (glassmorphism).
	- Akcje: `components/ScribeBar.tsx` — Tamagui + `BlurView`, lokalny Zustand, Reanimated, haptics.

[ X ] ETAP 6: QUANTUM SOLVER (Silnik rozwiązywania)

	- Cel: Analiza odręcznych równań i zwrot strukturalnego JSON-a z rozwiązaniem.
	- Akcje: `services/ai/QuantumSolver.ts` — `solveMathFromImage(base64Image, apiKey)`, fetch/axios, silne typowanie TS, obsługa błędów, integracja z `makeImageSnapshot()`.

[ X ] ETAP 7: THE BRAIN (Prof-Predictor & RAG)

	- Cel: Uczynić zeszyty „drugim mózgiem” — generowanie pytań i RAG dla PDF-ów.
	- Akcje: `components/AIAssistantSheet.tsx` — bottom-sheet UI, dwa tryby (czat, Prof-Predictor), wysłanie treści zeszytu do modelu, prezentacja wyników (karty + loader).

 [ X ] ETAP 8: PAYWALL & MONETYZACJA

	- Cel: Zmonetyzować funkcje premium (Synestia PRO).
	- Akcje: `app/paywall.tsx` — ekran sprzedażowy, dark-mode premium, CTA "7-dniowy okres próbny", animacje Reanimated.

NOTATKI OPERACYJNE:

	- Pracować ściśle zgodnie z kolejnością etapów.
	- Po każdym ukończonym podzadaniu oznaczać je w tym pliku `[ X ]`.
	- Usunięto wszystkie instrukcje dotyczące kopiowania promptów i wywoływania agentów — roadmap zawiera tylko konkretne zadania implementacyjne. zakaz dodawania niczego wicej poza aktualiacja "x"




WAZNE !!!! Sekcja ustawień w aplikacji Synestia nie może być tylko nudną listą przełączników. W produkcie klasy ultra-premium ustawienia to Centrum Kalibracji Doznań. Muszą one odzwierciedlać naszą filozofię: pełną kontrolę nad "analogowym" odczuciem papieru i potęgą AI.

Poniżej przedstawiam logiczny podział sekcji ustawień, podzielony na kategorie, które wzmacniają wartość Twojego produktu:

ARCHITEKTURA USTAWIEŃ SYNESTIA OS (PROCESY I TECH STACK)

[ ] 0.Punkt Wejścia i Nawigacja (Access & Exit Logic) - STATUS: Częściowo wdrożone

 [ ]   Punkt Wejścia do Ustawień (The Trigger)
        STATUS ANALIZY: Ikona zębatki jest w app/index.tsx (The Atelier) i działa (router.push), ale brakuje jej w ScribeBar.tsx. Ustawienia otwierają się jako zwykła strona, a nie modal/karta.

        Jak to działa: W głównym widoku "The Atelier" (siatka zeszytów) umieszczamy minimalistyczną ikonę zębatki (Gear) w prawym górnym rogu ekranu, reagującą delikatnym powiększeniem na dotyk. Wewnątrz samego zeszytu (Canvas), przycisk ustawień jest zagnieżdżony w dolnej części "Scribe Bar", aby nie zajmować miejsca na papierze. Kliknięcie wywołuje otwarcie ustawień jako modal (karta wysuwająca się z dołu na iOS / płynne wejście na Androidzie).

        Tech Stack: Lucide React Native (paczka z minimalistycznymi ikonami wektorowymi) + Expo Router (router.push('/settings')).

 [ X ]   Nawigacja Wewnętrzna (Przyciski "Wstecz" i Gesty)
        STATUS ANALIZY: Zrobione po taniości. Jest zwykły <Button>Wstecz</Button> zamiast luksusowego nagłówka i natywnego swipe-to-go-back z Expo Router.

        Jak to działa: Nie budujemy przycisków "Wstecz" jako zwykłego tekstu wewnątrz widoku. Każda podkategoria (np. Estetyka, Precyzja Rysika) ma wbudowany na samej górze natywny, luksusowy nagłówek (Header). Po lewej stronie znajduje się precyzyjna ikona strzałki w lewo (<). Co najważniejsze – aplikacja nasłuchuje systemowych gestów powrotu, więc użytkownik może po prostu przesunąć palcem od lewej krawędzi ekranu do środka (tzw. Swipe-to-go-back), aby płynnie wrócić do poprzedniego menu.

        Tech Stack: Expo Router (komponent <Stack> oraz konfiguracja options={{ headerLeft: () => <BackButton /> }}) + wbudowane wsparcie React Native dla gestów powrotu systemu Android/iOS.

[ ] 1. Estetyka i Tekstura (Vibe Settings) - STATUS: Częściowo wdrożone

 [ X ]   Globalna Tekstura Papieru (Wybór między Pure Matte, Vintage Fiber, Draft Grid)
        STATUS ANALIZY: Wdrożone. Działa w PaperCanvas.tsx i useSettingsStore.

        Jak to działa: Zmiana opcji w ustawieniach wysyła nowy stan do sklepu, co natychmiast wymienia warstwę bazową (Shader lub nałożony obraz) na płótnie głównym.

        Tech Stack: Zustand (przechowywanie wyboru) + @shopify/react-native-skia (renderowanie Shader / Image jako tła).

 [ X ]  Gęstość Szumu / Noise Level (Suwak 0-100%)
        STATUS ANALIZY: Wdrożone. Suwak obecny w UI, działa poprawnie (jitter linii w canvasie).

        Jak to działa: Wartość z suwaka jest przekazywana bezpośrednio jako parametr mnożnika amplitudy do filtru szumu fraktalnego w silniku renderującym.

        Tech Stack: react-native-reanimated (dla płynnego przesuwania suwaka bez lagów) + @shopify/react-native-skia (komponent <FractalNoise>).

 [ X ] Paleta Synestezji (Wybór koloru przewodniego)
        STATUS ANALIZY: Wdrożone. Kolor jest wstrzykiwany z Zustand do głównych komponentów aplikacji.

        Jak to działa: Wymiana globalnego "tokenu" tematycznego. Wszystkie komponenty UI automatycznie się przerysowują pod nowy kolor główny (np. akcenty, podświetlenia, ikony).

        Tech Stack: Tamagui (dynamiczne przełączanie motywów ThemeProvider).

 [ X ]  Typografia Interfejsu (Drukarska vs Nowoczesna)
        STATUS ANALIZY: Wdrożone. Zaimplementowano włącznik sans/serif podłączony globalnie do układu z Zustand.

        Jak to działa: Asynchroniczne ładowanie odpowiednich krojów pisma przy starcie aplikacji i podpinanie ich pod globalne zmienne tekstowe.

        Tech Stack: expo-font + Tamagui (konfiguracja fonts).

[ X ] 2. Precyzja Rysika (S-Pen & Input) - STATUS: Wdrożone

 [ X ]   Krzywa Nacisku / Pressure Curve (Kalibracja czułości S-Pen)
        STATUS ANALIZY: Wdrożone. Funkcja matematyczna mapForceToWidth poprawnie przelicza grubość rysika.

        Jak to działa: Przechwycenie surowej wartości nacisku rysika (od 0.0 do 1.0). Zamiast przekazywać ją bezpośrednio do grubości pędzla, przepuszczamy ją przez funkcję matematyczną (np. wykładniczą), aby pociągnięcia były bardziej kaligraficzne lub twarde.

        Tech Stack: react-native-gesture-handler (odczyt właściwości force) + standardowa logika matematyczna JS (algorytmy krzywych Beziera/wykładniczych).

 [ X ]   Czułość Palm Rejection (Regulacja odrzucania dłoni)
        STATUS ANALIZY: Wdrożone. Odrzucanie działa poprawnie dla dotyku o promieniu > 40.

        Jak to działa: Narzucenie rygorystycznego filtra nasłuchującego. Wymuszamy na systemie odrzucanie eventów dotykowych, jeśli promień dotyku (Touch Radius) przekracza pewną wielkość, lub akceptujemy wyłącznie hardware'owy znacznik rysika.

        Tech Stack: react-native-gesture-handler (filtrowanie po pointerType === 'stylus' oraz sprawdzanie powierzchni dotyku).

 [ X ]    Mapowanie Przycisku S-Pen (Co robi kliknięcie fizycznego przycisku)
        STATUS ANALIZY: Wdrożone. Moduł Kotlin łączy się ze zdarzeniami React Native, a AIAssistantSheet nasłuchuje tych zdarzeń i otwiera modal AI na kliknięcie przycisku.

        Jak to działa: Przechwycenie zdarzenia systemowego Androida, gdy użytkownik klika przycisk na rysiku. Framework React Native nie wspiera tego wprost, więc trzeba napisać malutki most natywny (Native Bridge), który wysyła sygnał do aplikacji w JS (np. otwarcie menu AI).

        Tech Stack: Expo Modules API (napisanie kilkunastu linijek kodu w Kotlinie, który łączy sprzęt S-Pen z Twoim kodem TypeScript).

[ ] 3. Inteligencja i Dane (AI & Quantum Brain) - STATUS: Częściowo wdrożone

 [ X ] Zarządzanie Kluczami API (BYOK - Bring Your Own Key)
        STATUS ANALIZY: Wdrożone. Użyto expo-secure-store do szyfrowania klucza i spięto to z UI w ustawieniach.

        Jak to działa: Użytkownik wkleja swój klucz Google Gemini. Klucz jest natychmiast szyfrowany na poziomie sprzętowym telefonu (Keystore na Androidzie / Keychain na iOS), by żadna złośliwa aplikacja go nie wykradła.

        Tech Stack: expo-secure-store (nigdy nie używaj MMKV do zapisywania surowych kluczy API, MMKV nie jest domyślnie szyfrowane na poziomie sprzętowym).

 [ X ]  Głębia Kontekstu / RAG Depth (Ile stron wstecz widzi AI)
        STATUS ANALIZY: Wdrożone. Zaimplementowano użycie suwaka do globalnego stanu Zustand i podpięto pod asystenta AI.

        Jak to działa: Suwak określa, jaki procent bazy danych danego zeszytu jest pakowany do payloadu JSON przed wysłaniem zapytania do Gemini. Mniejszy kontekst = tańsze API i szybsza odpowiedź; większy = inteligentniejsza analiza całego semestru.

        Tech Stack: Zustand (stan suwaka) + logika TypeScript obcinająca tablice (Arrays) przed wywołaniem axios.

 [ X ]  Język Wykładowcy (Domyślny język)
        STATUS ANALIZY: Wdrożone. Podpięte pod ustawienia i wstrzykiwane bezpośrednio do QuantumSolver i asystenta AI.

        Jak to działa: Wartość z ustawień jest wstrzykiwana jako dynamiczna zmienna do głównego systemowego promptu przed wysłaniem nagrania/notatki do Gemini (np. "Analizuj ten materiał zakładając, że głównym językiem jest: [WYBRANY_JĘZYK]").

        Tech Stack: TypeScript (Interpolacja stringów) wewnątrz serwisu QuantumSolver.

[ ] 4. System i Eksport (Cloud & Files) - STATUS: Częściowo wdrożone

 [ X ]  Auto-Synchronizacja (Backup do chmury w wersji PRO)
        STATUS ANALIZY: Wdrożone. Zaimplementowano użycie expo-network oraz połączenie ze stanem autoSync z useSettingsStore.

        Jak to działa: Aplikacja nasłuchuje statusu połączenia Wi-Fi. Kiedy wykryje stabilne połączenie i brak aktywności użytkownika (idle state), uruchamia w tle proces wysyłający zrzuty JSON (z danymi ścieżek rysika) do zewnętrznej bazy danych.

        Tech Stack: expo-network (sprawdzanie połączenia) + expo-background-fetch (uruchamianie zadań w tle) + Supabase (zewnętrzna baza SQL do zapisu).

 [ X ]   Format Archiwizacji (Generowanie i eksport PDF)
        STATUS ANALIZY: Wdrożone. Działa moduł pdfExporter.ts składający HTML i używający expo-print oraz expo-sharing.

        Jak to działa (Proces): 1. Silnik graficzny bierze Twój odręczny arkusz i robi niewidzialny zrzut ekranu (Base64). 2. Mechanizm wstawia te obrazy do ukrytego szablonu HTML, dodając rozpoznany tekst pod spodem (dla indeksowania). 3. Framework kompiluje ten HTML bezpośrednio do pliku .pdf. 4. Wywołuje się natywny widok udostępniania (Android Share Sheet), pozwalający wysłać plik na Messengera/Maila.

        Tech Stack: @shopify/react-native-skia (makeImageSnapshot) -> expo-print (zamiana HTML na natywny PDF) -> expo-sharing (wywołanie okna udostępniania na systemie).

 [ X ]   Zarządzanie Pamięcią (Czyszczenie danych z wykładów)
        STATUS ANALIZY: Wdrożone. Zaimplementowano odczyt wielkości katalogu cache przez expo-file-system i możliwość jego wyczyszczenia jednym kliknięciem.

        Jak to działa: Aplikacja skanuje specjalny folder na dysku telefonu, do którego zapisywane są nagrania audio z wykładów (które zajmują dużo gigabajtów). Wyświetla całkowitą wagę i pozwala jednym przyciskiem usunąć pliki fizycznie z dysku, zwalniając miejsce na S23 Ultra.

        Tech Stack: expo-file-system (metody getInfoAsync do odczytu rozmiaru i deleteAsync do usuwania plików audio i cache).).