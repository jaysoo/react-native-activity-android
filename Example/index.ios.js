'use strict';

const React = require('react-native');
const ActivityAndroid = require('react-native-activity-android');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

const Example = React.createClass({
  componentDidMount() {
    ActivityAndroid.addEventListener('activityResume', () => {
      console.log('app resumed');
    });
    ActivityAndroid.addEventListener('activityPause', () => {
      console.log('app paused');
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={ () => ActivityAndroid.moveTaskToBack() }>
          Pressing here on iOS does nothing...
        </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 20
  },
});

AppRegistry.registerComponent('Example', () => Example);

