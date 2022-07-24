import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function PDFPage() {
  const createPDF = async () => {
    const pdfDoc = await PDFDocument.create();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    console.log("height", height, "width", width);

    const fontSize = 30;
    page.drawText("");

    page.drawText("Create PDF using Javascript", {
      x: 20,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    page.drawText("Exia", { x: 120, y: 10, size: 18 });
    page.drawText("Kyrios", { x: 120, y: 340, size: 18 });
    page.drawText("Virtue", { x: 340, y: 400, size: 18 });
    page.drawText("Dynames", { x: 340, y: 340, size: 18 });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = pdfBytes.buffer;
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer?.setAttribute(
      "src",
      URL.createObjectURL(new Blob([pdfBuffer], { type: "application/pdf" }))
    );
  };

  return (
    <div className="h-full">
      <button onClick={createPDF}>Click to Generate PDF</button>
      <iframe
        id="pdfViewer"
        src=""
        frameBorder="0"
        allowFullScreen={true}
        height={window.innerHeight}
        width={window.innerWidth}
      ></iframe>
    </div>
  );
}

export default PDFPage;
