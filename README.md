## react-native-activity-android

Provides a method to move Android apps to the background (instead of exiting), and lifecycle hooks when
the application is paused and resumed.

Useful if you want to capture listen for `BackButton` press and pause your application.

### Installation

1. Install module

    ```
    npm install --save react-native-activity-android
    ```

2. In `android/setting.gradle`

    ```
    ...
    include ':ActivityAndroid', ':app'
    project(':ActivityAndroid').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-activity-android/android')
    ```

3. In `android/app/build.gradle`

    ```
    ...
    dependencies {
        ...
        compile project(':ActivityAndroid')
    }
    ```

4. Register module (in `MainActivity.java`)

    ```
    import ca.jaysoo.activityandroid.ActivityAndroidPackage;          // <---- Import here

    public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
      ......

      @Override
      protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
          .setApplication(getApplication())
          .setBundleAssetName("index.android.bundle")
          .setJSMainModuleName("index.android")
          .addPackage(new MainReactPackage())
          .addPackage(new ActivityAndroidPackage(this))              // <---- Add here
          .setUseDeveloperSupport(BuildConfig.DEBUG)
          .setInitialLifecycleState(LifecycleState.RESUMED)
          .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

        setContentView(mReactRootView);
      }

      ......

    }
    ```

### Usage

Moving an application to the background.

```js
import { BackAndroid } from 'react-native';
import ActivityAndroid 'react-native-activity-android';

BackAndroid.addEventListener('hardwareBackPress', () => {
  // Note: callbacks are optional. 
  ActivityAndroid.moveTaskToBack(() => console.log('worked'), () => console.log('failed'));
  return false; // Don't exit the app.
});
```

Lifecycle hooks.

```js
import ActivityAndroid 'react-native-activity-android';

ActivityAndroid.addEventListener('activityPause', () => {
  console.log('App is moved to the background');
});

ActivityAndroid.addEventListener('activityResume', () => {
  console.log('App is moved to the foreground');
});

ActivityAndroid.removeEventListener('activityResume', callbackFn);
ActivityAndroid.removeEventListener('activityPause', callbackFn));
```
