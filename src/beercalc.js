(function() {
	'use strict'

	// Set vars
	var root = this,
			Beercalc  = {}

	//Export our variable name
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Beercalc;
		}
		exports.Beercalc = Beercalc;
	} else {
		root.Beercalc = Beercalc;
	}


	/* ABV()
  #  param og: number - original gravity
  #  param fg: number - final gravity
  */
	Beercalc.abv = function(og, fg){
		if(og > fg && !isNaN(og) && !isNaN(fg))
			return (og - fg) * 131;
    else
      return null;
	}


	/* ABW()
  #  param og: number - original gravity
  #  param fg: number - final gravity
  #  SOURCE = http://hbd.org/ensmingr/
  */
  Beercalc.abw = function(og, fg){
    if(og > fg && !isNaN(og) && !isNaN(fg))
      return (0.79 * this.abv(og, fg)) / fg;
    else
      return null;
  }

	/* MCU()
  #  param weight: number - lbs of grain
  #  param lovibond: number - typically a number between
  #  param volume: number - gallons
  */
  Beercalc.mcu = function(weight, lovibond, volume){
    if(volume != 0 && volume != null && weight != null && lovibond != null && !isNaN(weight) && !isNaN(lovibond) && !isNaN(volume))
      return (weight * lovibond) / volume;
    else
      return null;
  }

	/* SRM()
  #  param weight: number - lbs of grain
  #  param lovibond: number - typically a number between 1-25
  #  param volume: number - gallons
  */
  Beercalc.srm = function(weight, lovibond, volume){
    if(volume != null && weight != null && lovibond != null && !isNaN(weight) && !isNaN(lovibond) && !isNaN(volume))
      return 1.4922 * (Math.pow(this.mcu(weight, lovibond, volume), 0.6859));
    else
      return null;
  }

	/* AAU()
  #  param alpha: percent - alpha unit of the hop
  #  param weight: number - oz of hops
  */
  Beercalc.aau = function(alpha, weight){
    if(alpha != null && weight != null && !isNaN(alpha) && !isNaN(weight))
      return alpha * weight;
    else
      return null;
  }

	/* IBU()
  #  param alpha: percent - alpha unit of the hop
  #  param weight: number - oz of hops
  #  param utilization: number - output of self.utilization
  #  param volume: number - gallons
  */
  Beercalc.ibu = function(alpha, weight, time, gravity, volume){
    if(volume != 0 && alpha != null && weight != null && time != null && gravity != null && volume != null && !isNaN(alpha) && !isNaN(weight) && !isNaN(time) && !isNaN(gravity) && !isNaN(volume))
      return this.aau(alpha, weight) * this.utilization(time, gravity) * 75 / volume;
    else
      return null;
  }

	/* UTILIZATION()
  #  param time: number - minute hops are in the boil
  #  param gravity: number - gravity of the boil upon inserting Ex. 1.050
  */
  Beercalc.utilization = function(time, gravity){
    if(!isNaN(time) && !isNaN(gravity) && time != null && gravity != null)
      return (1.65 * Math.pow(0.000125,(gravity - 1))) * (1 - Math.pow(Math.E,(-0.04 * time))) / 4.15;
    else
      return null;
  }

	/* PLATO
  #  param sGravity: number - specific gravity
  #  SOURCE = http://hbd.org/ensmingr/
  */
  Beercalc.plato = function(sGravity){
    if(!isNaN(sGravity) && sGravity != null)
      return (-463.37) + (668.72 * sGravity) - (205.35 * Math.pow(sGravity,2));
    else
      return null;
  }

	/* REAL EXTRACT
  #  param og: number - original gravity
  #  param fg: number - final gracivity
  #  SOURCE = http://hbd.org/ensmingr/
  */
  Beercalc.realExtract = function(og, fg){
    if(og > fg && !isNaN(og) && !isNaN(fg) && og != null && fg != null)
      return(0.1808 * this.plato(og)) + (0.8192 * this.plato(fg));
    else
      return null;
  }

	/* CALORIES (in 12 ounce increments)
  #  param og: number - original gravity
  #  param fg: number - final gravity
  #  SOURCE = http://hbd.org/ensmingr/
  */
  Beercalc.calories = function(og, fg){
    if(og > fg && !isNaN(og) && !isNaN(fg) && og != null && fg != null)
      return ((6.9 * this.abw(og, fg)) + 4.0 * (this.realExtract(og, fg) - 0.1)) * fg * 3.55;
    else
      return null;
  }

	/* ATTENUATION
  #  param og: number - original gravity
  #  param fg: number - final gracivity
  #  Assuming this is in gravity (Ex. 1.054)
  */
  Beercalc.attenuation = function(og, fg){
    if(og > fg && !isNaN(og) && !isNaN(fg) && og != null && fg != null)
      return (og - fg)/(og - 1);
    else
      return null;
  }

	/* GRAVITY UNITS
  #  param g: number - gravity
  */
  Beercalc.gu = function(g){
    if(!isNaN(g) && g != null)
      return Math.round((g - 1) * 1000);
    else
      return null;
  }

	/* TOTAL GRAVITY
  # param g: number - gravity
  # param v: number - volume in gallons
  */
  Beercalc.totalGravity = function(g, v){
    if(!isNaN(g) && !isNaN(v) && g != null && v != null)
      return this.gu(g) * v;
    else
      return null;
  }

	/* FINAL GRAVITY
  #  param g: number - initial gravity
  #  param vol_beg: number - volume in gallons at the begining of the boil
  #  param vol_end: number - volume in gallons at the end of the boil
  */
  Beercalc.finalGravity = function(g, vol_beg, vol_end){
    if(!isNaN(g) && !isNaN(vol_beg) && !isNaN(vol_end) && g != null && vol_beg != null && vol_end != null)
      return this.totalGravity(g, vol_beg) / vol_end;
    else
      return null;
  }

	/* EXTRACT ADDITION
  # param target_gu: number - Target Total Gravity in Gravity Units
  # param total_gu: number - Total Gravity from Mash in Gravity Units
  # param extract: string/number - should be 'LME' or 'DME' or custom value
  */
  Beercalc.extractAddition = function(target_gu, total_gu, extractType){
    var extract;
		if(extractType == 'LME')
      extract = 38;
    else if(extractType == 'DME')
      extract = 45;
    else if(!isNaN(extractType))
      extract = extractType;

    if(!isNaN(target_gu) && !isNaN(total_gu) && !isNaN(extract) && target_gu != null && total_gu != null && extractType != null)
      return (target_gu - total_gu) / extract;
    else
      return null;
  }

	/* GRAVITY TEMPERATURE CORRECTION
  # param temp: number - Temperature in Fahrenheit
  # param g: number - Gravity from the hydrometer reading
  */
  Beercalc.gravityCorrection = function(temp, g){
    if(!isNaN(temp) && !isNaN(g) && temp != null && g != null)
      return ((1.313454 - 0.132674*temp + 2.057793*Math.pow(10,-3)*Math.pow(temp,2) - 2.627634*Math.pow(10,-6)*Math.pow(temp,3)) * 0.001) + g;
    else
      return null;
  }

}).call(this);
