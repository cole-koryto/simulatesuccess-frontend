//@ts-ignore
const ExportData = ({ data, displayText, fileName }) => {
  const downloadFile = ({ data, fileName, fileType }: any) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })

    // Create an anchor element and dispatch a click event on it to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToJson = (event: any) => {
    event.preventDefault()
    downloadFile({
      data: JSON.stringify(data, null, 2),
      fileName: fileName,
      fileType: 'text/json',
    })
  }

  return (
    <div className="p-6">
      <button type='button' className="border border-gray-600 rounded-lg bg-gray-700 placeholder-gray-400 text-white overflow-hidden" onClick={exportToJson}>
        {displayText}
      </button>
    </div>
  )
}
export default ExportData