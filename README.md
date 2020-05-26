[![](https://api.travis-ci.org/jaysoo/react-native-activity-android.svg)](https://travis-ci.org/jaysoo/react-native-activity-android) [![](https://img.shields.io/npm/dm/react-native-activity-android.svg?style=flat-square)](https://www.npmjs.com/package/react-native-activity-android)


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

4. Register module (in `MainApplication.java`)

    ```
    import ca.jaysoo.activityandroid.ActivityAndroidPackage;          // <---- Import here

    public class MainApplication extends Application implements ReactApplication {
      ......

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          ......,
          new ActivityAndroidPackage()                               // <---- Add here
        );
      }

      ......

    }
    ```

### Usage

Moving an application to the background.

```js
import { BackAndroid } from 'react-native';
import ActivityAndroid from 'react-native-activity-android';

BackAndroid.addEventListener('hardwareBackPress', () => {
  // Note: callbacks are optional.
  ActivityAndroid.moveTaskToBack(() => console.log('worked'), () => console.log('failed'));
  return true; // Don't exit the app.
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
