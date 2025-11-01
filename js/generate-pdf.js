// generate-pdf.js - helper to create PDF blob for a DOM element using html2pdf
async function generatePdfForElement(element, filename){
  // html2pdf returns a promise; using outputPdf to get blob
  const opt = {
    margin: 10,
    filename: filename,
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  const worker = html2pdf().set(opt).from(element);
  // use outputPdf to get blob
  return worker.outputPdf('blob');
}
