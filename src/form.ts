import {PDFDocument, PDFForm, PDFCheckBox, PDFTextField} from "pdf-lib";

import * as fs from 'fs';


class Form {
    private pdfDoc: PDFDocument
    private form: PDFForm

    private isUSCitizen: boolean = false
    private citizenTrueField: PDFCheckBox
    private citizenFalseField: PDFCheckBox

    private isAdult: boolean = false
    private adultTrueField: PDFCheckBox
    private adultFalseField: PDFCheckBox

    private _lastName: string
    private lastNameField: PDFTextField

    private _firstName: string
    private firstNameField: PDFTextField


    constructor(pdfDoc) {
        this.pdfDoc = pdfDoc
        this.form = pdfDoc.getForm()
        this.populateFields()
    }

    private populateFields() {
        this.citizenTrueField = this.form.getField('E1') as PDFCheckBox
        this.citizenFalseField = this.form.getField('E2') as PDFCheckBox
        this.adultTrueField = this.form.getField('F1') as PDFCheckBox
        this.adultFalseField = this.form.getField('F2') as PDFCheckBox
        this.lastNameField = this.form.getField('topmostSubform[0].Page4[0].TextField1[2]') as PDFTextField
        this.firstNameField = this.form.getField('topmostSubform[0].Page4[0].TextField1[1]') as PDFTextField
    }

    public async savePDF() {
        const pdfBytes = await this.pdfDoc.save()
        fs.writeFileSync('output.pdf', pdfBytes)
    }

    get citizen(): boolean {
        return this.isUSCitizen;
    }

    set citizen(value: boolean) {
        if (value) {
            this.citizenTrueField.check()
            this.citizenFalseField.uncheck()
        } else {
            this.citizenTrueField.uncheck()
            this.citizenFalseField.check()
        }
        this.isUSCitizen = value
    }

    get adult(): boolean {
        return this.isAdult
    }

    set adult(value: boolean) {
        if (value) {
            this.adultTrueField.check()
            this.adultFalseField.uncheck()
        } else {
            this.adultTrueField.uncheck()
            this.adultFalseField.check()
        }
        this.isAdult = value
    }

    get lastName(): string {
        return this._lastName
    }

    set lastName(value: string) {
        this.lastNameField.setText(value)
        this._lastName = value
    }

    get firstName(): string {
        return this._firstName
    }

    set firstName(value: string) {
        this.firstNameField.setText(value)
        this._firstName = value
    }

}


(async function () {
    const file = fs.readFileSync('Federal_Voter_Registration_ENG.pdf')
    const pdfDoc = await PDFDocument.load(file)
    const form = new Form(pdfDoc)
    form.citizen = true
    form.adult = true
    form.firstName = 'John'
    form.lastName = 'Doe'
    await form.savePDF()
})();
