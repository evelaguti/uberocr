# Uberocr
Libreria que usa tesseract.js para reconocer caracteres en imagenes.

## Instalación
npm i @evelaguti/uberocr

## Modo de uso
```node src/uberocr.js 'https://www.yapo.cl/pg/0noZEXmu4uQ9EvV/Cgel7jUqj46LjvBRMzo0T0txd5A==.gif' eng```

```
const uberocr = require('@evelaguti/uberocr')

uberocr(url,'eng').then((result) =>{
    console.log(result.text)
    
  })
```

Reconocera la imagen del primer parametro usando la librería de pruebas del segundo parametro.

> <cite>```evelaguti```</cite>