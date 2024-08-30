
let dropZone = document.getElementById('drop-area');
let formData = new FormData();
console.log('hla')

dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; 
})

dropZone.addEventListener('drop', function(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('getting the file')
    file = e.dataTransfer.files[0]
    formData.append('file', file);

    fileFormat = formData.get('file')
    console.log(fileFormat)

    console.log('Sending-resumen')
    let response = fetch('/send-resumen', {
        method: 'POST',
        body: fileFormat
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
})