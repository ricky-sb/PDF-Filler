## Quickstart

1. Install [Node.js](https://nodejs.org/en/download/) if you don't already have it
2. Install [Yarn](https://classic.yarnpkg.com/en/docs/install/) if you don't already have it
3. Clone the `AcroForms` branch of the [pdf-lib library](https://github.com/Hopding/pdf-lib/tree/AcroForms):  
`git clone -b AcroForms https://github.com/Hopding/pdf-lib.git`  
4. Enter the directory:  
 `cd pdf-lib`
5. Install the required packages:  
`yarn install`
6. Build the library:  
`yarn build`
7. Print the current working directory by typing `pwd` (or `cd` if you're on Windows)
8. Clone this project:  
`git clone https://github.com/ricky-sb/PDF-Filler`
9. Enter the directory:  
`cd PDF-Filler`
10. Copy the path from Step 7 into Line 7 of this project's package.json file 
11. Run `node build/form.js` to fill out the form
12. Open `output.pdf` to see your results

----  

#### Notes
* Yes, we have to manually compile `pdf-lib` because `AcroForms` hasn't been packaged/released yet. It should happen within the next few weeks.
* See `src/form.ts` for the implementation. It should give you an idea of a path forward.
* I got the magic string `topmostSubform[0].Page4[0].TextField1[2]` from looking at the form field properties in PDFEscape.
    1. Load the PDF into [PDFEscape](https://www.pdfescape.com/account/unregistered)
    2. Right click one of the form fields and click "Unlock Form Field"
    3. Accept the confirmation dialog by pressing "Yes"
    4. Right click the same form field and click "Object Properties"
    5. Copy the name from the "Name" section
