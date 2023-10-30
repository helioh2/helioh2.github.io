/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';




goog.provide('Blockly.Constants.Text');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.Extensions');
goog.require('Blockly.FieldImage');
goog.require('Blockly.FieldTextInput');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.Msg');
goog.require('Blockly.utils.xml');


/**
 * A dictionary of the block definitions provided by this module.
 */
Blockly.defineBlocksWithJsonArray([
  // Block for text value
  {
    'type': 'text',
    'message0': '%1',
    'args0': [
      {
        'type': 'field_input',
        'name': 'TEXT',
        'text': '',
      },
    ],
    'output': 'String',
    'colour': '100',
    'helpUrl': '%{BKY_TEXT_TEXT_HELPURL}',
    'tooltip': '%{BKY_TEXT_TEXT_TOOLTIP}',
    'extensions': ['text_quotes', 'parent_tooltip_when_inline'],
  },
  {
    'type': 'text_multiline',
    'message0': '%1 %2',
    'args0': [
      {
        'type': 'field_image',
        'src':
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAADpP' +
          'U2iAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAdhgAAHYYBXaITgQAAABh0RVh0' +
          'U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAP1JREFUOE+Vks0KQUEYhjm' +
          'RIja4ABtZ2dm5A3t3Ia6AUm7CylYuQRaUhZSlLZJiQbFAyRnPN33y01HOW08z88' +
          '73zpwzM4F3GWOCruvGIE4/rLaV+Nq1hVGMBqzhqlxgCys4wJA65xnogMHsQ5luj' +
          'nYHTejBBCK2mE4abjCgMGhNxHgDFWjDSG07kdfVa2pZMf4ZyMAdWmpZMfYOsLiD' +
          'MYMjlMB+K613QISRhTnITnsYg5yUd0DETmEoMlkFOeIT/A58iyK5E18BuTBfgYX' +
          'fwNJv4P9/oEBerLylOnRhygmGdPpTTBZAPkde61lbQe4moWUvYUZYLfUNftIY4z' +
          'wA5X2Z9AYnQrEAAAAASUVORK5CYII=',
        'width': 12,
        'height': 17,
        'alt': '\u00B6',
      },
      {
        'type': 'field_multilinetext',
        'name': 'TEXT',
        'text': '',
      },
    ],
    'output': 'String',
    'colour': '100',
    'helpUrl': '%{BKY_TEXT_TEXT_HELPURL}',
    'tooltip': '%{BKY_TEXT_TEXT_TOOLTIP}',
    'extensions': ['parent_tooltip_when_inline'],
  },
  {
    'type': 'text_join',
    'message0': '',
    'output': 'String',
    'colour': '100',
    'helpUrl': '%{BKY_TEXT_JOIN_HELPURL}',
    'tooltip': '%{BKY_TEXT_JOIN_TOOLTIP}',
    'mutator': 'text_join_mutator',
  },
  {
    'type': 'text_create_join_container',
    'message0': '%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2',
    'args0': [
      {
        'type': 'input_dummy',
      },
      {
        'type': 'input_statement',
        'name': 'STACK',
      },
    ],
    'colour': '100',
    'tooltip': '%{BKY_TEXT_CREATE_JOIN_TOOLTIP}',
    'enableContextMenu': false,
  },
  {
    'type': 'text_create_join_item',
    'message0': '%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}',
    'previousStatement': null,
    'nextStatement': null,
    'colour': '100',
    'tooltip': '%{BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}',
    'enableContextMenu': false,
  },
  {
    'type': 'text_append',
    'message0': '%{BKY_TEXT_APPEND_TITLE}',
    'args0': [
      {
        'type': 'field_variable',
        'name': 'VAR',
        'variable': '%{BKY_TEXT_APPEND_VARIABLE}',
      },
      {
        'type': 'input_value',
        'name': 'TEXT',
      },
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': '100',
    'extensions': ['text_append_tooltip'],
  },
  {
    'type': 'text_length',
    'message0': '%{BKY_TEXT_LENGTH_TITLE}',
    'args0': [
      {
        'type': 'input_value',
        'name': 'VALUE',
        'check': ['String', 'Array'],
      },
    ],
    'output': 'Number',
    'colour': '100',
    'tooltip': '%{BKY_TEXT_LENGTH_TOOLTIP}',
    'helpUrl': '%{BKY_TEXT_LENGTH_HELPURL}',
  },
  {
    'type': 'text_isEmpty',
    'message0': '%{BKY_TEXT_ISEMPTY_TITLE}',
    'args0': [
      {
        'type': 'input_value',
        'name': 'VALUE',
        'check': ['String', 'Array'],
      },
    ],
    'output': 'Boolean',
    'colour': '100',
    'tooltip': '%{BKY_TEXT_ISEMPTY_TOOLTIP}',
    'helpUrl': '%{BKY_TEXT_ISEMPTY_HELPURL}',
  },
  {
    'type': 'text_indexOf',
    'message0': '%{BKY_TEXT_INDEXOF_TITLE}',
    'args0': [
      {
        'type': 'input_value',
        'name': 'VALUE',
        'check': 'String',
      },
      {
        'type': 'field_dropdown',
        'name': 'END',
        'options': [
          ['%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}', 'FIRST'],
          ['%{BKY_TEXT_INDEXOF_OPERATOR_LAST}', 'LAST'],
        ],
      },
      {
        'type': 'input_value',
        'name': 'FIND',
        'check': 'String',
      },
    ],
    'output': 'Number',
    'colour': '100',
    'helpUrl': '%{BKY_TEXT_INDEXOF_HELPURL}',
    'inputsInline': true,
    'extensions': ['text_indexOf_tooltip'],
  },
  {
    'type': 'text_charAt',
    'message0': '%{BKY_TEXT_CHARAT_TITLE}', // "in text %1 %2"
    'args0': [
      {
        'type': 'input_value',
        'name': 'VALUE',
        'check': 'String',
      },
      {
        'type': 'field_dropdown',
        'name': 'WHERE',
        'options': [
          ['%{BKY_TEXT_CHARAT_FROM_START}', 'FROM_START'],
          ['%{BKY_TEXT_CHARAT_FROM_END}', 'FROM_END'],
          ['%{BKY_TEXT_CHARAT_FIRST}', 'FIRST'],
          ['%{BKY_TEXT_CHARAT_LAST}', 'LAST'],
          ['%{BKY_TEXT_CHARAT_RANDOM}', 'RANDOM'],
        ],
      },
    ],
    'output': 'String',
    'colour': '100',
    'helpUrl': '%{BKY_TEXT_CHARAT_HELPURL}',
    'inputsInline': true,
    'mutator': 'text_charAt_mutator',
  },
]);


Blockly.Blocks['text_getSubstring'] = {
  /**
   * Block for getting substring.
   */
  init: function () {
    this['WHERE_OPTIONS_1'] = [
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_START'], 'FROM_START'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_END'], 'FROM_END'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_START_FIRST'], 'FIRST'],
    ];
    this['WHERE_OPTIONS_2'] = [
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_START'], 'FROM_START'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_END'], 'FROM_END'],
      [Blockly.Msg['TEXT_GET_SUBSTRING_END_LAST'], 'LAST'],
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_GET_SUBSTRING_HELPURL']);
    this.setColour('100');
    this.appendValueInput('STRING')
      .setCheck('String')
      .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_INPUT_IN_TEXT']);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
      this.appendDummyInput('TAIL').appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg['TEXT_GET_SUBSTRING_TOOLTIP']);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * Backwards compatible serialization implementation.
   *
   * @returns XML storage element.
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    const isAt1 = this.getInput('AT1');
    container.setAttribute('at1', `${isAt1}`);
    const isAt2 = this.getInput('AT2');
    container.setAttribute('at2', `${isAt2}`);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * Backwards compatible serialization implementation.
   *
   * @param xmlElement XML storage element.
   */
  domToMutation: function (xmlElement) {
    const isAt1 = xmlElement.getAttribute('at1') === 'true';
    const isAt2 = xmlElement.getAttribute('at2') === 'true';
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },

  // This block does not need JSO serialization hooks (saveExtraState and
  // loadExtraState) because the state of this object is already encoded in the
  // dropdown values.
  // XML hooks are kept for backwards compatibility.

  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independent of each other.
   *
   * @internal
   * @param n Which input to modify (either 1 or 2).
   * @param isAt True if the input includes a value connection, false otherwise.
   */
  updateAt_: function (n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL' + n).appendField(
          Blockly.Msg['ORDINAL_NUMBER_SUFFIX'],
        );
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    // Move tail, if present, to end of block.
    if (n === 2 && Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL').appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
    }
    const menu = Blockly.fieldRegistry.fromJson({
      type: 'field_dropdown',
      options:
        this[('WHERE_OPTIONS_' + n)],
    });
    menu.setValidator(
      /**
       * @param value The input value.
       * @returns Null if the field has been replaced; otherwise undefined.
       */
      function (value) {
        const newAt = value === 'FROM_START' || value === 'FROM_END';
        // The 'isAt' variable is available due to this function being a
        // closure.
        if (newAt !== isAt) {
          const block = this.getSourceBlock();
          block.updateAt_(n, newAt);
          // This menu has been destroyed and replaced.
          // Update the replacement.
          block.setFieldValue(value, 'WHERE' + n);
          return null;
        }
        return undefined;
      },
    );

    this.getInput('AT' + n).appendField(menu, 'WHERE' + n);
    if (n === 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
  },
};


Blockly.Blocks['text_changeCase'] = {
  /**
   * Block for changing capitalization.
   */
  init: function () {
    const OPERATORS = [
      [Blockly.Msg['TEXT_CHANGECASE_OPERATOR_UPPERCASE'], 'UPPERCASE'],
      [Blockly.Msg['TEXT_CHANGECASE_OPERATOR_LOWERCASE'], 'LOWERCASE'],
      [Blockly.Msg['TEXT_CHANGECASE_OPERATOR_TITLECASE'], 'TITLECASE'],
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_CHANGECASE_HELPURL']);
    this.setColour('100');
    this.appendValueInput('TEXT')
      .setCheck('String')
      .appendField(
        Blockly.fieldRegistry.fromJson({
          type: 'field_dropdown',
          options: OPERATORS,
        }),
        'CASE',
      );
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg['TEXT_CHANGECASE_TOOLTIP']);
  },
};

Blockly.Blocks['text_trim'] = {
  /**
   * Block for trimming spaces.
   */
  init: function () {
    const OPERATORS = [
      [Blockly.Msg['TEXT_TRIM_OPERATOR_BOTH'], 'BOTH'],
      [Blockly.Msg['TEXT_TRIM_OPERATOR_LEFT'], 'LEFT'],
      [Blockly.Msg['TEXT_TRIM_OPERATOR_RIGHT'], 'RIGHT'],
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_TRIM_HELPURL']);
    this.setColour('100');
    this.appendValueInput('TEXT')
      .setCheck('String')
      .appendField(
        Blockly.fieldRegistry.fromJson({
          type: 'field_dropdown',
          options: OPERATORS,
        }),
        'MODE',
      );
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg['TEXT_TRIM_TOOLTIP']);
  },
};

Blockly.Blocks['text_print'] = {
  /**
   * Block for print statement.
   */
  init: function () {
    this.jsonInit({
      'message0': Blockly.Msg['TEXT_PRINT_TITLE'],
      'args0': [
        {
          'type': 'input_value',
          'name': 'TEXT',
        },
      ],
      'previousStatement': null,
      'nextStatement': null,
      'colour': '100',
      'tooltip': Blockly.Msg['TEXT_PRINT_TOOLTIP'],
      'helpUrl': Blockly.Msg['TEXT_PRINT_HELPURL'],
    });
  },
};


/**
 * Common properties for the text_prompt_ext and text_prompt blocks
 * definitions.
 */
const PROMPT_COMMON = {
  /**
   * Modify this block to have the correct output type.
   *
   * @internal
   * @param newOp The new output type. Should be either 'TEXT' or 'NUMBER'.
   */
  updateType_: function (newOp) {
    this.outputConnection.setCheck(newOp === 'NUMBER' ? 'Number' : 'String');
  },
  /**
   * Create XML to represent the output type.
   * Backwards compatible serialization implementation.
   *
   * @returns XML storage element.
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('TYPE'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * Backwards compatible serialization implementation.
   *
   * @param xmlElement XML storage element.
   */
  domToMutation: function (xmlElement) {
    this.updateType_(xmlElement.getAttribute('type'));
  },
};

Blockly.Blocks['text_prompt_ext'] = {
  ...PROMPT_COMMON,
  /**
   * Block for prompt function (external message).
   */
  init: function () {
    const TYPES = [
      [Blockly.Msg['TEXT_PROMPT_TYPE_TEXT'], 'TEXT'],
      [Blockly.Msg['TEXT_PROMPT_TYPE_NUMBER'], 'NUMBER'],
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_PROMPT_HELPURL']);
    this.setColour('100');
    const dropdown = Blockly.fieldRegistry.fromJson({
      type: 'field_dropdown',
      options: TYPES,
    });
    dropdown.setValidator((newOp) => {
      this.updateType_(newOp);
      return undefined; // FieldValidators can't be void.  Use option as-is.
    });
    this.appendValueInput('TEXT').appendField(dropdown, 'TYPE');
    this.setOutput(true, 'String');
    this.setTooltip(() => {
      return this.getFieldValue('TYPE') === 'TEXT'
        ? Blockly.Msg['TEXT_PROMPT_TOOLTIP_TEXT']
        : Blockly.Msg['TEXT_PROMPT_TOOLTIP_NUMBER'];
    });
  },

  // This block does not need JSO serialization hooks (saveExtraState and
  // loadExtraState) because the state of this object is already encoded in the
  // dropdown values.
  // XML hooks are kept for backwards compatibility.
};


// Blockly.Blocks['text_prompt'] = {
//   ...PROMPT_COMMON,
//   /**
//    * Block for prompt function (internal message).
//    * The 'text_prompt_ext' block is preferred as it is more flexible.
//    */
//   init: function () {
//     this.mixin(QUOTE_IMAGE_MIXIN);
//     const TYPES = [
//       [Blockly.Msg['TEXT_PROMPT_TYPE_TEXT'], 'TEXT'],
//       [Blockly.Msg['TEXT_PROMPT_TYPE_NUMBER'], 'NUMBER'],
//     ];

//     this.setHelpUrl(Blockly.Msg['TEXT_PROMPT_HELPURL']);
//     this.setColour('100');
//     const dropdown = Blockly.fieldRegistry.fromJson({
//       type: 'field_dropdown',
//       options: TYPES,
//     });
//     dropdown.setValidator((newOp) => {
//       this.updateType_(newOp);
//       return undefined; // FieldValidators can't be void.  Use option as-is.
//     });
//     this.appendDummyInput()
//       .appendField(dropdown, 'TYPE')
//       .appendField(this.newQuote_(true))
//       .appendField(
//         Blockly.fieldRegistry.fromJson({
//           type: 'field_input',
//           text: '',
//         }),
//         'TEXT',
//       )
//       .appendField(this.newQuote_(false));
//     this.setOutput(true, 'String');
//     this.setTooltip(() => {
//       return this.getFieldValue('TYPE') === 'TEXT'
//         ? Blockly.Msg['TEXT_PROMPT_TOOLTIP_TEXT']
//         : Blockly.Msg['TEXT_PROMPT_TOOLTIP_NUMBER'];
//     });
//   },
// };


Blockly.Blocks['text_count'] = {
  /**
   * Block for counting how many times one string appears within another string.
   */
  init: function () {
    this.jsonInit({
      'message0': Blockly.Msg['TEXT_COUNT_MESSAGE0'],
      'args0': [
        {
          'type': 'input_value',
          'name': 'SUB',
          'check': 'String',
        },
        {
          'type': 'input_value',
          'name': 'TEXT',
          'check': 'String',
        },
      ],
      'output': 'Number',
      'inputsInline': true,
      'colour': '100',
      'tooltip': Blockly.Msg['TEXT_COUNT_TOOLTIP'],
      'helpUrl': Blockly.Msg['TEXT_COUNT_HELPURL'],
    });
  },
};

Blockly.Blocks['text_replace'] = {
  /**
   * Block for replacing one string with another in the text.
   */
  init: function () {
    this.jsonInit({
      'message0': Blockly.Msg['TEXT_REPLACE_MESSAGE0'],
      'args0': [
        {
          'type': 'input_value',
          'name': 'FROM',
          'check': 'String',
        },
        {
          'type': 'input_value',
          'name': 'TO',
          'check': 'String',
        },
        {
          'type': 'input_value',
          'name': 'TEXT',
          'check': 'String',
        },
      ],
      'output': 'String',
      'inputsInline': true,
      'colour': '100',
      'tooltip': Blockly.Msg['TEXT_REPLACE_TOOLTIP'],
      'helpUrl': Blockly.Msg['TEXT_REPLACE_HELPURL'],
    });
  },
};

Blockly.Blocks['text_reverse'] = {
  /**
   * Block for reversing a string.
   */
  init: function () {
    this.jsonInit({
      'message0': Blockly.Msg['TEXT_REVERSE_MESSAGE0'],
      'args0': [
        {
          'type': 'input_value',
          'name': 'TEXT',
          'check': 'String',
        },
      ],
      'output': 'String',
      'inputsInline': true,
      'colour': '100',
      'tooltip': Blockly.Msg['TEXT_REVERSE_TOOLTIP'],
      'helpUrl': Blockly.Msg['TEXT_REVERSE_HELPURL'],
    });
  },
};


const QUOTE_IMAGE_MIXIN = {
  /**
   * Image data URI of an LTR opening double quote (same as RTL closing double
   * quote).
   */
  QUOTE_IMAGE_LEFT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
    'n0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY' +
    '1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1' +
    'HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMf' +
    'z9AylsaRRgGzvZAAAAAElFTkSuQmCC',
  /**
   * Image data URI of an LTR closing double quote (same as RTL opening double
   * quote).
   */
  QUOTE_IMAGE_RIGHT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAA' +
    'qUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhg' +
    'gONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvB' +
    'O3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5Aos' +
    'lLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
  /**
   * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   */
  QUOTE_IMAGE_WIDTH: 12,
  /**
   * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   */
  QUOTE_IMAGE_HEIGHT: 12,

  /**
   * Inserts appropriate quote images before and after the named field.
   *
   * @param fieldName The name of the field to wrap with quotes.
   */
  quoteField_: function (fieldName) {
    for (let i = 0, input; (input = this.inputList[i]); i++) {
      for (let j = 0, field; (field = input.fieldRow[j]); j++) {
        if (fieldName === field.name) {
          input.insertFieldAt(j, this.newQuote_(true));
          input.insertFieldAt(j + 2, this.newQuote_(false));
          return;
        }
      }
    }
    console.warn(
      'field named "' + fieldName + '" not found in ' + this.toDevString(),
    );
  },

  /**
   * A helper function that generates a FieldImage of an opening or
   * closing double quote. The selected quote will be adapted for RTL blocks.
   *
   * @param open If the image should be open quote (“ in LTR).
   *                       Otherwise, a closing quote is used (” in LTR).
   * @returns The new field.
   */
  newQuote_: function (open) {
    const isLeft = this.RTL ? !open : open;
    const dataUri = isLeft
      ? this.QUOTE_IMAGE_LEFT_DATAURI
      : this.QUOTE_IMAGE_RIGHT_DATAURI;
    return Blockly.fieldRegistry.fromJson({
      type: 'field_image',
      src: dataUri,
      width: this.QUOTE_IMAGE_WIDTH,
      height: this.QUOTE_IMAGE_HEIGHT,
      alt: isLeft ? '\u201C' : '\u201D',
    });
  },
};

/**
 * Wraps TEXT field with images of double quote characters.
 */
const QUOTES_EXTENSION = function () {
  this.mixin(QUOTE_IMAGE_MIXIN);
  this.quoteField_('TEXT');
};


/**
 * Mixin for mutator functions in the 'text_join_mutator' extension.
 */
const JOIN_MUTATOR_MIXIN = {
  itemCount_: 0,
  /**
   * Create XML to represent number of text inputs.
   * Backwards compatible serialization implementation.
   *
   * @returns XML storage element.
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', `${this.itemCount_}`);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * Backwards compatible serialization implementation.
   *
   * @param xmlElement XML storage element.
   */
  domToMutation: function (xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Returns the state of this block as a JSON serializable object.
   *
   * @returns The state of this block, ie the item count.
   */
  saveExtraState: function () {
    return {
      'itemCount': this.itemCount_,
    };
  },
  /**
   * Applies the given state to this block.
   *
   * @param state The state to apply to this block, ie the item count.
   */
  loadExtraState: function (state) {
    this.itemCount_ = state['itemCount'];
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   *
   * @param workspace Mutator's workspace.
   * @returns Root block in mutator.
   */
  decompose: function (workspace) {
    const containerBlock = workspace.newBlock(
      'text_create_join_container',
    );
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.itemCount_; i++) {
      const itemBlock = workspace.newBlock(
        'text_create_join_item',
      );
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   *
   * @param containerBlock Root block in mutator.
   */
  compose: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock(
      'STACK',
    )
    // Count number of inputs.
    const connections = [];
    while (itemBlock) {
      if (itemBlock.isInsertionMarker()) {
        itemBlock = itemBlock.getNextBlock();
        continue;
      }
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.getNextBlock();
    }
    // Disconnect any children that don't belong.
    for (let i = 0; i < this.itemCount_; i++) {
      const connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) === -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (let i = 0; i < this.itemCount_; i++) {
      connections[i]?.reconnect(this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   *
   * @param containerBlock Root block in mutator.
   */
  saveConnections: function (containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    let i = 0;
    while (itemBlock) {
      if (itemBlock.isInsertionMarker()) {
        itemBlock = itemBlock.getNextBlock();
        continue;
      }
      const input = this.getInput('ADD' + i);
      (itemBlock).valueConnection_ =
        input && input.connection.targetConnection;
      itemBlock = itemBlock.getNextBlock();
      i++;
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   *
   */
  updateShape_: function () {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
        .appendField(this.newQuote_(true))
        .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    for (let i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        const input = this.appendValueInput('ADD' + i).setAlign(Blockly.ALIGN_RIGHT);
        if (i === 0) {
          input.appendField(Blockly.Msg['TEXT_JOIN_TITLE_CREATEWITH']);
        }
      }
    }
    // Remove deleted inputs.
    for (let i = this.itemCount_; this.getInput('ADD' + i); i++) {
      this.removeInput('ADD' + i);
    }
  },
};

/**
 * Performs final setup of a text_join block.
 */
const JOIN_EXTENSION = function () {
  // Add the quote mixin for the itemCount_ = 0 case.
  this.mixin(QUOTE_IMAGE_MIXIN);
  // Initialize the mutator values.
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator UI.
  this.setMutator(new Blockly.Mutator(['text_create_join_item']));
};

// Update the tooltip of 'text_append' block to reference the variable.
Blockly.Extensions.register(
  'text_append_tooltip',
  Blockly.Extensions.buildTooltipWithFieldText('%{BKY_TEXT_APPEND_TOOLTIP}', 'VAR'),
);

/**
 * Update the tooltip of 'text_append' block to reference the variable.
 */
const INDEXOF_TOOLTIP_EXTENSION = function () {
  this.setTooltip(() => {
    return Blockly.Msg['TEXT_INDEXOF_TOOLTIP'].replace(
      '%1',
      this.workspace.options.oneBasedIndex ? '0' : '-1',
    );
  });
};


/**
 * Mixin for mutator functions in the 'text_charAt_mutator' extension.
 */
const CHARAT_MUTATOR_MIXIN = {
  isAt_: false,
  /**
   * Create XML to represent whether there is an 'AT' input.
   * Backwards compatible serialization implementation.
   *
   * @returns XML storage element.
   */
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('at', `${this.isAt_}`);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * Backwards compatible serialization implementation.
   *
   * @param xmlElement XML storage element.
   */
  domToMutation: function (xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'at' defaults to true.
    const isAt = xmlElement.getAttribute('at') !== 'false';
    this.updateAt_(isAt);
  },

  // This block does not need JSO serialization hooks (saveExtraState and
  // loadExtraState) because the state of this object is already encoded in the
  // dropdown values.
  // XML hooks are kept for backwards compatibility.

  /**
   * Create or delete an input for the numeric index.
   *
   * @internal
   * @param isAt True if the input should exist.
   */
  updateAt_: function (isAt) {
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT', true);
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
        this.appendDummyInput('ORDINAL').appendField(
          Blockly.Msg['ORDINAL_NUMBER_SUFFIX'],
        );
      }
    }
    if (Blockly.Msg['TEXT_CHARAT_TAIL']) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL').appendField(Blockly.Msg['TEXT_CHARAT_TAIL']);
    }

    this.isAt_ = isAt;
  },
};

/**
 * Does the initial mutator update of text_charAt and adds the tooltip
 */
const CHARAT_EXTENSION = function () {
  const dropdown = this.getField('WHERE');
  dropdown.setValidator(function (value) {
    const newAt = value === 'FROM_START' || value === 'FROM_END';
    const block = this.getSourceBlock();
    if (newAt !== block.isAt_) {
      block.updateAt_(newAt);
    }
    return undefined; // FieldValidators can't be void.  Use option as-is.
  });
  this.updateAt_(true);
  this.setTooltip(() => {
    const where = this.getFieldValue('WHERE');
    let tooltip = Blockly.Msg['TEXT_CHARAT_TOOLTIP'];
    if (where === 'FROM_START' || where === 'FROM_END') {
      const msg =
        where === 'FROM_START'
          ? Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP']
          : Blockly.Msg['LISTS_INDEX_FROM_END_TOOLTIP'];
      if (msg) {
        tooltip +=
          '  ' +
          msg.replace('%1', this.workspace.options.oneBasedIndex ? '#1' : '#0');
      }
    }
    return tooltip;
  });
};

Blockly.Extensions.register('text_indexOf_tooltip', INDEXOF_TOOLTIP_EXTENSION);

Blockly.Extensions.register('text_quotes', QUOTES_EXTENSION);

Blockly.Extensions.registerMutator(
  'text_join_mutator',
  JOIN_MUTATOR_MIXIN,
  JOIN_EXTENSION,
);

Blockly.Extensions.registerMutator(
  'text_charAt_mutator',
  CHARAT_MUTATOR_MIXIN,
  CHARAT_EXTENSION,
);

