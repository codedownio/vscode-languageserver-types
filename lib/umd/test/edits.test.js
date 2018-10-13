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
    var applyEdits = main_1.TextDocument.applyEdits;
    suite('Edits', function () {
        test('inserts', function () {
            var input = main_1.TextDocument.create('foo://bar/f', 'html', 0, '012345678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.insert(main_1.Position.create(0, 0), 'Hello')]), 'Hello012345678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.insert(main_1.Position.create(0, 1), 'Hello')]), '0Hello12345678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.insert(main_1.Position.create(0, 1), 'Hello'), main_1.TextEdit.insert(main_1.Position.create(0, 1), 'World')]), '0HelloWorld12345678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.insert(main_1.Position.create(0, 2), 'One'), main_1.TextEdit.insert(main_1.Position.create(0, 1), 'Hello'), main_1.TextEdit.insert(main_1.Position.create(0, 1), 'World'), main_1.TextEdit.insert(main_1.Position.create(0, 2), 'Two'), main_1.TextEdit.insert(main_1.Position.create(0, 2), 'Three')]), '0HelloWorld1OneTwoThree2345678901234567890123456789');
        });
        test('replace', function () {
            var input = main_1.TextDocument.create('foo://bar/f', 'html', 0, '012345678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello')]), '012Hello678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello'), main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 6), main_1.Position.create(0, 9)), 'World')]), '012HelloWorld901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello'), main_1.TextEdit.insert(main_1.Position.create(0, 6), 'World')]), '012HelloWorld678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.insert(main_1.Position.create(0, 6), 'World'), main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello')]), '012HelloWorld678901234567890123456789');
            assert.equal(applyEdits(input, [main_1.TextEdit.insert(main_1.Position.create(0, 3), 'World'), main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello')]), '012WorldHello678901234567890123456789');
        });
        test('overlap', function () {
            var input = main_1.TextDocument.create('foo://bar/f', 'html', 0, '012345678901234567890123456789');
            assert.throws(function () { return applyEdits(input, [main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello'), main_1.TextEdit.insert(main_1.Position.create(0, 3), 'World')]); });
            assert.throws(function () { return applyEdits(input, [main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(0, 3), main_1.Position.create(0, 6)), 'Hello'), main_1.TextEdit.insert(main_1.Position.create(0, 4), 'World')]); });
        });
        test('multiline', function () {
            var input = main_1.TextDocument.create('foo://bar/f', 'html', 0, '0\n1\n2\n3\n4');
            assert.equal(applyEdits(input, [main_1.TextEdit.replace(main_1.Range.create(main_1.Position.create(2, 0), main_1.Position.create(3, 0)), 'Hello'), main_1.TextEdit.insert(main_1.Position.create(1, 1), 'World')]), '0\n1World\nHello3\n4');
        });
    });
});
