/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview JavaScript for Turtle game.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Turtle');

goog.require('Blockly.Comment');
goog.require('Blockly.FieldColour');
goog.require('Blockly.FlyoutButton');
goog.require('Blockly.JavaScript');
goog.require('Blockly.Toolbox');
goog.require('Blockly.Trashcan');
goog.require('Blockly.utils.math');
goog.require('Blockly.VerticalFlyout');
goog.require('Blockly.Xml');
goog.require('Blockly.ZoomControls');
goog.require('BlocklyCode');
goog.require('BlocklyDialogs');
goog.require('BlocklyGallery');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Slider');
goog.require('Turtle.Blocks');
goog.require('Turtle.html');


BlocklyGames.storageName = 'turtle';

const HEIGHT = 400;
const WIDTH = 400;

/**
 * PID of animation task currently executing.
 * @type !Array<number>
 */
const pidList = [];

/**
 * Number of milliseconds that execution should delay.
 * @type number
 */
let pause = 0;

/**
 * JavaScript interpreter for executing program.
 * @type Interpreter
 */
let interpreter = null;

/**
 * Should the turtle be drawn?
 * @type boolean
 */
let visible = true;

/**
 * Is the drawing ready to be submitted to gallery?
 * @type boolean
 */
let canSubmit = false;

let speedSlider;
let ctxDisplay;
let ctxAnswer;
let ctxScratch;
let turtleX;
let turtleY;
let turtleHeading;
let isPenDown;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 */
function init() {
  Turtle.Blocks.init();

  // Render the HTML.
  document.body.innerHTML = Turtle.html.start(
      {lang: BlocklyGames.LANG,
       level: BlocklyGames.LEVEL,
       maxLevel: BlocklyGames.MAX_LEVEL,
       html: BlocklyGames.IS_HTML});

  BlocklyInterface.init(BlocklyGames.getMsg('Games.turtle', false));

  const rtl = BlocklyGames.IS_RTL;
  const blocklyDiv = BlocklyGames.getElementById('blockly');
  const visualization = BlocklyGames.getElementById('visualization');
  const onresize = function(_e) {
    const top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
    onresize(null);
    Blockly.svgResize(BlocklyInterface.workspace);
  });
  window.addEventListener('resize', onresize);
  onresize(null);

  if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
    Blockly.FieldColour.COLUMNS = 3;
    Blockly.FieldColour.COLOURS =
        ['#ff0000', '#ffcc33', '#ffff00',
         '#009900', '#3333ff', '#cc33cc',
         '#ffffff', '#999999', '#000000'];
  }

  BlocklyInterface.injectBlockly(
      {'rtl': rtl,
       'trashcan': true,
       'zoom': BlocklyGames.LEVEL === BlocklyGames.MAX_LEVEL ?
           {'controls': true, 'wheel': true} : null});
  // Prevent collisions with user-defined functions or variables.
  Blockly.JavaScript.addReservedWords('moveForward,moveBackward,' +
      'turnRight,turnLeft,penUp,penDown,penWidth,penColour,' +
      'hideTurtle,showTurtle,print,font');

  if (BlocklyGames.getElementById('submitButton')) {
    BlocklyGames.bindClick('submitButton', submitToGallery);
  }

  // Initialize the slider.
  const sliderSvg = BlocklyGames.getElementById('slider');
  speedSlider = new Slider(10, 35, 130, sliderSvg);

  let defaultXml;
  if (BlocklyGames.LEVEL === BlocklyGames.MAX_LEVEL) {
    defaultXml =
        '<xml>' +
          '<block type="turtle_move" x="70" y="70">' +
            '<value name="VALUE">' +
              '<shadow type="math_number">' +
                '<field name="NUM">10</field>' +
              '</shadow>' +
            '</value>' +
          '</block>' +
        '</xml>';
  } else {
    defaultXml =
        '<xml>' +
          '<block type="turtle_move_internal" x="70" y="70">' +
            '<field name="VALUE">100</field>' +
          '</block>' +
        '</xml>';
  }
  BlocklyInterface.loadBlocks(defaultXml);

  ctxDisplay = BlocklyGames.getElementById('display').getContext('2d');
  ctxScratch = BlocklyGames.getElementById('scratch').getContext('2d');
  reset();

  BlocklyGames.bindClick('runButton', runButtonClick);
  BlocklyGames.bindClick('resetButton', resetButtonClick);

  BlocklyGames.bindClick('saveButton', saveButtonClick);
  document.getElementById('loadButton')
    .addEventListener('change', loadButtonClick, false);

  // Preload the win sound.
  BlocklyInterface.workspace.getAudioManager().load(
      ['turtle/win.mp3', 'turtle/win.ogg'], 'win');
  // Lazy-load the JavaScript interpreter.
  BlocklyCode.importInterpreter();
  // Lazy-load the syntax-highlighting.
  BlocklyCode.importPrettify();

}


/**
 * Walk from one node to the next in a tree.
 * @param {!Node} node Current node.
 * @returns {Node} Next node, or null if ran off bottom of tree.
 */
function nextNode(node) {
  if (node.firstChild) {
    return node.firstChild;
  }
  do {
    if (node.nextSibling) {
      return node.nextSibling;
    }
  } while ((node = node.parentNode));
  return node;
}


/**
 * Show the help pop-up to encourage clicking on the toolbox categories.
 */
function showCategoryHelp() {
  if (categoryClicked_ || BlocklyDialogs.isDialogVisible_) {
    return;
  }
  const help = BlocklyGames.getElementById('helpToolbox');
  const style = {
    width: '25%',
    top: '3.3em',
  };
  if (BlocklyGames.IS_RTL) {
    style.right = '525px';
  } else {
    style.left = '525px';
  }
  const origin = BlocklyGames.getElementById(':0');  // Toolbox's tree root.
  BlocklyDialogs.showDialog(help, origin, true, false, style, null);
}


/**
 * Flag indicating if a toolbox category has been clicked yet.
 * Level one only.
 * @private
 */
let categoryClicked_ = false;

/**
 * Monitor to see if the user finds the categories in level one.
 * @param {!Blockly.Events.Abstract} event Custom data for event.
 * @private
 */
function watchCategories_(event) {
  if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
    categoryClicked_ = true;
    BlocklyDialogs.hideDialog(false);
    BlocklyInterface.workspace.removeChangeListener(watchCategories_);
  }
}


/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
function reset() {
  // Starting location and heading of the turtle.
  turtleX = HEIGHT / 2;
  turtleY = WIDTH / 2;
  turtleHeading = 0;
  isPenDown = true;
  visible = true;

  // Clear the canvas.
  ctxScratch.canvas.width = ctxScratch.canvas.width;
  ctxScratch.strokeStyle = '#000';
  ctxScratch.fillStyle = '#000';
  ctxScratch.lineWidth = 5;
  ctxScratch.lineCap = 'round';
  ctxScratch.font = 'normal 18pt Arial';
  display();

  // Kill all tasks.
  pidList.forEach(clearTimeout);
  pidList.length = 0;
  interpreter = null;
}

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
function display() {
  // Clear the display with black.
  ctxDisplay.beginPath();
  ctxDisplay.rect(0, 0, ctxDisplay.canvas.width, ctxDisplay.canvas.height);
  ctxDisplay.fillStyle = '#FFF';
  ctxDisplay.fill();

  // Draw the user layer.
  ctxDisplay.globalCompositeOperation = 'source-over';
  ctxDisplay.drawImage(ctxScratch.canvas, 0, 0);

  // Draw the turtle.
  if (visible) {
    // Make the turtle the colour of the pen.
    ctxDisplay.strokeStyle = ctxScratch.strokeStyle;
    ctxDisplay.fillStyle = ctxScratch.fillStyle;

    // Draw the turtle body.
    const radius = ctxScratch.lineWidth / 2 + 10;
    ctxDisplay.beginPath();
    ctxDisplay.arc(turtleX, turtleY, radius, 0, 2 * Math.PI, false);
    ctxDisplay.lineWidth = 3;
    ctxDisplay.stroke();

    // Draw the turtle head.
    const WIDTH = 0.3;
    const HEAD_TIP = 10;
    const ARROW_TIP = 4;
    const BEND = 6;
    let radians = Blockly.utils.math.toRadians(turtleHeading);
    const tipX = turtleX + (radius + HEAD_TIP) * Math.sin(radians);
    const tipY = turtleY - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    const leftX = turtleX + (radius + ARROW_TIP) * Math.sin(radians);
    const leftY = turtleY - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    const leftControlX = turtleX + (radius + BEND) * Math.sin(radians);
    const leftControlY = turtleY - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    const rightControlX = turtleX + (radius + BEND) * Math.sin(radians);
    const rightControlY = turtleY - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    const rightX = turtleX + (radius + ARROW_TIP) * Math.sin(radians);
    const rightY = turtleY - (radius + ARROW_TIP) * Math.cos(radians);
    ctxDisplay.beginPath();
    ctxDisplay.moveTo(tipX, tipY);
    ctxDisplay.lineTo(leftX, leftY);
    ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    ctxDisplay.closePath();
    ctxDisplay.fill();
  }
}

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
function runButtonClick(e) {
  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }
  const runButton = BlocklyGames.getElementById('runButton');
  const resetButton = BlocklyGames.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  BlocklyGames.getElementById('spinner').style.visibility = 'visible';
  execute();
}

/**
 * Click the reset button.  Reset the Turtle.
 * @param {!Event} e Mouse or touch event.
 */
function resetButtonClick(e) {
  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }
  const runButton = BlocklyGames.getElementById('runButton');
  runButton.style.display = 'inline';
  BlocklyGames.getElementById('resetButton').style.display = 'none';
  BlocklyGames.getElementById('spinner').style.visibility = 'hidden';
  BlocklyInterface.workspace.highlightBlock(null);
  reset();

  // Image cleared; prevent user from submitting to gallery.
  canSubmit = false;
}


/**
 * Click the save button.
 */
function saveButtonClick(e) {

  // Prevent double-clicks or double-taps.
  if (BlocklyInterface.eventSpam(e)) {
    return;
  }

  let fileName = BlocklyGames.getElementById("projectName").value;
  if (!fileName) {
    fileName = "turtle-project";
  }
  fileName += ".xml"

  let xml = Blockly.Xml.workspaceToDom(BlocklyInterface.workspace);
  let text = Blockly.Xml.domToText(xml);

  let a = document.createElement('a');
  a.style.display = 'none';
  a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};


/**
* Click the load button. 
*/
function loadButtonClick(e) {

  let file = e.target.files[0];
  if (!file) {
    return;
  }
  let reader = new FileReader();
  reader.onload = function(e) {
    let contents = e.target.result;
    let xml = Blockly.Xml.textToDom(contents);
    Blockly.Xml.domToWorkspace(xml, BlocklyInterface.workspace);
  };
  reader.readAsText(file);
};



/**
 * Inject the Turtle API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS-Interpreter.
 * @param {!Interpreter.Object} globalObject Global object.
 */
function initInterpreter(interpreter, globalObject) {
  // API
  let wrapper;
  wrapper = function(distance, id) {
    move(distance, id);
  };
  wrap('moveForward');

  wrapper = function(distance, id) {
    move(-distance, id);
  };
  wrap('moveBackward');

  wrapper = function(x, y, id) {
    goto(x, y, id);
  };
  wrap('goto');

  wrapper = function(angle, id) {
    turn(angle, id);
  };
  wrap('turnRight');

  wrapper = function(angle, id) {
    turn(-angle, id);
  };
  wrap('turnLeft');

  wrapper = function(id) {
    penDown(false, id);
  };
  wrap('penUp');

  wrapper = function(id) {
    penDown(true, id);
  };
  wrap('penDown');

  wrapper = function(width, id) {
    penWidth(width, id);
  };
  wrap('penWidth');

  wrapper = function(colour, id) {
    penColour(colour, id);
  };
  wrap('penColour');

  wrapper = function(id) {
    isVisible(false, id);
  };
  wrap('hideTurtle');

  wrapper = function(id) {
    isVisible(true, id);
  };
  wrap('showTurtle');

  wrapper = function(text, id) {
    drawPrint(text, id);
  };
  wrap('print');

  wrapper = function(font, size, style, id) {
    drawFont(font, size, style, id);
  };
  wrap('font');

  function wrap(name) {
    interpreter.setProperty(globalObject, name,
        interpreter.createNativeFunction(wrapper, false));
  }
}

/**
 * Execute the user's code.  Heaven help us...
 */
function execute() {
  if (!('Interpreter' in window)) {
    // Interpreter lazy loads and hasn't arrived yet.  Try again later.
    setTimeout(execute, 99);
    return;
  }

  reset();
  Blockly.selected && Blockly.selected.unselect();
  const code = BlocklyCode.getJsCode();
  BlocklyCode.executedJsCode = code;
  BlocklyInterface.executedCode = BlocklyInterface.getCode();
  interpreter = new Interpreter(code, initInterpreter);
  pidList.push(setTimeout(executeChunk_, 100));
}

/**
 * Execute a bite-sized chunk of the user's code.
 * @private
 */
function executeChunk_() {
  // All tasks should be complete now.  Clean up the PID list.
  pidList.length = 0;
  pause = 0;
  // Normally we'll execute until we reach a command that requests a pause
  // (which means a turtle block), then highlight a block and wait, before
  // executing the next chunk.  However, put a limit of 1000 steps on each
  // chunk in case there's a tight loop with no turtle blocks.
  let ticks = 1000;
  let go;
  do {
    try {
      go = interpreter.step();
    } catch (e) {
      // User error, terminate in shame.
      alert(e);
      go = false;
    }
    if (!ticks--) {
      pause = 1;
    }
    if (go && pause) {
      // The last executed command requested a pause.
      go = false;
      pidList.push(setTimeout(executeChunk_, pause));
    }
  } while (go);
  // Wrap up if complete.
  if (!pause) {
    BlocklyGames.getElementById('spinner').style.visibility = 'hidden';
    BlocklyInterface.workspace.highlightBlock(null);
    // Image complete; allow the user to submit this image to gallery.
    canSubmit = true;
  }
}

/**
 * Highlight a block and pause.
 * @param {string|undefined} id ID of block.
 */
function animate(id) {
  // No need for a full render if there's no block ID,
  // since that's the signature of just pre-drawing the answer layer.
  if (id) {
    display();
    BlocklyCode.highlight(id);
    // Scale the speed non-linearly, to give better precision at the fast end.
    const stepSpeed = 1000 * Math.pow(1 - speedSlider.getValue(), 2);
    pause = Math.max(1, stepSpeed);
  }
}

/**
 * Move the turtle forward or backward.
 * @param {number} distance Pixels to move.
 * @param {string=} opt_id ID of block.
 */
function move(distance, opt_id) {
  if (isPenDown) {
    ctxScratch.beginPath();
    ctxScratch.moveTo(turtleX, turtleY);
  }
  let bump = 0;
  if (distance) {
    const radians = Blockly.utils.math.toRadians(turtleHeading);
    turtleX += distance * Math.sin(radians);
    turtleY -= distance * Math.cos(radians);
  } else {
    // WebKit (unlike Gecko) draws nothing for a zero-length line.
    bump = 0.1;
  }
  if (isPenDown) {
    ctxScratch.lineTo(turtleX, turtleY + bump);
    ctxScratch.stroke();
  }
  animate(opt_id);
}


/**
 * Move the turtle to position (x, y)
 * @param {x} the x-coordinate
 * @param {y} the y-coordinate
 * @param {string=} opt_id ID of block.
 */
function goto(x, y, opt_id) {
  if (isPenDown) {
    ctxScratch.beginPath();
    ctxScratch.moveTo(turtleX, turtleY);
  }
  let bump = 0;
  turtleX = x + BlocklyGames.getElementById("display").width / 2;
  turtleY = BlocklyGames.getElementById("display").height / 2 - y;

  if (isPenDown) {
    ctxScratch.lineTo(turtleX, turtleY + bump);
    ctxScratch.stroke();
  }
  animate(opt_id);
}

/**
 * Turn the turtle left or right.
 * @param {number} angle Degrees to turn clockwise.
 * @param {string=} opt_id ID of block.
 */
function turn(angle, opt_id) {
  turtleHeading = BlocklyGames.normalizeAngle(turtleHeading + angle);
  animate(opt_id);
}

/**
 * Lift or lower the pen.
 * @param {boolean} down True if down, false if up.
 * @param {string=} opt_id ID of block.
 */
function penDown(down, opt_id) {
  isPenDown = down;
  animate(opt_id);
}

/**
 * Change the thickness of lines.
 * @param {number} width New thickness in pixels.
 * @param {string=} opt_id ID of block.
 */
function penWidth(width, opt_id) {
  ctxScratch.lineWidth = width;
  animate(opt_id);
}

/**
 * Change the colour of the pen.
 * @param {string} colour CSS colour string.
 * @param {string=} opt_id ID of block.
 */
function penColour(colour, opt_id) {
  ctxScratch.strokeStyle = colour;
  ctxScratch.fillStyle = colour;
  animate(opt_id);
}

/**
 * Make the turtle visible or invisible.
 * @param {boolean} visible True if visible, false if invisible.
 * @param {string=} opt_id ID of block.
 */
function isVisible(visible, opt_id) {
  visible = visible;
  animate(opt_id);
}

/**
 * Print some text.
 * @param {string} text Text to print.
 * @param {string=} opt_id ID of block.
 */
function drawPrint(text, opt_id) {
  ctxScratch.save();
  ctxScratch.translate(turtleX, turtleY);
  ctxScratch.rotate(Blockly.utils.math.toRadians(turtleHeading - 90));
  ctxScratch.fillText(text, 0, 0);
  ctxScratch.restore();
  animate(opt_id);
}

/**
 * Change the typeface of printed text.
 * @param {string} font Font name (e.g. 'Arial').
 * @param {number} size Font size (e.g. 18).
 * @param {string} style Font style (e.g. 'italic').
 * @param {string=} opt_id ID of block.
 */
function drawFont(font, size, style, opt_id) {
  ctxScratch.font = style + ' ' + size + 'pt ' + font;
  animate(opt_id);
}


/**
 * Send an image of the canvas to gallery.
 */
function submitToGallery() {
  if (!canSubmit) {
    alert(BlocklyGames.getMsg('Turtle.submitDisabled', false));
    return;
  }
  // Encode the thumbnail.
  const thumbnail = BlocklyGames.getElementById('thumbnail');
  const ctxThumb = thumbnail.getContext('2d');
  ctxThumb.globalCompositeOperation = 'copy';
  ctxThumb.drawImage(ctxDisplay.canvas, 0, 0, 200, 200);
  const thumbData = thumbnail.toDataURL('image/png');
  BlocklyGames.getElementById('galleryThumb').value = thumbData;

  // Show the dialog.
  BlocklyGallery.showGalleryForm();
}



BlocklyGames.callWhenLoaded(init);
