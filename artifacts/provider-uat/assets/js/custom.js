function removeEditorFromDom() {
  TXTextControl.removeFromDom()
}

function loadJsonData(json) {
  TXTextControl.loadJsonData(json)
}

function loadDocument(data) {
  TXTextControl.loadDocument(TXTextControl.streamType.WordprocessingML, data)
}
