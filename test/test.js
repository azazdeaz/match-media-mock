var assert = require('assert')
var MatchMediaMock = require('../src/MatchMediaMock')
var MediaQueryListMock = require('../src/MediaQueryListMock')
var ExecutionEnvironment = require('exenv')

ExecutionEnvironment.canUseDOM = true

describe('MatchMediaMock', function(){
  it('should be creatable with MatchMediaMock.create()', function(){
    var matchMediaMock = MatchMediaMock.create()
    assert(matchMediaMock)
  })

  it('return a MediaQueryListMock instance', function () {
    var matchMediaMock = MatchMediaMock.create()
    matchMediaMock.setConfig({type: 'screen'})
    var mql = matchMediaMock('(max-width: 1200px)')

    assert(mql instanceof MediaQueryListMock)
  })
})

describe('MediaQueryListMock', function(){
  it('should properly match', function () {
    var matchMediaMock = MatchMediaMock.create()
    matchMediaMock.setConfig({type: 'screen', width: 1200})

    assert(!matchMediaMock('(max-width: 1199px)').matches)
    assert(matchMediaMock('(max-width: 1200px)').matches)
  })

  it('should add and remove listeners', function () {
    var matchMediaMock = MatchMediaMock.create()
    var mql = matchMediaMock('only screen')

    var listener = function () {}
    mql.addListener(listener)
    assert.strictEqual(mql._listeners.length, 1)
    mql.removeListener(listener)
    assert.strictEqual(mql._listeners.length, 0)
  })

  it('should call listeners on change config', function () {
    var matchMediaMock = MatchMediaMock.create()
    var mql = matchMediaMock('only screen')
    var called = false

    var listener = function () {
      called = true
    }
    mql.addListener(listener)

    matchMediaMock.setConfig({type: 'screen'})

    assert(called)
  })
})
