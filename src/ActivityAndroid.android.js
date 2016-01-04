module.exports = (React, Set) => {
  const DeviceEventEmitter = React.DeviceEventEmitter;

  const _eventHandlers = {
    activityResume: new Set(),
    activityPause: new Set()
  };

  DeviceEventEmitter.addListener(
    'activityResume', () => {
      _eventHandlers.activityResume.forEach(fn => fn());
    }
  );

  DeviceEventEmitter.addListener(
    'activityPause', () => {
      _eventHandlers.activityPause.forEach(fn => fn());
    }
  );

  return {
    moveTaskToBack(cb) {
      React.NativeModules.ActivityAndroid.moveTaskToBack(cb);
    },
    addEventListener(type, handler) {
      _eventHandlers[type] && _eventHandlers[type].add(handler);
    },
    removeEventListener(type, handler) {
      _eventHandlers[type] && _eventHandlers[type].delete(handler);
    }
  };
};
