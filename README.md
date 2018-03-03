# Node.JS
Sample Node.js Artist Tools for Photoshop Generator

## Export Symbols:

Exports each layer or group inside the **"Final"** group to individual PNG files. 
The compression used is **pngQuant**, which is the one used in the ***File>Export>Export As*** dialog in photoshop.
This is different than SaveForWeb, since it saves a PNG8 with a smoother alpha.

Tested in **Adobe Photoshop CC 2018**: 

  1. Copy **"ExportSymbols"** folder to ***"C:\Program Files\Adobe\Adobe Photoshop CC 2018\Plug-ins\Generator"***
  
  2. Restart ***Photoshop***
  
  3. In Photoshop, Open the sample scene: ***../SampleScenes/PSD/gamename_sym.psd***
  
  4. Go to ***File>Generate>Export Symbols***

**NOTE:** Images will be saved to a **"PNG"** folder at the same level as the open scene's parent folder.
