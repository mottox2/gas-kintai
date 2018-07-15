function doGet(e) {
  const params = e.parameter
  const properties = getProperties()
  const payload = JSON.stringify(params)
  const res = ContentService.createTextOutput();
  res.setMimeType(ContentService.MimeType.JSON);
  res.setContent(payload);
  return res;
}

function getProperties() {
  var properties = PropertiesService.getScriptProperties();
  const filename = properties.getProperty('FILE_NAME');
  return { filename: filename }  
}
