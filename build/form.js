"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_lib_1 = require("pdf-lib");
const fs = require("fs");
class Form {
    constructor(pdfDoc) {
        this.isUSCitizen = false;
        this.isAdult = false;
        this.pdfDoc = pdfDoc;
        this.form = pdfDoc.getForm();
        this.populateFields();
    }
    populateFields() {
        this.citizenTrueField = this.form.getField('E1');
        this.citizenFalseField = this.form.getField('E2');
        this.adultTrueField = this.form.getField('F1');
        this.adultFalseField = this.form.getField('F2');
        this.lastNameField = this.form.getField('topmostSubform[0].Page4[0].TextField1[2]');
        this.firstNameField = this.form.getField('topmostSubform[0].Page4[0].TextField1[1]');
    }
    savePDF() {
        return __awaiter(this, void 0, void 0, function* () {
            const pdfBytes = yield this.pdfDoc.save();
            fs.writeFileSync('output.pdf', pdfBytes);
        });
    }
    get citizen() {
        return this.isUSCitizen;
    }
    set citizen(value) {
        if (value) {
            this.citizenTrueField.check();
            this.citizenFalseField.uncheck();
        }
        else {
            this.citizenTrueField.uncheck();
            this.citizenFalseField.check();
        }
        this.isUSCitizen = value;
    }
    get adult() {
        return this.isAdult;
    }
    set adult(value) {
        if (value) {
            this.adultTrueField.check();
            this.adultFalseField.uncheck();
        }
        else {
            this.adultTrueField.uncheck();
            this.adultFalseField.check();
        }
        this.isAdult = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this.lastNameField.setText(value);
        this._lastName = value;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this.firstNameField.setText(value);
        this._firstName = value;
    }
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const file = fs.readFileSync('Federal_Voter_Registration_ENG.pdf');
        const pdfDoc = yield pdf_lib_1.PDFDocument.load(file);
        const form = new Form(pdfDoc);
        form.citizen = true;
        form.adult = true;
        form.firstName = 'John';
        form.lastName = 'Doe';
        yield form.savePDF();
    });
})();
//# sourceMappingURL=form.js.map