const makeFontVariationSettings = (xRatio, yRatio) => {
  const mapXRatio = mapRatioToWeight(300, 700);
  const mapYRatio = mapRatioToWeight(300, 700);

  return `'wdth' ${mapXRatio(xRatio)}, 'wght' ${mapYRatio(yRatio)}`;
}

const round = (value, base) => {
  return Math.round(value / base) * base;
}

const calcAccRatio = (accMin = -7, accMax = 7) => (acc) => {
  const ratio = (acc - accMin) / (accMax - accMin);

  if (ratio < 0) {
    return 0;
  }
 
  if (ratio > 1) {
    return 1;
  }

  return ratio;
}

const mapRatioToWeight = (weightMin, weightMax) => (ratio) => {
  return Math.round(ratio * (weightMax - weightMin) + weightMin);
}



function setFontVariation(accX, accY) {
  const calcRatio = calcAccRatio(-3, 3);

  const fontVariation = makeFontVariationSettings(calcRatio(accX), calcRatio(accY));
  // const $v = document.getElementById('v')
  // $v.innerHTML = fontVariation
  document.body.style.fontVariationSettings = fontVariation;
}

function run() {
  function clean () {
    count = 0;
    sumX = 0;
    sumY = 0;
  }

  let count;
  let sumX;
  let sumY;
  const BUFF_COUNT = 5;

  clean();
  
  window.addEventListener("devicemotion", (event) => {
    const x = event.accelerationIncludingGravity.x
    const y = event.accelerationIncludingGravity.y
    const z = event.accelerationIncludingGravity.z

    
    count += 1;
    
    if (count === BUFF_COUNT) {
      setFontVariation(sumX / BUFF_COUNT, sumY / BUFF_COUNT);
      clean();
    } else {
      sumX += x;
      sumY += y;
    }
    
  })
  
  
}

window.addEventListener('load', run)