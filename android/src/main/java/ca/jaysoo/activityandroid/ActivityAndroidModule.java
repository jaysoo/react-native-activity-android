package ca.jaysoo.activityandroid;

import java.lang.Math;
import java.util.HashMap;
import java.util.Map;

import android.content.Context;
import android.app.Activity;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ActivityAndroidModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
  private Activity mCurrentActivity;

  public ActivityAndroidModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mCurrentActivity = activity;
    reactContext.addLifecycleEventListener(this);
  }

  @Override
  public String getName() {
    return "ActivityAndroid";
  }

  @ReactMethod
  public void moveTaskToBack(Callback cb) {
    boolean wasMoved = mCurrentActivity.moveTaskToBack(true);
    if (wasMoved) {
      cb.invoke();
    }
  }

  @Override
  public void onHostResume() {
    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("activityResume", null);
  }

  @Override
  public void onHostPause() {
    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("activityPause", null);
  }

  @Override
  public void onHostDestroy() {
  }
}

