//@ts-ignore
const ExportData = ({ simulationData }) => {
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
      data: JSON.stringify(simulationData),
      fileName: 'simulation_summary.json',
      fileType: 'text/json',
    })
  }

  return (
    <div className="p-2 ">
      <button type='button' onClick={exportToJson}>
        Export to JSON
      </button>
    </div>
  )
}

export default ExportData