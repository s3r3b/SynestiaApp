import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

type NotebookStub = {
  id: string
  title: string
  pages?: Array<{ imageDataUri?: string }>
}

export async function exportNotebookToPDF(notebook: NotebookStub) {
  // generate simple HTML with images if available
  const imagesHtml = (notebook.pages || []).map(p => {
    if (p.imageDataUri) return `<div style="margin-bottom:12px;"><img src="${p.imageDataUri}" style="width:100%;height:auto;"/></div>`
    return ''
  }).join('\n')

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding:20px; color:#111} .title{font-size:22px;margin-bottom:8px}</style>
    </head>
    <body>
      <div class="title">${notebook.title}</div>
      ${imagesHtml}
    </body>
  </html>`

  try {
    const { uri } = await Print.printToFileAsync({ html })
    if (!(await Sharing.isAvailableAsync())) {
      return { ok: true, uri }
    }
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf' })
    return { ok: true, uri }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

export async function exportSamplePDF() {
  const sample = { id: 'sample', title: 'Synestia Export - Przykład', pages: [] }
  return exportNotebookToPDF(sample)
}

export default { exportNotebookToPDF, exportSamplePDF }
