package com.synestia.spensbridge

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class SPenBridgeModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var receiver: BroadcastReceiver? = null

    override fun getName(): String {
        return "SPenBridge"
    }

    override fun initialize() {
        super.initialize()
        // Example receiver: device vendors differ, this is a template
        receiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                val map = Arguments.createMap()
                map.putString("type", intent?.action ?: "spen_event")
                map.putString("extras", intent?.extras?.toString() ?: "")
                sendEvent("SPenEvent", map)
            }
        }
        val filter = IntentFilter()
        // Add vendor-specific actions here (e.g., Samsung S Pen intents)
        filter.addAction("com.samsung.pen.BUTTON_CLICK")
        try {
            reactContext.registerReceiver(receiver, filter)
        } catch (e: Exception) {
            // Receiver registration may fail on devices without support; ignore safely
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        try {
            receiver?.let { reactContext.unregisterReceiver(it) }
        } catch (e: Exception) {
            // ignore
        }
    }

    private fun sendEvent(eventName: String, params: com.facebook.react.bridge.WritableMap) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    @ReactMethod
    fun sendCommand(cmd: String, payload: ReadableMap?, promise: Promise) {
        // Implement native actions if needed (e.g., toggle system modes)
        // For now just resolve to true to signal success
        promise.resolve(true)
    }
}
