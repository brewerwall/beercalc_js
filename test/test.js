Beercalc = require('../src/beercalc.js')

var assert = require("assert")
describe('Beercalc', function(){

  describe('abv()', function(){
    it('should return 7.204999999999992', function(){
      assert.equal(7.204999999999992, Beercalc.abv(1.055, 1));
    });
    it('should return null', function(){
      assert.equal(null, Beercalc.abv(1, 1.055));
      assert.equal(null, Beercalc.abv("asdf", "asdf"));
    });
  });

  describe('abv()', function(){
    it('should return 5.691949999999994', function(){
      assert.equal(5.691949999999994, Beercalc.abw(1.055, 1));
    });
    it('should return null', function(){
      assert.equal(null, Beercalc.abw(1, 1.055));
      assert.equal(null, Beercalc.abw("asdf", "asdf"));
    });
  });

  describe('mcu()', function(){
    it('should return 5', function(){
      assert.equal(5, Beercalc.mcu(5, 5, 5));
    });

    it('should return 5.5', function(){
      assert.equal(5.5, Beercalc.mcu(5.5, 5.5, 5.5));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.mcu(1, 1, 0));
      assert.equal(null, Beercalc.mcu(1, 1, null));
      assert.equal(null, Beercalc.mcu(null, 1, 1));
      assert.equal(null, Beercalc.mcu(1, null, 1));
      assert.equal(null, Beercalc.mcu(null, null, null));
    });
  });

  describe('srm()', function(){
    it('should return 5.668651803424155', function(){
      assert.equal(5.668651803424155, Beercalc.srm(7, 5, 5));
    });

    it('should return 5.943353419684101', function(){
      assert.equal(5.943353419684101, Beercalc.srm(7.5, 5.5, 5.5));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.srm(null, null, null));
      assert.equal(null, Beercalc.srm("asdf", "asdf", "asdf"));
    });
  });

  describe('aau()', function(){
    it('should return 9.600000000000001', function(){
      assert.equal(9.600000000000001, Beercalc.aau(1.5, 6.4));  // Based off Palmer's Calculation
    });

    it('should return 4.6', function(){
      assert.equal(4.6, Beercalc.aau(1, 4.6));  // Based off Palmer's Calculation
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.aau(null, 5));
      assert.equal(null, Beercalc.aau(4, null));
      assert.equal(null, Beercalc.aau(null, null));
      assert.equal(null, Beercalc.aau("asdf", "asdf"));
    });

  });

  describe('utilization()', function(){
    it('should return 0.08363227080582435', function(){
      assert.equal(0.08363227080582435, Beercalc.utilization(10, 1.050));
    });

    it('should return 0.30113013986478654', function(){
      assert.equal(0.30113013986478654, Beercalc.utilization(120, 1.030));
    });

    it('should return 0.14780486892282785', function(){
      assert.equal(0.14780486892282785, Beercalc.utilization(45, 1.090));
    });

    it('should return 0.0', function(){
      assert.equal(0.0, Beercalc.utilization(0, 1.070));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.utilization(null, null));
      assert.equal(null, Beercalc.utilization("asdf", "asdf"));
    });
  });

  describe('ibu()', function(){
    it('should return 25.365869680614512', function(){
      assert.equal(25.365869680614512, Beercalc.ibu(6.4, 1.5, 60, 1.080, 5)); //Based off Palmer's Calculation
    });

    it('should return 6.03108750923272', function(){
      assert.equal(6.03108750923272, Beercalc.ibu(4.6, 1, 15, 1.080, 5)); //Based off Palmer's Calculation
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.ibu(null, 1, 15, 1.080, 5));
      assert.equal(null, Beercalc.ibu(null, null, 15, 1.080, 5));
      assert.equal(null, Beercalc.ibu(null, null, null, 1.080, 5));
      assert.equal(null, Beercalc.ibu(null, null, null, null, 5));
      assert.equal(null, Beercalc.ibu(null, null, null, null, null));
      assert.equal(null, Beercalc.ibu("asdf", "asdf", "asdf", "asdf", "asdf"));
    });
  });

  describe('plato()', function(){
    it('should return 17.055185000000108', function(){
      assert.equal(17.055185000000108, Beercalc.plato(1.070)); //Based off Palmer's Calculation
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.plato(null));
      assert.equal(null, Beercalc.plato("asdf"));
    });
  });

  describe('realExtract()', function(){
    it('should return 6.216277095999994', function(){
      assert.equal(6.216277095999994, Beercalc.realExtract(1.070, 1.015)); // Based on http://hbd.org/ensmingr/
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.realExtract(null));
      assert.equal(null, Beercalc.realExtract("asdf"));
    });
  });

  describe('calories()', function(){
    it('should return 227.57821703464833', function(){
      assert.equal(227.57821703464833, Beercalc.calories(1.070, 1.015)); // Based on http://hbd.org/ensmingr/
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.calories(1.015, 1.070));
      assert.equal(null, Beercalc.calories(null, null));
      assert.equal(null, Beercalc.calories("asdf", "asdf"));
    });
  });

  describe('attenuation()', function(){
    it('should return 0.7777777777777778', function(){
      assert.equal(0.7777777777777778, Beercalc.attenuation(1.054, 1.012));
    });
    it('should return null', function(){
      assert.equal(null, Beercalc.attenuation(1, 1.055));
      assert.equal(null, Beercalc.attenuation(null, null));
      assert.equal(null, Beercalc.attenuation("asdf", "asdf"));
    });
  });

  describe('gu()', function(){
    it('should return 54', function(){
      assert.equal(54, Beercalc.gu(1.054));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.gu(null));
      assert.equal(null, Beercalc.gu("asdf"));
    });
  });

  describe('totalGravity()', function(){
    it('should return 270', function(){
      assert.equal(270, Beercalc.totalGravity(1.054, 5));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.totalGravity(null, null));
      assert.equal(null, Beercalc.totalGravity("asdf", "asdf"));
    });
  });

  describe('finalGravity()', function(){
    it('should return 54', function(){
      assert.equal(54, Beercalc.finalGravity(1.054, 5, 5));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.finalGravity(null, null, null));
      assert.equal(null, Beercalc.finalGravity("asdf", "asdf", "asdf"));
    });
  });

  describe('extractAddition()', function(){
    it('should return 1.1777777777777778', function(){
      assert.equal(1.1777777777777778, Beercalc.extractAddition(408, 355, 45));
      assert.equal(1.1777777777777778, Beercalc.extractAddition(408, 355, 'DME'));
    });

    it('should return 1.394736842105263', function(){
      assert.equal(1.394736842105263, Beercalc.extractAddition(408, 355, 'LME'));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.extractAddition(null, null, 'LME'));
      assert.equal(null, Beercalc.extractAddition(null, null, null));
    });
  });

  describe('gravityCorrection()', function(){
    it('should return 1.0560765751842796', function(){
      assert.equal(1.0560765751842796, Beercalc.gravityCorrection(100.4, 1.050));
    });

    it('should return null', function(){
      assert.equal(null, Beercalc.gravityCorrection(100.4, "asdf"));
      assert.equal(null, Beercalc.gravityCorrection("asdf", 1.050));
      assert.equal(null, Beercalc.gravityCorrection("asdf", "asdf"));
      assert.equal(null, Beercalc.gravityCorrection(null, null));
    });
  });

});
