Coding Dojo with javascript, to train pair programming

See
 - about game of life: http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Music
 - javascript test tool: http://pivotal.github.com/jasmine/
  - matchers: https://github.com/pivotal/jasmine/wiki/Matchers
  - spies: https://github.com/pivotal/jasmine/wiki/Spies

  
to run tests with jsTestdriver:
 - create a copy of "js-test-driver.conf" and call it "jsGameOfLifeTestDriver.conf"
 - put the following content into it
 
 ///begin content
 server: http://localhost:42442

load:
  - tools/game_of_life/lib/jasmine-1.1.0/jasmine.js
  - tools/game_of_life/src/lib.js  
  - tools/game_of_life/spec/test.js
  
///end content
  
 - create a copy of the "all-js-unit-tests" run configuration and name it "game-of-life"
  - set "Conf File" to "jsGameOfLifeTestDriver.conf"  






