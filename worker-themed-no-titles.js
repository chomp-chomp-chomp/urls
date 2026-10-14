// ============================================================================
// ENHANCED CLOUDFLARE WORKER WITH CLICK TRACKING - CUSTOM THEME
// ============================================================================
// Features: Auto-copy, Copy buttons, Page titles, Click analytics, and more!
// ============================================================================

// ---------------------------------------------------------------------------
// SVG Icon library (Lucide-inspired, inline)
// ---------------------------------------------------------------------------
const icons = {
  link: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  barChart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  globe: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  trash: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  edit: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  logOut: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  chevronDown: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  book: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  smartphone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  chrome: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>',
  bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  code: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  mousePointer: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>',
  x: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  share: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  search: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  tag: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  qrCode: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>',
  list: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  filter: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
};

// How many individual hits to keep in the rolling per-link click log (newest
// first). This is separate from the aggregate `stats:` counters, which are
// unbounded running totals. No IP address is ever captured or stored.
const CLICK_LOG_LIMIT = 50;

// The canonical domain for shortened links, regardless of which domain
// /clean, /admin, or /api/shorten were actually accessed through.
// chmp.me keeps serving the separate homepage/subdomain directory.
const CANONICAL_DOMAIN = 'https://chom.pm';

// ---------------------------------------------------------------------------
// QR code generation: shared library + modal, embedded into both the admin
// and clean-page templates below. URL QR codes reuse the existing shortener
// (so scans are tracked); Email/vCard QR codes are encoded entirely
// client-side and never touch the server.
// ---------------------------------------------------------------------------
const QR_LIB_JS = "// ---------------------------------------------------------------------------\n// QR code encoder (vendored, MIT License, Copyright (c) 2009 Kazuhiko Arase)\n// https://github.com/kazuhikoarase/qrcode-generator - generates QR modules\n// entirely client-side; no data ever leaves the browser to produce a QR code.\n// ---------------------------------------------------------------------------\n//---------------------------------------------------------------------\n//\n// QR Code Generator for JavaScript\n//\n// Copyright (c) 2009 Kazuhiko Arase\n//\n// URL: http://www.d-project.com/\n//\n// Licensed under the MIT license:\n//  http://www.opensource.org/licenses/mit-license.php\n//\n// The word 'QR Code' is registered trademark of\n// DENSO WAVE INCORPORATED\n//  http://www.denso-wave.com/qrcode/faqpatent-e.html\n//\n//---------------------------------------------------------------------\n\nvar qrcode = function() {\n\n  //---------------------------------------------------------------------\n  // qrcode\n  //---------------------------------------------------------------------\n\n  /**\n   * qrcode\n   * @param typeNumber 1 to 40\n   * @param errorCorrectionLevel 'L','M','Q','H'\n   */\n  var qrcode = function(typeNumber, errorCorrectionLevel) {\n\n    var PAD0 = 0xEC;\n    var PAD1 = 0x11;\n\n    var _typeNumber = typeNumber;\n    var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];\n    var _modules = null;\n    var _moduleCount = 0;\n    var _dataCache = null;\n    var _dataList = [];\n\n    var _this = {};\n\n    var makeImpl = function(test, maskPattern) {\n\n      _moduleCount = _typeNumber * 4 + 17;\n      _modules = function(moduleCount) {\n        var modules = new Array(moduleCount);\n        for (var row = 0; row < moduleCount; row += 1) {\n          modules[row] = new Array(moduleCount);\n          for (var col = 0; col < moduleCount; col += 1) {\n            modules[row][col] = null;\n          }\n        }\n        return modules;\n      }(_moduleCount);\n\n      setupPositionProbePattern(0, 0);\n      setupPositionProbePattern(_moduleCount - 7, 0);\n      setupPositionProbePattern(0, _moduleCount - 7);\n      setupPositionAdjustPattern();\n      setupTimingPattern();\n      setupTypeInfo(test, maskPattern);\n\n      if (_typeNumber >= 7) {\n        setupTypeNumber(test);\n      }\n\n      if (_dataCache == null) {\n        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);\n      }\n\n      mapData(_dataCache, maskPattern);\n    };\n\n    var setupPositionProbePattern = function(row, col) {\n\n      for (var r = -1; r <= 7; r += 1) {\n\n        if (row + r <= -1 || _moduleCount <= row + r) continue;\n\n        for (var c = -1; c <= 7; c += 1) {\n\n          if (col + c <= -1 || _moduleCount <= col + c) continue;\n\n          if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )\n              || (0 <= c && c <= 6 && (r == 0 || r == 6) )\n              || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {\n            _modules[row + r][col + c] = true;\n          } else {\n            _modules[row + r][col + c] = false;\n          }\n        }\n      }\n    };\n\n    var getBestMaskPattern = function() {\n\n      var minLostPoint = 0;\n      var pattern = 0;\n\n      for (var i = 0; i < 8; i += 1) {\n\n        makeImpl(true, i);\n\n        var lostPoint = QRUtil.getLostPoint(_this);\n\n        if (i == 0 || minLostPoint > lostPoint) {\n          minLostPoint = lostPoint;\n          pattern = i;\n        }\n      }\n\n      return pattern;\n    };\n\n    var setupTimingPattern = function() {\n\n      for (var r = 8; r < _moduleCount - 8; r += 1) {\n        if (_modules[r][6] != null) {\n          continue;\n        }\n        _modules[r][6] = (r % 2 == 0);\n      }\n\n      for (var c = 8; c < _moduleCount - 8; c += 1) {\n        if (_modules[6][c] != null) {\n          continue;\n        }\n        _modules[6][c] = (c % 2 == 0);\n      }\n    };\n\n    var setupPositionAdjustPattern = function() {\n\n      var pos = QRUtil.getPatternPosition(_typeNumber);\n\n      for (var i = 0; i < pos.length; i += 1) {\n\n        for (var j = 0; j < pos.length; j += 1) {\n\n          var row = pos[i];\n          var col = pos[j];\n\n          if (_modules[row][col] != null) {\n            continue;\n          }\n\n          for (var r = -2; r <= 2; r += 1) {\n\n            for (var c = -2; c <= 2; c += 1) {\n\n              if (r == -2 || r == 2 || c == -2 || c == 2\n                  || (r == 0 && c == 0) ) {\n                _modules[row + r][col + c] = true;\n              } else {\n                _modules[row + r][col + c] = false;\n              }\n            }\n          }\n        }\n      }\n    };\n\n    var setupTypeNumber = function(test) {\n\n      var bits = QRUtil.getBCHTypeNumber(_typeNumber);\n\n      for (var i = 0; i < 18; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;\n      }\n\n      for (var i = 0; i < 18; i += 1) {\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;\n      }\n    };\n\n    var setupTypeInfo = function(test, maskPattern) {\n\n      var data = (_errorCorrectionLevel << 3) | maskPattern;\n      var bits = QRUtil.getBCHTypeInfo(data);\n\n      // vertical\n      for (var i = 0; i < 15; i += 1) {\n\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n\n        if (i < 6) {\n          _modules[i][8] = mod;\n        } else if (i < 8) {\n          _modules[i + 1][8] = mod;\n        } else {\n          _modules[_moduleCount - 15 + i][8] = mod;\n        }\n      }\n\n      // horizontal\n      for (var i = 0; i < 15; i += 1) {\n\n        var mod = (!test && ( (bits >> i) & 1) == 1);\n\n        if (i < 8) {\n          _modules[8][_moduleCount - i - 1] = mod;\n        } else if (i < 9) {\n          _modules[8][15 - i - 1 + 1] = mod;\n        } else {\n          _modules[8][15 - i - 1] = mod;\n        }\n      }\n\n      // fixed module\n      _modules[_moduleCount - 8][8] = (!test);\n    };\n\n    var mapData = function(data, maskPattern) {\n\n      var inc = -1;\n      var row = _moduleCount - 1;\n      var bitIndex = 7;\n      var byteIndex = 0;\n      var maskFunc = QRUtil.getMaskFunction(maskPattern);\n\n      for (var col = _moduleCount - 1; col > 0; col -= 2) {\n\n        if (col == 6) col -= 1;\n\n        while (true) {\n\n          for (var c = 0; c < 2; c += 1) {\n\n            if (_modules[row][col - c] == null) {\n\n              var dark = false;\n\n              if (byteIndex < data.length) {\n                dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);\n              }\n\n              var mask = maskFunc(row, col - c);\n\n              if (mask) {\n                dark = !dark;\n              }\n\n              _modules[row][col - c] = dark;\n              bitIndex -= 1;\n\n              if (bitIndex == -1) {\n                byteIndex += 1;\n                bitIndex = 7;\n              }\n            }\n          }\n\n          row += inc;\n\n          if (row < 0 || _moduleCount <= row) {\n            row -= inc;\n            inc = -inc;\n            break;\n          }\n        }\n      }\n    };\n\n    var createBytes = function(buffer, rsBlocks) {\n\n      var offset = 0;\n\n      var maxDcCount = 0;\n      var maxEcCount = 0;\n\n      var dcdata = new Array(rsBlocks.length);\n      var ecdata = new Array(rsBlocks.length);\n\n      for (var r = 0; r < rsBlocks.length; r += 1) {\n\n        var dcCount = rsBlocks[r].dataCount;\n        var ecCount = rsBlocks[r].totalCount - dcCount;\n\n        maxDcCount = Math.max(maxDcCount, dcCount);\n        maxEcCount = Math.max(maxEcCount, ecCount);\n\n        dcdata[r] = new Array(dcCount);\n\n        for (var i = 0; i < dcdata[r].length; i += 1) {\n          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];\n        }\n        offset += dcCount;\n\n        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);\n        var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);\n\n        var modPoly = rawPoly.mod(rsPoly);\n        ecdata[r] = new Array(rsPoly.getLength() - 1);\n        for (var i = 0; i < ecdata[r].length; i += 1) {\n          var modIndex = i + modPoly.getLength() - ecdata[r].length;\n          ecdata[r][i] = (modIndex >= 0)? modPoly.getAt(modIndex) : 0;\n        }\n      }\n\n      var totalCodeCount = 0;\n      for (var i = 0; i < rsBlocks.length; i += 1) {\n        totalCodeCount += rsBlocks[i].totalCount;\n      }\n\n      var data = new Array(totalCodeCount);\n      var index = 0;\n\n      for (var i = 0; i < maxDcCount; i += 1) {\n        for (var r = 0; r < rsBlocks.length; r += 1) {\n          if (i < dcdata[r].length) {\n            data[index] = dcdata[r][i];\n            index += 1;\n          }\n        }\n      }\n\n      for (var i = 0; i < maxEcCount; i += 1) {\n        for (var r = 0; r < rsBlocks.length; r += 1) {\n          if (i < ecdata[r].length) {\n            data[index] = ecdata[r][i];\n            index += 1;\n          }\n        }\n      }\n\n      return data;\n    };\n\n    var createData = function(typeNumber, errorCorrectionLevel, dataList) {\n\n      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectionLevel);\n\n      var buffer = qrBitBuffer();\n\n      for (var i = 0; i < dataList.length; i += 1) {\n        var data = dataList[i];\n        buffer.put(data.getMode(), 4);\n        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );\n        data.write(buffer);\n      }\n\n      // calc num max data.\n      var totalDataCount = 0;\n      for (var i = 0; i < rsBlocks.length; i += 1) {\n        totalDataCount += rsBlocks[i].dataCount;\n      }\n\n      if (buffer.getLengthInBits() > totalDataCount * 8) {\n        throw 'code length overflow. ('\n          + buffer.getLengthInBits()\n          + '>'\n          + totalDataCount * 8\n          + ')';\n      }\n\n      // end code\n      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {\n        buffer.put(0, 4);\n      }\n\n      // padding\n      while (buffer.getLengthInBits() % 8 != 0) {\n        buffer.putBit(false);\n      }\n\n      // padding\n      while (true) {\n\n        if (buffer.getLengthInBits() >= totalDataCount * 8) {\n          break;\n        }\n        buffer.put(PAD0, 8);\n\n        if (buffer.getLengthInBits() >= totalDataCount * 8) {\n          break;\n        }\n        buffer.put(PAD1, 8);\n      }\n\n      return createBytes(buffer, rsBlocks);\n    };\n\n    _this.addData = function(data, mode) {\n\n      mode = mode || 'Byte';\n\n      var newData = null;\n\n      switch(mode) {\n      case 'Numeric' :\n        newData = qrNumber(data);\n        break;\n      case 'Alphanumeric' :\n        newData = qrAlphaNum(data);\n        break;\n      case 'Byte' :\n        newData = qr8BitByte(data);\n        break;\n      case 'Kanji' :\n        newData = qrKanji(data);\n        break;\n      default :\n        throw 'mode:' + mode;\n      }\n\n      _dataList.push(newData);\n      _dataCache = null;\n    };\n\n    _this.isDark = function(row, col) {\n      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {\n        throw row + ',' + col;\n      }\n      return _modules[row][col];\n    };\n\n    _this.getModuleCount = function() {\n      return _moduleCount;\n    };\n\n    _this.make = function() {\n      if (_typeNumber < 1) {\n        var typeNumber = 1;\n\n        for (; typeNumber < 40; typeNumber++) {\n          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, _errorCorrectionLevel);\n          var buffer = qrBitBuffer();\n\n          for (var i = 0; i < _dataList.length; i++) {\n            var data = _dataList[i];\n            buffer.put(data.getMode(), 4);\n            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );\n            data.write(buffer);\n          }\n\n          var totalDataCount = 0;\n          for (var i = 0; i < rsBlocks.length; i++) {\n            totalDataCount += rsBlocks[i].dataCount;\n          }\n\n          if (buffer.getLengthInBits() <= totalDataCount * 8) {\n            break;\n          }\n        }\n\n        _typeNumber = typeNumber;\n      }\n\n      makeImpl(false, getBestMaskPattern() );\n    };\n\n    _this.createTableTag = function(cellSize, margin) {\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      var qrHtml = '';\n\n      qrHtml += '<table style=\"';\n      qrHtml += ' border-width: 0px; border-style: none;';\n      qrHtml += ' border-collapse: collapse;';\n      qrHtml += ' padding: 0px; margin: ' + margin + 'px;';\n      qrHtml += '\">';\n      qrHtml += '<tbody>';\n\n      for (var r = 0; r < _this.getModuleCount(); r += 1) {\n\n        qrHtml += '<tr>';\n\n        for (var c = 0; c < _this.getModuleCount(); c += 1) {\n          qrHtml += '<td style=\"';\n          qrHtml += ' border-width: 0px; border-style: none;';\n          qrHtml += ' border-collapse: collapse;';\n          qrHtml += ' padding: 0px; margin: 0px;';\n          qrHtml += ' width: ' + cellSize + 'px;';\n          qrHtml += ' height: ' + cellSize + 'px;';\n          qrHtml += ' background-color: ';\n          qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';\n          qrHtml += ';';\n          qrHtml += '\"/>';\n        }\n\n        qrHtml += '</tr>';\n      }\n\n      qrHtml += '</tbody>';\n      qrHtml += '</table>';\n\n      return qrHtml;\n    };\n\n    _this.createSvgTag = function(cellSize, margin, alt, title) {\n\n      var opts = {};\n      if (typeof arguments[0] == 'object') {\n        // Called by options.\n        opts = arguments[0];\n        // overwrite cellSize and margin.\n        cellSize = opts.cellSize;\n        margin = opts.margin;\n        alt = opts.alt;\n        title = opts.title;\n      }\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      // Compose alt property surrogate\n      alt = (typeof alt === 'string') ? {text: alt} : alt || {};\n      alt.text = alt.text || null;\n      alt.id = (alt.text) ? alt.id || 'qrcode-description' : null;\n\n      // Compose title property surrogate\n      title = (typeof title === 'string') ? {text: title} : title || {};\n      title.text = title.text || null;\n      title.id = (title.text) ? title.id || 'qrcode-title' : null;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var c, mc, r, mr, qrSvg='', rect;\n\n      rect = 'l' + cellSize + ',0 0,' + cellSize +\n        ' -' + cellSize + ',0 0,-' + cellSize + 'z ';\n\n      qrSvg += '<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"';\n      qrSvg += !opts.scalable ? ' width=\"' + size + 'px\" height=\"' + size + 'px\"' : '';\n      qrSvg += ' viewBox=\"0 0 ' + size + ' ' + size + '\" ';\n      qrSvg += ' preserveAspectRatio=\"xMinYMin meet\"';\n      qrSvg += (title.text || alt.text) ? ' role=\"img\" aria-labelledby=\"' +\n          escapeXml([title.id, alt.id].join(' ').trim() ) + '\"' : '';\n      qrSvg += '>';\n      qrSvg += (title.text) ? '<title id=\"' + escapeXml(title.id) + '\">' +\n          escapeXml(title.text) + '</title>' : '';\n      qrSvg += (alt.text) ? '<description id=\"' + escapeXml(alt.id) + '\">' +\n          escapeXml(alt.text) + '</description>' : '';\n      qrSvg += '<rect width=\"100%\" height=\"100%\" fill=\"white\" cx=\"0\" cy=\"0\"/>';\n      qrSvg += '<path d=\"';\n\n      for (r = 0; r < _this.getModuleCount(); r += 1) {\n        mr = r * cellSize + margin;\n        for (c = 0; c < _this.getModuleCount(); c += 1) {\n          if (_this.isDark(r, c) ) {\n            mc = c*cellSize+margin;\n            qrSvg += 'M' + mc + ',' + mr + rect;\n          }\n        }\n      }\n\n      qrSvg += '\" stroke=\"transparent\" fill=\"black\"/>';\n      qrSvg += '</svg>';\n\n      return qrSvg;\n    };\n\n    _this.createDataURL = function(cellSize, margin) {\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n\n      return createDataURL(size, size, function(x, y) {\n        if (min <= x && x < max && min <= y && y < max) {\n          var c = Math.floor( (x - min) / cellSize);\n          var r = Math.floor( (y - min) / cellSize);\n          return _this.isDark(r, c)? 0 : 1;\n        } else {\n          return 1;\n        }\n      } );\n    };\n\n    _this.createImgTag = function(cellSize, margin, alt) {\n\n      cellSize = cellSize || 2;\n      margin = (typeof margin == 'undefined')? cellSize * 4 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n\n      var img = '';\n      img += '<img';\n      img += '\\u0020src=\"';\n      img += _this.createDataURL(cellSize, margin);\n      img += '\"';\n      img += '\\u0020width=\"';\n      img += size;\n      img += '\"';\n      img += '\\u0020height=\"';\n      img += size;\n      img += '\"';\n      if (alt) {\n        img += '\\u0020alt=\"';\n        img += escapeXml(alt);\n        img += '\"';\n      }\n      img += '/>';\n\n      return img;\n    };\n\n    var escapeXml = function(s) {\n      var escaped = '';\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charAt(i);\n        switch(c) {\n        case '<': escaped += '&lt;'; break;\n        case '>': escaped += '&gt;'; break;\n        case '&': escaped += '&amp;'; break;\n        case '\"': escaped += '&quot;'; break;\n        default : escaped += c; break;\n        }\n      }\n      return escaped;\n    };\n\n    var _createHalfASCII = function(margin) {\n      var cellSize = 1;\n      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n\n      var y, x, r1, r2, p;\n\n      var blocks = {\n        '\u2588\u2588': '\u2588',\n        '\u2588 ': '\u2580',\n        ' \u2588': '\u2584',\n        '  ': ' '\n      };\n\n      var blocksLastLineNoMargin = {\n        '\u2588\u2588': '\u2580',\n        '\u2588 ': '\u2580',\n        ' \u2588': ' ',\n        '  ': ' '\n      };\n\n      var ascii = '';\n      for (y = 0; y < size; y += 2) {\n        r1 = Math.floor((y - min) / cellSize);\n        r2 = Math.floor((y + 1 - min) / cellSize);\n        for (x = 0; x < size; x += 1) {\n          p = '\u2588';\n\n          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {\n            p = ' ';\n          }\n\n          if (min <= x && x < max && min <= y+1 && y+1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {\n            p += ' ';\n          }\n          else {\n            p += '\u2588';\n          }\n\n          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.\n          ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];\n        }\n\n        ascii += '\\n';\n      }\n\n      if (size % 2 && margin > 0) {\n        return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('\u2580');\n      }\n\n      return ascii.substring(0, ascii.length-1);\n    };\n\n    _this.createASCII = function(cellSize, margin) {\n      cellSize = cellSize || 1;\n\n      if (cellSize < 2) {\n        return _createHalfASCII(margin);\n      }\n\n      cellSize -= 1;\n      margin = (typeof margin == 'undefined')? cellSize * 2 : margin;\n\n      var size = _this.getModuleCount() * cellSize + margin * 2;\n      var min = margin;\n      var max = size - margin;\n\n      var y, x, r, p;\n\n      var white = Array(cellSize+1).join('\u2588\u2588');\n      var black = Array(cellSize+1).join('  ');\n\n      var ascii = '';\n      var line = '';\n      for (y = 0; y < size; y += 1) {\n        r = Math.floor( (y - min) / cellSize);\n        line = '';\n        for (x = 0; x < size; x += 1) {\n          p = 1;\n\n          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {\n            p = 0;\n          }\n\n          // Output 2 characters per pixel, to create full square. 1 character per pixels gives only half width of square.\n          line += p ? white : black;\n        }\n\n        for (r = 0; r < cellSize; r += 1) {\n          ascii += line + '\\n';\n        }\n      }\n\n      return ascii.substring(0, ascii.length-1);\n    };\n\n    _this.renderTo2dContext = function(context, cellSize) {\n      cellSize = cellSize || 2;\n      var length = _this.getModuleCount();\n      for (var row = 0; row < length; row++) {\n        for (var col = 0; col < length; col++) {\n          context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';\n          context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);\n        }\n      }\n    }\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrcode.stringToBytes\n  //---------------------------------------------------------------------\n\n  qrcode.stringToBytesFuncs = {\n    'default' : function(s) {\n      var bytes = [];\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charCodeAt(i);\n        bytes.push(c & 0xff);\n      }\n      return bytes;\n    }\n  };\n\n  qrcode.stringToBytes = qrcode.stringToBytesFuncs['default'];\n\n  //---------------------------------------------------------------------\n  // qrcode.createStringToBytes\n  //---------------------------------------------------------------------\n\n  /**\n   * @param unicodeData base64 string of byte array.\n   * [16bit Unicode],[16bit Bytes], ...\n   * @param numChars\n   */\n  qrcode.createStringToBytes = function(unicodeData, numChars) {\n\n    // create conversion map.\n\n    var unicodeMap = function() {\n\n      var bin = base64DecodeInputStream(unicodeData);\n      var read = function() {\n        var b = bin.read();\n        if (b == -1) throw 'eof';\n        return b;\n      };\n\n      var count = 0;\n      var unicodeMap = {};\n      while (true) {\n        var b0 = bin.read();\n        if (b0 == -1) break;\n        var b1 = read();\n        var b2 = read();\n        var b3 = read();\n        var k = String.fromCharCode( (b0 << 8) | b1);\n        var v = (b2 << 8) | b3;\n        unicodeMap[k] = v;\n        count += 1;\n      }\n      if (count != numChars) {\n        throw count + ' != ' + numChars;\n      }\n\n      return unicodeMap;\n    }();\n\n    var unknownChar = '?'.charCodeAt(0);\n\n    return function(s) {\n      var bytes = [];\n      for (var i = 0; i < s.length; i += 1) {\n        var c = s.charCodeAt(i);\n        if (c < 128) {\n          bytes.push(c);\n        } else {\n          var b = unicodeMap[s.charAt(i)];\n          if (typeof b == 'number') {\n            if ( (b & 0xff) == b) {\n              // 1byte\n              bytes.push(b);\n            } else {\n              // 2bytes\n              bytes.push(b >>> 8);\n              bytes.push(b & 0xff);\n            }\n          } else {\n            bytes.push(unknownChar);\n          }\n        }\n      }\n      return bytes;\n    };\n  };\n\n  //---------------------------------------------------------------------\n  // QRMode\n  //---------------------------------------------------------------------\n\n  var QRMode = {\n    MODE_NUMBER :    1 << 0,\n    MODE_ALPHA_NUM : 1 << 1,\n    MODE_8BIT_BYTE : 1 << 2,\n    MODE_KANJI :     1 << 3\n  };\n\n  //---------------------------------------------------------------------\n  // QRErrorCorrectionLevel\n  //---------------------------------------------------------------------\n\n  var QRErrorCorrectionLevel = {\n    L : 1,\n    M : 0,\n    Q : 3,\n    H : 2\n  };\n\n  //---------------------------------------------------------------------\n  // QRMaskPattern\n  //---------------------------------------------------------------------\n\n  var QRMaskPattern = {\n    PATTERN000 : 0,\n    PATTERN001 : 1,\n    PATTERN010 : 2,\n    PATTERN011 : 3,\n    PATTERN100 : 4,\n    PATTERN101 : 5,\n    PATTERN110 : 6,\n    PATTERN111 : 7\n  };\n\n  //---------------------------------------------------------------------\n  // QRUtil\n  //---------------------------------------------------------------------\n\n  var QRUtil = function() {\n\n    var PATTERN_POSITION_TABLE = [\n      [],\n      [6, 18],\n      [6, 22],\n      [6, 26],\n      [6, 30],\n      [6, 34],\n      [6, 22, 38],\n      [6, 24, 42],\n      [6, 26, 46],\n      [6, 28, 50],\n      [6, 30, 54],\n      [6, 32, 58],\n      [6, 34, 62],\n      [6, 26, 46, 66],\n      [6, 26, 48, 70],\n      [6, 26, 50, 74],\n      [6, 30, 54, 78],\n      [6, 30, 56, 82],\n      [6, 30, 58, 86],\n      [6, 34, 62, 90],\n      [6, 28, 50, 72, 94],\n      [6, 26, 50, 74, 98],\n      [6, 30, 54, 78, 102],\n      [6, 28, 54, 80, 106],\n      [6, 32, 58, 84, 110],\n      [6, 30, 58, 86, 114],\n      [6, 34, 62, 90, 118],\n      [6, 26, 50, 74, 98, 122],\n      [6, 30, 54, 78, 102, 126],\n      [6, 26, 52, 78, 104, 130],\n      [6, 30, 56, 82, 108, 134],\n      [6, 34, 60, 86, 112, 138],\n      [6, 30, 58, 86, 114, 142],\n      [6, 34, 62, 90, 118, 146],\n      [6, 30, 54, 78, 102, 126, 150],\n      [6, 24, 50, 76, 102, 128, 154],\n      [6, 28, 54, 80, 106, 132, 158],\n      [6, 32, 58, 84, 110, 136, 162],\n      [6, 26, 54, 82, 110, 138, 166],\n      [6, 30, 58, 86, 114, 142, 170]\n    ];\n    var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);\n    var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);\n    var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);\n\n    var _this = {};\n\n    var getBCHDigit = function(data) {\n      var digit = 0;\n      while (data != 0) {\n        digit += 1;\n        data >>>= 1;\n      }\n      return digit;\n    };\n\n    _this.getBCHTypeInfo = function(data) {\n      var d = data << 10;\n      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {\n        d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );\n      }\n      return ( (data << 10) | d) ^ G15_MASK;\n    };\n\n    _this.getBCHTypeNumber = function(data) {\n      var d = data << 12;\n      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {\n        d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );\n      }\n      return (data << 12) | d;\n    };\n\n    _this.getPatternPosition = function(typeNumber) {\n      return PATTERN_POSITION_TABLE[typeNumber - 1];\n    };\n\n    _this.getMaskFunction = function(maskPattern) {\n\n      switch (maskPattern) {\n\n      case QRMaskPattern.PATTERN000 :\n        return function(i, j) { return (i + j) % 2 == 0; };\n      case QRMaskPattern.PATTERN001 :\n        return function(i, j) { return i % 2 == 0; };\n      case QRMaskPattern.PATTERN010 :\n        return function(i, j) { return j % 3 == 0; };\n      case QRMaskPattern.PATTERN011 :\n        return function(i, j) { return (i + j) % 3 == 0; };\n      case QRMaskPattern.PATTERN100 :\n        return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };\n      case QRMaskPattern.PATTERN101 :\n        return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };\n      case QRMaskPattern.PATTERN110 :\n        return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };\n      case QRMaskPattern.PATTERN111 :\n        return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };\n\n      default :\n        throw 'bad maskPattern:' + maskPattern;\n      }\n    };\n\n    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {\n      var a = qrPolynomial([1], 0);\n      for (var i = 0; i < errorCorrectLength; i += 1) {\n        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );\n      }\n      return a;\n    };\n\n    _this.getLengthInBits = function(mode, type) {\n\n      if (1 <= type && type < 10) {\n\n        // 1 - 9\n\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 10;\n        case QRMode.MODE_ALPHA_NUM : return 9;\n        case QRMode.MODE_8BIT_BYTE : return 8;\n        case QRMode.MODE_KANJI     : return 8;\n        default :\n          throw 'mode:' + mode;\n        }\n\n      } else if (type < 27) {\n\n        // 10 - 26\n\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 12;\n        case QRMode.MODE_ALPHA_NUM : return 11;\n        case QRMode.MODE_8BIT_BYTE : return 16;\n        case QRMode.MODE_KANJI     : return 10;\n        default :\n          throw 'mode:' + mode;\n        }\n\n      } else if (type < 41) {\n\n        // 27 - 40\n\n        switch(mode) {\n        case QRMode.MODE_NUMBER    : return 14;\n        case QRMode.MODE_ALPHA_NUM : return 13;\n        case QRMode.MODE_8BIT_BYTE : return 16;\n        case QRMode.MODE_KANJI     : return 12;\n        default :\n          throw 'mode:' + mode;\n        }\n\n      } else {\n        throw 'type:' + type;\n      }\n    };\n\n    _this.getLostPoint = function(qrcode) {\n\n      var moduleCount = qrcode.getModuleCount();\n\n      var lostPoint = 0;\n\n      // LEVEL1\n\n      for (var row = 0; row < moduleCount; row += 1) {\n        for (var col = 0; col < moduleCount; col += 1) {\n\n          var sameCount = 0;\n          var dark = qrcode.isDark(row, col);\n\n          for (var r = -1; r <= 1; r += 1) {\n\n            if (row + r < 0 || moduleCount <= row + r) {\n              continue;\n            }\n\n            for (var c = -1; c <= 1; c += 1) {\n\n              if (col + c < 0 || moduleCount <= col + c) {\n                continue;\n              }\n\n              if (r == 0 && c == 0) {\n                continue;\n              }\n\n              if (dark == qrcode.isDark(row + r, col + c) ) {\n                sameCount += 1;\n              }\n            }\n          }\n\n          if (sameCount > 5) {\n            lostPoint += (3 + sameCount - 5);\n          }\n        }\n      };\n\n      // LEVEL2\n\n      for (var row = 0; row < moduleCount - 1; row += 1) {\n        for (var col = 0; col < moduleCount - 1; col += 1) {\n          var count = 0;\n          if (qrcode.isDark(row, col) ) count += 1;\n          if (qrcode.isDark(row + 1, col) ) count += 1;\n          if (qrcode.isDark(row, col + 1) ) count += 1;\n          if (qrcode.isDark(row + 1, col + 1) ) count += 1;\n          if (count == 0 || count == 4) {\n            lostPoint += 3;\n          }\n        }\n      }\n\n      // LEVEL3\n\n      for (var row = 0; row < moduleCount; row += 1) {\n        for (var col = 0; col < moduleCount - 6; col += 1) {\n          if (qrcode.isDark(row, col)\n              && !qrcode.isDark(row, col + 1)\n              &&  qrcode.isDark(row, col + 2)\n              &&  qrcode.isDark(row, col + 3)\n              &&  qrcode.isDark(row, col + 4)\n              && !qrcode.isDark(row, col + 5)\n              &&  qrcode.isDark(row, col + 6) ) {\n            lostPoint += 40;\n          }\n        }\n      }\n\n      for (var col = 0; col < moduleCount; col += 1) {\n        for (var row = 0; row < moduleCount - 6; row += 1) {\n          if (qrcode.isDark(row, col)\n              && !qrcode.isDark(row + 1, col)\n              &&  qrcode.isDark(row + 2, col)\n              &&  qrcode.isDark(row + 3, col)\n              &&  qrcode.isDark(row + 4, col)\n              && !qrcode.isDark(row + 5, col)\n              &&  qrcode.isDark(row + 6, col) ) {\n            lostPoint += 40;\n          }\n        }\n      }\n\n      // LEVEL4\n\n      var darkCount = 0;\n\n      for (var col = 0; col < moduleCount; col += 1) {\n        for (var row = 0; row < moduleCount; row += 1) {\n          if (qrcode.isDark(row, col) ) {\n            darkCount += 1;\n          }\n        }\n      }\n\n      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;\n      lostPoint += ratio * 10;\n\n      return lostPoint;\n    };\n\n    return _this;\n  }();\n\n  //---------------------------------------------------------------------\n  // QRMath\n  //---------------------------------------------------------------------\n\n  var QRMath = function() {\n\n    var EXP_TABLE = new Array(256);\n    var LOG_TABLE = new Array(256);\n\n    // initialize tables\n    for (var i = 0; i < 8; i += 1) {\n      EXP_TABLE[i] = 1 << i;\n    }\n    for (var i = 8; i < 256; i += 1) {\n      EXP_TABLE[i] = EXP_TABLE[i - 4]\n        ^ EXP_TABLE[i - 5]\n        ^ EXP_TABLE[i - 6]\n        ^ EXP_TABLE[i - 8];\n    }\n    for (var i = 0; i < 255; i += 1) {\n      LOG_TABLE[EXP_TABLE[i] ] = i;\n    }\n\n    var _this = {};\n\n    _this.glog = function(n) {\n\n      if (n < 1) {\n        throw 'glog(' + n + ')';\n      }\n\n      return LOG_TABLE[n];\n    };\n\n    _this.gexp = function(n) {\n\n      while (n < 0) {\n        n += 255;\n      }\n\n      while (n >= 256) {\n        n -= 255;\n      }\n\n      return EXP_TABLE[n];\n    };\n\n    return _this;\n  }();\n\n  //---------------------------------------------------------------------\n  // qrPolynomial\n  //---------------------------------------------------------------------\n\n  function qrPolynomial(num, shift) {\n\n    if (typeof num.length == 'undefined') {\n      throw num.length + '/' + shift;\n    }\n\n    var _num = function() {\n      var offset = 0;\n      while (offset < num.length && num[offset] == 0) {\n        offset += 1;\n      }\n      var _num = new Array(num.length - offset + shift);\n      for (var i = 0; i < num.length - offset; i += 1) {\n        _num[i] = num[i + offset];\n      }\n      return _num;\n    }();\n\n    var _this = {};\n\n    _this.getAt = function(index) {\n      return _num[index];\n    };\n\n    _this.getLength = function() {\n      return _num.length;\n    };\n\n    _this.multiply = function(e) {\n\n      var num = new Array(_this.getLength() + e.getLength() - 1);\n\n      for (var i = 0; i < _this.getLength(); i += 1) {\n        for (var j = 0; j < e.getLength(); j += 1) {\n          num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i) ) + QRMath.glog(e.getAt(j) ) );\n        }\n      }\n\n      return qrPolynomial(num, 0);\n    };\n\n    _this.mod = function(e) {\n\n      if (_this.getLength() - e.getLength() < 0) {\n        return _this;\n      }\n\n      var ratio = QRMath.glog(_this.getAt(0) ) - QRMath.glog(e.getAt(0) );\n\n      var num = new Array(_this.getLength() );\n      for (var i = 0; i < _this.getLength(); i += 1) {\n        num[i] = _this.getAt(i);\n      }\n\n      for (var i = 0; i < e.getLength(); i += 1) {\n        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i) ) + ratio);\n      }\n\n      // recursive call\n      return qrPolynomial(num, 0).mod(e);\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // QRRSBlock\n  //---------------------------------------------------------------------\n\n  var QRRSBlock = function() {\n\n    var RS_BLOCK_TABLE = [\n\n      // L\n      // M\n      // Q\n      // H\n\n      // 1\n      [1, 26, 19],\n      [1, 26, 16],\n      [1, 26, 13],\n      [1, 26, 9],\n\n      // 2\n      [1, 44, 34],\n      [1, 44, 28],\n      [1, 44, 22],\n      [1, 44, 16],\n\n      // 3\n      [1, 70, 55],\n      [1, 70, 44],\n      [2, 35, 17],\n      [2, 35, 13],\n\n      // 4\n      [1, 100, 80],\n      [2, 50, 32],\n      [2, 50, 24],\n      [4, 25, 9],\n\n      // 5\n      [1, 134, 108],\n      [2, 67, 43],\n      [2, 33, 15, 2, 34, 16],\n      [2, 33, 11, 2, 34, 12],\n\n      // 6\n      [2, 86, 68],\n      [4, 43, 27],\n      [4, 43, 19],\n      [4, 43, 15],\n\n      // 7\n      [2, 98, 78],\n      [4, 49, 31],\n      [2, 32, 14, 4, 33, 15],\n      [4, 39, 13, 1, 40, 14],\n\n      // 8\n      [2, 121, 97],\n      [2, 60, 38, 2, 61, 39],\n      [4, 40, 18, 2, 41, 19],\n      [4, 40, 14, 2, 41, 15],\n\n      // 9\n      [2, 146, 116],\n      [3, 58, 36, 2, 59, 37],\n      [4, 36, 16, 4, 37, 17],\n      [4, 36, 12, 4, 37, 13],\n\n      // 10\n      [2, 86, 68, 2, 87, 69],\n      [4, 69, 43, 1, 70, 44],\n      [6, 43, 19, 2, 44, 20],\n      [6, 43, 15, 2, 44, 16],\n\n      // 11\n      [4, 101, 81],\n      [1, 80, 50, 4, 81, 51],\n      [4, 50, 22, 4, 51, 23],\n      [3, 36, 12, 8, 37, 13],\n\n      // 12\n      [2, 116, 92, 2, 117, 93],\n      [6, 58, 36, 2, 59, 37],\n      [4, 46, 20, 6, 47, 21],\n      [7, 42, 14, 4, 43, 15],\n\n      // 13\n      [4, 133, 107],\n      [8, 59, 37, 1, 60, 38],\n      [8, 44, 20, 4, 45, 21],\n      [12, 33, 11, 4, 34, 12],\n\n      // 14\n      [3, 145, 115, 1, 146, 116],\n      [4, 64, 40, 5, 65, 41],\n      [11, 36, 16, 5, 37, 17],\n      [11, 36, 12, 5, 37, 13],\n\n      // 15\n      [5, 109, 87, 1, 110, 88],\n      [5, 65, 41, 5, 66, 42],\n      [5, 54, 24, 7, 55, 25],\n      [11, 36, 12, 7, 37, 13],\n\n      // 16\n      [5, 122, 98, 1, 123, 99],\n      [7, 73, 45, 3, 74, 46],\n      [15, 43, 19, 2, 44, 20],\n      [3, 45, 15, 13, 46, 16],\n\n      // 17\n      [1, 135, 107, 5, 136, 108],\n      [10, 74, 46, 1, 75, 47],\n      [1, 50, 22, 15, 51, 23],\n      [2, 42, 14, 17, 43, 15],\n\n      // 18\n      [5, 150, 120, 1, 151, 121],\n      [9, 69, 43, 4, 70, 44],\n      [17, 50, 22, 1, 51, 23],\n      [2, 42, 14, 19, 43, 15],\n\n      // 19\n      [3, 141, 113, 4, 142, 114],\n      [3, 70, 44, 11, 71, 45],\n      [17, 47, 21, 4, 48, 22],\n      [9, 39, 13, 16, 40, 14],\n\n      // 20\n      [3, 135, 107, 5, 136, 108],\n      [3, 67, 41, 13, 68, 42],\n      [15, 54, 24, 5, 55, 25],\n      [15, 43, 15, 10, 44, 16],\n\n      // 21\n      [4, 144, 116, 4, 145, 117],\n      [17, 68, 42],\n      [17, 50, 22, 6, 51, 23],\n      [19, 46, 16, 6, 47, 17],\n\n      // 22\n      [2, 139, 111, 7, 140, 112],\n      [17, 74, 46],\n      [7, 54, 24, 16, 55, 25],\n      [34, 37, 13],\n\n      // 23\n      [4, 151, 121, 5, 152, 122],\n      [4, 75, 47, 14, 76, 48],\n      [11, 54, 24, 14, 55, 25],\n      [16, 45, 15, 14, 46, 16],\n\n      // 24\n      [6, 147, 117, 4, 148, 118],\n      [6, 73, 45, 14, 74, 46],\n      [11, 54, 24, 16, 55, 25],\n      [30, 46, 16, 2, 47, 17],\n\n      // 25\n      [8, 132, 106, 4, 133, 107],\n      [8, 75, 47, 13, 76, 48],\n      [7, 54, 24, 22, 55, 25],\n      [22, 45, 15, 13, 46, 16],\n\n      // 26\n      [10, 142, 114, 2, 143, 115],\n      [19, 74, 46, 4, 75, 47],\n      [28, 50, 22, 6, 51, 23],\n      [33, 46, 16, 4, 47, 17],\n\n      // 27\n      [8, 152, 122, 4, 153, 123],\n      [22, 73, 45, 3, 74, 46],\n      [8, 53, 23, 26, 54, 24],\n      [12, 45, 15, 28, 46, 16],\n\n      // 28\n      [3, 147, 117, 10, 148, 118],\n      [3, 73, 45, 23, 74, 46],\n      [4, 54, 24, 31, 55, 25],\n      [11, 45, 15, 31, 46, 16],\n\n      // 29\n      [7, 146, 116, 7, 147, 117],\n      [21, 73, 45, 7, 74, 46],\n      [1, 53, 23, 37, 54, 24],\n      [19, 45, 15, 26, 46, 16],\n\n      // 30\n      [5, 145, 115, 10, 146, 116],\n      [19, 75, 47, 10, 76, 48],\n      [15, 54, 24, 25, 55, 25],\n      [23, 45, 15, 25, 46, 16],\n\n      // 31\n      [13, 145, 115, 3, 146, 116],\n      [2, 74, 46, 29, 75, 47],\n      [42, 54, 24, 1, 55, 25],\n      [23, 45, 15, 28, 46, 16],\n\n      // 32\n      [17, 145, 115],\n      [10, 74, 46, 23, 75, 47],\n      [10, 54, 24, 35, 55, 25],\n      [19, 45, 15, 35, 46, 16],\n\n      // 33\n      [17, 145, 115, 1, 146, 116],\n      [14, 74, 46, 21, 75, 47],\n      [29, 54, 24, 19, 55, 25],\n      [11, 45, 15, 46, 46, 16],\n\n      // 34\n      [13, 145, 115, 6, 146, 116],\n      [14, 74, 46, 23, 75, 47],\n      [44, 54, 24, 7, 55, 25],\n      [59, 46, 16, 1, 47, 17],\n\n      // 35\n      [12, 151, 121, 7, 152, 122],\n      [12, 75, 47, 26, 76, 48],\n      [39, 54, 24, 14, 55, 25],\n      [22, 45, 15, 41, 46, 16],\n\n      // 36\n      [6, 151, 121, 14, 152, 122],\n      [6, 75, 47, 34, 76, 48],\n      [46, 54, 24, 10, 55, 25],\n      [2, 45, 15, 64, 46, 16],\n\n      // 37\n      [17, 152, 122, 4, 153, 123],\n      [29, 74, 46, 14, 75, 47],\n      [49, 54, 24, 10, 55, 25],\n      [24, 45, 15, 46, 46, 16],\n\n      // 38\n      [4, 152, 122, 18, 153, 123],\n      [13, 74, 46, 32, 75, 47],\n      [48, 54, 24, 14, 55, 25],\n      [42, 45, 15, 32, 46, 16],\n\n      // 39\n      [20, 147, 117, 4, 148, 118],\n      [40, 75, 47, 7, 76, 48],\n      [43, 54, 24, 22, 55, 25],\n      [10, 45, 15, 67, 46, 16],\n\n      // 40\n      [19, 148, 118, 6, 149, 119],\n      [18, 75, 47, 31, 76, 48],\n      [34, 54, 24, 34, 55, 25],\n      [20, 45, 15, 61, 46, 16]\n    ];\n\n    var qrRSBlock = function(totalCount, dataCount) {\n      var _this = {};\n      _this.totalCount = totalCount;\n      _this.dataCount = dataCount;\n      return _this;\n    };\n\n    var _this = {};\n\n    var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {\n\n      switch(errorCorrectionLevel) {\n      case QRErrorCorrectionLevel.L :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];\n      case QRErrorCorrectionLevel.M :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];\n      case QRErrorCorrectionLevel.Q :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];\n      case QRErrorCorrectionLevel.H :\n        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];\n      default :\n        return undefined;\n      }\n    };\n\n    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {\n\n      var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);\n\n      if (typeof rsBlock == 'undefined') {\n        throw 'bad rs block @ typeNumber:' + typeNumber +\n            '/errorCorrectionLevel:' + errorCorrectionLevel;\n      }\n\n      var length = rsBlock.length / 3;\n\n      var list = [];\n\n      for (var i = 0; i < length; i += 1) {\n\n        var count = rsBlock[i * 3 + 0];\n        var totalCount = rsBlock[i * 3 + 1];\n        var dataCount = rsBlock[i * 3 + 2];\n\n        for (var j = 0; j < count; j += 1) {\n          list.push(qrRSBlock(totalCount, dataCount) );\n        }\n      }\n\n      return list;\n    };\n\n    return _this;\n  }();\n\n  //---------------------------------------------------------------------\n  // qrBitBuffer\n  //---------------------------------------------------------------------\n\n  var qrBitBuffer = function() {\n\n    var _buffer = [];\n    var _length = 0;\n\n    var _this = {};\n\n    _this.getBuffer = function() {\n      return _buffer;\n    };\n\n    _this.getAt = function(index) {\n      var bufIndex = Math.floor(index / 8);\n      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;\n    };\n\n    _this.put = function(num, length) {\n      for (var i = 0; i < length; i += 1) {\n        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);\n      }\n    };\n\n    _this.getLengthInBits = function() {\n      return _length;\n    };\n\n    _this.putBit = function(bit) {\n\n      var bufIndex = Math.floor(_length / 8);\n      if (_buffer.length <= bufIndex) {\n        _buffer.push(0);\n      }\n\n      if (bit) {\n        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );\n      }\n\n      _length += 1;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrNumber\n  //---------------------------------------------------------------------\n\n  var qrNumber = function(data) {\n\n    var _mode = QRMode.MODE_NUMBER;\n    var _data = data;\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return _data.length;\n    };\n\n    _this.write = function(buffer) {\n\n      var data = _data;\n\n      var i = 0;\n\n      while (i + 2 < data.length) {\n        buffer.put(strToNum(data.substring(i, i + 3) ), 10);\n        i += 3;\n      }\n\n      if (i < data.length) {\n        if (data.length - i == 1) {\n          buffer.put(strToNum(data.substring(i, i + 1) ), 4);\n        } else if (data.length - i == 2) {\n          buffer.put(strToNum(data.substring(i, i + 2) ), 7);\n        }\n      }\n    };\n\n    var strToNum = function(s) {\n      var num = 0;\n      for (var i = 0; i < s.length; i += 1) {\n        num = num * 10 + chatToNum(s.charAt(i) );\n      }\n      return num;\n    };\n\n    var chatToNum = function(c) {\n      if ('0' <= c && c <= '9') {\n        return c.charCodeAt(0) - '0'.charCodeAt(0);\n      }\n      throw 'illegal char :' + c;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrAlphaNum\n  //---------------------------------------------------------------------\n\n  var qrAlphaNum = function(data) {\n\n    var _mode = QRMode.MODE_ALPHA_NUM;\n    var _data = data;\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return _data.length;\n    };\n\n    _this.write = function(buffer) {\n\n      var s = _data;\n\n      var i = 0;\n\n      while (i + 1 < s.length) {\n        buffer.put(\n          getCode(s.charAt(i) ) * 45 +\n          getCode(s.charAt(i + 1) ), 11);\n        i += 2;\n      }\n\n      if (i < s.length) {\n        buffer.put(getCode(s.charAt(i) ), 6);\n      }\n    };\n\n    var getCode = function(c) {\n\n      if ('0' <= c && c <= '9') {\n        return c.charCodeAt(0) - '0'.charCodeAt(0);\n      } else if ('A' <= c && c <= 'Z') {\n        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;\n      } else {\n        switch (c) {\n        case ' ' : return 36;\n        case '$' : return 37;\n        case '%' : return 38;\n        case '*' : return 39;\n        case '+' : return 40;\n        case '-' : return 41;\n        case '.' : return 42;\n        case '/' : return 43;\n        case ':' : return 44;\n        default :\n          throw 'illegal char :' + c;\n        }\n      }\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qr8BitByte\n  //---------------------------------------------------------------------\n\n  var qr8BitByte = function(data) {\n\n    var _mode = QRMode.MODE_8BIT_BYTE;\n    var _data = data;\n    var _bytes = qrcode.stringToBytes(data);\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return _bytes.length;\n    };\n\n    _this.write = function(buffer) {\n      for (var i = 0; i < _bytes.length; i += 1) {\n        buffer.put(_bytes[i], 8);\n      }\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // qrKanji\n  //---------------------------------------------------------------------\n\n  var qrKanji = function(data) {\n\n    var _mode = QRMode.MODE_KANJI;\n    var _data = data;\n\n    var stringToBytes = qrcode.stringToBytesFuncs['SJIS'];\n    if (!stringToBytes) {\n      throw 'sjis not supported.';\n    }\n    !function(c, code) {\n      // self test for sjis support.\n      var test = stringToBytes(c);\n      if (test.length != 2 || ( (test[0] << 8) | test[1]) != code) {\n        throw 'sjis not supported.';\n      }\n    }('\\u53cb', 0x9746);\n\n    var _bytes = stringToBytes(data);\n\n    var _this = {};\n\n    _this.getMode = function() {\n      return _mode;\n    };\n\n    _this.getLength = function(buffer) {\n      return ~~(_bytes.length / 2);\n    };\n\n    _this.write = function(buffer) {\n\n      var data = _bytes;\n\n      var i = 0;\n\n      while (i + 1 < data.length) {\n\n        var c = ( (0xff & data[i]) << 8) | (0xff & data[i + 1]);\n\n        if (0x8140 <= c && c <= 0x9FFC) {\n          c -= 0x8140;\n        } else if (0xE040 <= c && c <= 0xEBBF) {\n          c -= 0xC140;\n        } else {\n          throw 'illegal char at ' + (i + 1) + '/' + c;\n        }\n\n        c = ( (c >>> 8) & 0xff) * 0xC0 + (c & 0xff);\n\n        buffer.put(c, 13);\n\n        i += 2;\n      }\n\n      if (i < data.length) {\n        throw 'illegal char at ' + (i + 1);\n      }\n    };\n\n    return _this;\n  };\n\n  //=====================================================================\n  // GIF Support etc.\n  //\n\n  //---------------------------------------------------------------------\n  // byteArrayOutputStream\n  //---------------------------------------------------------------------\n\n  var byteArrayOutputStream = function() {\n\n    var _bytes = [];\n\n    var _this = {};\n\n    _this.writeByte = function(b) {\n      _bytes.push(b & 0xff);\n    };\n\n    _this.writeShort = function(i) {\n      _this.writeByte(i);\n      _this.writeByte(i >>> 8);\n    };\n\n    _this.writeBytes = function(b, off, len) {\n      off = off || 0;\n      len = len || b.length;\n      for (var i = 0; i < len; i += 1) {\n        _this.writeByte(b[i + off]);\n      }\n    };\n\n    _this.writeString = function(s) {\n      for (var i = 0; i < s.length; i += 1) {\n        _this.writeByte(s.charCodeAt(i) );\n      }\n    };\n\n    _this.toByteArray = function() {\n      return _bytes;\n    };\n\n    _this.toString = function() {\n      var s = '';\n      s += '[';\n      for (var i = 0; i < _bytes.length; i += 1) {\n        if (i > 0) {\n          s += ',';\n        }\n        s += _bytes[i];\n      }\n      s += ']';\n      return s;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // base64EncodeOutputStream\n  //---------------------------------------------------------------------\n\n  var base64EncodeOutputStream = function() {\n\n    var _buffer = 0;\n    var _buflen = 0;\n    var _length = 0;\n    var _base64 = '';\n\n    var _this = {};\n\n    var writeEncoded = function(b) {\n      _base64 += String.fromCharCode(encode(b & 0x3f) );\n    };\n\n    var encode = function(n) {\n      if (n < 0) {\n        // error.\n      } else if (n < 26) {\n        return 0x41 + n;\n      } else if (n < 52) {\n        return 0x61 + (n - 26);\n      } else if (n < 62) {\n        return 0x30 + (n - 52);\n      } else if (n == 62) {\n        return 0x2b;\n      } else if (n == 63) {\n        return 0x2f;\n      }\n      throw 'n:' + n;\n    };\n\n    _this.writeByte = function(n) {\n\n      _buffer = (_buffer << 8) | (n & 0xff);\n      _buflen += 8;\n      _length += 1;\n\n      while (_buflen >= 6) {\n        writeEncoded(_buffer >>> (_buflen - 6) );\n        _buflen -= 6;\n      }\n    };\n\n    _this.flush = function() {\n\n      if (_buflen > 0) {\n        writeEncoded(_buffer << (6 - _buflen) );\n        _buffer = 0;\n        _buflen = 0;\n      }\n\n      if (_length % 3 != 0) {\n        // padding\n        var padlen = 3 - _length % 3;\n        for (var i = 0; i < padlen; i += 1) {\n          _base64 += '=';\n        }\n      }\n    };\n\n    _this.toString = function() {\n      return _base64;\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // base64DecodeInputStream\n  //---------------------------------------------------------------------\n\n  var base64DecodeInputStream = function(str) {\n\n    var _str = str;\n    var _pos = 0;\n    var _buffer = 0;\n    var _buflen = 0;\n\n    var _this = {};\n\n    _this.read = function() {\n\n      while (_buflen < 8) {\n\n        if (_pos >= _str.length) {\n          if (_buflen == 0) {\n            return -1;\n          }\n          throw 'unexpected end of file./' + _buflen;\n        }\n\n        var c = _str.charAt(_pos);\n        _pos += 1;\n\n        if (c == '=') {\n          _buflen = 0;\n          return -1;\n        } else if (c.match(/^\\s$/) ) {\n          // ignore if whitespace.\n          continue;\n        }\n\n        _buffer = (_buffer << 6) | decode(c.charCodeAt(0) );\n        _buflen += 6;\n      }\n\n      var n = (_buffer >>> (_buflen - 8) ) & 0xff;\n      _buflen -= 8;\n      return n;\n    };\n\n    var decode = function(c) {\n      if (0x41 <= c && c <= 0x5a) {\n        return c - 0x41;\n      } else if (0x61 <= c && c <= 0x7a) {\n        return c - 0x61 + 26;\n      } else if (0x30 <= c && c <= 0x39) {\n        return c - 0x30 + 52;\n      } else if (c == 0x2b) {\n        return 62;\n      } else if (c == 0x2f) {\n        return 63;\n      } else {\n        throw 'c:' + c;\n      }\n    };\n\n    return _this;\n  };\n\n  //---------------------------------------------------------------------\n  // gifImage (B/W)\n  //---------------------------------------------------------------------\n\n  var gifImage = function(width, height) {\n\n    var _width = width;\n    var _height = height;\n    var _data = new Array(width * height);\n\n    var _this = {};\n\n    _this.setPixel = function(x, y, pixel) {\n      _data[y * _width + x] = pixel;\n    };\n\n    _this.write = function(out) {\n\n      //---------------------------------\n      // GIF Signature\n\n      out.writeString('GIF87a');\n\n      //---------------------------------\n      // Screen Descriptor\n\n      out.writeShort(_width);\n      out.writeShort(_height);\n\n      out.writeByte(0x80); // 2bit\n      out.writeByte(0);\n      out.writeByte(0);\n\n      //---------------------------------\n      // Global Color Map\n\n      // black\n      out.writeByte(0x00);\n      out.writeByte(0x00);\n      out.writeByte(0x00);\n\n      // white\n      out.writeByte(0xff);\n      out.writeByte(0xff);\n      out.writeByte(0xff);\n\n      //---------------------------------\n      // Image Descriptor\n\n      out.writeString(',');\n      out.writeShort(0);\n      out.writeShort(0);\n      out.writeShort(_width);\n      out.writeShort(_height);\n      out.writeByte(0);\n\n      //---------------------------------\n      // Local Color Map\n\n      //---------------------------------\n      // Raster Data\n\n      var lzwMinCodeSize = 2;\n      var raster = getLZWRaster(lzwMinCodeSize);\n\n      out.writeByte(lzwMinCodeSize);\n\n      var offset = 0;\n\n      while (raster.length - offset > 255) {\n        out.writeByte(255);\n        out.writeBytes(raster, offset, 255);\n        offset += 255;\n      }\n\n      out.writeByte(raster.length - offset);\n      out.writeBytes(raster, offset, raster.length - offset);\n      out.writeByte(0x00);\n\n      //---------------------------------\n      // GIF Terminator\n      out.writeString(';');\n    };\n\n    var bitOutputStream = function(out) {\n\n      var _out = out;\n      var _bitLength = 0;\n      var _bitBuffer = 0;\n\n      var _this = {};\n\n      _this.write = function(data, length) {\n\n        if ( (data >>> length) != 0) {\n          throw 'length over';\n        }\n\n        while (_bitLength + length >= 8) {\n          _out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );\n          length -= (8 - _bitLength);\n          data >>>= (8 - _bitLength);\n          _bitBuffer = 0;\n          _bitLength = 0;\n        }\n\n        _bitBuffer = (data << _bitLength) | _bitBuffer;\n        _bitLength = _bitLength + length;\n      };\n\n      _this.flush = function() {\n        if (_bitLength > 0) {\n          _out.writeByte(_bitBuffer);\n        }\n      };\n\n      return _this;\n    };\n\n    var getLZWRaster = function(lzwMinCodeSize) {\n\n      var clearCode = 1 << lzwMinCodeSize;\n      var endCode = (1 << lzwMinCodeSize) + 1;\n      var bitLength = lzwMinCodeSize + 1;\n\n      // Setup LZWTable\n      var table = lzwTable();\n\n      for (var i = 0; i < clearCode; i += 1) {\n        table.add(String.fromCharCode(i) );\n      }\n      table.add(String.fromCharCode(clearCode) );\n      table.add(String.fromCharCode(endCode) );\n\n      var byteOut = byteArrayOutputStream();\n      var bitOut = bitOutputStream(byteOut);\n\n      // clear code\n      bitOut.write(clearCode, bitLength);\n\n      var dataIndex = 0;\n\n      var s = String.fromCharCode(_data[dataIndex]);\n      dataIndex += 1;\n\n      while (dataIndex < _data.length) {\n\n        var c = String.fromCharCode(_data[dataIndex]);\n        dataIndex += 1;\n\n        if (table.contains(s + c) ) {\n\n          s = s + c;\n\n        } else {\n\n          bitOut.write(table.indexOf(s), bitLength);\n\n          if (table.size() < 0xfff) {\n\n            if (table.size() == (1 << bitLength) ) {\n              bitLength += 1;\n            }\n\n            table.add(s + c);\n          }\n\n          s = c;\n        }\n      }\n\n      bitOut.write(table.indexOf(s), bitLength);\n\n      // end code\n      bitOut.write(endCode, bitLength);\n\n      bitOut.flush();\n\n      return byteOut.toByteArray();\n    };\n\n    var lzwTable = function() {\n\n      var _map = {};\n      var _size = 0;\n\n      var _this = {};\n\n      _this.add = function(key) {\n        if (_this.contains(key) ) {\n          throw 'dup key:' + key;\n        }\n        _map[key] = _size;\n        _size += 1;\n      };\n\n      _this.size = function() {\n        return _size;\n      };\n\n      _this.indexOf = function(key) {\n        return _map[key];\n      };\n\n      _this.contains = function(key) {\n        return typeof _map[key] != 'undefined';\n      };\n\n      return _this;\n    };\n\n    return _this;\n  };\n\n  var createDataURL = function(width, height, getPixel) {\n    var gif = gifImage(width, height);\n    for (var y = 0; y < height; y += 1) {\n      for (var x = 0; x < width; x += 1) {\n        gif.setPixel(x, y, getPixel(x, y) );\n      }\n    }\n\n    var b = byteArrayOutputStream();\n    gif.write(b);\n\n    var base64 = base64EncodeOutputStream();\n    var bytes = b.toByteArray();\n    for (var i = 0; i < bytes.length; i += 1) {\n      base64.writeByte(bytes[i]);\n    }\n    base64.flush();\n\n    return 'data:image/gif;base64,' + base64;\n  };\n\n  //---------------------------------------------------------------------\n  // returns qrcode function.\n\n  return qrcode;\n}();\n\n// multibyte support\n!function() {\n\n  qrcode.stringToBytesFuncs['UTF-8'] = function(s) {\n    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array\n    function toUTF8Array(str) {\n      var utf8 = [];\n      for (var i=0; i < str.length; i++) {\n        var charcode = str.charCodeAt(i);\n        if (charcode < 0x80) utf8.push(charcode);\n        else if (charcode < 0x800) {\n          utf8.push(0xc0 | (charcode >> 6),\n              0x80 | (charcode & 0x3f));\n        }\n        else if (charcode < 0xd800 || charcode >= 0xe000) {\n          utf8.push(0xe0 | (charcode >> 12),\n              0x80 | ((charcode>>6) & 0x3f),\n              0x80 | (charcode & 0x3f));\n        }\n        // surrogate pair\n        else {\n          i++;\n          // UTF-16 encodes 0x10000-0x10FFFF by\n          // subtracting 0x10000 and splitting the\n          // 20 bits of 0x0-0xFFFFF into two halves\n          charcode = 0x10000 + (((charcode & 0x3ff)<<10)\n            | (str.charCodeAt(i) & 0x3ff));\n          utf8.push(0xf0 | (charcode >>18),\n              0x80 | ((charcode>>12) & 0x3f),\n              0x80 | ((charcode>>6) & 0x3f),\n              0x80 | (charcode & 0x3f));\n        }\n      }\n      return utf8;\n    }\n    return toUTF8Array(s);\n  };\n\n}();\n\n(function (factory) {\n  if (typeof define === 'function' && define.amd) {\n      define([], factory);\n  } else if (typeof exports === 'object') {\n      module.exports = factory();\n  }\n}(function () {\n    return qrcode;\n}));\n//---------------------------------------------------------------------\n//\n// QR Code Generator for JavaScript UTF8 Support (optional)\n//\n// Copyright (c) 2011 Kazuhiko Arase\n//\n// URL: http://www.d-project.com/\n//\n// Licensed under the MIT license:\n//  http://www.opensource.org/licenses/mit-license.php\n//\n// The word 'QR Code' is registered trademark of\n// DENSO WAVE INCORPORATED\n//  http://www.denso-wave.com/qrcode/faqpatent-e.html\n//\n//---------------------------------------------------------------------\n\n!function(qrcode) {\n\n  //---------------------------------------------------------------------\n  // overwrite qrcode.stringToBytes\n  //---------------------------------------------------------------------\n\n  qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];\n\n}(qrcode);\n\n\n// ---------------------------------------------------------------------------\n// Draws QR modules for 'text' onto a <canvas>, entirely client-side.\n// ---------------------------------------------------------------------------\nfunction qrDrawToCanvas(canvas, text) {\n  var qr = qrcode(0, 'M');\n  qr.addData(text);\n  qr.make();\n  var count = qr.getModuleCount();\n  var quiet = 4;\n  var cell = Math.max(4, Math.floor(280 / (count + quiet * 2)));\n  var size = cell * (count + quiet * 2);\n  canvas.width = size;\n  canvas.height = size;\n  var ctx = canvas.getContext('2d');\n  ctx.imageSmoothingEnabled = false;\n  ctx.fillStyle = '#ffffff';\n  ctx.fillRect(0, 0, size, size);\n  ctx.fillStyle = '#000000';\n  for (var row = 0; row < count; row++) {\n    for (var col = 0; col < count; col++) {\n      if (qr.isDark(row, col)) {\n        ctx.fillRect((col + quiet) * cell, (row + quiet) * cell, cell, cell);\n      }\n    }\n  }\n}\n";

const QR_MODAL_CSS = "\n    .qr-modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 1000; align-items: center; justify-content: center; padding: 16px; }\n    .qr-modal-overlay.active { display: flex; }\n    .qr-modal { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 10px; width: 100%; max-width: 380px; max-height: 92vh; overflow-y: auto; padding: 18px; box-sizing: border-box; }\n    .qr-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }\n    .qr-modal-header h3 { margin: 0; font-size: 16px; color: var(--color-text); }\n    .qr-modal button { -webkit-appearance: none; appearance: none; }\n    .qr-modal-close { width: auto; flex-shrink: 0; background: none; border: none; cursor: pointer; color: var(--color-text-muted); padding: 4px; display: flex; }\n    .qr-modal-close:hover { color: var(--color-text); }\n    .qr-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--color-border); margin-bottom: 14px; }\n    .qr-tab { flex: 1; background: none; border: none; border-radius: 6px 6px 0 0; border-bottom: 2px solid transparent; padding: 8px 4px; font-size: 13px; font-weight: 500; color: var(--color-text-muted); cursor: pointer; }\n    .qr-tab:hover { color: var(--color-text); }\n    .qr-tab.active { color: var(--color-text); background: var(--color-border); border-bottom-color: var(--color-accent); font-weight: 700; }\n    .qr-panel { display: none; }\n    .qr-panel.active { display: block; }\n    .qr-hint { font-size: 12px; color: var(--color-text-muted); line-height: 1.5; margin: 0 0 12px; }\n    .qr-modal .form-group { margin-bottom: 10px; }\n    .qr-modal .form-group label { display: block; font-size: 12px; font-weight: 500; color: var(--color-text-muted); margin-bottom: 4px; }\n    .qr-modal .form-group input, .qr-modal .form-group textarea {\n      width: 100%; box-sizing: border-box; padding: 8px 10px; font-size: 14px;\n      border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-text); font-family: inherit;\n    }\n    .qr-modal .form-group textarea { resize: vertical; }\n    .qr-modal .form-group input:focus, .qr-modal .form-group textarea:focus { outline: none; border-color: var(--color-accent); }\n    .qr-generate-btn { width: 100%; padding: 10px; font-size: 14px; font-weight: 600; color: #fff; background: var(--color-accent); border: none; border-radius: 6px; cursor: pointer; margin-top: 4px; }\n    .qr-generate-btn:hover { background: var(--color-accent-hover); }\n    .qr-generate-btn:disabled { opacity: 0.6; cursor: default; }\n    .qr-error { font-size: 12px; color: #dc2626; margin-top: 8px; }\n    @media (prefers-color-scheme: dark) { .qr-error { color: #f87171; } }\n    .qr-existing-url { font-size: 13px; font-weight: 500; color: var(--color-accent); word-break: break-all; padding: 8px 10px; background: var(--color-border); border-radius: 6px; margin-bottom: 10px; }\n    .qr-link-btn { width: auto; flex-shrink: 0; background: none; border: none; color: var(--color-text-muted); font-size: 12px; text-decoration: underline; cursor: pointer; padding: 0; }\n    .qr-link-btn:hover { color: var(--color-accent); }\n    .qr-created-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 13px; }\n    .qr-created-row span { flex: 1; min-width: 0; word-break: break-all; color: var(--color-accent); font-weight: 500; }\n    .qr-result { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border); text-align: center; }\n    .qr-result canvas { max-width: 100%; height: auto; border: 1px solid var(--color-border); border-radius: 6px; }\n    .qr-result-actions { display: flex; gap: 8px; margin-top: 10px; }\n    .qr-result-actions button { flex: 1; padding: 8px; font-size: 13px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-text); cursor: pointer; }\n    .qr-result-actions button:hover { border-color: var(--color-accent); color: var(--color-accent); }\n    .qr-trigger-btn { display: inline-flex; align-items: center; gap: 6px; }\n";

const QR_MODAL_HTML = `
  <div class="qr-modal-overlay" id="qrModalOverlay">
    <div class="qr-modal">
      <div class="qr-modal-header">
        <h3>Generate QR Code</h3>
        <button class="qr-modal-close" id="qrModalCloseBtn" type="button" title="Close">${icons.x}</button>
      </div>
      <div class="qr-tabs">
        <button class="qr-tab active" id="qrTabBtnUrl" type="button" data-qrtab="url">Link</button>
        <button class="qr-tab" id="qrTabBtnEmail" type="button" data-qrtab="email">Email</button>
        <button class="qr-tab" id="qrTabBtnVcard" type="button" data-qrtab="vcard">Contact</button>
      </div>

      <div class="qr-panel active" id="qrPanelUrl">
        <div id="qrUrlExistingWrap" style="display:none">
          <p class="qr-hint">This QR encodes your existing short link. Scans are tracked automatically &mdash; clicks, referrer and country &mdash; just like any other visit to it.</p>
          <div class="qr-existing-url" id="qrExistingUrlText"></div>
          <button class="qr-link-btn" id="qrUseNewUrlBtn" type="button">Use a different URL instead</button>
        </div>
        <div id="qrUrlFormWrap">
          <p class="qr-hint">Creates a short link and encodes it. Scans are tracked &mdash; clicks, referrer and country &mdash; like any other short URL.</p>
          <div class="form-group">
            <label for="qrDestUrl">Destination URL</label>
            <input type="text" id="qrDestUrl" placeholder="https://example.com/page" spellcheck="false">
          </div>
          <div class="form-group">
            <label for="qrDestSlug">Custom slug (optional)</label>
            <input type="text" id="qrDestSlug" placeholder="Leave blank for random code" spellcheck="false">
          </div>
          <button type="button" class="qr-generate-btn" id="qrUrlGenerateBtn">Generate trackable QR</button>
          <div class="qr-error" id="qrUrlError" style="display:none"></div>
          <div class="qr-created-row" id="qrCreatedRow" style="display:none">
            <span id="qrCreatedUrlText"></span>
            <button class="qr-link-btn" id="qrCreatedCopyBtn" type="button">Copy</button>
          </div>
        </div>
      </div>

      <div class="qr-panel" id="qrPanelEmail">
        <p class="qr-hint">Not tracked &mdash; the phone opens its mail app directly and never touches this server.</p>
        <div class="form-group">
          <label for="qrEmailTo">To</label>
          <input type="email" id="qrEmailTo" placeholder="name@example.com" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrEmailSubject">Subject (optional)</label>
          <input type="text" id="qrEmailSubject" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrEmailBody">Body (optional)</label>
          <textarea id="qrEmailBody" rows="3" spellcheck="false"></textarea>
        </div>
        <button type="button" class="qr-generate-btn" id="qrEmailGenerateBtn">Generate QR</button>
        <div class="qr-error" id="qrEmailError" style="display:none"></div>
      </div>

      <div class="qr-panel" id="qrPanelVcard">
        <p class="qr-hint">Not tracked &mdash; the contact card is embedded directly in the QR code.</p>
        <div class="form-group">
          <label for="qrVcName">Full name</label>
          <input type="text" id="qrVcName" placeholder="Jane Doe" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcPhone">Phone (optional)</label>
          <input type="text" id="qrVcPhone" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcEmail">Email (optional)</label>
          <input type="email" id="qrVcEmail" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcOrg">Organization (optional)</label>
          <input type="text" id="qrVcOrg" spellcheck="false">
        </div>
        <div class="form-group">
          <label for="qrVcWebsite">Website (optional)</label>
          <input type="text" id="qrVcWebsite" placeholder="https://example.com" spellcheck="false">
        </div>
        <button type="button" class="qr-generate-btn" id="qrVcardGenerateBtn">Generate QR</button>
        <div class="qr-error" id="qrVcardError" style="display:none"></div>
      </div>

      <div class="qr-result" id="qrResultWrap" style="display:none">
        <canvas id="qrCanvas" width="280" height="280"></canvas>
        <div class="qr-result-actions">
          <button type="button" id="qrDownloadBtn">Download PNG</button>
          <button type="button" id="qrCopyDataBtn">Copy raw data</button>
        </div>
      </div>
    </div>
  </div>
`;

const QR_MODAL_JS = "\n// ---------------------------------------------------------------------------\n// QR Code modal: URL (trackable, reuses the shortener), Email & vCard\n// (untracked, encoded directly - nothing is sent to the server for those).\n// Requires a page-specific 'qrCreateShortLink(destUrl, customCode)' async\n// function to be defined for the \"Link\" tab's create-new flow.\n// ---------------------------------------------------------------------------\nvar qrRawData = '';\n\nfunction openQrModal(mode, prefill) {\n  var overlay = document.getElementById('qrModalOverlay');\n  overlay.classList.add('active');\n  document.getElementById('qrResultWrap').style.display = 'none';\n  document.getElementById('qrUrlError').style.display = 'none';\n  document.getElementById('qrEmailError').style.display = 'none';\n  document.getElementById('qrVcardError').style.display = 'none';\n  document.getElementById('qrCreatedRow').style.display = 'none';\n\n  if (prefill && prefill.shortUrl) {\n    document.getElementById('qrExistingUrlText').textContent = prefill.shortUrl;\n    document.getElementById('qrUrlExistingWrap').style.display = '';\n    document.getElementById('qrUrlFormWrap').style.display = 'none';\n    qrRenderResult(prefill.shortUrl);\n  } else {\n    document.getElementById('qrUrlExistingWrap').style.display = 'none';\n    document.getElementById('qrUrlFormWrap').style.display = '';\n    document.getElementById('qrDestUrl').value = '';\n    document.getElementById('qrDestSlug').value = '';\n  }\n\n  var defaultMode = (typeof qrCreateShortLink === 'function') ? 'url' : 'email';\n  qrSwitchTab(mode || defaultMode);\n}\n\nfunction closeQrModal() {\n  document.getElementById('qrModalOverlay').classList.remove('active');\n}\n\nfunction qrSwitchTab(mode) {\n  var tabs = { url: 'qrTabBtnUrl', email: 'qrTabBtnEmail', vcard: 'qrTabBtnVcard' };\n  var panels = { url: 'qrPanelUrl', email: 'qrPanelEmail', vcard: 'qrPanelVcard' };\n  Object.keys(tabs).forEach(function(key) {\n    document.getElementById(tabs[key]).classList.toggle('active', key === mode);\n    document.getElementById(panels[key]).classList.toggle('active', key === mode);\n  });\n}\n\nfunction qrRenderResult(text) {\n  qrRawData = text;\n  var canvas = document.getElementById('qrCanvas');\n  qrDrawToCanvas(canvas, text);\n  document.getElementById('qrResultWrap').style.display = '';\n}\n\nfunction qrVcardEscape(s) {\n  return String(s || '').replace(/\\\\/g, '\\\\\\\\').replace(/,/g, '\\\\,').replace(/;/g, '\\\\;').replace(/\\n/g, '\\\\n');\n}\n\nfunction qrBuildMailto(to, subject, body) {\n  var params = [];\n  if (subject) params.push('subject=' + encodeURIComponent(subject));\n  if (body) params.push('body=' + encodeURIComponent(body));\n  return 'mailto:' + to.trim() + (params.length ? '?' + params.join('&') : '');\n}\n\nfunction qrBuildVcard(fields) {\n  var lines = ['BEGIN:VCARD', 'VERSION:3.0'];\n  lines.push('N:;' + qrVcardEscape(fields.name) + ';;;');\n  lines.push('FN:' + qrVcardEscape(fields.name));\n  if (fields.org) lines.push('ORG:' + qrVcardEscape(fields.org));\n  if (fields.phone) lines.push('TEL;TYPE=CELL:' + qrVcardEscape(fields.phone));\n  if (fields.email) lines.push('EMAIL:' + qrVcardEscape(fields.email));\n  if (fields.website) lines.push('URL:' + qrVcardEscape(fields.website));\n  lines.push('END:VCARD');\n  return lines.join('\\r\\n');\n}\n\nfunction qrWireModal() {\n  if (typeof qrCreateShortLink !== 'function') {\n    document.getElementById('qrTabBtnUrl').style.display = 'none';\n  }\n  document.getElementById('qrModalCloseBtn').addEventListener('click', closeQrModal);\n  document.getElementById('qrModalOverlay').addEventListener('click', function(e) {\n    if (e.target === document.getElementById('qrModalOverlay')) closeQrModal();\n  });\n  document.addEventListener('keydown', function(e) {\n    if (e.key === 'Escape' && document.getElementById('qrModalOverlay').classList.contains('active')) closeQrModal();\n  });\n\n  ['qrTabBtnUrl', 'qrTabBtnEmail', 'qrTabBtnVcard'].forEach(function(id) {\n    document.getElementById(id).addEventListener('click', function() {\n      qrSwitchTab(this.getAttribute('data-qrtab'));\n    });\n  });\n\n  document.getElementById('qrUseNewUrlBtn').addEventListener('click', function() {\n    document.getElementById('qrUrlExistingWrap').style.display = 'none';\n    document.getElementById('qrUrlFormWrap').style.display = '';\n    document.getElementById('qrResultWrap').style.display = 'none';\n  });\n\n  document.getElementById('qrUrlGenerateBtn').addEventListener('click', async function() {\n    var btn = this;\n    var destUrl = document.getElementById('qrDestUrl').value.trim();\n    var slug = document.getElementById('qrDestSlug').value.trim();\n    var errEl = document.getElementById('qrUrlError');\n    errEl.style.display = 'none';\n    if (!destUrl) { errEl.textContent = 'Enter a URL to shorten.'; errEl.style.display = ''; return; }\n    btn.disabled = true;\n    btn.textContent = 'Generating\u2026';\n    try {\n      var shortUrl = await qrCreateShortLink(destUrl, slug);\n      document.getElementById('qrCreatedUrlText').textContent = shortUrl;\n      document.getElementById('qrCreatedRow').style.display = '';\n      qrRenderResult(shortUrl);\n    } catch (err) {\n      errEl.textContent = err.message || 'Failed to create short URL.';\n      errEl.style.display = '';\n    } finally {\n      btn.disabled = false;\n      btn.textContent = 'Generate trackable QR';\n    }\n  });\n\n  document.getElementById('qrCreatedCopyBtn').addEventListener('click', function() {\n    var url = document.getElementById('qrCreatedUrlText').textContent;\n    if (!url) return;\n    navigator.clipboard.writeText(url).then(function() {\n      document.getElementById('qrCreatedCopyBtn').textContent = 'Copied';\n      setTimeout(function() { document.getElementById('qrCreatedCopyBtn').textContent = 'Copy'; }, 2000);\n    });\n  });\n\n  document.getElementById('qrEmailGenerateBtn').addEventListener('click', function() {\n    var to = document.getElementById('qrEmailTo').value.trim();\n    var errEl = document.getElementById('qrEmailError');\n    errEl.style.display = 'none';\n    if (!to) { errEl.textContent = 'Enter a recipient email address.'; errEl.style.display = ''; return; }\n    var subject = document.getElementById('qrEmailSubject').value.trim();\n    var body = document.getElementById('qrEmailBody').value.trim();\n    qrRenderResult(qrBuildMailto(to, subject, body));\n  });\n\n  document.getElementById('qrVcardGenerateBtn').addEventListener('click', function() {\n    var name = document.getElementById('qrVcName').value.trim();\n    var errEl = document.getElementById('qrVcardError');\n    errEl.style.display = 'none';\n    if (!name) { errEl.textContent = 'Enter a full name.'; errEl.style.display = ''; return; }\n    qrRenderResult(qrBuildVcard({\n      name: name,\n      phone: document.getElementById('qrVcPhone').value.trim(),\n      email: document.getElementById('qrVcEmail').value.trim(),\n      org: document.getElementById('qrVcOrg').value.trim(),\n      website: document.getElementById('qrVcWebsite').value.trim()\n    }));\n  });\n\n  document.getElementById('qrDownloadBtn').addEventListener('click', function() {\n    var canvas = document.getElementById('qrCanvas');\n    var link = document.createElement('a');\n    link.download = 'qr-code.png';\n    link.href = canvas.toDataURL('image/png');\n    link.click();\n  });\n\n  document.getElementById('qrCopyDataBtn').addEventListener('click', function() {\n    if (!qrRawData) return;\n    navigator.clipboard.writeText(qrRawData).then(function() {\n      var btn = document.getElementById('qrCopyDataBtn');\n      btn.textContent = 'Copied';\n      setTimeout(function() { btn.textContent = 'Copy raw data'; }, 2000);\n    });\n  });\n}\n\nfunction openQrModalForUrl(fullUrl) {\n  openQrModal('url', { shortUrl: fullUrl });\n}\n\nqrWireModal();\n";

// ---------------------------------------------------------------------------
// Guide page HTML
// ---------------------------------------------------------------------------
const guideHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup Guide - URL Shortener</title>
    <link rel="icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon.ico">
    <link rel="apple-touch-icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/apple-touch-icon.png">
    <meta name="theme-color" content="#e73b42">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #fdfdfd;
            --color-text: #353535;
            --color-accent: #e73b42;
            --color-accent-hover: #d12d34;
            --color-surface: #f5f5f5;
            --color-border: #e0e0e0;
            --color-text-muted: #7d7d7d;
            --font-primary: 'Inter', sans-serif;
            --font-mono: 'Source Code Pro', monospace;
        }
        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg: #231f1f;
                --color-text: #d9d4d4;
                --color-accent: #ff6b7a;
                --color-accent-hover: #ff8590;
                --color-surface: #2b2626;
                --color-border: #3b3636;
                --color-text-muted: #b9b4b4;
            }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-primary), -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            line-height: 1.7;
            padding: 24px;
        }
        .container { max-width: 780px; margin: 0 auto; }
        .back-link {
            display: inline-flex; align-items: center; gap: 6px;
            color: var(--color-accent); text-decoration: none; font-weight: 500; font-size: 14px;
            margin-bottom: 24px;
        }
        .back-link:hover { color: var(--color-accent-hover); }
        .back-link svg { flex-shrink: 0; }
        h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
        h1 svg { color: var(--color-accent); flex-shrink: 0; }
        .subtitle { color: var(--color-text-muted); margin-bottom: 32px; }
        .guide-section {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 10px;
            padding: 24px;
            margin-bottom: 20px;
        }
        .guide-section h2 {
            font-size: 18px; font-weight: 600; margin-bottom: 16px;
            display: flex; align-items: center; gap: 8px;
        }
        .guide-section h2 svg { color: var(--color-accent); flex-shrink: 0; }
        .guide-section h3 { font-size: 15px; font-weight: 600; margin: 16px 0 8px; }
        .guide-section p, .guide-section li { font-size: 14px; line-height: 1.7; }
        .guide-section ul, .guide-section ol { padding-left: 20px; margin: 8px 0; }
        .guide-section li { margin-bottom: 6px; }
        pre {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            border-radius: 6px;
            padding: 14px;
            overflow-x: auto;
            font-family: var(--font-mono);
            font-size: 13px;
            line-height: 1.5;
            margin: 10px 0;
        }
        code {
            font-family: var(--font-mono);
            font-size: 13px;
            background: var(--color-bg);
            padding: 2px 5px;
            border-radius: 3px;
            border: 1px solid var(--color-border);
        }
        pre code { background: none; border: none; padding: 0; }
        .step-number {
            display: inline-flex; align-items: center; justify-content: center;
            width: 22px; height: 22px; border-radius: 50%;
            background: var(--color-accent); color: white;
            font-size: 12px; font-weight: 600; flex-shrink: 0;
        }
        .step { display: flex; gap: 10px; margin-bottom: 12px; align-items: flex-start; }
        .step p { margin: 0; }
        .note {
            background: var(--color-bg);
            border-left: 3px solid var(--color-accent);
            padding: 10px 14px;
            font-size: 13px;
            border-radius: 0 6px 6px 0;
            margin: 12px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="/admin" class="back-link">${icons.arrowLeft} Back to Admin</a>
        <h1>${icons.book} Setup Guide</h1>
        <p class="subtitle">How to shorten URLs from anywhere &mdash; your phone, browser, or code.</p>

        <div class="guide-section">
            <h2>${icons.smartphone} iOS / iPadOS Share Sheet</h2>
            <p>Add a <strong>Shorten URL</strong> action to the iOS Share Sheet using Apple Shortcuts.</p>

            <h3>Build the Shortcut</h3>
            <div class="step"><span class="step-number">1</span><p>Open the <strong>Shortcuts</strong> app and tap <strong>+</strong>. Name it <strong>Shorten URL</strong>.</p></div>
            <div class="step"><span class="step-number">2</span><p>Add <strong>Receive What's Shared</strong>. Set accepted types to <em>URLs</em> and <em>Safari Web Pages</em>.</p></div>
            <div class="step"><span class="step-number">3</span><p>Add <strong>Get Contents of URL</strong>. Set URL to <code>https://chom.pm/api/shorten</code>, Method to <code>POST</code>, Request Body to <code>JSON</code>. Add key <code>url</code> with value <em>Shortcut Input</em>. Add headers: <code>Content-Type</code> = <code>application/json</code> and <code>X-API-Key</code> = your API key.</p></div>
            <div class="step"><span class="step-number">4</span><p>Add <strong>Get Dictionary Value</strong>. Key: <code>shortUrl</code>, Dictionary: <em>Contents of URL</em>.</p></div>
            <div class="step"><span class="step-number">5</span><p>Add <strong>Copy to Clipboard</strong> with input set to <em>Dictionary Value</em>.</p></div>
            <div class="step"><span class="step-number">6</span><p>(Optional) Add <strong>Show Notification</strong> &mdash; Title: <em>URL Shortened</em>, Body: <em>Dictionary Value</em>.</p></div>

            <h3>Enable Share Sheet</h3>
            <p>Open the shortcut details and enable <strong>Show in Share Sheet</strong>. Under Share Sheet types keep <em>URLs</em> and <em>Safari Web Pages</em>.</p>

            <h3>Usage</h3>
            <p>Tap Share on any page &rarr; choose <strong>Shorten URL</strong> &rarr; the short link is copied to your clipboard.</p>

            <div class="note"><strong>Tip:</strong> To allow custom short codes, add an <strong>Ask for Input</strong> action before step 3 and pass the result as the <code>shortCode</code> JSON key.</div>

            <div class="note"><strong>Titles:</strong> To set a title, add <strong>Get Name of Shortcut Input</strong> before step 3 to get the page title. Pass it as the <code>title</code> JSON key alongside <code>url</code>. You can also add an <strong>Ask for Input</strong> to let yourself edit the title before saving.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.chrome} Chrome Extension</h2>
            <p>Install the bundled extension for one-click shortening, context menus, and keyboard shortcuts.</p>

            <h3>Install</h3>
            <div class="step"><span class="step-number">1</span><p>Open <code>chrome://extensions</code> in Chrome.</p></div>
            <div class="step"><span class="step-number">2</span><p>Enable <strong>Developer mode</strong> (toggle in top-right).</p></div>
            <div class="step"><span class="step-number">3</span><p>Click <strong>Load unpacked</strong> and select the <code>chrome-extension/</code> folder from this repo.</p></div>
            <div class="step"><span class="step-number">4</span><p>Pin the extension in the toolbar. Click it, open <strong>Settings</strong>, paste your API key, and save.</p></div>

            <h3>Usage</h3>
            <ul>
                <li><strong>Click the toolbar icon</strong> &mdash; shortens the current page, copies to clipboard.</li>
                <li><strong>Right-click a page</strong> &rarr; <em>Shorten this URL</em>.</li>
                <li><strong>Right-click any link</strong> &rarr; shortens that link directly.</li>
                <li><strong>Keyboard shortcut:</strong> <code>Ctrl+Shift+S</code> (Windows/Linux) or <code>Cmd+Shift+S</code> (macOS).</li>
            </ul>
            <div class="note"><strong>Titles:</strong> The extension automatically sends the page title. You can edit it in the popup before shortening, or later from the admin panel.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.bookmark} Browser Bookmarklet</h2>
            <p>A universal one-click solution that works in any browser &mdash; no install required.</p>

            <h3>Setup</h3>
            <div class="step"><span class="step-number">1</span><p>Copy the code below and <strong>replace <code>YOUR-API-KEY</code></strong> with your actual key.</p></div>
            <pre><code>javascript:(function(){const url=window.location.href;const title=document.title;const apiKey='YOUR-API-KEY';const domain='https://chom.pm';fetch(domain+'/api/shorten',{method:'POST',headers:{'X-API-Key':apiKey,'Content-Type':'application/json'},body:JSON.stringify({url:url,title:title})}).then(r=>r.json()).then(d=>{if(d.success){navigator.clipboard.writeText(d.shortUrl);alert('Short URL copied!\\n'+d.shortUrl);}else{alert('Error: '+d.error);}}).catch(e=>alert('Network error: '+e.message));})();</code></pre>
            <div class="step"><span class="step-number">2</span><p>Create a new bookmark in your browser. Set the <strong>Name</strong> to <em>Shorten URL</em> and paste the code as the <strong>URL</strong>.</p></div>

            <h3>Usage</h3>
            <p>Navigate to any page and click the bookmark. The short URL is created and copied to your clipboard.</p>

            <div class="note"><strong>Custom codes &amp; titles:</strong> The bookmarklet automatically captures the page title. For a version that also prompts for a custom short code, add <code>const code=prompt('Custom code (blank for random):');</code> and include <code>shortCode:code</code> in the JSON body. You can edit titles later from the admin panel.</div>

            <div class="note"><strong>Security:</strong> Your API key is visible in the bookmark. This is fine for personal use on your own devices &mdash; don't share the bookmark itself.</div>
        </div>

        <div class="guide-section">
            <h2>${icons.code} API</h2>
            <p>Shorten URLs programmatically from any language or tool.</p>

            <h3>Endpoint</h3>
            <pre><code>POST https://chom.pm/api/shorten</code></pre>

            <h3>Headers</h3>
            <pre><code>Content-Type: application/json
X-API-Key: YOUR-API-KEY</code></pre>

            <h3>Request body</h3>
            <pre><code>{
  "url": "https://example.com/long/url",
  "title": "Optional page title",
  "shortCode": "optional-custom-code"
}</code></pre>

            <h3>Response</h3>
            <pre><code>{
  "success": true,
  "shortCode": "abc123",
  "url": "https://example.com/long/url",
  "title": "Optional page title",
  "shortUrl": "https://chom.pm/abc123"
}</code></pre>

            <h3>cURL example</h3>
            <pre><code>curl -X POST https://chom.pm/api/shorten \\
  -H "X-API-Key: YOUR-API-KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'</code></pre>

            <h3>JavaScript example</h3>
            <pre><code>const res = await fetch('https://chom.pm/api/shorten', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR-API-KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://example.com' }),
});
const data = await res.json();
console.log(data.shortUrl);</code></pre>

            <h3>Python example</h3>
            <pre><code>import requests

resp = requests.post(
    'https://chom.pm/api/shorten',
    headers={
        'X-API-Key': 'YOUR-API-KEY',
        'Content-Type': 'application/json',
    },
    json={'url': 'https://example.com'},
)
print(resp.json()['shortUrl'])</code></pre>

            <h3>Shell alias</h3>
            <pre><code># Add to ~/.bashrc or ~/.zshrc
shorten() {
  curl -s -X POST https://chom.pm/api/shorten \\
    -H "X-API-Key: YOUR-API-KEY" \\
    -H "Content-Type: application/json" \\
    -d "{\\\"url\\\":\\\"$1\\\"}" | jq -r '.shortUrl'
}
# Usage:  shorten "https://example.com"</code></pre>

            <div class="note"><strong>Parameters:</strong> <code>url</code> (required) must start with <code>http://</code> or <code>https://</code>. <code>title</code> (optional) a label for the URL, up to 200 characters. <code>shortCode</code> (optional) must be 3-20 characters: letters, numbers, underscore, or hyphen.</div>
        </div>
    </div>
</body>
</html>`;

// ---------------------------------------------------------------------------
// URL Cleaner / Stripper page HTML
// ---------------------------------------------------------------------------
const urlCleanerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>URL Strip</title>
  <link rel="icon" href="/clean/favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="/clean/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/clean/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/clean/apple-touch-icon.png">
  <link rel="manifest" href="/clean/manifest.json">
  <meta name="theme-color" content="#e73b42">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="URL Strip">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-bg: #fdfdfd;
      --color-text: #353535;
      --color-accent: #e73b42;
      --color-accent-hover: #d12d34;
      --color-surface: #f5f5f5;
      --color-border: #e0e0e0;
      --color-text-muted: #7d7d7d;
      --color-text-light: #9d9d9d;
      --font-primary: 'Inter', sans-serif;
      --font-fallback: 'Source Sans 3', sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #231f1f;
        --color-text: #d9d4d4;
        --color-accent: #ff6b7a;
        --color-accent-hover: #ff8590;
        --color-surface: #2b2626;
        --color-border: #3b3636;
        --color-text-muted: #b9b4b4;
        --color-text-light: #948f8f;
      }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-primary), var(--font-fallback), -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      line-height: 1.7;
    }
    .container {
      background: var(--color-surface);
      border-radius: 12px;
      border: 1px solid var(--color-border);
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      max-width: 680px;
      width: 100%;
      padding: 40px;
    }
    .page-header { margin-bottom: 28px; }
    .title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
    h1 { font-size: 26px; font-weight: 700; color: var(--color-text); line-height: 1.2; }
    h1 span { color: var(--color-accent); }
    .subtitle { font-size: 13px; color: var(--color-text-muted); margin-top: 6px; }
    .settings-toggle {
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      color: var(--color-text-muted);
      font-family: var(--font-primary), sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 6px 12px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
      white-space: nowrap;
      flex-shrink: 0;
      width: auto;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .settings-toggle:hover { border-color: var(--color-accent); color: var(--color-accent); transform: none; }
    .form-group { margin-bottom: 20px; }
    label {
      display: block;
      margin-bottom: 6px;
      color: var(--color-text);
      font-weight: 500;
      font-size: 14px;
    }
    textarea {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid var(--color-border);
      border-radius: 6px;
      font-size: 14px;
      font-family: var(--font-primary), var(--font-fallback), sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      transition: border-color 0.2s;
      outline: none;
      resize: vertical;
      min-height: 100px;
      line-height: 1.6;
    }
    textarea:focus { border-color: var(--color-accent); }
    textarea::placeholder { color: var(--color-text-light); }
    .paste-hint { font-size: 12px; color: var(--color-text-light); text-align: right; margin-top: 6px; margin-bottom: 16px; }
    button {
      width: 100%;
      padding: 12px;
      background: var(--color-accent);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      font-family: var(--font-primary), var(--font-fallback), sans-serif;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s, opacity 0.2s;
    }
    button:hover { background: var(--color-accent-hover); transform: translateY(-1px); }
    button:active { transform: translateY(0); }
    button:disabled { opacity: 0.4; cursor: default; transform: none; }
    .result-box {
      margin-top: 24px;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      overflow: hidden;
    }
    .result-header {
      padding: 10px 16px;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-muted);
    }
    .status-badge {
      font-size: 12px;
      font-weight: 600;
      color: #16a34a;
      background: #dcfce7;
      padding: 2px 8px;
      border-radius: 99px;
    }
    @media (prefers-color-scheme: dark) {
      .status-badge { color: #4ade80; background: rgba(74,222,128,0.12); }
    }
    .result-url {
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.7;
      word-break: break-all;
      color: var(--color-text);
      user-select: all;
      cursor: text;
      border-bottom: 1px solid var(--color-border);
    }
    .result-footer {
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .removed-tags { display: flex; flex-wrap: wrap; gap: 6px; flex: 1; min-width: 0; }
    .removed-tag {
      font-size: 11px;
      font-weight: 500;
      background: rgba(231,59,66,0.08);
      color: var(--color-accent);
      padding: 2px 7px;
      border-radius: 99px;
      border: 1px solid rgba(231,59,66,0.2);
    }
    @media (prefers-color-scheme: dark) {
      .removed-tag { background: rgba(255,107,122,0.1); border-color: rgba(255,107,122,0.25); }
    }
    .no-params-text { font-size: 13px; color: var(--color-text-light); }
    .action-btns { display: flex; gap: 8px; flex-shrink: 0; }
    .btn-sm {
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 500;
      width: auto;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .btn-copy { background: var(--color-accent); color: white; border: none; }
    .btn-copy:hover { background: var(--color-accent-hover); }
    .btn-copy.copied { background: #16a34a; transform: none; }
    .error-note { padding: 12px 16px; font-size: 13px; color: #dc2626; }
    @media (prefers-color-scheme: dark) { .error-note { color: #f87171; } }
    .btn-trace { background: var(--color-bg); color: var(--color-text-muted); border: 1px solid var(--color-border); }
    .btn-trace:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-bg); }
    .btn-trace.loading { opacity: 0.6; cursor: default; transform: none; }
    .peek-section { border-top: 1px solid var(--color-border); }
    .peek-chain { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
    .peek-hop { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; }
    .peek-hop-num { font-size: 11px; font-weight: 600; color: var(--color-text-muted); width: 20px; flex-shrink: 0; padding-top: 3px; }
    .peek-status { font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 99px; flex-shrink: 0; margin-top: 1px; }
    .peek-status-3xx { color: #92400e; background: #fef3c7; }
    .peek-status-2xx { color: #166534; background: #dcfce7; }
    .peek-status-err { color: #7f1d1d; background: #fef2f2; }
    @media (prefers-color-scheme: dark) {
      .peek-status-3xx { color: #fbbf24; background: rgba(251,191,36,0.12); }
      .peek-status-2xx { color: #4ade80; background: rgba(74,222,128,0.12); }
      .peek-status-err { color: #f87171; background: rgba(248,113,113,0.1); }
    }
    .peek-hop-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
    .peek-hop-url { word-break: break-all; color: var(--color-text); line-height: 1.5; }
    .peek-hop.is-final .peek-hop-url { font-weight: 600; color: var(--color-accent); }
    .peek-hop-actions { display: flex; gap: 6px; flex-wrap: wrap; }
    .peek-action-btn {
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      width: auto;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
    }
    .peek-action-btn.copy { background: var(--color-surface); color: var(--color-text-muted); border: 1px solid var(--color-border); }
    .peek-action-btn.copy:hover { border-color: var(--color-accent); color: var(--color-accent); background: var(--color-surface); transform: none; }
    .peek-action-btn.copy.copied { color: #16a34a; border-color: #16a34a; background: var(--color-surface); transform: none; }
    .peek-msg { padding: 12px 16px; font-size: 13px; color: var(--color-text-muted); }
    .peek-error { padding: 12px 16px; font-size: 13px; color: #dc2626; }
    @media (prefers-color-scheme: dark) { .peek-error { color: #f87171; } }
    .peek-cleaned-section {
      border-top: 1px solid var(--color-border);
      background: var(--color-surface);
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .peek-cleaned-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); }
    .peek-cleaned-url { font-size: 13px; word-break: break-all; color: var(--color-text); }
    .peek-cleaned-removed { display: flex; flex-wrap: wrap; gap: 5px; }
    .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .label-row label { margin-bottom: 0; }
    .clear-btn {
      width: auto;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      background: transparent;
      color: var(--color-text-muted);
      border: 1px solid var(--color-border);
      border-radius: 5px;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;
    }
    .clear-btn:hover { border-color: #dc2626; color: #dc2626; background: transparent; transform: none; }
    @media (prefers-color-scheme: dark) { .clear-btn:hover { border-color: #f87171; color: #f87171; } }
${QR_MODAL_CSS}
  </style>
</head>
<body>
  <div class="container">
    <div class="page-header">
      <div class="title-row">
        <h1>URL<span>.</span>STRIP</h1>
        <button class="settings-toggle" id="qrModalOpenBtn" type="button">${icons.qrCode} QR Code</button>
      </div>
      <p class="subtitle">Remove tracking parameters from a URL</p>
    </div>

    <div class="form-group">
      <div class="label-row">
        <label for="urlInput">URL to clean</label>
        <button class="clear-btn" id="clearBtn" style="display:none">Clear</button>
      </div>
      <textarea id="urlInput" placeholder="Paste a URL here&#8230;" spellcheck="false"></textarea>
      <div class="paste-hint">&#8984; / Ctrl + Enter to clean</div>
    </div>

    <button id="cleanBtn" disabled>Strip It</button>

    <div class="result-box" id="resultBox" style="display:none">
      <div class="result-header">
        <span>Cleaned URL</span>
        <span class="status-badge" id="resultStatus" style="display:none"></span>
      </div>
      <div class="error-note" id="resultError" style="display:none"></div>
      <div class="result-url" id="resultUrl" style="display:none"></div>
      <div class="result-footer" id="resultActions" style="display:none">
        <div class="removed-tags" id="removedList"></div>
        <div class="action-btns">
          <button class="btn-sm btn-copy" id="copyBtn">Copy</button>
          <button class="btn-sm btn-trace" id="traceBtn" style="display:none">Trace</button>
        </div>
      </div>
      <div class="peek-section" id="peekSection" style="display:none">
        <div id="peekContent"></div>
      </div>
    </div>
  </div>
${QR_MODAL_HTML}

  <script>
${QR_LIB_JS}
${QR_MODAL_JS}
    var TRACKING_PARAMS = new Set([
      "utm_source","utm_medium","utm_campaign","utm_term","utm_content",
      "utm_id","utm_source_platform","utm_campaign_id","utm_creative_format",
      "utm_marketing_tactic",
      "_kx","uid","campaign_id",
      "fbclid","fb_action_ids","fb_action_types","fb_source","fb_ref",
      "gclid","gclsrc","dclid","gbraid","wbraid",
      "msclkid",
      "twclid",
      "hsa_acc","hsa_cam","hsa_grp","hsa_ad","hsa_src","hsa_tgt",
      "hsa_kw","hsa_mt","hsa_net","hsa_ver","hsa_la",
      "mc_cid","mc_eid",
      "mkt_tok",
      "messageId",
      "ref","referrer","source","campaign","trk","trkinfo",
      "igshid","s_cid","ncid","cid","eid","mid",
      "clickid","click_id","track","tracking",
      "affiliate","aff_id","partner_id",
      "zanpid","origin","sxsrf"
    ]);

    function cleanUrl(raw) {
      var trimmed = raw.trim();
      if (!trimmed) return { cleaned: "", removed: [] };
      var url;
      try { url = new URL(trimmed); } catch(e) { return { cleaned: trimmed, removed: [], error: "Not a valid URL" }; }
      var removed = [];
      var toDelete = [];
      url.searchParams.forEach(function(v, key) {
        if (TRACKING_PARAMS.has(key.toLowerCase())) { toDelete.push(key); removed.push(key); }
      });
      toDelete.forEach(function(k) { url.searchParams.delete(k); });
      var cleaned = url.toString();
      if (url.searchParams.size === 0) cleaned = cleaned.replace(/[?]$/, "");
      return { cleaned: cleaned, removed: removed };
    }

    async function peekUrl(targetUrl) {
      var endpoint = "/api/peek?url=" + encodeURIComponent(targetUrl);
      var res = await fetch(endpoint, { method: "GET" });
      var data = await res.json();
      if (!data.success) throw new Error(data.error || "HTTP " + res.status);
      return data;
    }

    var result = null;
    var peekData = null;
    var peeking = false;
    var peekError = null;

    function g(id) { return document.getElementById(id); }
    function show(el) { el.style.display = ""; }
    function hide(el) { el.style.display = "none"; }

    function updateCleanBtn() {
      var hasInput = !!g("urlInput").value.trim();
      g("cleanBtn").disabled = !hasInput;
      if (hasInput) { show(g("clearBtn")); } else { hide(g("clearBtn")); }
    }

    function doClear() {
      g("urlInput").value = "";
      result = null;
      peekData = null; peekError = null; peeking = false;
      g("cleanBtn").disabled = true;
      hide(g("clearBtn"));
      renderResult();
    }

    function renderResult() {
      if (!result) { hide(g("resultBox")); return; }
      show(g("resultBox"));

      if (result.error) {
        g("resultError").textContent = result.error;
        show(g("resultError"));
        hide(g("resultUrl"));
        hide(g("resultActions"));
        hide(g("peekSection"));
        hide(g("resultStatus"));
        return;
      }

      hide(g("resultError"));
      g("resultUrl").textContent = result.cleaned;
      show(g("resultUrl"));
      show(g("resultActions"));

      var statusEl = g("resultStatus");
      if (result.removed.length === 0) {
        statusEl.textContent = "Already clean";
      } else {
        statusEl.textContent = result.removed.length + " param" + (result.removed.length !== 1 ? "s" : "") + " removed";
      }
      show(statusEl);

      var rl = g("removedList");
      if (result.removed.length > 0) {
        rl.innerHTML = result.removed.map(function(p) { return "<span class='removed-tag'>" + p + "</span>"; }).join("");
      } else {
        rl.innerHTML = "<span class='no-params-text'>No tracking params found</span>";
      }

      show(g("traceBtn"));
      renderPeek();
    }

    function statusClass(s) {
      if (!s || s === 0) return "peek-status-err";
      if (s >= 300 && s < 400) return "peek-status-3xx";
      if (s >= 200 && s < 300) return "peek-status-2xx";
      return "peek-status-err";
    }

    function renderPeek() {
      var section = g("peekSection");
      var content = g("peekContent");
      if (!peekData && !peeking && !peekError) { hide(section); return; }
      show(section);

      if (peeking) {
        content.innerHTML = "<div class='peek-msg'>Tracing redirects…</div>";
        return;
      }
      if (peekError) {
        content.innerHTML = "<div class='peek-error'>Trace failed: " + peekError + "</div>";
        return;
      }

      var chain = peekData.chain;
      if (!chain || chain.length === 0) {
        content.innerHTML = "<div class='peek-msg'>No redirect data returned.</div>";
        return;
      }
      if (chain.length === 1 && chain[0].status >= 200 && chain[0].status < 300) {
        content.innerHTML = "<div class='peek-msg'>No redirects — direct link (HTTP " + chain[0].status + ")</div>";
        return;
      }

      // Build DOM nodes so we can attach event listeners without inline handlers
      var chainDiv = document.createElement("div");
      chainDiv.className = "peek-chain";

      chain.forEach(function(hop, i) {
        var isFinal = (i === chain.length - 1);
        var sc = statusClass(hop.status);
        var label = hop.status ? String(hop.status) : (hop.note === "loop" ? "LOOP" : "ERR");

        var hopDiv = document.createElement("div");
        hopDiv.className = "peek-hop" + (isFinal ? " is-final" : "");

        var numEl = document.createElement("span");
        numEl.className = "peek-hop-num";
        numEl.textContent = String(i + 1);

        var statusEl = document.createElement("span");
        statusEl.className = "peek-status " + sc;
        statusEl.textContent = label;

        var mainDiv = document.createElement("div");
        mainDiv.className = "peek-hop-main";

        var urlEl = document.createElement("span");
        urlEl.className = "peek-hop-url";
        urlEl.textContent = hop.url;

        var actionsDiv = document.createElement("div");
        actionsDiv.className = "peek-hop-actions";

        var copyBtn = document.createElement("button");
        copyBtn.className = "peek-action-btn copy";
        copyBtn.textContent = "Copy";
        (function(btn, url) {
          btn.addEventListener("click", function() {
            navigator.clipboard.writeText(url).then(function() {
              btn.textContent = "✓ Copied";
              btn.classList.add("copied");
              setTimeout(function() { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
            });
          });
        })(copyBtn, hop.url);
        actionsDiv.appendChild(copyBtn);

        mainDiv.appendChild(urlEl);
        mainDiv.appendChild(actionsDiv);
        hopDiv.appendChild(numEl);
        hopDiv.appendChild(statusEl);
        hopDiv.appendChild(mainDiv);
        chainDiv.appendChild(hopDiv);
      });

      content.innerHTML = "";
      content.appendChild(chainDiv);

      // If the final URL still has tracking params, show the cleaned version
      var finalUrl = peekData.finalUrl;
      if (finalUrl) {
        var finalCleaned = cleanUrl(finalUrl);
        if (finalCleaned.removed.length > 0) {
          var cleanedSection = document.createElement("div");
          cleanedSection.className = "peek-cleaned-section";

          var cleanedLabel = document.createElement("div");
          cleanedLabel.className = "peek-cleaned-label";
          cleanedLabel.textContent = "Cleaned endpoint";
          cleanedSection.appendChild(cleanedLabel);

          var cleanedUrl = document.createElement("div");
          cleanedUrl.className = "peek-cleaned-url";
          cleanedUrl.textContent = finalCleaned.cleaned;
          cleanedSection.appendChild(cleanedUrl);

          var removedDiv = document.createElement("div");
          removedDiv.className = "peek-cleaned-removed";
          finalCleaned.removed.forEach(function(p) {
            var tag = document.createElement("span");
            tag.className = "removed-tag";
            tag.textContent = p;
            removedDiv.appendChild(tag);
          });
          cleanedSection.appendChild(removedDiv);

          var cleanedActions = document.createElement("div");
          cleanedActions.className = "peek-hop-actions";

          var copyCleanedBtn = document.createElement("button");
          copyCleanedBtn.className = "peek-action-btn copy";
          copyCleanedBtn.textContent = "Copy";
          (function(btn, url) {
            btn.addEventListener("click", function() {
              navigator.clipboard.writeText(url).then(function() {
                btn.textContent = "✓ Copied"; btn.classList.add("copied");
                setTimeout(function() { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 2000);
              });
            });
          })(copyCleanedBtn, finalCleaned.cleaned);
          cleanedActions.appendChild(copyCleanedBtn);

          cleanedSection.appendChild(cleanedActions);
          content.appendChild(cleanedSection);
        }
      }
    }

    function doClean() {
      var input = g("urlInput").value;
      if (!input.trim()) return;
      result = cleanUrl(input);
      peekData = null;
      peekError = null;
      peeking = false;
      g("copyBtn").textContent = "Copy";
      g("copyBtn").classList.remove("copied");
      renderResult();
    }

    g("urlInput").addEventListener("input", updateCleanBtn);
    g("urlInput").addEventListener("keydown", function(e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) doClean();
    });
    g("urlInput").addEventListener("paste", function(e) {
      var pasted = e.clipboardData.getData("text");
      if (pasted.trim()) {
        setTimeout(function() {
          g("urlInput").value = pasted.trim();
          updateCleanBtn();
          result = cleanUrl(pasted.trim());
          peekData = null;
          peekError = null;
          peeking = false;
          g("copyBtn").textContent = "Copy";
          g("copyBtn").classList.remove("copied");
          renderResult();
        }, 0);
      }
    });

    g("cleanBtn").addEventListener("click", doClean);
    g("clearBtn").addEventListener("click", doClear);

    g("copyBtn").addEventListener("click", function() {
      if (!result || !result.cleaned) return;
      navigator.clipboard.writeText(result.cleaned).then(function() {
        g("copyBtn").textContent = "✓ Copied";
        g("copyBtn").classList.add("copied");
        setTimeout(function() { g("copyBtn").textContent = "Copy"; g("copyBtn").classList.remove("copied"); }, 2000);
      });
    });

    g("qrModalOpenBtn").addEventListener("click", function() {
      openQrModal();
    });

    g("traceBtn").addEventListener("click", async function() {
      if (!result || !result.cleaned || peeking) return;
      peeking = true;
      peekData = null;
      peekError = null;
      g("traceBtn").classList.add("loading");
      g("traceBtn").disabled = true;
      renderPeek();
      try {
        peekData = await peekUrl(result.cleaned);
      } catch(err) {
        peekError = err.message;
      } finally {
        peeking = false;
        g("traceBtn").classList.remove("loading");
        g("traceBtn").disabled = false;
        renderPeek();
      }
    });
  </script>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Admin panel HTML
// ---------------------------------------------------------------------------
const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener - Admin</title>

    <!-- Favicons and Touch Icons -->
    <link rel="icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon.ico">
    <link rel="apple-touch-icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/apple-touch-icon.png">
    <link rel="icon" sizes="192x192" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-192.png">
    <link rel="icon" sizes="512x512" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-512.png">
    <meta name="theme-color" content="#e73b42">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --color-bg: #fdfdfd;
            --color-text: #353535;
            --color-accent: #e73b42;
            --color-accent-hover: #d12d34;
            --color-sidebar-bg: #f5f5f5;
            --color-border: #e0e0e0;
            --color-text-muted: #7d7d7d;
            --color-text-light: #9d9d9d;
            --spacing-xs: 8px;
            --spacing-sm: 12px;
            --spacing-md: 20px;
            --spacing-lg: 30px;
            --spacing-xl: 40px;
            --font-primary: 'Inter', sans-serif;
            --font-fallback: 'Source Sans 3', sans-serif;
            --line-height-base: 1.7;
            --line-height-tight: 1.3;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --color-bg: #231f1f;
                --color-text: #d9d4d4;
                --color-accent: #ff6b7a;
                --color-accent-hover: #ff8590;
                --color-sidebar-bg: #2b2626;
                --color-border: #3b3636;
                --color-text-muted: #b9b4b4;
                --color-text-light: #948f8f;
            }
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: var(--font-primary), var(--font-fallback), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: var(--spacing-md);
            line-height: var(--line-height-base);
        }

        .container {
            background: var(--color-sidebar-bg);
            border-radius: 12px;
            border: 1px solid var(--color-border);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            max-width: 900px;
            width: 100%;
            padding: var(--spacing-xl);
        }

        h1 {
            color: var(--color-text);
            margin-bottom: var(--spacing-lg);
            text-align: center;
            font-weight: 700;
            line-height: var(--line-height-tight);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        h1 svg { color: var(--color-accent); }

        .auth-section, .admin-section { display: none; }
        .auth-section.active, .admin-section.active { display: block; }

        .form-group { margin-bottom: var(--spacing-md); }

        label {
            display: block;
            margin-bottom: var(--spacing-xs);
            color: var(--color-text);
            font-weight: 500;
        }

        input[type="password"], input[type="url"], input[type="text"] {
            width: 100%;
            padding: var(--spacing-sm);
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 16px;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            transition: border-color 0.3s;
        }

        input:focus {
            outline: none;
            border-color: var(--color-accent);
        }

        button {
            width: 100%;
            padding: var(--spacing-sm);
            background: var(--color-accent);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
        }

        button:hover {
            background: var(--color-accent-hover);
            transform: translateY(-1px);
        }

        button:active { transform: translateY(0); }

        .url-list { margin-top: var(--spacing-lg); }

        .url-item {
            background: var(--color-bg);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid var(--color-border);
            position: relative;
        }

        .url-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
        }

        .short-url-row {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .short-url {
            color: var(--color-accent);
            font-weight: 600;
            text-decoration: none;
            font-size: 15px;
        }

        .short-url:hover { color: var(--color-accent-hover); }

        .long-url {
            color: var(--color-text-muted);
            font-size: 13px;
            word-break: break-all;
            margin-top: 4px;
            line-height: 1.5;
        }

        .url-meta {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: var(--color-text-light);
            margin-top: 4px;
        }

        .url-meta svg { flex-shrink: 0; }

        .url-stats {
            background: var(--color-sidebar-bg);
            padding: 10px;
            border-radius: 6px;
            border: 1px solid var(--color-border);
            margin-top: 10px;
            font-size: 13px;
            color: var(--color-text);
        }

        .stat-row {
            display: flex;
            gap: 20px;
            margin-bottom: 5px;
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .log-toggle-btn {
            width: auto;
            background: none;
            color: var(--color-accent);
            border: none;
            padding: 6px 0 0;
            margin-top: 5px;
            font-size: 12px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
        }
        .log-toggle-btn:hover { background: none; color: var(--color-accent-hover); transform: none; }

        .click-log {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid var(--color-border);
            max-height: 240px;
            overflow-y: auto;
        }
        .log-loading, .log-empty {
            font-size: 12px;
            color: var(--color-text-muted);
            padding: 4px 0;
        }
        .log-entry {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 8px;
            padding: 5px 0;
            font-size: 12px;
            border-bottom: 1px solid var(--color-border);
        }
        .log-entry:last-child { border-bottom: none; }
        .log-time {
            color: var(--color-text-muted);
            white-space: nowrap;
            flex-shrink: 0;
            min-width: 60px;
        }
        .log-country {
            color: var(--color-text);
            font-weight: 500;
            white-space: nowrap;
            flex-shrink: 0;
        }
        .log-city {
            color: var(--color-text-muted);
            white-space: nowrap;
            flex-shrink: 0;
        }
        .log-referrer {
            color: var(--color-text-light);
            word-break: break-all;
            flex: 1;
            min-width: 120px;
        }

        .stat-label {
            font-weight: 500;
            color: var(--color-text-muted);
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .icon-btn {
            padding: 5px 10px;
            width: auto;
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            height: 28px;
            box-sizing: border-box;
        }

        .copy-btn {
            background: var(--color-accent);
            flex-shrink: 0;
        }
        .copy-btn:hover { background: var(--color-accent-hover); }
        .copy-btn.copied { background: #28a745; }

        .edit-btn { background: var(--color-text-muted); }
        .edit-btn:hover { background: var(--color-text); }

        .delete-btn {
            background: var(--color-text-muted);
            position: absolute;
            bottom: 12px;
            right: 12px;
        }
        .delete-btn:hover { background: var(--color-text); }

        .message {
            padding: var(--spacing-sm);
            border-radius: 6px;
            margin-bottom: var(--spacing-md);
            display: none;
            border: 1px solid var(--color-border);
        }

        .message.success {
            background: #d4edda; color: #155724; border-color: #c3e6cb; display: block;
        }
        @media (prefers-color-scheme: dark) {
            .message.success { background: #1e4620; color: #9fe5a4; border-color: #2d5a2f; }
        }
        .message.error {
            background: #f8d7da; color: #721c24; border-color: #f5c6cb; display: block;
        }
        @media (prefers-color-scheme: dark) {
            .message.error { background: #4a1f22; color: #f5b7bc; border-color: #5a2f32; }
        }

        .stats {
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: var(--spacing-md);
            text-align: center;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .stats-item { text-align: center; }

        .stats-number {
            font-size: 32px;
            font-weight: 700;
            color: var(--color-accent);
        }

        .stats-label {
            color: var(--color-text-muted);
            margin-top: 5px;
            font-size: 14px;
        }

        .bulk-bar {
            display: none;
            align-items: center;
            gap: 12px;
            background: var(--color-bg);
            border: 1px solid var(--color-border);
            padding: 10px 14px;
            border-radius: 8px;
            margin-bottom: 12px;
        }

        .bulk-bar.active { display: flex; }

        .bulk-bar span { font-size: 14px; font-weight: 500; flex: 1; }

        .bulk-bar button {
            width: auto;
            padding: 6px 14px;
            font-size: 13px;
        }

        .bulk-delete-btn { background: #dc3545; }
        .bulk-delete-btn:hover { background: #c82333; }

        .bulk-cancel-btn { background: var(--color-text-muted); }
        .bulk-cancel-btn:hover { background: var(--color-text); }

        .url-checkbox {
            width: 18px;
            height: 18px;
            accent-color: var(--color-accent);
            cursor: pointer;
            flex-shrink: 0;
            margin-right: 6px;
        }

        .url-item-row {
            display: flex;
            align-items: center;
        }

        .url-item-content { flex: 1; min-width: 0; padding-bottom: 20px; }

        .show-more-btn {
            width: 100%;
            background: var(--color-bg);
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            padding: 12px;
            font-size: 14px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .show-more-btn:hover {
            background: var(--color-sidebar-bg);
            transform: none;
        }

        .edit-inline {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .edit-inline input {
            width: 140px;
            padding: 3px 8px;
            font-size: 14px;
            font-weight: 600;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            background: var(--color-bg);
            color: var(--color-accent);
        }

        .edit-inline button {
            width: auto;
            padding: 4px 8px;
            font-size: 12px;
        }

        .save-edit-btn { background: #28a745; }
        .save-edit-btn:hover { background: #218838; }

        .cancel-edit-btn { background: var(--color-text-muted); }
        .cancel-edit-btn:hover { background: var(--color-text); }

        .footer-actions {
            display: flex;
            gap: 10px;
            margin-top: var(--spacing-md);
        }

        .footer-actions button { flex: 1; }

        .guide-btn {
            background: var(--color-bg);
            color: var(--color-accent);
            border: 1px solid var(--color-border);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .guide-btn:hover {
            background: var(--color-sidebar-bg);
            transform: translateY(-1px);
        }

        .logout-btn {
            background: var(--color-text-muted);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .logout-btn:hover { background: var(--color-text); }

        .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .list-header h2 {
            color: var(--color-text);
            font-weight: 600;
        }

        .select-all-label {
            font-size: 13px;
            color: var(--color-text-muted);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            user-select: none;
        }

        h2 { color: var(--color-text); font-weight: 600; }

        .search-bar {
            position: relative;
            margin-bottom: 15px;
        }

        .search-bar input {
            width: 100%;
            padding: 10px 12px 10px 36px;
            border: 2px solid var(--color-border);
            border-radius: 6px;
            font-size: 14px;
            font-family: var(--font-primary), var(--font-fallback), sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            transition: border-color 0.3s;
        }

        .search-bar input:focus {
            outline: none;
            border-color: var(--color-accent);
        }

        .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-text-light);
            display: flex;
            pointer-events: none;
        }

        .url-title {
            font-weight: 500;
            font-size: 14px;
            color: var(--color-text);
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .url-title svg { color: var(--color-text-muted); flex-shrink: 0; }

        .url-title-text {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .no-title {
            color: var(--color-text-light);
            font-style: italic;
            font-weight: 400;
        }

        .title-edit-btn {
            background: none;
            border: none;
            color: var(--color-text-light);
            cursor: pointer;
            padding: 2px;
            width: auto;
            display: inline-flex;
            align-items: center;
        }

        .title-edit-btn:hover {
            color: var(--color-accent);
            background: none;
            transform: none;
        }

        .title-edit-inline {
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
        }

        .title-edit-inline input {
            flex: 1;
            padding: 3px 8px;
            font-size: 14px;
            font-weight: 500;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            background: var(--color-bg);
            color: var(--color-text);
        }

        .title-edit-inline button {
            width: auto;
            padding: 4px 8px;
            font-size: 12px;
        }

        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xs); }
        .label-row label { margin-bottom: 0; }
        .clean-url-btn {
            width: auto; padding: 4px 10px; font-size: 12px; font-weight: 500;
            background: var(--color-bg); color: var(--color-accent);
            border: 1px solid var(--color-border); border-radius: 6px;
            cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
        }
        .clean-url-btn:hover { background: var(--color-sidebar-bg); border-color: var(--color-accent); transform: none; }
        .removed-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .removed-tag {
            font-size: 11px; font-weight: 500;
            background: rgba(231,59,66,0.08); color: var(--color-accent);
            padding: 2px 7px; border-radius: 99px; border: 1px solid rgba(231,59,66,0.2);
        }
        @media (prefers-color-scheme: dark) {
            .removed-tag { background: rgba(255,107,122,0.1); border-color: rgba(255,107,122,0.25); }
        }
        .no-params-text { font-size: 11px; color: var(--color-text-light); }

        .search-match {
            background: rgba(231, 59, 66, 0.15);
            border-radius: 2px;
        }

        .tag-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
        .tag-chip {
            display: inline-flex; align-items: center; gap: 3px;
            padding: 2px 8px; font-size: 11px; font-weight: 500;
            border-radius: 12px;
            background: var(--color-sidebar-bg); color: var(--color-text-muted);
            border: 1px solid var(--color-border); cursor: pointer;
        }
        .tag-chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .tag-chip .tag-remove {
            cursor: pointer; font-size: 13px; line-height: 1;
            color: var(--color-text-light); margin-left: 2px;
        }
        .tag-chip .tag-remove:hover { color: var(--color-accent); }

        .tag-filter-bar {
            display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; align-items: center;
        }
        .tag-filter-chip {
            display: inline-flex; align-items: center; gap: 3px;
            padding: 3px 10px; font-size: 12px; font-weight: 500;
            border-radius: 14px; cursor: pointer; border: 1px solid var(--color-border);
            background: var(--color-bg); color: var(--color-text-muted); transition: all 0.15s;
        }
        .tag-filter-chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .tag-filter-chip.active { background: var(--color-accent); color: #fff; border-color: var(--color-accent); }
        .tag-filter-label { font-size: 12px; color: var(--color-text-light); margin-right: 4px; }

        .tag-input-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .tag-input-row input { flex: 1; min-width: 120px; }
        .tag-input-inline {
            display: flex; align-items: center; gap: 4px; margin-top: 4px;
        }
        .tag-input-inline input {
            flex: 1; padding: 3px 8px; font-size: 12px;
            border: 2px solid var(--color-accent); border-radius: 4px;
            background: var(--color-bg); color: var(--color-text);
        }
        .tag-input-inline button { width: auto; padding: 3px 8px; font-size: 11px; }

        .tools-bar {
            display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;
        }
        .tool-btn {
            padding: 6px 14px; font-size: 12px; font-weight: 500;
            background: var(--color-bg); color: var(--color-accent);
            border: 1px solid var(--color-border); border-radius: 6px;
            cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
            width: auto;
        }
        .tool-btn:hover { background: var(--color-sidebar-bg); transform: none; }

        .upload-area {
            display: none; margin-top: 10px; padding: 15px;
            border: 2px dashed var(--color-border); border-radius: 8px;
            background: var(--color-sidebar-bg); text-align: center;
        }
        .upload-area.visible { display: block; }
        .upload-area p { font-size: 13px; color: var(--color-text-muted); margin-bottom: 10px; }
        .upload-area input[type="file"] { display: none; }
        .upload-area label {
            display: inline-block; padding: 8px 20px; background: var(--color-accent);
            color: #fff; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500;
        }
        .upload-area label:hover { background: var(--color-accent-hover); }
        .upload-progress { margin-top: 10px; font-size: 13px; color: var(--color-text-muted); }
${QR_MODAL_CSS}
    </style>
</head>
<body>
    <div class="container">
        <h1>${icons.link} URL Shortener Admin</h1>

        <div id="authSection" class="auth-section active">
            <div id="authMessage" class="message"></div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter admin password" required>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

        <div id="adminSection" class="admin-section">
            <div id="message" class="message"></div>

            <div class="stats">
                <div class="stats-grid">
                    <div class="stats-item">
                        <div class="stats-number" id="urlCount">0</div>
                        <div class="stats-label">Short URLs</div>
                    </div>
                    <div class="stats-item">
                        <div class="stats-number" id="totalClicks">0</div>
                        <div class="stats-label">Total Clicks</div>
                    </div>
                </div>
            </div>

            <form id="createForm">
                <div class="form-group">
                    <div class="label-row">
                        <label for="longUrl">Long URL</label>
                        <button type="button" class="clean-url-btn" id="cleanUrlBtn">${icons.filter} Clean</button>
                    </div>
                    <input type="url" id="longUrl" placeholder="https://example.com/very/long/url" required>
                    <div class="removed-tags" id="createRemovedParams" style="display:none"></div>
                </div>
                <div class="form-group">
                    <label for="title">Title (optional)</label>
                    <input type="text" id="title" placeholder="e.g. Team standup notes" maxlength="200">
                </div>
                <div class="form-group">
                    <label for="shortCode">Custom Short Code (optional)</label>
                    <input type="text" id="shortCode" placeholder="Leave blank for random code">
                </div>
                <div class="form-group">
                    <label for="tags">Tags (optional, comma-separated)</label>
                    <input type="text" id="tags" placeholder="e.g. marketing, social, blog">
                </div>
                <button type="submit">Create Short URL</button>
            </form>

            <div class="tools-bar">
                <button class="tool-btn" onclick="exportCsv()">${icons.share} Download CSV</button>
                <button class="tool-btn" onclick="toggleUpload()">${icons.link} Bulk Upload</button>
                <button class="tool-btn" onclick="openQrModal('url')">${icons.qrCode} QR Code</button>
            </div>
            <div id="uploadArea" class="upload-area">
                <p>Upload a CSV file with one URL per line, or columns: url, title, tags</p>
                <label for="csvFile">Choose CSV File</label>
                <input type="file" id="csvFile" accept=".csv,.txt" onchange="handleCsvUpload(this.files[0])">
                <div id="uploadProgress" class="upload-progress"></div>
            </div>

            <div class="url-list">
                <div class="search-bar">
                    <span class="search-icon">${icons.search}</span>
                    <input type="text" id="searchInput" placeholder="Search titles, URLs, tags..." oninput="applySearch()">
                </div>
                <div id="tagFilterBar" class="tag-filter-bar" style="display:none;"></div>
                <div class="list-header">
                    <h2>Your Short URLs</h2>
                    <label class="select-all-label"><input type="checkbox" id="selectAll" class="url-checkbox"> Select all</label>
                </div>
                <div id="bulkBar" class="bulk-bar">
                    <span id="selectedCount">0 selected</span>
                    <button class="bulk-delete-btn icon-btn" onclick="bulkDelete()">${icons.trash} Delete selected</button>
                    <button class="bulk-cancel-btn icon-btn" onclick="clearSelection()">${icons.x} Cancel</button>
                </div>
                <div id="urlsList"></div>
                <div id="showMoreWrap" style="display:none; margin-top:10px;">
                    <button class="show-more-btn" onclick="showMore()">${icons.chevronDown} <span id="showMoreLabel">Show more</span></button>
                </div>
            </div>

            <div class="footer-actions">
                <button class="guide-btn" onclick="window.location.href='/admin/guide'">${icons.book} Setup Guide</button>
                <button class="logout-btn" onclick="logout()">${icons.logOut} Logout</button>
            </div>
        </div>
    </div>
${QR_MODAL_HTML}

    <script>
${QR_LIB_JS}
${QR_MODAL_JS}
        let authToken = '';
        let allUrls = [];
        let filteredUrls = [];
        let searchQuery = '';
        let selectedTag = '';
        let displayLimit = 50;
        const PAGE_SIZE = 50;
        const selectedCodes = new Set();

        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            authToken = savedToken;
            document.getElementById('authSection').classList.remove('active');
            document.getElementById('adminSection').classList.add('active');
            loadUrls();
        }

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            try {
                const response = await fetch('/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                const data = await response.json();
                if (response.ok) {
                    authToken = data.token;
                    localStorage.setItem('adminToken', authToken);
                    showMessage('authMessage', 'Login successful!', 'success');
                    setTimeout(() => {
                        document.getElementById('authSection').classList.remove('active');
                        document.getElementById('adminSection').classList.add('active');
                        loadUrls();
                    }, 500);
                } else {
                    showMessage('authMessage', data.error || 'Login failed', 'error');
                }
            } catch (error) {
                showMessage('authMessage', 'Network error', 'error');
            }
        });

        const TRACKING_PARAMS = new Set([
            "utm_source","utm_medium","utm_campaign","utm_term","utm_content",
            "utm_id","utm_source_platform","utm_campaign_id","utm_creative_format",
            "utm_marketing_tactic",
            "_kx","uid","campaign_id",
            "fbclid","fb_action_ids","fb_action_types","fb_source","fb_ref",
            "gclid","gclsrc","dclid","gbraid","wbraid",
            "msclkid",
            "twclid",
            "hsa_acc","hsa_cam","hsa_grp","hsa_ad","hsa_src","hsa_tgt",
            "hsa_kw","hsa_mt","hsa_net","hsa_ver","hsa_la",
            "mc_cid","mc_eid",
            "mkt_tok",
            "messageId",
            "ref","referrer","source","campaign","trk","trkinfo",
            "igshid","s_cid","ncid","cid","eid","mid",
            "clickid","click_id","track","tracking",
            "affiliate","aff_id","partner_id",
            "zanpid","origin","sxsrf"
        ]);

        function cleanUrl(raw) {
            const trimmed = raw.trim();
            if (!trimmed) return { cleaned: "", removed: [] };
            let url;
            try { url = new URL(trimmed); } catch (e) { return { cleaned: trimmed, removed: [], error: "Not a valid URL" }; }
            const removed = [];
            const toDelete = [];
            url.searchParams.forEach((v, key) => {
                if (TRACKING_PARAMS.has(key.toLowerCase())) { toDelete.push(key); removed.push(key); }
            });
            toDelete.forEach(k => url.searchParams.delete(k));
            let cleaned = url.toString();
            if (url.searchParams.size === 0) cleaned = cleaned.replace(/[?]$/, "");
            return { cleaned, removed };
        }

        document.getElementById('cleanUrlBtn').addEventListener('click', () => {
            const input = document.getElementById('longUrl');
            const removedRow = document.getElementById('createRemovedParams');
            const result = cleanUrl(input.value);
            if (result.error) {
                removedRow.innerHTML = '<span class="no-params-text">' + result.error + '</span>';
                removedRow.style.display = '';
                return;
            }
            input.value = result.cleaned;
            if (result.removed.length > 0) {
                removedRow.innerHTML = result.removed.map(p => '<span class="removed-tag">' + p + '</span>').join('');
            } else {
                removedRow.innerHTML = '<span class="no-params-text">Already clean</span>';
            }
            removedRow.style.display = '';
        });

        document.getElementById('createForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const longUrl = document.getElementById('longUrl').value;
            const title = document.getElementById('title').value.trim() || undefined;
            const shortCode = document.getElementById('shortCode').value || undefined;
            const tagsRaw = document.getElementById('tags').value;
            const tags = tagsRaw ? [...new Set(tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean))] : [];
            try {
                const response = await fetch('/admin/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ url: longUrl, title, shortCode, tags })
                });
                const data = await response.json();
                if (response.ok) {
                    const fullUrl = '${CANONICAL_DOMAIN}' + '/' + data.shortCode;
                    try {
                        await navigator.clipboard.writeText(fullUrl);
                        showMessage('message', 'Short URL created and copied to clipboard: ' + fullUrl, 'success');
                    } catch (err) {
                        showMessage('message', 'Short URL created: ' + fullUrl, 'success');
                    }
                    document.getElementById('createForm').reset();
                    document.getElementById('createRemovedParams').style.display = 'none';
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired. Please login again.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to create URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        });

        document.getElementById('selectAll').addEventListener('change', function() {
            const visible = filteredUrls.slice(0, displayLimit);
            if (this.checked) {
                visible.forEach(u => selectedCodes.add(u.shortCode));
            } else {
                selectedCodes.clear();
            }
            renderList();
            updateBulkBar();
        });

        async function loadUrls() {
            try {
                const response = await fetch('/admin/list', { headers: { 'Authorization': authToken } });
                if (!response.ok) {
                    if (response.status === 401) { showMessage('message', 'Session expired. Please login again.', 'error'); logout(); return; }
                    throw new Error('Failed to load URLs');
                }
                const data = await response.json();

                const statsResults = await Promise.allSettled(
                    data.urls.map(item => fetchStats(item.shortCode))
                );
                const urlsWithData = data.urls.map((item, i) => ({
                    ...item,
                    stats: statsResults[i].status === 'fulfilled' ? statsResults[i].value : null,
                }));

                allUrls = urlsWithData;
                selectedCodes.clear();
                document.getElementById('selectAll').checked = false;

                document.getElementById('urlCount').textContent = allUrls.length;
                const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();

                document.getElementById('authSection').classList.remove('active');
                document.getElementById('adminSection').classList.add('active');

                applySearch();
            } catch (error) {
                showMessage('message', 'Failed to load URLs', 'error');
            }
        }

        async function fetchStats(shortCode) {
            try {
                const response = await fetch('/admin/stats/' + shortCode, { headers: { 'Authorization': authToken } });
                return await response.json();
            } catch (err) {
                return null;
            }
        }

        async function qrCreateShortLink(destUrl, customCode) {
            const response = await fetch('/admin/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                body: JSON.stringify({ url: destUrl, shortCode: customCode || undefined })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create short URL');
            loadUrls();
            return '${CANONICAL_DOMAIN}' + '/' + data.shortCode;
        }

        function applySearch() {
            searchQuery = (document.getElementById('searchInput') ? document.getElementById('searchInput').value : '').toLowerCase().trim();
            filteredUrls = allUrls;

            if (selectedTag) {
                filteredUrls = filteredUrls.filter(item =>
                    (item.tags || []).some(t => t.toLowerCase() === selectedTag.toLowerCase())
                );
            }

            if (searchQuery) {
                filteredUrls = filteredUrls.filter(item => {
                    const t = (item.title || '').toLowerCase();
                    const u = (item.url || '').toLowerCase();
                    const sc = (item.shortCode || '').toLowerCase();
                    const tags = (item.tags || []).join(' ').toLowerCase();
                    return t.includes(searchQuery) || u.includes(searchQuery) || sc.includes(searchQuery) || tags.includes(searchQuery);
                });
            }

            displayLimit = PAGE_SIZE;
            renderList();
            updateBulkBar();
            renderTagFilter();
        }

        function renderTagFilter() {
            const allTags = {};
            allUrls.forEach(item => {
                (item.tags || []).forEach(t => {
                    const key = t.toLowerCase();
                    if (!allTags[key]) allTags[key] = { name: t, count: 0 };
                    allTags[key].count++;
                });
            });
            const bar = document.getElementById('tagFilterBar');
            const sorted = Object.values(allTags).sort((a, b) => b.count - a.count);
            if (sorted.length === 0) { bar.style.display = 'none'; return; }
            bar.style.display = 'flex';
            bar.innerHTML = '<span class="tag-filter-label">${icons.tag} Filter:</span>' +
                '<span class="tag-filter-chip' + (!selectedTag ? ' active' : '') + '" onclick="filterByTag(\\'\\')">${icons.tag} All</span>' +
                sorted.map(t =>
                    '<span class="tag-filter-chip' + (selectedTag && selectedTag.toLowerCase() === t.name.toLowerCase() ? ' active' : '') +
                    '" onclick="filterByTag(\\'' + escapeAttr(t.name) + '\\')">' + escapeHtml(t.name) + ' (' + t.count + ')</span>'
                ).join('');
        }

        function filterByTag(tag) {
            selectedTag = tag;
            applySearch();
        }

        function renderList() {
            const urlsList = document.getElementById('urlsList');
            if (allUrls.length === 0) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs yet. Create your first short URL!</p>';
                document.getElementById('showMoreWrap').style.display = 'none';
                return;
            }

            if (filteredUrls.length === 0 && (searchQuery || selectedTag)) {
                urlsList.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 20px;">No URLs match your filter.</p>';
                document.getElementById('showMoreWrap').style.display = 'none';
                return;
            }

            const visible = filteredUrls.slice(0, displayLimit);

            urlsList.innerHTML = visible.map(item => {
                const checked = selectedCodes.has(item.shortCode) ? 'checked' : '';
                let statsHtml = '';
                if (item.stats && item.stats.clicks > 0) {
                    const lastClicked = item.stats.lastClicked ? formatTimeAgo(item.stats.lastClicked) : 'Never';
                    const topReferrer = item.stats.topReferrer || 'Direct';
                    const topCountry = item.stats.topCountry || 'Unknown';
                    const topCity = item.stats.topCity || 'Unknown';
                    statsHtml = '<div class="url-stats">' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.barChart} Clicks:</span> ' + item.stats.clicks + '</div>' +
                            '<div class="stat-item"><span class="stat-label">${icons.clock} Last:</span> ' + lastClicked + '</div>' +
                        '</div>' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.globe} Top Country:</span> ' + topCountry + '</div>' +
                            '<div class="stat-item"><span class="stat-label">${icons.mapPin} Top City:</span> ' + topCity + '</div>' +
                        '</div>' +
                        '<div class="stat-row">' +
                            '<div class="stat-item"><span class="stat-label">${icons.mapPin} Top Referrer:</span> ' + topReferrer + '</div>' +
                        '</div>' +
                        '<button class="log-toggle-btn" type="button" onclick="toggleClickLog(\\'' + item.shortCode + '\\', this)">${icons.list} <span>View recent hits</span></button>' +
                        '<div class="click-log" id="clicklog-' + item.shortCode + '" style="display:none"></div>' +
                    '</div>';
                }

                const createdHtml = item.createdAt
                    ? '<div class="url-meta">${icons.calendar} ' + formatDate(item.createdAt) + '</div>'
                    : '';

                const titleDisplay = item.title
                    ? '<span class="url-title-text">' + escapeHtml(item.title) + '</span>'
                    : '<span class="url-title-text no-title">No title</span>';

                const titleHtml = '<div class="url-title" id="title-' + item.shortCode + '">${icons.tag} ' + titleDisplay +
                    ' <button class="title-edit-btn" onclick="startTitleEdit(\\'' + item.shortCode + '\\', ' + (item.title ? '\\'' + escapeAttr(item.title) + '\\'' : 'null') + ')" title="Edit title">${icons.edit}</button>' +
                    '</div>';

                const itemTags = item.tags || [];
                const tagsHtml = '<div class="tag-chips" id="tags-' + item.shortCode + '">' +
                    itemTags.map(t => '<span class="tag-chip" onclick="filterByTag(\\'' + escapeAttr(t) + '\\')">' + escapeHtml(t) + '</span>').join('') +
                    ' <span class="tag-chip" onclick="startTagEdit(\\'' + item.shortCode + '\\')" title="Edit tags" style="border-style:dashed;">${icons.edit} tags</span>' +
                    '</div>';

                return '<div class="url-item"><div class="url-item-row">' +
                    '<input type="checkbox" class="url-checkbox" data-code="' + item.shortCode + '" ' + checked + ' onchange="toggleSelect(\\'' + item.shortCode + '\\', this.checked)">' +
                    '<div class="url-item-content">' +
                        '<div class="url-header">' +
                            '<div class="short-url-row" id="row-' + item.shortCode + '">' +
                                '<a href="/' + item.shortCode + '" class="short-url" target="_blank">/' + item.shortCode + '</a>' +
                                '<button class="edit-btn icon-btn" onclick="startEdit(\\'' + item.shortCode + '\\')" title="Edit short code">${icons.edit}</button>' +
                            '</div>' +
                            '<button class="copy-btn icon-btn" onclick="copyUrl(\\'' + item.shortCode + '\\', this)">${icons.copy} Copy</button>' +
                            '<button class="copy-btn icon-btn" onclick="openQrModalForUrl(\\'' + '${CANONICAL_DOMAIN}' + '/' + item.shortCode + '\\')" title="Generate QR code">${icons.qrCode} QR</button>' +
                        '</div>' +
                        titleHtml +
                        tagsHtml +
                        '<div class="long-url">' + escapeHtml(item.url) + '</div>' +
                        createdHtml +
                        statsHtml +
                        '<button class="delete-btn icon-btn" onclick="deleteUrl(\\'' + item.shortCode + '\\')">${icons.trash}</button>' +
                    '</div>' +
                '</div></div>';
            }).join('');

            const remaining = filteredUrls.length - displayLimit;
            const wrap = document.getElementById('showMoreWrap');
            if (remaining > 0) {
                wrap.style.display = 'block';
                document.getElementById('showMoreLabel').textContent = 'Show more (' + remaining + ' remaining)';
            } else {
                wrap.style.display = 'none';
            }
        }

        function showMore() {
            displayLimit += PAGE_SIZE;
            renderList();
        }

        function toggleSelect(code, checked) {
            if (checked) selectedCodes.add(code); else selectedCodes.delete(code);
            updateBulkBar();
        }

        function updateBulkBar() {
            const bar = document.getElementById('bulkBar');
            if (selectedCodes.size > 0) {
                bar.classList.add('active');
                document.getElementById('selectedCount').textContent = selectedCodes.size + ' selected';
            } else {
                bar.classList.remove('active');
            }
        }

        function clearSelection() {
            selectedCodes.clear();
            document.getElementById('selectAll').checked = false;
            renderList();
            updateBulkBar();
        }

        async function bulkDelete() {
            if (selectedCodes.size === 0) return;
            if (!confirm('Delete ' + selectedCodes.size + ' short URL(s)?')) return;
            try {
                const response = await fetch('/admin/bulk-delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ codes: Array.from(selectedCodes) })
                });
                if (response.ok) {
                    const data = await response.json();
                    allUrls = allUrls.filter(u => !selectedCodes.has(u.shortCode));
                    selectedCodes.clear();
                    document.getElementById('selectAll').checked = false;
                    document.getElementById('urlCount').textContent = allUrls.length;
                    const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                    document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
                    applySearch();
                    showMessage('message', data.deleted + ' URL(s) deleted', 'success');
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    showMessage('message', data.error || 'Bulk delete failed', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        }

        function startEdit(shortCode) {
            const row = document.getElementById('row-' + shortCode);
            row.innerHTML = '<div class="edit-inline">' +
                '<span style="color:var(--color-text-muted);font-size:14px">/</span>' +
                '<input type="text" id="editInput-' + shortCode + '" value="' + shortCode + '" maxlength="20">' +
                '<button class="save-edit-btn icon-btn" onclick="saveEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('editInput-' + shortCode);
            inp.focus();
            inp.select();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveEdit(oldCode) {
            const newCode = document.getElementById('editInput-' + oldCode).value.trim();
            if (!newCode || newCode === oldCode) { renderList(); return; }
            try {
                const response = await fetch('/admin/edit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ oldCode, newCode })
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage('message', 'Short code changed: /' + oldCode + ' → /' + newCode, 'success');
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Edit failed', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        function startTitleEdit(shortCode, currentTitle) {
            const el = document.getElementById('title-' + shortCode);
            const val = currentTitle || '';
            el.innerHTML = '<div class="title-edit-inline">' +
                '<input type="text" id="titleInput-' + shortCode + '" value="' + escapeAttr(val) + '" placeholder="Enter a title..." maxlength="200">' +
                '<button class="save-edit-btn icon-btn" onclick="saveTitleEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('titleInput-' + shortCode);
            inp.focus();
            inp.select();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveTitleEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveTitleEdit(shortCode) {
            const newTitle = document.getElementById('titleInput-' + shortCode).value.trim();
            try {
                const response = await fetch('/admin/update-title', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ shortCode, title: newTitle })
                });
                const data = await response.json();
                if (response.ok) {
                    const item = allUrls.find(u => u.shortCode === shortCode);
                    if (item) item.title = newTitle || null;
                    showMessage('message', newTitle ? 'Title updated' : 'Title removed', 'success');
                    applySearch();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to update title', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        function escapeAttr(str) {
            return str.replace(/&/g,'&amp;').replace(/'/g,'&#39;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        }

        function formatTimeAgo(timestamp) {
            const seconds = Math.floor((Date.now() - timestamp) / 1000);
            if (seconds < 60) return seconds + 's ago';
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return minutes + 'm ago';
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return hours + 'h ago';
            const days = Math.floor(hours / 24);
            return days + 'd ago';
        }

        function formatDate(ts) {
            const d = new Date(ts);
            const mon = d.toLocaleString('default', { month: 'short' });
            return mon + ' ' + d.getDate() + ', ' + d.getFullYear();
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        async function toggleClickLog(shortCode, btn) {
            const container = document.getElementById('clicklog-' + shortCode);
            if (!container) return;

            const nowOpen = container.style.display === 'none';
            container.style.display = nowOpen ? 'block' : 'none';
            btn.querySelector('span').textContent = nowOpen ? 'Hide recent hits' : 'View recent hits';
            if (!nowOpen || container.dataset.loaded === '1') return;

            container.innerHTML = '<div class="log-loading">Loading…</div>';
            try {
                const response = await fetch('/admin/clicklog/' + shortCode, { headers: { 'Authorization': authToken } });
                const data = await response.json();
                const log = data.log || [];
                if (log.length === 0) {
                    container.innerHTML = '<div class="log-empty">No recent hits recorded.</div>';
                } else {
                    const cappedNote = log.length >= ${CLICK_LOG_LIMIT}
                        ? '<div class="log-empty">Showing the ${CLICK_LOG_LIMIT} most recent hits.</div>'
                        : '';
                    container.innerHTML = cappedNote + log.map(entry => {
                        const when = formatTimeAgo(entry.timestamp);
                        const full = new Date(entry.timestamp).toLocaleString();
                        const referrer = entry.referrer === 'Direct' ? 'Direct' : escapeHtml(entry.referrer);
                        const location = entry.city ? entry.city + (entry.region ? ', ' + entry.region : '') : '';
                        return '<div class="log-entry">' +
                            '<span class="log-time" title="' + escapeAttr(full) + '">' + when + '</span>' +
                            '<span class="log-country">' + escapeHtml(entry.country || 'Unknown') + '</span>' +
                            (location ? '<span class="log-city">' + escapeHtml(location) + '</span>' : '') +
                            '<span class="log-referrer">' + referrer + '</span>' +
                        '</div>';
                    }).join('');
                }
                container.dataset.loaded = '1';
            } catch (err) {
                container.innerHTML = '<div class="log-empty">Failed to load recent hits.</div>';
            }
        }

        async function copyUrl(shortCode, button) {
            const fullUrl = '${CANONICAL_DOMAIN}' + '/' + shortCode;
            try {
                await navigator.clipboard.writeText(fullUrl);
                const orig = button.innerHTML;
                button.innerHTML = '${icons.check} Copied!';
                button.classList.add('copied');
                setTimeout(() => { button.innerHTML = orig; button.classList.remove('copied'); }, 2000);
            } catch (err) {
                showMessage('message', 'Failed to copy to clipboard', 'error');
            }
        }

        async function deleteUrl(shortCode) {
            if (!confirm('Delete short URL /' + shortCode + '?')) return;
            try {
                const response = await fetch('/admin/delete/' + shortCode, {
                    method: 'DELETE',
                    headers: { 'Authorization': authToken }
                });
                if (response.ok) {
                    allUrls = allUrls.filter(u => u.shortCode !== shortCode);
                    selectedCodes.delete(shortCode);
                    document.getElementById('urlCount').textContent = allUrls.length;
                    const totalClicks = allUrls.reduce((sum, item) => sum + (item.stats?.clicks || 0), 0);
                    document.getElementById('totalClicks').textContent = totalClicks.toLocaleString();
                    applySearch();
                    showMessage('message', 'URL deleted successfully', 'success');
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    showMessage('message', data.error || 'Failed to delete URL', 'error');
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
            }
        }

        function logout() {
            authToken = '';
            localStorage.removeItem('adminToken');
            document.getElementById('adminSection').classList.remove('active');
            document.getElementById('authSection').classList.add('active');
            document.getElementById('password').value = '';
        }

        function showMessage(elementId, text, type) {
            const messageEl = document.getElementById(elementId);
            messageEl.textContent = text;
            messageEl.className = 'message ' + type;
            setTimeout(() => { messageEl.className = 'message'; }, 5000);
        }

        function startTagEdit(shortCode) {
            const el = document.getElementById('tags-' + shortCode);
            const item = allUrls.find(u => u.shortCode === shortCode);
            const currentTags = (item && item.tags) ? item.tags.join(', ') : '';
            el.innerHTML = '<div class="tag-input-inline">' +
                '<input type="text" id="tagInput-' + shortCode + '" value="' + escapeAttr(currentTags) + '" placeholder="tag1, tag2, ...">' +
                '<button class="save-edit-btn icon-btn" onclick="saveTagEdit(\\'' + shortCode + '\\')">${icons.check}</button>' +
                '<button class="cancel-edit-btn icon-btn" onclick="renderList()">${icons.x}</button>' +
            '</div>';
            const inp = document.getElementById('tagInput-' + shortCode);
            inp.focus();
            inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); saveTagEdit(shortCode); }
                if (e.key === 'Escape') { renderList(); }
            });
        }

        async function saveTagEdit(shortCode) {
            const raw = document.getElementById('tagInput-' + shortCode).value;
            const tags = raw ? [...new Set(raw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean))] : [];
            try {
                const response = await fetch('/admin/update-tags', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ shortCode, tags })
                });
                const data = await response.json();
                if (response.ok) {
                    const item = allUrls.find(u => u.shortCode === shortCode);
                    if (item) item.tags = tags;
                    showMessage('message', 'Tags updated', 'success');
                    applySearch();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', data.error || 'Failed to update tags', 'error');
                    renderList();
                }
            } catch (error) {
                showMessage('message', 'Network error', 'error');
                renderList();
            }
        }

        async function exportCsv() {
            try {
                const response = await fetch('/admin/export', {
                    headers: { 'Authorization': authToken }
                });
                if (!response.ok) {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    showMessage('message', 'Export failed', 'error'); return;
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'urls-export.csv';
                document.body.appendChild(a); a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                showMessage('message', 'Export failed', 'error');
            }
        }

        function toggleUpload() {
            const area = document.getElementById('uploadArea');
            area.classList.toggle('visible');
            if (!area.classList.contains('visible')) {
                document.getElementById('uploadProgress').textContent = '';
                document.getElementById('csvFile').value = '';
            }
        }

        async function handleCsvUpload(file) {
            if (!file) return;
            const progress = document.getElementById('uploadProgress');
            progress.textContent = 'Reading file...';

            try {
                const text = await file.text();
                const lines = text.split(/\\r?\\n/).filter(l => l.trim());
                if (lines.length === 0) { progress.textContent = 'File is empty.'; return; }

                // Detect header row (starts with common column names, not a URL)
                const firstLine = lines[0].trim();
                const hasHeader = /^(url|shortcode|title|tags|link)\\b/i.test(firstLine) || (/^"?(url|shortcode|title|tags|link)/i.test(firstLine));
                const dataLines = hasHeader ? lines.slice(1) : lines;

                const urls = dataLines.map(line => {
                    const parts = parseCSVLine(line);
                    if (parts.length === 1) return { url: parts[0].trim() };
                    return {
                        url: parts[0].trim(),
                        title: parts[1] ? parts[1].trim() : null,
                        tags: parts[2] ? parts[2].split(';').map(t => t.trim()).filter(Boolean) : [],
                    };
                }).filter(u => u.url);

                if (urls.length === 0) { progress.textContent = 'No valid URLs found.'; return; }

                progress.textContent = 'Uploading ' + urls.length + ' URL(s)...';

                const response = await fetch('/admin/bulk-create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
                    body: JSON.stringify({ urls })
                });

                if (response.ok) {
                    const data = await response.json();
                    const created = data.results.filter(r => r.shortCode).length;
                    const failed = data.results.filter(r => r.error).length;
                    progress.textContent = created + ' URL(s) created' + (failed ? ', ' + failed + ' failed' : '') + '.';
                    document.getElementById('csvFile').value = '';
                    loadUrls();
                } else {
                    if (response.status === 401) { showMessage('message', 'Session expired.', 'error'); logout(); return; }
                    const data = await response.json();
                    progress.textContent = data.error || 'Upload failed.';
                }
            } catch (error) {
                progress.textContent = 'Error reading file.';
            }
        }

        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (inQuotes) {
                    if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
                    else if (ch === '"') { inQuotes = false; }
                    else { current += ch; }
                } else {
                    if (ch === '"') { inQuotes = true; }
                    else if (ch === ',') { result.push(current); current = ''; }
                    else { current += ch; }
                }
            }
            result.push(current);
            return result;
        }
    </script>
</body>
</html>`;

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------
function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

function checkPassword(password, correctPassword) {
  return password === correctPassword;
}

function verifyApiKey(apiKey, correctApiKey) {
  return apiKey && correctApiKey && apiKey === correctApiKey;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    },
  });
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

// ---------------------------------------------------------------------------
// KV helpers – stores JSON {url, title, createdAt} with backward compat for plain strings
// ---------------------------------------------------------------------------
function parseUrlValue(raw) {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw);
    if (obj && typeof obj.url === 'string') return obj;
  } catch (_) {
    // legacy plain-string value
  }
  return { url: raw, title: null, tags: [], createdAt: null };
}

function serializeUrlValue(url, title, tags) {
  return JSON.stringify({ url, title: title || null, tags: tags || [], createdAt: Date.now() });
}

function sanitizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  const cleaned = [...new Set(tags.map(t => t.trim().toLowerCase()).filter(Boolean))];
  if (cleaned.length > 10) return null;
  if (cleaned.some(t => t.length > 50)) return null;
  return cleaned;
}

// ---------------------------------------------------------------------------
// Click Tracking Functions
// ---------------------------------------------------------------------------
async function trackClick(env, shortCode, request) {
  try {
    const statsKey = 'stats:' + shortCode;
    const existingStats = await env.URLS.get(statsKey);

    let stats = existingStats ? JSON.parse(existingStats) : {
      clicks: 0,
      referrers: {},
      countries: {},
      cities: {}
    };
    if (!stats.cities) stats.cities = {}; // back-compat with stats saved before city tracking

    stats.clicks = (stats.clicks || 0) + 1;
    stats.lastClicked = Date.now();

    const referrer = request.headers.get('Referer') || 'Direct';
    const referrerDomain = referrer === 'Direct' ? 'Direct' : new URL(referrer).hostname;
    stats.referrers[referrerDomain] = (stats.referrers[referrerDomain] || 0) + 1;

    // request.cf carries Cloudflare's edge geolocation for this request -
    // country, region (state/province) and city, all available on every
    // plan. No IP address is read or stored anywhere here.
    const cf = request.cf || {};
    const country = cf.country || request.headers.get('CF-IPCountry') || 'Unknown';
    const region = cf.region || '';
    const city = cf.city || '';
    stats.countries[country] = (stats.countries[country] || 0) + 1;

    const cityLabel = city ? (city + (region ? ', ' + region : '')) : 'Unknown';
    stats.cities[cityLabel] = (stats.cities[cityLabel] || 0) + 1;

    await env.URLS.put(statsKey, JSON.stringify(stats));

    const logKey = 'clicklog:' + shortCode;
    const existingLog = await env.URLS.get(logKey);
    const log = existingLog ? JSON.parse(existingLog) : [];
    log.unshift({ timestamp: stats.lastClicked, referrer, country, region, city });
    if (log.length > CLICK_LOG_LIMIT) log.length = CLICK_LOG_LIMIT;
    await env.URLS.put(logKey, JSON.stringify(log));
  } catch (error) {
    console.error('Error tracking click:', error);
  }
}

async function getClickLog(env, shortCode) {
  try {
    const logKey = 'clicklog:' + shortCode;
    const data = await env.URLS.get(logKey);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting click log:', error);
    return [];
  }
}

async function getStats(env, shortCode) {
  try {
    const statsKey = 'stats:' + shortCode;
    const statsData = await env.URLS.get(statsKey);

    if (!statsData) {
      return { clicks: 0, lastClicked: null, topReferrer: null, topCountry: null, topCity: null, referrers: {}, countries: {}, cities: {} };
    }

    const stats = JSON.parse(statsData);

    const topReferrer = Object.keys(stats.referrers || {})
      .sort((a, b) => stats.referrers[b] - stats.referrers[a])[0] || null;

    const topCountry = Object.keys(stats.countries || {})
      .sort((a, b) => stats.countries[b] - stats.countries[a])[0] || null;

    const topCity = Object.keys(stats.cities || {})
      .sort((a, b) => stats.cities[b] - stats.cities[a])[0] || null;

    return {
      clicks: stats.clicks || 0,
      lastClicked: stats.lastClicked || null,
      topReferrer,
      topCountry,
      topCity,
      referrers: stats.referrers || {},
      countries: stats.countries || {},
      cities: stats.cities || {}
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return { clicks: 0, lastClicked: null, topReferrer: null, topCountry: null, topCity: null, referrers: {}, countries: {}, cities: {} };
  }
}

// ---------------------------------------------------------------------------
// Admin Handlers
// ---------------------------------------------------------------------------
async function handleAdmin(request, env, path) {
  if (path === '/admin' || path === '/admin/') {
    return htmlResponse(adminHtml);
  }

  if (path === '/admin/guide' || path === '/admin/guide/') {
    return htmlResponse(guideHtml);
  }

  if (path === '/admin/login' && request.method === 'POST') {
    return handleLogin(request, env);
  }

  const authToken = request.headers.get('Authorization');
  if (!verifyAuth(authToken, env)) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  if (path === '/admin/create' && request.method === 'POST') {
    return handleCreate(request, env);
  }

  if (path === '/admin/export' && request.method === 'GET') {
    return handleExport(env);
  }

  if (path === '/admin/list' && request.method === 'GET') {
    return handleList(env);
  }

  if (path.startsWith('/admin/stats/')) {
    const shortCode = path.split('/admin/stats/')[1];
    return handleGetStats(env, shortCode);
  }

  if (path.startsWith('/admin/clicklog/')) {
    const shortCode = path.split('/admin/clicklog/')[1];
    return handleGetClickLog(env, shortCode);
  }

  if (path.startsWith('/admin/delete/') && request.method === 'DELETE') {
    const shortCode = path.split('/admin/delete/')[1];
    return handleDelete(env, shortCode);
  }

  if (path === '/admin/bulk-delete' && request.method === 'POST') {
    return handleBulkDelete(request, env);
  }

  if (path === '/admin/edit' && request.method === 'POST') {
    return handleEditShortCode(request, env);
  }

  if (path === '/admin/update-title' && request.method === 'POST') {
    return handleUpdateTitle(request, env);
  }

  if (path === '/admin/update-tags' && request.method === 'POST') {
    return handleUpdateTags(request, env);
  }

  if (path === '/admin/bulk-create' && request.method === 'POST') {
    return handleBulkCreate(request, env);
  }

  if (path === '/admin/api-key' && request.method === 'GET') {
    return jsonResponse({ apiKey: env.API_KEY || '' });
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleLogin(request, env) {
  try {
    const { password } = await request.json();

    if (!password) {
      return jsonResponse({ error: 'Password required' }, 400);
    }

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';

    if (checkPassword(password, correctPassword)) {
      const token = btoa(password + ':' + Date.now());
      return jsonResponse({ success: true, token });
    }

    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

function verifyAuth(token, env) {
  if (!token) return false;

  try {
    const decoded = atob(token);
    const lastColon = decoded.lastIndexOf(':');
    if (lastColon === -1) return false;
    const password = decoded.substring(0, lastColon);
    const timestamp = decoded.substring(lastColon + 1);

    const correctPassword = env.ADMIN_PASSWORD || 'changeme';
    if (!checkPassword(password, correctPassword)) {
      return false;
    }

    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (tokenAge > maxAge) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

async function handleGetStats(env, shortCode) {
  const stats = await getStats(env, shortCode);
  return jsonResponse(stats);
}

async function handleGetClickLog(env, shortCode) {
  const log = await getClickLog(env, shortCode);
  return jsonResponse({ log });
}

async function handleCreate(request, env) {
  try {
    const { url, title, shortCode, tags } = await request.json();

    if (!url) {
      return jsonResponse({ error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ error: 'Invalid URL format. URL must start with http:// or https://' }, 400);
    }

    const cleanTags = sanitizeTags(tags);
    if (cleanTags === null) {
      return jsonResponse({ error: 'Too many tags (max 10) or tag too long (max 50 chars)' }, 400);
    }

    let code = shortCode;
    if (code) {
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ error: 'Short code already exists' }, 409);
      }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({
          error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
        }, 400);
      }
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    await env.URLS.put(code, serializeUrlValue(url, title, cleanTags));

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      title: title || null,
      tags: cleanTags,
      shortUrl: CANONICAL_DOMAIN + '/' + code,
    });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleList(env) {
  try {
    const list = await env.URLS.list();
    const urls = await Promise.all(
      list.keys
        .filter(key => !key.name.startsWith('stats:') && !key.name.startsWith('clicklog:'))
        .map(async (key) => {
          const raw = await env.URLS.get(key.name);
          const parsed = parseUrlValue(raw);
          return {
            shortCode: key.name,
            url: parsed.url,
            title: parsed.title || null,
            tags: parsed.tags || [],
            createdAt: parsed.createdAt,
          };
        })
    );

    // Sort newest first (entries without createdAt go to the end)
    urls.sort((a, b) => {
      if (a.createdAt && b.createdAt) return b.createdAt - a.createdAt;
      if (a.createdAt) return -1;
      if (b.createdAt) return 1;
      return 0;
    });

    return jsonResponse({ urls });
  } catch (error) {
    return jsonResponse({ error: 'Failed to list URLs' }, 500);
  }
}

async function handleDelete(env, shortCode) {
  if (!shortCode) {
    return jsonResponse({ error: 'Short code required' }, 400);
  }

  const raw = await env.URLS.get(shortCode);
  if (!raw) {
    return jsonResponse({ error: 'Short URL not found' }, 404);
  }

  await env.URLS.delete(shortCode);
  await env.URLS.delete('stats:' + shortCode);
  await env.URLS.delete('clicklog:' + shortCode);
  return jsonResponse({ success: true });
}

async function handleBulkDelete(request, env) {
  try {
    const { codes } = await request.json();
    if (!Array.isArray(codes) || codes.length === 0) {
      return jsonResponse({ error: 'No codes provided' }, 400);
    }

    let deleted = 0;
    await Promise.all(codes.map(async (code) => {
      const raw = await env.URLS.get(code);
      if (raw) {
        await env.URLS.delete(code);
        await env.URLS.delete('stats:' + code);
        await env.URLS.delete('clicklog:' + code);
        deleted++;
      }
    }));

    return jsonResponse({ success: true, deleted });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleEditShortCode(request, env) {
  try {
    const { oldCode, newCode } = await request.json();

    if (!oldCode || !newCode) {
      return jsonResponse({ error: 'Both oldCode and newCode are required' }, 400);
    }

    if (!/^[a-zA-Z0-9_-]{3,20}$/.test(newCode)) {
      return jsonResponse({
        error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
      }, 400);
    }

    const raw = await env.URLS.get(oldCode);
    if (!raw) {
      return jsonResponse({ error: 'Original short code not found' }, 404);
    }

    const existingNew = await env.URLS.get(newCode);
    if (existingNew) {
      return jsonResponse({ error: 'New short code already exists' }, 409);
    }

    // Copy URL data to new key
    await env.URLS.put(newCode, raw);

    // Copy stats if they exist
    const statsKey = 'stats:' + oldCode;
    const statsData = await env.URLS.get(statsKey);
    if (statsData) {
      await env.URLS.put('stats:' + newCode, statsData);
      await env.URLS.delete(statsKey);
    }

    // Copy click log if it exists
    const logKey = 'clicklog:' + oldCode;
    const logData = await env.URLS.get(logKey);
    if (logData) {
      await env.URLS.put('clicklog:' + newCode, logData);
      await env.URLS.delete(logKey);
    }

    // Delete old key
    await env.URLS.delete(oldCode);

    return jsonResponse({ success: true, oldCode, newCode });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleUpdateTitle(request, env) {
  try {
    const { shortCode, title } = await request.json();

    if (!shortCode) {
      return jsonResponse({ error: 'shortCode is required' }, 400);
    }

    const raw = await env.URLS.get(shortCode);
    if (!raw) {
      return jsonResponse({ error: 'Short code not found' }, 404);
    }

    const parsed = parseUrlValue(raw);
    parsed.title = title || null;
    if (!parsed.createdAt) parsed.createdAt = Date.now();

    await env.URLS.put(shortCode, JSON.stringify(parsed));

    return jsonResponse({ success: true, shortCode, title: parsed.title });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleUpdateTags(request, env) {
  try {
    const { shortCode, tags } = await request.json();

    if (!shortCode) {
      return jsonResponse({ error: 'shortCode is required' }, 400);
    }

    const raw = await env.URLS.get(shortCode);
    if (!raw) {
      return jsonResponse({ error: 'Short code not found' }, 404);
    }

    const parsed = parseUrlValue(raw);
    const cleanTags = sanitizeTags(tags);
    if (cleanTags === null) {
      return jsonResponse({ error: 'Too many tags (max 10) or tag too long (max 50 chars)' }, 400);
    }
    parsed.tags = cleanTags;
    if (!parsed.createdAt) parsed.createdAt = Date.now();

    await env.URLS.put(shortCode, JSON.stringify(parsed));

    return jsonResponse({ success: true, shortCode, tags: parsed.tags });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

async function handleExport(env) {
  try {
    const list = await env.URLS.list();
    const urls = await Promise.all(
      list.keys
        .filter(key => !key.name.startsWith('stats:') && !key.name.startsWith('clicklog:'))
        .map(async (key) => {
          const raw = await env.URLS.get(key.name);
          const parsed = parseUrlValue(raw);
          return {
            shortCode: key.name,
            url: parsed.url,
            title: parsed.title || '',
            tags: (parsed.tags || []).join(';'),
            createdAt: parsed.createdAt ? new Date(parsed.createdAt).toISOString() : '',
          };
        })
    );

    const header = 'shortCode,url,title,tags,createdAt';
    const rows = urls.map(u => {
      const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
      return [esc(u.shortCode), esc(u.url), esc(u.title), esc(u.tags), esc(u.createdAt)].join(',');
    });
    const csv = header + '\n' + rows.join('\n');

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="urls-export.csv"',
      },
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to export URLs' }, 500);
  }
}

async function handleBulkCreate(request, env) {
  try {
    const { urls } = await request.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return jsonResponse({ error: 'urls array is required' }, 400);
    }

    if (urls.length > 500) {
      return jsonResponse({ error: 'Maximum 500 URLs per batch' }, 400);
    }

    const results = [];
    for (const entry of urls) {
      const longUrl = typeof entry === 'string' ? entry : entry.url;
      const title = typeof entry === 'object' ? (entry.title || null) : null;
      const rawTags = typeof entry === 'object' && Array.isArray(entry.tags) ? entry.tags : [];
      const cleanTags = sanitizeTags(rawTags);

      if (!longUrl || !isValidUrl(longUrl)) {
        results.push({ url: longUrl || '', error: 'Invalid URL' });
        continue;
      }

      if (cleanTags === null) {
        results.push({ url: longUrl, error: 'Too many tags or tag too long' });
        continue;
      }

      let code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }

      if (await env.URLS.get(code)) {
        results.push({ url: longUrl, error: 'Failed to generate unique short code' });
        continue;
      }

      await env.URLS.put(code, serializeUrlValue(longUrl, title, cleanTags));
      results.push({ shortCode: code, url: longUrl, title, tags: cleanTags });
    }

    return jsonResponse({ success: true, results });
  } catch (error) {
    return jsonResponse({ error: 'Invalid request' }, 400);
  }
}

// ---------------------------------------------------------------------------
// API Handlers
// ---------------------------------------------------------------------------
async function handleApi(request, env, path) {
  if (path === '/api/shorten' && request.method === 'POST') {
    return handleApiShorten(request, env);
  }

  if (path === '/api/peek' && request.method === 'GET') {
    return handleApiPeek(request);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleApiShorten(request, env) {
  try {
    const apiKey = request.headers.get('X-API-Key');
    const correctApiKey = env.API_KEY;

    if (!verifyApiKey(apiKey, correctApiKey)) {
      return jsonResponse({
        success: false,
        error: 'Invalid API key'
      }, 401);
    }

    const { url, title, shortCode } = await request.json();

    if (!url) {
      return jsonResponse({ success: false, error: 'URL is required' }, 400);
    }

    if (!isValidUrl(url)) {
      return jsonResponse({ success: false, error: 'Invalid URL format. URL must start with http:// or https://' }, 400);
    }

    let code = shortCode;
    if (code) {
      const existing = await env.URLS.get(code);
      if (existing) {
        return jsonResponse({ success: false, error: 'Short code already exists' }, 409);
      }
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return jsonResponse({
          success: false,
          error: 'Invalid short code. Use 3-20 characters: letters, numbers, underscore, or hyphen'
        }, 400);
      }
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (await env.URLS.get(code) && attempts < 10) {
        code = generateShortCode();
        attempts++;
      }
    }

    await env.URLS.put(code, serializeUrlValue(url, title));

    const shortUrl = CANONICAL_DOMAIN + '/' + code;

    return jsonResponse({
      success: true,
      shortCode: code,
      url,
      title: title || null,
      shortUrl,
    });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Invalid request', message: error.message }, 400);
  }
}

// ---------------------------------------------------------------------------
// API: GET /api/peek?url= — follow redirect chain server-side
// ---------------------------------------------------------------------------
async function handleApiPeek(request) {
  try {
    const requestUrl = new URL(request.url);
    const targetUrl = requestUrl.searchParams.get('url');
    if (!targetUrl) {
      return jsonResponse({ success: false, error: 'url parameter is required' }, 400);
    }

    let decodedUrl;
    try { decodedUrl = decodeURIComponent(targetUrl); } catch(_) { decodedUrl = targetUrl; }

    if (!isValidUrl(decodedUrl)) {
      return jsonResponse({ success: false, error: 'Invalid URL. Must start with http:// or https://' }, 400);
    }

    const MAX_HOPS = 10;
    const chain = [];
    const seen = new Set();
    let currentUrl = decodedUrl;
    const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

    for (let hop = 0; hop < MAX_HOPS; hop++) {
      if (seen.has(currentUrl)) {
        chain.push({ url: currentUrl, status: 0, note: 'loop' });
        break;
      }
      seen.add(currentUrl);

      let response;
      try {
        response = await fetch(currentUrl, {
          method: 'GET',
          redirect: 'manual',
          headers: {
            'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
        });
      } catch (fetchErr) {
        chain.push({ url: currentUrl, status: 0, note: 'fetch_error' });
        return jsonResponse({ success: false, error: 'Network error: ' + fetchErr.message, chain });
      }

      const status = response.status;
      if (response.body) { try { await response.body.cancel(); } catch(_) {} }
      chain.push({ url: currentUrl, status });

      if (status >= 300 && status < 400) {
        const location = response.headers.get('Location');
        if (!location) break;
        let nextUrl;
        try { nextUrl = new URL(location, currentUrl).toString(); } catch(_) { break; }
        const proto = new URL(nextUrl).protocol;
        if (proto !== 'http:' && proto !== 'https:') {
          chain.push({ url: nextUrl, status: 0, note: 'non_http' });
          break;
        }
        currentUrl = nextUrl;
      } else {
        break;
      }
    }

    const last = chain[chain.length - 1];
    if (last && last.status >= 300 && last.status < 400) {
      return jsonResponse({ success: false, error: 'Too many redirects (limit: ' + MAX_HOPS + ')', chain });
    }
    return jsonResponse({ success: true, finalUrl: last ? last.url : decodedUrl, chain });
  } catch (error) {
    return jsonResponse({ success: false, error: 'Internal error: ' + error.message }, 500);
  }
}

// ---------------------------------------------------------------------------
// Redirect Handler with Click Tracking
// ---------------------------------------------------------------------------
async function handleRedirect(env, shortCode, request) {
  const raw = await env.URLS.get(shortCode);

  if (!raw) {
    const html = '<!DOCTYPE html><html><head><title>Not Found</title><style>body{font-family:Inter,sans-serif;max-width:600px;margin:100px auto;text-align:center;color:#353535;}h1{color:#e73b42;}</style></head><body><h1>404 - Short URL Not Found</h1><p>The short URL "/' + shortCode + '" does not exist.</p><p><a href="/" style="color:#e73b42;">Go to home</a></p></body></html>';
    return htmlResponse(html, 404);
  }

  const parsed = parseUrlValue(raw);
  await trackClick(env, shortCode, request);
  return Response.redirect(parsed.url, 302);
}

// ---------------------------------------------------------------------------
// Main Worker
// ---------------------------------------------------------------------------
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
        },
      });
    }

    // /clean and /admin always live on chom.pm now; chmp.me keeps serving the
    // homepage/subdomain directory as before. 307 preserves method + body for
    // any direct API calls still pointed at the old domain.
    if (url.hostname === 'chmp.me' && (path === '/clean' || path === '/admin' || path.startsWith('/admin/'))) {
      return Response.redirect(CANONICAL_DOMAIN + path + url.search, 307);
    }

    if (path.startsWith('/admin')) {
      return handleAdmin(request, env, path);
    }

    if (path.startsWith('/api')) {
      return handleApi(request, env, path);
    }

    if (path === '/clean/manifest.json') {
      const manifest = {
        name: 'URL Strip',
        short_name: 'URL Strip',
        description: 'Clean tracking parameters from URLs',
        start_url: '/clean',
        display: 'standalone',
        background_color: '#fdfdfd',
        theme_color: '#e73b42',
        icons: [
          { src: '/clean/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/clean/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      };
      return new Response(JSON.stringify(manifest, null, 2), {
        headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (path === '/manifest.json') {
      const manifest = {
        name: 'chmp.me URL Shortener',
        short_name: 'chmp.me',
        description: 'Fast, simple URL shortener at chmp.me',
        start_url: '/index',
        display: 'standalone',
        background_color: '#fdfdfd',
        theme_color: '#e73b42',
        icons: [
          { src: 'https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      };
      return new Response(JSON.stringify(manifest, null, 2), {
        headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (path === '/' || path === '/index') {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>chmp.me</title>
  <link rel="icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon.ico">
  <link rel="apple-touch-icon" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="16x16" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="https://ik.imagekit.io/chompchomp/Chomp%20URL%20Shortener/icon-512.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#e73b42">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="chmp.me">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    :root {
      --color-bg: #fdfdfd;
      --color-text: #353535;
      --color-accent: #e73b42;
      --color-accent-hover: #d12d34;
      --color-card-bg: #f5f5f5;
      --color-border: #e0e0e0;
      --color-text-muted: #7d7d7d;
      --color-text-light: #9d9d9d;
      --accent-dim: rgba(231,59,66,0.07);
      --radius: 8px;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --color-bg: #231f1f;
        --color-text: #d9d4d4;
        --color-accent: #ff6b7a;
        --color-accent-hover: #ff8590;
        --color-card-bg: #2b2626;
        --color-border: #3b3636;
        --color-text-muted: #b9b4b4;
        --color-text-light: #948f8f;
        --accent-dim: rgba(255,107,122,0.08);
      }
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      font-size: 17px;
      -webkit-font-smoothing: antialiased;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--color-bg);
      color: var(--color-text);
      min-height: 100vh;
      padding: 48px 20px 80px;
      line-height: 1.7;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .header {
      text-align: center;
      margin-bottom: 48px;
    }

    .hero {
      max-width: 540px;
      width: 100%;
      display: block;
      margin: 0 auto;
    }

    .container {
      max-width: 520px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 0.65em;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 12px;
      padding-left: 2px;
    }

    .section-heading {
      margin-bottom: 16px;
      padding-left: 2px;
    }

    .section-heading-title {
      font-size: 0.65em;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--color-text-muted);
      margin-bottom: 6px;
    }

    .section-heading-sub {
      font-size: 0.85em;
      color: var(--color-text-muted);
      line-height: 1.5;
    }

    .lab-divider {
      height: 1px;
      background: var(--color-border);
      margin: 26px 0 18px;
    }

    .top-section {
      margin-bottom: 10px;
    }

    .top-section > .accordion,
    .top-section > .card {
      margin-bottom: 8px;
    }

    .top-section > :last-child {
      margin-bottom: 0;
    }

    .card {
      display: flex;
      align-items: center;
      gap: 12px;
      background-color: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: 13px 16px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    @media (prefers-color-scheme: dark) {
      .card:hover {
        box-shadow: 0 4px 12px rgba(255,107,122,0.2);
      }
    }

    .card-body {
      flex: 1;
      min-width: 0;
    }

    .card-name {
      font-size: 0.95em;
      font-weight: 500;
      margin-bottom: 2px;
      color: var(--color-text);
    }

    .card-sub {
      font-size: 0.8em;
      color: var(--color-text-light);
      line-height: 1.45;
    }

    .section-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .accordion {
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      background-color: var(--color-card-bg);
      overflow: hidden;
    }

    .accordion-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 13px 16px;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      line-height: 1.7;
      transition: background-color 0.2s;
    }

    .accordion-trigger:hover,
    .accordion.open .accordion-trigger {
      background-color: var(--accent-dim);
    }

    .accordion-trigger-body {
      flex: 1;
      min-width: 0;
    }

    .accordion-title {
      font-size: 0.95em;
      font-weight: 500;
      margin-bottom: 2px;
      color: var(--color-text);
    }

    .accordion-quip {
      font-size: 0.8em;
      color: var(--color-text-muted);
      font-style: italic;
    }

    .accordion-chevron {
      font-size: 0.65rem;
      color: var(--color-text-light);
      transition: transform 0.25s ease, color 0.15s ease;
      line-height: 1;
      flex-shrink: 0;
    }

    .accordion.open .accordion-chevron {
      transform: rotate(180deg);
      color: var(--color-accent);
    }

    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease;
    }

    .accordion.open .accordion-content {
      max-height: 1200px;
    }

    .accordion-inner {
      padding: 4px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .inner-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 9px 12px;
      border-radius: 6px;
      border: 1px solid var(--color-border);
      transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }

    .inner-card:hover {
      background-color: var(--accent-dim);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    @media (prefers-color-scheme: dark) {
      .inner-card:hover {
        box-shadow: 0 2px 8px rgba(255,107,122,0.15);
      }
    }

    .inner-card-body {
      flex: 1;
      min-width: 0;
    }

    .inner-card-name {
      font-size: 0.82em;
      font-weight: 500;
      margin-bottom: 1px;
      color: var(--color-text);
    }

    .inner-card-sub {
      font-size: 0.68em;
      color: var(--color-text-light);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nested-accordion {
      border-radius: 6px;
      border: 1px solid var(--color-border);
      overflow: hidden;
    }

    .nested-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      color: inherit;
      transition: background-color 0.2s;
    }

    .nested-trigger:hover,
    .nested-accordion.open .nested-trigger {
      background-color: var(--accent-dim);
    }

    .nested-trigger-label {
      font-size: 0.65em;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--color-text-muted);
    }

    .nested-chevron {
      font-size: 0.55rem;
      color: var(--color-text-light);
      transition: transform 0.2s ease, color 0.15s ease;
      flex-shrink: 0;
    }

    .nested-accordion.open .nested-chevron {
      transform: rotate(180deg);
      color: var(--color-accent);
    }

    .nested-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .nested-accordion.open .nested-content {
      max-height: 600px;
    }

    .nested-inner {
      padding: 3px 6px 6px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    footer {
      text-align: center;
      margin-top: 56px;
    }

    footer a {
      font-size: 0.8em;
      color: var(--color-text-light);
      letter-spacing: 0.04em;
      transition: color 0.2s;
    }

    footer a:hover {
      color: var(--color-accent);
    }
  </style>
</head>

<body>

  <header class="header">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://ik.imagekit.io/chompchomp/chompme%20index%20dark.jpg">
      <img class="hero" src="https://ik.imagekit.io/chompchomp/chompme%20index%20light.jpg">
    </picture>
  </header>

  <div class="container">

    <div class="top-section">
      <div class="section-label">Chomp Chomp</div>

      <div class="accordion" id="acc-chomp">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-chomp')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Chom.ps</div>
            <div class="accordion-quip">Recipes, stories, and such.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/index.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Home</div>
                <div class="inner-card-sub">chom.ps</div>
              </div>
            </a>
            <a href="https://chom.ps/about.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">About</div>
                <div class="inner-card-sub">Who · What · Why</div>
              </div>
            </a>
            <a href="https://chom.ps/stories.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Stories</div>
                <div class="inner-card-sub">Writing · Essays · Notes</div>
              </div>
            </a>
            <a href="https://chom.ps/recipes.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Recipes</div>
                <div class="inner-card-sub">Recipes · Baking · Cooking</div>
              </div>
            </a>
            <a href="https://chom.ps/lexicon.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Lexicon</div>
                <div class="inner-card-sub">Terms · Definitions · Fragments</div>
              </div>
            </a>
            <a href="https://chom.ps/reading-list.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Reading List</div>
                <div class="inner-card-sub">Books · Essays · References</div>
              </div>
            </a>
            <a href="https://chom.ps/playlists.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Playlists</div>
                <div class="inner-card-sub">Listening · Mood · Sound</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <a href="https://chom.ps/store" class="card">
        <div class="card-body">
          <div class="card-name">Chomp Chomp</div>
          <div class="card-sub">Small batches · Made to order · In small ovens</div>
        </div>
      </a>
    </div>

    <div class="lab-divider"></div>

    <div class="section-heading">
      <div class="section-heading-title">Kitchen Counter</div>
      <div class="section-heading-sub">Bakeware, utensils, and other useful things.</div>
    </div>

    <div class="section-group">

      <div class="accordion" id="acc-everyday">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-everyday')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Measuring Spoons</div>
            <div class="accordion-quip">Small tools, used often.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/tools/index.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Spoon Set</div>
                <div class="inner-card-sub">All the tools</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/color.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Color</div>
                <div class="inner-card-sub">Palettes · Conversions · Contrast</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/convert.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Convert</div>
                <div class="inner-card-sub">Length · Volume · Weight</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/currency.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Currency</div>
                <div class="inner-card-sub">Exchange Rates · ECB</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/random.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Randomness</div>
                <div class="inner-card-sub">Numbers · Dice · Strings</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/text.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Text</div>
                <div class="inner-card-sub">Transform · Sort · Clean</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/time.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Time</div>
                <div class="inner-card-sub">Timestamps · Timezones</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/weather.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Weather</div>
                <div class="inner-card-sub">Temperature · Comfort</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="accordion" id="acc-dev">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-dev')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Spatulas</div>
            <div class="accordion-quip">Stirring, folding, and mixing.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/tools/encode.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Encode</div>
                <div class="inner-card-sub">URI · Base64 · Hash</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/ip.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Whois</div>
                <div class="inner-card-sub">IP · Owner · Location</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/subnet.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Subnet</div>
                <div class="inner-card-sub">CIDR · Network Range</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/json" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">JSON</div>
                <div class="inner-card-sub">Format · Validate · Explore</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="accordion" id="acc-ipsum">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-ipsum')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Mixing Bowls</div>
            <div class="accordion-quip">Words for when you need words.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://chom.ps/tools/ipsum.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Latin &amp; Whatnot</div>
                <div class="inner-card-sub">All the Ipsums · But not Lorem ipsum dolor sit amet</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/baking.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Baking Ipsum</div>
                <div class="inner-card-sub">Southern sayings · Baking wisdom</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/dad-jokes.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Dad Jokes Ipsum</div>
                <div class="inner-card-sub">Normal · Random · Ionesco</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/dante.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Inferno Ipsum</div>
                <div class="inner-card-sub">Dante · Divine Comedy</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/epic.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Epic Ipsum</div>
                <div class="inner-card-sub">Homer · Hesiod</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/nautical.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Nautical Ipsum</div>
                <div class="inner-card-sub">Moby-Dick · Maritime lore</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/philosophy.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Philosophy Ipsum</div>
                <div class="inner-card-sub">&#381;i&#382;ek · Marx · Hegel</div>
              </div>
            </a>
            <a href="https://chom.ps/tools/shakespeare.html" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Shakespeare Love &amp; Hate</div>
                <div class="inner-card-sub">Declarations · Insults · Collision</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="accordion" id="acc-apps">
        <button class="accordion-trigger" onclick="toggleAccordion('acc-apps')">
          <div class="accordion-trigger-body">
            <div class="accordion-title">Spice Rack</div>
            <div class="accordion-quip">Things that do things.</div>
          </div>
          <span class="accordion-chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <div class="accordion-inner">
            <a href="https://dl.chmp.me/login" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Chompy DL</div>
                <div class="inner-card-sub">Save the Media (Render)</div>
              </div>
            </a>
            <a href="https://clip.chmp.me/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Clipper</div>
                <div class="inner-card-sub">Save the news</div>
              </div>
            </a>
            <a href="https://cooling.chmp.me/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Cooling</div>
                <div class="inner-card-sub">Not in the oven</div>
              </div>
            </a>
            <a href="https://library.chompchomp.cc/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Library</div>
                <div class="inner-card-sub">Chomp OPAC</div>
              </div>
            </a>
            <a href="https://recipes.chompchomp.cc/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Recipe Box</div>
                <div class="inner-card-sub">IYKYK</div>
              </div>
            </a>
            <a href="https://fly.io/" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Send</div>
                <div class="inner-card-sub">The Newsletter Experience (fly.io)</div>
              </div>
            </a>
            <a href="https://summit.chmp.me" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">Summit</div>
                <div class="inner-card-sub">It Happens</div>
              </div>
            </a>
            <a href="https://chom.pm/admin" class="inner-card">
              <div class="inner-card-body">
                <div class="inner-card-name">URL Shortener</div>
                <div class="inner-card-sub">Share the chmp</div>
              </div>
            </a>
          </div>
        </div>
      </div>

    </div>

    <div class="lab-divider"></div>

    <div class="section-label">Postscript</div>

    <a href="https://ps.chom.ps" class="card">
      <div class="card-body">
        <div class="card-name">.ps</div>
        <div class="card-sub">Cookies, etc. &hellip; and so on.</div>
      </div>
    </a>

  </div>

  <footer>
    <a href="https://chom.ps">Chomp Chomp chom.ps</a>
  </footer>

  <script>
    function toggleAccordion(id) {
      document.getElementById(id).classList.toggle('open');
    }
    function toggleNested(id) {
      document.getElementById(id).classList.toggle('open');
    }
  </script>

</body>
</html>`;
      return htmlResponse(html);
    }

    if (path === '/clean') {
      return htmlResponse(urlCleanerHtml);
    }

    const shortCode = path.substring(1);
    if (shortCode) {
      return handleRedirect(env, shortCode, request);
    }

    return jsonResponse({ error: 'Not found' }, 404);
  },
};
