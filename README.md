
MANIFEST PRODUKTOWY: SYNESTIA OS

One-Liner (Elevator Pitch):
Synestia to luksusowy, w pełni zintegrowany z AI cyfrowy notes dla urządzeń klasy premium z rysikiem. Łączy fizyczne odczucie pisania po matowym papierze z analityczną potęgą "zbiorowego umysłu", rozwiązując skomplikowane problemy i przewidując pytania egzaminacyjne na podstawie odręcznych notatek.

🎯 1. LUKA RYNKOWA I PROBLEM

Obecny rynek dzieli się na dwa skrajne i niekompatybilne obozy:

	Tradycyjne Notatniki (Samsung Notes, GoodNotes): Świetne do pisania odręcznego, ale są "martwe". Nie rozumieją tego, co użytkownik w nich zapisuje. Nie potrafią łączyć faktów.

	Platformy AI (NotebookLM, ChatGPT): Potężne analitycznie, ale wymagają stukania w klawiaturę. Zabijają organiczny proces twórczy i kinestetyczną pamięć (pisanie odręczne), co dla studentów kierunków ścisłych, inżynierów i artystów jest barierą nie do przejścia.

Rozwiązanie (Synestia): Budujemy monopolistyczny most. Tworzymy aplikację, która pozwala swobodnie szkicować i pisać równania, a pod maską – w czasie rzeczywistym – analizuje każdy ruch rysika i wgrane pliki PDF, stając się prywatnym, interaktywnym asystentem badawczym.

👑 2. GRUPA DOCELOWA I POZYCJONOWANIE

	Target: Gen Z i Millenialsi na uczelniach wyższych (zwłaszcza STEM – nauki ścisłe, inżynieria, medycyna) oraz profesjonaliści (architekci, stratedzy). Posiadacze drogich urządzeń (Samsung Galaxy S23/S24 Ultra, tablety z Androidem/iOS z natywnym wsparciem rysika).

	Pozycjonowanie: "Ultra-Premium EdTech". Aplikacja nie jest "narzędziem do szkoły". Jest intelektualnym sterydem i symbolem statusu.

⚡ 3. GŁÓWNE WEKTORY PRZEWAGI (Killer Features)
A. The Canvas & Premium Vibe ("Cyfrowy Papier")

Odrzucamy płaskie, białe tła. Synestia wykorzystuje silnik renderujący (Skia), aby stworzyć teksturę matowego, ekskluzywnego papieru (z subtelnym szumem, bazując na palecie #F4F4F0). Aplikacja gwarantuje pisanie z zerowym opóźnieniem (Zero-Latency) przy 120 FPS, wspierając 4096 poziomów nacisku S Pen. Interfejs wykorzystuje Glassmorphism i reaguje haptycznie (wibracje) na każdą akcję.

B. Scribe Bar

Zamiast statycznego menu – pływający, półprzezroczysty pasek narzędzi. Reaguje na zbliżenie rysika (Hover Effect). Przycisk fizyczny na S Pen nie jest tylko gumką – jest zapalnikiem dla "AI Quick Menu".

C. Quantum Solver (Magia Matematyczna)

Użytkownik pisze odręcznie skomplikowane równanie (np. analizę matematyczną lub wzór chemiczny). Następnie obrysowuje je narzędziem "Lasso". Silnik AI (Gemini Vision) w tle odczytuje pismo i w ciągu sekundy elegancko formatuje wynik oraz rozwiązanie krok po kroku tuż pod odręcznym pismem. To główny napęd wirusowości aplikacji (K-Factor) na TikToku i Instagramie.

D. The Brain: Prof-Predictor 2.0 & RAG

Zeszyty w Synestii to odizolowane bazy wiedzy. Użytkownik wrzuca do zeszytu PDF z wykładu. AI czyta go w całości. Funkcja "Prof-Predictor" łączy wiedzę z wgranego PDF-a oraz to, przy jakich tematach użytkownik pisał mocniej, szybciej (analiza nacisku) lub stawiał wykrzykniki. Na tej podstawie generuje "Próbny Egzamin" celujący w najważniejsze zagadnienia przed sesją.

💰 4. STRATEGIA MONETYZACJI (B2C Micro-SaaS)

Model Freemium oparty na tzw. "agresywnym demonstrowaniu wartości".

	Darmowy Tier (Zasięg i FOMO): * 3 zeszyty.

		Podstawowy, minimalistyczny papier.

		10 wywołań modułu "Quantum Solver" w miesiącu. (Użytkownik uzależnia się od łatwości rozwiązywania zadań).

	Synestia PRO (MRR - Miesięczna Subskrypcja):

		Nielimitowany Quantum Solver i pełen dostęp do Prof-Predictora.

		Nielimitowane wgrywanie i analiza źródeł PDF (RAG).

		Ekskluzywne materiały okładek (np. skóra Moleskine, animowane tekstury).

		Audio-Sync (synchronizacja nagrywanego wykładu z ruchem rysika na ekranie).

🛠 5. OSTATECZNY TECH STACK

Produkt zbudowany na najnowocześniejszych technologiach optymalizujących wydajność i szybkość wdrożenia (Time-to-Market):

	Szkielet: React Native (Expo)

	Silnik Wizualny: Shopify Skia & Reanimated v3.

	UI/UX: Tamagui (Compiler-optimized styling) & Expo Blur.

	Mózg (Pamięć): Zustand & React Native MMKV.

	Mózg (AI): Google Gemini 1.5 Flash Vision API.

TECH STACK: SYNESTIA OS

1. Architektura & Szkielet (Fundament)

	Framework: React Native (Expo)

	Routing: Expo Router (File-based routing, szybka nawigacja i obsługa Deep Linking)

2. Silnik Renderujący & Mechanika Rysika (Rdzeń Aplikacji)

	Canvas: @shopify/react-native-skia (Renderowanie tekstury papieru i pisma w 120 FPS)

	Interakcje i Rysik: react-native-gesture-handler (Przechwytywanie nacisku S Pen, Palm Rejection)

3. Interfejs Użytkownika & Animacje (Ultra-Premium Vibe)

	Design System / Styling: Tamagui (Zoptymalizowany kompilator dla ekstremalnej wydajności UI)

	Animacje: react-native-reanimated (v3) (Płynne przejścia, 60/120 klatek obsługiwane na wątku UI)

	Efekty Wizualne: expo-blur (Glassmorphism dla pływającego paska narzędzi Scribe Bar)

	Haptyka: expo-haptics (Fizyczne wibracje przy kliknięciach symulujące fizyczny produkt)

4. Zarządzanie Stanem & Baza Danych (Mózg Pamięciowy)

	Zarządzanie Stanem: Zustand (Błyskawiczne przełączanie narzędzi, kolorów, aktywnych zeszytów)

	Lokalna Baza Danych: react-native-mmkv (Ultraszybki storage C++ do zapisywania konfiguracji i metadanych)

	Zarządzanie Plikami: expo-file-system (Zapis PDF-ów, zrzutów ekranu i plików audio bezpośrednio na dysku)

5. Silnik AI (The Brain & Quantum Solver)

	Model AI: Google Gemini 1.5 Flash API (Multimodalna analiza: czytanie RAG dla PDF-ów, Vision dla rozwiązywania zrzutów z równaniami matematycznymi, podsumowania audio/tekstu)

