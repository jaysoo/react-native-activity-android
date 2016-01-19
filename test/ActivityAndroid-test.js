'use strict';

const EventEmitter = require('events').EventEmitter;
const expect = require('chai').expect;
const activityAndroidFactory = require('../src/ActivityAndroid.android');
const sinon = require('sinon');

describe('ActivityAndroid', () => {
  let sut, emitter, alc;
  beforeEach(() => {
    emitter = new EventEmitter();
    alc = {};

    const ReactStub = {
      DeviceEventEmitter: emitter,
      NativeModules: { ActivityAndroid: alc }
    };

    sut = activityAndroidFactory(ReactStub);
  });

  describe('addEventListener', () => {
    it('registers callbacks for resume and pause events', () => {
      ['activityResume', 'activityPause'].forEach(type => {
        const cb = sinon.spy();

        sut.addEventListener(type, cb);
        emitter.emit(type);

        expect(cb.callCount).to.eql(1);
      });
    });

    it('unregisters callbacks for resume and pause events', () => {
      ['activityResume', 'activityPause'].forEach(type => {
        const cb = sinon.spy();

        sut.addEventListener(type, cb);
        sut.removeEventListener(type, cb);
        emitter.emit(type);

        expect(cb.callCount).to.eql(0);
      });
    });

    it('supports multiple callbacks for resume and pause events', () => {
      ['activityResume', 'activityPause'].forEach(type => {
        const callbackOne = sinon.spy();
        const callbackTwo = sinon.spy();
        const callbackThree = sinon.spy();

        sut.addEventListener(type, callbackOne);
        sut.addEventListener(type, callbackTwo);
        sut.addEventListener(type, callbackThree);
        emitter.emit(type);

        sut.removeEventListener(type, callbackOne);
        emitter.emit(type);

        sut.removeEventListener(type, callbackTwo);
        emitter.emit(type);

        sut.removeEventListener(type, callbackThree);
        emitter.emit(type);

        expect(callbackOne.callCount).to.eql(1);
        expect(callbackTwo.callCount).to.eql(2);
        expect(callbackThree.callCount).to.eql(3);
      });
    });

    it('handles unsupported events', () => {
      let error = false;

      try {
        sut.addEventListener('bad', () => {});
      } catch(e) {
        error = true;
      }

      expect(error).to.be.false;
    });
  });
});
