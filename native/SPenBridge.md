SPen Native Bridge — Plan implementacji

Cel:
- Umożliwić wykrywanie kliknięć przycisku rysika oraz wysyłanie sygnałów hardware'owych do aplikacji JS.
- Udostępnić prosty emitter zdarzeń `SPenEvent` i metodę `sendCommand(cmd, payload)`.

Kroki (Android - Kotlin):
1. Stwórz moduł `SPenBridgeModule` dziedziczący z `ReactContextBaseJavaModule`.
2. Zarejestruj `BroadcastReceiver`/Listener specyficzny dla urządzeń S‑Pen (np. Samsung) i mapuj eventy przycisku na JSON.
3. Emituj zdarzenia do JS przez `reactContext.getJSModule(RCTDeviceEventEmitter.class).emit("SPenEvent", payload)`.
4. W module expose'uj metodę `@ReactMethod fun sendCommand(cmd: String, payload: ReadableMap)` która wykona natywną akcję.

Przykład (Kotlin - szkic):
```kotlin
class SPenBridgeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "SPenBridge"

  private val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      val payload = Arguments.createMap()
      payload.putString("type", "button_click")
      payload.putString("action", "single_click")
      reactContext.getJSModule(RCTDeviceEventEmitter::class.java).emit("SPenEvent", payload)
    }
  }

  @ReactMethod
  fun sendCommand(cmd: String, payload: ReadableMap?, promise: Promise) {
    // wykonaj native action
    promise.resolve(true)
  }
}
```

Kroki (iOS - Swift/ObjC):
1. Stwórz `RCTEventEmitter` subclass `SPenBridge` i zaimplementuj `supportedEvents()` zwracające `SPenEvent`.
2. Podłącz obsługę `UIPress` lub dedykowanego API rysika (jeżeli dostępne) i emituj zdarzenia.

Bezpieczeństwo i ograniczenia:
- React Native nie ma jednolitego API dla S‑Pen; implementacja wymaga badań urządzeń docelowych (Samsung, Wacom).
- Na iOS funkcjonalność zależy od wsparcia sprzętowego iOS SDK.
- Jeżeli nie chcesz dodawać natywnego kodu, możesz zaoferować integrację tylko na Androidzie i fallback JS na iOS.

Testowanie:
- Uruchom aplikację na urządzeniu Samsung z S‑Pen w dev-client. Zarejestruj eventy i sprawdź, czy `SPenBridge.addSPenListener` odbiera dane.

Deployment:
- Dodaj instrukcje do README dla deweloperów: jak kompilować z modułem natywnym i wymagane uprawnienia.
