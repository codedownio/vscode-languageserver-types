(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "assert", "../main"], factory);
    }
})(function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert = require("assert");
    var main_1 = require("../main");
    suite('Type guards', function () {
        suite('Position.is', function () {
            test('Position', function () {
                var position = {
                    line: 0,
                    character: 0
                };
                assert.strictEqual(main_1.Position.is(position), true);
            });
            test('empty object', function () {
                var position = {};
                assert.strictEqual(main_1.Position.is(position), false);
            });
            test('missing character', function () {
                var position = {
                    line: 0,
                };
                assert.strictEqual(main_1.Position.is(position), false);
            });
            test('null', function () {
                var position = null;
                assert.strictEqual(main_1.Position.is(position), false);
            });
            test('undefined', function () {
                var position = undefined;
                assert.strictEqual(main_1.Position.is(position), false);
            });
        });
        suite('Range.is', function () {
            test('Range', function () {
                var range = {
                    start: {
                        line: 0,
                        character: 0
                    },
                    end: {
                        line: 1,
                        character: 1
                    }
                };
                assert.strictEqual(main_1.Range.is(range), true);
            });
            test('empty object', function () {
                var range = {};
                assert.strictEqual(main_1.Range.is(range), false);
            });
            test('null', function () {
                var range = null;
                assert.strictEqual(main_1.Range.is(range), false);
            });
            test('undefined', function () {
                var range = undefined;
                assert.strictEqual(main_1.Range.is(range), false);
            });
        });
        suite('MarkedString.is', function () {
            test('string', function () {
                var markedString = 'test';
                assert.strictEqual(main_1.MarkedString.is(markedString), true);
            });
            test('language and value', function () {
                var markedString = { language: 'foo', value: 'test' };
                assert.strictEqual(main_1.MarkedString.is(markedString), true);
            });
            test('null', function () {
                var markedString = null;
                assert.strictEqual(main_1.MarkedString.is(markedString), false);
            });
            test('undefined', function () {
                var markedString = undefined;
                assert.strictEqual(main_1.MarkedString.is(markedString), false);
            });
        });
        suite('Hover.is', function () {
            test('string contents', function () {
                var hover = {
                    contents: 'test'
                };
                assert.strictEqual(main_1.Hover.is(hover), true);
            });
            test('MarkupContent contents', function () {
                var hover = {
                    contents: {
                        kind: 'plaintext',
                        value: 'test'
                    }
                };
                assert.strictEqual(main_1.Hover.is(hover), true);
            });
            test('MarkupContent contents array', function () {
                var hover = {
                    contents: [{
                            kind: 'plaintext',
                            value: 'test'
                        }]
                };
                assert.strictEqual(main_1.Hover.is(hover), false);
            });
            test('contents array', function () {
                var hover = {
                    contents: [
                        'test',
                        {
                            language: 'foo',
                            value: 'test'
                        }
                    ]
                };
                assert.strictEqual(main_1.Hover.is(hover), true);
            });
            test('null range', function () {
                var hover = {
                    contents: 'test',
                    range: null
                };
                assert.strictEqual(main_1.Hover.is(hover), false);
            });
            test('null contents', function () {
                var hover = {
                    contents: null
                };
                assert.strictEqual(main_1.Hover.is(hover), false);
            });
            test('contents array with null', function () {
                var hover = {
                    contents: [null]
                };
                assert.strictEqual(main_1.Hover.is(hover), false);
            });
            test('null', function () {
                var hover = null;
                assert.strictEqual(main_1.Hover.is(hover), false);
            });
            test('undefined', function () {
                var hover = undefined;
                assert.strictEqual(main_1.Hover.is(hover), false);
            });
        });
        suite('TextEdit.is', function () {
            test('string contents, range defined', function () {
                var edit = {
                    newText: 'test',
                    range: main_1.Range.create(main_1.Position.create(0, 0), main_1.Position.create(0, 1)),
                };
                assert.strictEqual(main_1.TextEdit.is(edit), true);
            });
            test('string contents, range undefined', function () {
                var edit = {
                    newText: 'test',
                    range: undefined,
                };
                assert.strictEqual(main_1.TextEdit.is(edit), false);
            });
            test('string contents, range null', function () {
                var edit = {
                    newText: 'test',
                    range: null,
                };
                assert.strictEqual(main_1.TextEdit.is(edit), false);
            });
            test('null contents, range defined', function () {
                var edit = {
                    contents: null,
                    range: main_1.Range.create(main_1.Position.create(0, 0), main_1.Position.create(0, 1)),
                };
                assert.strictEqual(main_1.TextEdit.is(edit), false);
            });
            test('undefined contents, range defined', function () {
                var edit = {
                    contents: undefined,
                    range: main_1.Range.create(main_1.Position.create(0, 0), main_1.Position.create(0, 1)),
                };
                assert.strictEqual(main_1.TextEdit.is(edit), false);
            });
            test('null', function () {
                var edit = null;
                assert.strictEqual(main_1.TextEdit.is(edit), false);
            });
            test('undefined', function () {
                var edit = undefined;
                assert.strictEqual(main_1.TextEdit.is(edit), false);
            });
        });
    });
});
