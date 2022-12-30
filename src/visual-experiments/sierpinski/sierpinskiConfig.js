const LIMITS = {
  DOTS:    { MAX: 10000, MIN: 1 },
}

const DEFAULTS = {
  DOTS: 100,
}

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const CLICK_FUNCTIONALITY = {
  moveCornerA: "MOVE_CORNER_A",
  moveCornerB: "MOVE_CORNER_B",
  moveCornerC: "MOVE_CORNER_C",
}

function initialConfig() {
  return {
    dots: DEFAULTS.DOTS,
    functionality: CLICK_FUNCTIONALITY.moveCornerA,
    corners: {
      pointA: new Point(500, 50),
      pointB: new Point(50, 800),
      pointC: new Point(950, 800),
    }
  }
}

let config = initialConfig()

function getDots() { return config.dots }

function hookupControls() {
  hookupConfigElement("dots-input", "dots-value", "dots", "DOTS")
  hookupFunctionalityButtons()
}

function hookupConfigElement(inputId, valueId, configField, limitsField) {
  const input = document.getElementById(inputId)
  const value = document.getElementById(valueId)
  const initialValue = config[configField]
  const inputLimits = LIMITS[limitsField]

  input.setAttribute("min", inputLimits.MIN)
  input.setAttribute("max", inputLimits.MAX)
  input.value = initialValue
  value.innerHTML = initialValue
  input.oninput = function() {
    value.innerHTML = this.value
    config[configField] = this.value
    paintSierpinski()
  }
}

function hookupFunctionalityButtons() {
  const inputs = document.getElementsByName("click-functionality-input")
  console.log(inputs)
  for (let i = 0; i < inputs.length; i++) {
    console.log(inputs[i])
    inputs[i].onchange = handleClickFunctionChange
  }
}

function handleClickFunctionChange(event) {
  if (event.target.defaultValue == "A") {
    config.functionality = CLICK_FUNCTIONALITY.moveCornerA
  } else if (event.target.defaultValue == "B") {
    config.functionality = CLICK_FUNCTIONALITY.moveCornerB
  } else {
    config.functionality = CLICK_FUNCTIONALITY.moveCornerC
  }

  console.log(config.functionality)
}

function hookupClickHandling() {
  const canvas = document.getElementById('main-canvas')
  canvas.addEventListener("click", handleMouseClickAndDrag)
  canvas.addEventListener("dragover", handleMouseClickAndDrag)
}

function handleMouseClickAndDrag(event) {
  const canvas = document.getElementById('main-canvas')
  const rect = canvas.getBoundingClientRect()
  const eventX = event.clientX - rect.left
  const eventY = event.clientY - rect.top
  const point = new Point(eventX, eventY)
  if (config.functionality == CLICK_FUNCTIONALITY.moveCornerA) {
    config.corners.pointA = point
  } else if (config.functionality == CLICK_FUNCTIONALITY.moveCornerB) {
    config.corners.pointB = point
  } else if (config.functionality == CLICK_FUNCTIONALITY.moveCornerC) {
    config.corners.pointC = point
  }

  console.log(point)
  paintSierpinski()
}