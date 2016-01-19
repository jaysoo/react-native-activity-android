module.exports = (React) => {
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
    moveTaskToBack(onSuccess = () => {}, onError = () => {}) {
      return React.NativeModules.ActivityAndroid.moveTaskToBack(onSuccess, onError);
    },
    addEventListener(type, handler) {
      _eventHandlers[type] && _eventHandlers[type].add(handler);
    },
    removeEventListener(type, handler) {
      _eventHandlers[type] && _eventHandlers[type].delete(handler);
    }
  };
};
