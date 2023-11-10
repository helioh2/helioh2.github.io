/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview HTML for Turtle game.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Turtle.html');

goog.require('Blockly.Msg');
goog.require('BlocklyGames');
goog.require('BlocklyGames.html');


/**
 * Web page structure.
 * @param {!Object} ij Injected options.
 * @returns {string} HTML.
 */
Turtle.html.start = function(ij) {
  return `
${BlocklyGames.html.headerBar(ij, BlocklyGames.getMsg('Games.turtle', true), '', true, false, '')}

<div id="visualization">
  <canvas id="scratch" width=400 height=400 style="display: none"></canvas>
  <canvas id="answer" width=400 height=400 style="display: none"></canvas>
  <canvas id="display" width=400 height=400></canvas>
</div>
<table style="padding-top: 1em;">
  <tr>
    <td style="width: 190px; text-align: center; vertical-align: top;">
      <svg
          id="slider"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width=150
          height=50>
        <!-- Slow icon. -->
        <clipPath id="slowClipPath">
          <rect width=26 height=12 x=5 y=14 />
        </clipPath>
        <image xlink:href="common/icons.png" height=63 width=84 x=-21 y=-10
            clip-path="url(#slowClipPath)" />
        <!-- Fast icon. -->
        <clipPath id="fastClipPath">
          <rect width=26 height=16 x=120 y=10 />
        </clipPath>
        <image xlink:href="common/icons.png" height=63 width=84 x=120 y=-11
            clip-path="url(#fastClipPath)" />
      </svg>
    </td>
    <td style="width: 15px;">
      <img id="spinner" style="visibility: hidden;" src="common/loading.gif" loading="lazy" height=15 width=15>
    </td>
    <td style="width: 190px; text-align: center">
      <button id="runButton" class="primary" title="${BlocklyGames.getMsg('Games.runTooltip', true)}">
        <img src="common/1x1.gif" class="run icon21"> ${BlocklyGames.getMsg('Games.runProgram', true)}
      </button>
      <button id="resetButton" class="primary" style="display: none" title="${BlocklyGames.getMsg('Games.resetTooltip', true)}">
        <img src="common/1x1.gif" class="stop icon21"> ${BlocklyGames.getMsg('Games.resetProgram', true)}
      </button>
    </td>
  </tr>

  <tr style="align: center;">
    <td style="width: 100px; text-align: center">
      <button id="codeJsButton" title="Mostra código em Javascript gerado.">
        <img src="common/js.png" width="20%"> Gerar código JS
      </button>
    </td>
    <td></td>
    <td style="width: 100px; text-align: center">
      <button id="codePyButton" title="Mostra código em Python gerado.">
        <img src="common/python.png" width="20%"> Gerar código Python
      </button>
    </td>
  </tr>
</table>

<div id="dialogCode" class="dialogHiddenContent">
  <pre id="containerCodeGenerated"></pre>
  

  <table>
  <tr>
  <td> 
    <div class="farLeft" style="padding: 1ex 3ex 0"> 
    <button id="copyCodeButton"><img src="common/copy.png" width="50%"> Copiar</button>
    </div>
    </td>
  <td style="width:90%"> ${BlocklyGames.html.ok()} </td>
    
  </tr>
  </table>
    
  </div>
</div>

${(ij.level === 10 && !ij.html) ? Turtle.html.gallery_(ij.lang) : ''}

${Turtle.html.toolbox_(ij.level)}
<div id="blockly"></div>

${BlocklyGames.html.dialog()}
${BlocklyGames.html.doneDialog()}
${BlocklyGames.html.abortDialog()}
${BlocklyGames.html.storageDialog()}

${Turtle.html.helpDialogs_(ij.level, ij.html)}

<footer><img src="common/logo_built_on.png" alt="Built on Blockly" width="7%"></footer>

`;
};

/**
 * Gallery view button and submission form.
 * @param {string} lang ISO language code.
 * @returns {string} HTML.
 * @private
 */
Turtle.html.gallery_ = function(lang) {
  return `
<table style="padding-top: 1em; width: 400px;">
  <tr>
    <td style="text-align: center;">
      <form action="/gallery" target="turtle-gallery">
        <input type="hidden" name="app" value="turtle">
        <input type="hidden" name="lang" value="${lang}">
        <button type="submit" title="${BlocklyGames.getMsg('Turtle.galleryTooltip', true)}">
          <img src="common/1x1.gif" class="gallery icon21"> ${BlocklyGames.getMsg('Turtle.galleryMsg', true)}
        </button>
      </form>
    </td>
    <td style="text-align: center;">
      <button id="submitButton" title="${BlocklyGames.getMsg('Turtle.submitTooltip', true)}">
        <img src="common/1x1.gif" class="camera icon21"> ${BlocklyGames.getMsg('Turtle.submitMsg', true)}
      </button>
    </td>
  </tr>
</table>
<div id="galleryDialog" class="dialogHiddenContent">
    <form id="galleryForm" action="/gallery-api/submit" method="post" onsubmit="return false">
    <header>${BlocklyGames.getMsg('Turtle.submitTooltip', true)}</header>
    <canvas id="thumbnail" width=200 height=200></canvas>
    <input type="hidden" name="app" value="turtle">
    <input id="galleryThumb" type="hidden" name="thumb">
    <input id="galleryXml" type="hidden" name="xml">
    <div>
      ${BlocklyGames.getMsg('Games.submitTitle', true)}
      <input id="galleryTitle" type="text" name="title" required>
    </div>

    <div class="farSide">
      <button class="addHideHandler" type="button">${BlocklyGames.esc(Blockly.Msg['DIALOG_CANCEL'])}</button>
      <button id="galleryOk" class="secondary" type="submit">${BlocklyGames.esc(Blockly.Msg['DIALOG_OK'])}</button>
    </div>
  </form>
</div>
`;
};

/**
 * Toolboxes for each level.
 * @param {number} level Level 1-10.
 * @returns {string} HTML.
 * @private
 */
Turtle.html.toolbox_ = function(level) {
  let xml = `
<category name="${BlocklyGames.getMsg('Games.turtle', true)}">
  <block type="get_turtle_x"></block>
  <block type="get_turtle_y"></block>
  <block type="get_turtle_direction"></block>
  <block type="turtle_move">
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  <block type="turtle_goto">
    <value name="VALUE_X">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
    <value name="VALUE_Y">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  <block type="turtle_turn">
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">90</field>
      </block>
    </value>
  </block>
  <block type="turtle_direction">
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">90</field>
      </block>
    </value>
  </block>
  <block type="turtle_width">
    <value name="WIDTH">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>
  <block type="turtle_pen"></block>
  <block type="turtle_visibility"></block>
  <block type="turtle_print">
    <value name="TEXT">
      <block type="text"></block>
    </value>
  </block>
  <block type="turtle_font"></block>
</category>
<category name="${BlocklyGames.getMsg('Games.catColour', true)}">
  <block type="turtle_colour">
    <value name="COLOUR">
      <block type="colour_picker"></block>
    </value>
  </block>
  <block type="colour_picker"></block>
  <block type="colour_random"></block>
  <block type="colour_rgb">
    <value name="RED">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
    <value name="GREEN">
      <block type="math_number">
        <field name="NUM">50</field>
      </block>
    </value>
    <value name="BLUE">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  <block type="colour_blend">
    <value name="COLOUR1">
      <block type="colour_picker">
        <field name="COLOUR">#ff0000</field>
      </block>
    </value>
    <value name="COLOUR2">
      <block type="colour_picker">
        <field name="COLOUR">#3333ff</field>
      </block>
    </value>
    <value name="RATIO">
      <block type="math_number">
        <field name="NUM">0.5</field>
      </block>
    </value>
  </block>
</category>
<category name="${BlocklyGames.getMsg('Games.catLogic', true)}">
  <block type="controls_if"></block>
  <block type="logic_compare"></block>
  <block type="logic_operation"></block>
  <block type="logic_negate"></block>
  <block type="logic_boolean"></block>
  <block type="logic_ternary"></block>
</category>
<category name="${BlocklyGames.getMsg('Games.catLoops', true)}">
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  <block type="controls_whileUntil"></block>
  <block type="controls_for">
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
    <value name="BY">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>
  <block type="controls_flow_statements"></block>
</category>
<category name="${BlocklyGames.getMsg('Games.catMath', true)}">
  <block type="math_number"></block>
  <block type="math_arithmetic">
    <value name="A">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="B">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>
  <block type="math_single">
    <value name="NUM">
      <block type="math_number">
        <field name="NUM">9</field>
      </block>
    </value>
  </block>
  <block type="math_trig">
    <value name="NUM">
      <block type="math_number">
        <field name="NUM">45</field>
      </block>
    </value>
  </block>
  <block type="math_constant"></block>
  <block type="math_number_property">
    <value name="NUMBER_TO_CHECK">
      <block type="math_number">
        <field name="NUM">0</field>
      </block>
    </value>
  </block>
  <block type="math_round">
    <value name="NUM">
      <block type="math_number">
        <field name="NUM">3.1</field>
      </block>
    </value>
  </block>
  <block type="math_modulo">
    <value name="DIVIDEND">
      <block type="math_number">
        <field name="NUM">64</field>
      </block>
    </value>
    <value name="DIVISOR">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  <block type="math_constrain">
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">50</field>
      </block>
    </value>
    <value name="LOW">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="HIGH">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
  </block>
  <block type="math_random_int">
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
  </block>
  <block type="math_random_float"></block>
</category>
<category name="${BlocklyGames.getMsg('Games.catLists', true)}">
  <block type="lists_create_with">
    <mutation items="0"></mutation>
  </block>
  <block type="lists_create_with"></block>
  <block type="lists_repeat">
    <value name="NUM">
      <block type="math_number">
        <field name="NUM">5</field>
      </block>
    </value>
  </block>
  <block type="lists_length"></block>
  <block type="lists_isEmpty"></block>
  <block type="lists_indexOf">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">list</field>
      </block>
    </value>
  </block>
  <block type="lists_getIndex">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">list</field>
      </block>
    </value>
  </block>
  <block type="lists_setIndex">
    <value name="LIST">
      <block type="variables_get">
        <field name="VAR">list</field>
      </block>
    </value>
  </block>
  <block type="lists_getSublist">
    <value name="LIST">
      <block type="variables_get">
        <field name="VAR">list</field>
      </block>
    </value>
  </block>
  <block type="lists_sort"></block>
  <block type="lists_reverse"></block>
</category>
<category name="${BlocklyGames.getMsg('Games.catText', true)}">
  <block type="text"></block>
  <block type="text_join"></block>
  <block type="text_append">
    <value name="TEXT">
      <block type="text"></block>
    </value>
  </block>
  <block type="text_length">
    <value name="VALUE">
      <block type="text">
        <field name="TEXT">abc</field>
      </block>
    </value>
  </block>
  <block type="text_isEmpty">
    <value name="VALUE">
      <block type="text">
        <field name="TEXT"></field>
      </block>
    </value>
  </block>
  <block type="text_indexOf">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">text</field>
      </block>
    </value>
    <value name="FIND">
      <block type="text">
        <field name="TEXT">abc</field>
      </block>
    </value>
  </block>
  <block type="text_charAt">
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR">text</field>
      </block>
    </value>
  </block>
  <block type="text_getSubstring">
    <value name="STRING">
      <block type="variables_get">
        <field name="VAR">text</field>
      </block>
    </value>
  </block>
  <block type="text_changeCase">
    <value name="TEXT">
      <block type="text">
        <field name="TEXT">abc</field>
      </block>
    </value>
  </block>
  <block type="text_trim">
    <value name="TEXT">
      <block type="text">
        <field name="TEXT">abc</field>
      </block>
    </value>
  </block>
  <block type="text_print">
    <value name="TEXT">
      <block type="text">
        <field name="TEXT">abc</field>
      </block>
    </value>
  </block>
  <block type="text_prompt_ext">
    <value name="TEXT">
      <block type="text">
        <field name="TEXT">abc</field>
      </block>
    </value>
  </block>
</category>
<sep></sep>
<category name="${BlocklyGames.getMsg('Games.catVariables', true)}" custom="VARIABLE"></category>
<category name="${BlocklyGames.getMsg('Games.catProcedures', true)}" custom="PROCEDURE"></category>
`;
  return `<xml id="toolbox" xmlns="https://developers.google.com/blockly/xml">${xml}</xml>`;
};

/**
 * Help dialogs for each level.
 * @param {number} level Level 1-10.
 * @param {boolean} isHtml True if served as raw HTML files.
 * @returns {string} HTML.
 * @private
 */
Turtle.html.helpDialogs_ = function(level, isHtml) {
  let content = '';
  switch (level) {
    case 1:
      content = BlocklyGames.getMsg('Turtle.helpText1', true) +
          '<br><img src="index/square.gif" height=146 width=146 style="margin-bottom: -50px">';
      break;
    case 2:
      content = BlocklyGames.getMsg('Turtle.helpText2', true);
      break;
    case 3:
      content = BlocklyGames.getMsg('Turtle.helpText3a', true) +
      '<div id="sampleHelp3" class="readonly"></div>' +
      BlocklyGames.getMsg('Turtle.helpText3b', true);
      break;
    case 4:
      content = BlocklyGames.getMsg('Turtle.helpText4a', true) +
          '<div id="sampleHelp4" class="readonly"></div>' +
      BlocklyGames.getMsg('Turtle.helpText4a', true);
      break;
    case 5:
      content = BlocklyGames.getMsg('Turtle.helpText5', true);
      break;
    case 6:
      content = BlocklyGames.getMsg('Turtle.helpText6', true);
      break;
    case 7:
      content = BlocklyGames.getMsg('Turtle.helpText7', true);
      break;
    case 8:
      content = BlocklyGames.getMsg('Turtle.helpText8', true);
      break;
    case 9:
      content = BlocklyGames.getMsg('Turtle.helpText9', true);
      break;
    case 10:
      content = BlocklyGames.getMsg('Turtle.helpText10', true);
      if (!isHtml) {
        content += '<br><br>' +
            BlocklyGames.getMsg('Turtle.helpText10Reddit', true);
      }
      break;
  }

  let loopMsg = '';
  if (level < 3) {
    loopMsg = BlocklyGames.getMsg('Turtle.helpUseLoop3', true);
  } else if (level < 4) {
    loopMsg = BlocklyGames.getMsg('Turtle.helpUseLoop4', true);
  }
  return `
<div id="help" class="dialogHiddenContent">
  <div style="padding-bottom: 0.7ex">
    ${content}
  </div>
  ${BlocklyGames.html.ok()}
</div>

<div id="helpToolbox" class="dialogHiddenContent">
  <div><img src="index/help_left.png" class="mirrorImg" height=23 width=64></div>
  ${BlocklyGames.getMsg('Turtle.helpToolbox', true)}
</div>

<div id="helpUseLoop" class="dialogHiddenContent">
  <div style="padding-bottom: 0.7ex">
    ${BlocklyGames.getMsg('Turtle.helpUseLoop', true)}
    ${loopMsg}
  </div>
  ${BlocklyGames.html.ok()}
</div>
`;
};
