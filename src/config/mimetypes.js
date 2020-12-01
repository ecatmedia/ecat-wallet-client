const mimes = {
  "application/vnd.lotus-1-2-3": "123",
  "text/vnd.in3d.3dml": "3dml",
  "image/x-3ds": "3ds",
  "video/3gpp2": "3g2",
  "video/3gpp": "3gp",
  "application/x-7z-compressed": "7z",
  "application/x-authorware-bin": "x32",
  "audio/x-aac": "aac",
  "application/x-authorware-map": "aam",
  "application/x-authorware-seg": "aas",
  "application/x-abiword": "abw",
  "application/pkix-attr-cert": "ac",
  "application/vnd.americandynamics.acc": "acc",
  "application/x-ace-compressed": "ace",
  "application/vnd.acucobol": "acu",
  "application/vnd.acucorp": "atc",
  "audio/adpcm": "adp",
  "application/vnd.audiograph": "aep",
  "application/x-font-type1": "pfm",
  "application/vnd.ibm.modcap": "listafp",
  "application/vnd.ahead.space": "ahead",
  "application/postscript": "ps",
  "audio/x-aiff": "aiff",
  "application/vnd.adobe.air-application-installer-package+zip": "air",
  "application/vnd.dvb.ait": "ait",
  "application/vnd.amiga.ami": "ami",
  "application/vnd.android.package-archive": "apk",
  "text/cache-manifest": "appcache",
  "application/x-ms-application": "application",
  "application/vnd.lotus-approach": "apr",
  "application/x-freearc": "arc",
  "application/pgp-signature": "sig",
  "video/x-ms-asf": "asx",
  "text/x-asm": "s",
  "application/vnd.accpac.simply.aso": "aso",
  "application/atom+xml": "atom",
  "application/atomcat+xml": "atomcat",
  "application/atomsvc+xml": "atomsvc",
  "application/vnd.antix.game-component": "atx",
  "audio/basic": "snd",
  "video/x-msvideo": "avi",
  "application/applixware": "aw",
  "application/vnd.airzip.filesecure.azf": "azf",
  "application/vnd.airzip.filesecure.azs": "azs",
  "application/vnd.amazon.ebook": "azw",
  "application/x-msdownload": "msi",
  "application/x-bcpio": "bcpio",
  "application/x-font-bdf": "bdf",
  "application/vnd.syncml.dm+wbxml": "bdm",
  "application/vnd.realvnc.bed": "bed",
  "application/vnd.fujitsu.oasysprs": "bh2",
  "application/octet-stream": "so",
  "application/x-blorb": "blorb",
  "application/vnd.bmi": "bmi",
  "image/bmp": "bmp",
  "application/vnd.framemaker": "maker",
  "application/vnd.previewsystems.box": "box",
  "application/x-bzip2": "bz2",
  "image/prs.btif": "btif",
  "application/x-bzip": "bz",
  "application/vnd.cluetrust.cartomobile-config": "c11amc",
  "application/vnd.cluetrust.cartomobile-config-pkg": "c11amz",
  "application/vnd.clonk.c4group": "c4u",
  "application/vnd.ms-cab-compressed": "cab",
  "audio/x-caf": "caf",
  "application/vnd.tcpdump.pcap": "pcap",
  "application/vnd.curl.car": "car",
  "application/vnd.ms-pki.seccat": "cat",
  "application/x-cbr": "cbz",
  "application/x-director": "w3d",
  "text/x-c": "h",
  "application/ccxml+xml": "ccxml",
  "application/vnd.contact.cmsg": "cdbcmsg",
  "application/x-netcdf": "nc",
  "application/vnd.mediastation.cdkey": "cdkey",
  "application/cdmi-capability": "cdmia",
  "application/cdmi-container": "cdmic",
  "application/cdmi-domain": "cdmid",
  "application/cdmi-object": "cdmio",
  "application/cdmi-queue": "cdmiq",
  "chemical/x-cdx": "cdx",
  "application/vnd.chemdraw+xml": "cdxml",
  "application/vnd.cinderella": "cdy",
  "application/pkix-cert": "cer",
  "application/x-cfs-compressed": "cfs",
  "image/cgm": "cgm",
  "application/x-chat": "chat",
  "application/vnd.ms-htmlhelp": "chm",
  "application/vnd.kde.kchart": "chrt",
  "chemical/x-cif": "cif",
  "application/vnd.anser-web-certificate-issue-initiation": "cii",
  "application/vnd.ms-artgalry": "cil",
  "application/vnd.claymore": "cla",
  "application/java-vm": "class",
  "application/vnd.crick.clicker.keyboard": "clkk",
  "application/vnd.crick.clicker.palette": "clkp",
  "application/vnd.crick.clicker.template": "clkt",
  "application/vnd.crick.clicker.wordbank": "clkw",
  "application/vnd.crick.clicker": "clkx",
  "application/x-msclip": "clp",
  "application/vnd.cosmocaller": "cmc",
  "chemical/x-cmdf": "cmdf",
  "chemical/x-cml": "cml",
  "application/vnd.yellowriver-custom-menu": "cmp",
  "image/x-cmx": "cmx",
  "application/vnd.rim.cod": "cod",
  "text/plain": "txt",
  "application/x-cpio": "cpio",
  "application/mac-compactpro": "cpt",
  "application/x-mscardfile": "crd",
  "application/pkix-crl": "crl",
  "application/x-x509-ca-cert": "der",
  "application/vnd.rig.cryptonote": "cryptonote",
  "application/x-csh": "csh",
  "chemical/x-csml": "csml",
  "application/vnd.commonspace": "csp",
  "text/css": "css",
  "text/csv": "csv",
  "application/cu-seeme": "cu",
  "text/vnd.curl": "curl",
  "application/prs.cww": "cww",
  "model/vnd.collada+xml": "dae",
  "application/vnd.mobius.daf": "daf",
  "application/vnd.dart": "dart",
  "application/vnd.fdsn.seed": "seed",
  "application/davmount+xml": "davmount",
  "application/docbook+xml": "dbk",
  "text/vnd.curl.dcurl": "dcurl",
  "application/vnd.oma.dd2+xml": "dd2",
  "application/vnd.fujixerox.ddd": "ddd",
  "application/x-debian-package": "udeb",
  "application/vnd.dreamfactory": "dfac",
  "application/x-dgc-compressed": "dgc",
  "application/vnd.mobius.dis": "dis",
  "image/vnd.djvu": "djvu",
  "application/x-apple-diskimage": "dmg",
  "application/vnd.dna": "dna",
  "application/msword": "dot",
  "application/vnd.ms-word.document.macroenabled.12": "docm",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-word.template.macroenabled.12": "dotm",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": "dotx",
  "application/vnd.osgi.dp": "dp",
  "application/vnd.dpgraph": "dpg",
  "audio/vnd.dra": "dra",
  "text/prs.lines.tag": "dsc",
  "application/dssc+der": "dssc",
  "application/x-dtbook+xml": "dtb",
  "application/xml-dtd": "dtd",
  "audio/vnd.dts": "dts",
  "audio/vnd.dts.hd": "dtshd",
  "video/vnd.dvb.file": "dvb",
  "application/x-dvi": "dvi",
  "model/vnd.dwf": "dwf",
  "image/vnd.dwg": "dwg",
  "image/vnd.dxf": "dxf",
  "application/vnd.spotfire.dxp": "dxp",
  "audio/vnd.nuera.ecelp4800": "ecelp4800",
  "audio/vnd.nuera.ecelp7470": "ecelp7470",
  "audio/vnd.nuera.ecelp9600": "ecelp9600",
  "application/ecmascript": "ecma",
  "application/vnd.novadigm.edm": "edm",
  "application/vnd.novadigm.edx": "edx",
  "application/vnd.picsel": "efif",
  "application/vnd.pg.osasli": "ei6",
  "application/x-msmetafile": "wmz",
  "message/rfc822": "mime",
  "application/emma+xml": "emma",
  "audio/vnd.digital-winds": "eol",
  "application/vnd.ms-fontobject": "eot",
  "application/epub+zip": "epub",
  "application/vnd.eszigno3+xml": "et3",
  "application/vnd.osgi.subsystem": "esa",
  "application/vnd.epson.esf": "esf",
  "text/x-setext": "etx",
  "application/x-eva": "eva",
  "application/x-envoy": "evy",
  "application/exi": "exi",
  "application/vnd.novadigm.ext": "ext",
  "application/vnd.ezpix-album": "ez2",
  "application/vnd.ezpix-package": "ez3",
  "application/andrew-inset": "ez",
  "video/x-f4v": "f4v",
  "text/x-fortran": "f",
  "image/vnd.fastbidsheet": "fbs",
  "application/vnd.adobe.formscentral.fcdt": "fcdt",
  "application/vnd.isac.fcs": "fcs",
  "application/vnd.fdf": "fdf",
  "application/vnd.denovo.fcselayout-link": "fe_launch",
  "application/vnd.fujitsu.oasysgp": "fg5",
  "image/x-freehand": "fh",
  "application/x-xfig": "fig",
  "audio/x-flac": "flac",
  "video/x-fli": "fli",
  "application/vnd.micrografx.flo": "flo",
  "video/x-flv": "flv",
  "application/vnd.kde.kivio": "flw",
  "text/vnd.fmi.flexstor": "flx",
  "text/vnd.fly": "fly",
  "application/vnd.frogans.fnc": "fnc",
  "image/vnd.fpx": "fpx",
  "application/vnd.fsc.weblaunch": "fsc",
  "image/vnd.fst": "fst",
  "application/vnd.fluxtime.clip": "ftc",
  "application/vnd.anser-web-funds-transfer-initiation": "fti",
  "video/vnd.fvt": "fvt",
  "application/vnd.adobe.fxp": "fxpl",
  "application/vnd.fuzzysheet": "fzs",
  "application/vnd.geoplan": "g2w",
  "image/g3fax": "g3",
  "application/vnd.geospace": "g3w",
  "application/vnd.groove-account": "gac",
  "application/x-tads": "gam",
  "application/rpki-ghostbusters": "gbr",
  "application/x-gca-compressed": "gca",
  "model/vnd.gdl": "gdl",
  "application/vnd.dynageo": "geo",
  "application/vnd.geometry-explorer": "gre",
  "application/vnd.geogebra.file": "ggb",
  "application/vnd.geogebra.tool": "ggt",
  "application/vnd.groove-help": "ghf",
  "image/gif": "gif",
  "application/vnd.groove-identity-message": "gim",
  "application/gml+xml": "gml",
  "application/vnd.gmx": "gmx",
  "application/x-gnumeric": "gnumeric",
  "application/vnd.flographit": "gph",
  "application/gpx+xml": "gpx",
  "application/vnd.grafeq": "gqs",
  "application/srgs": "gram",
  "application/x-gramps-xml": "gramps",
  "application/vnd.groove-injector": "grv",
  "application/srgs+xml": "grxml",
  "application/x-font-ghostscript": "gsf",
  "application/x-gtar": "gtar",
  "application/vnd.groove-tool-message": "gtm",
  "model/vnd.gtw": "gtw",
  "text/vnd.graphviz": "gv",
  "application/gxf": "gxf",
  "application/vnd.geonext": "gxt",
  "video/h261": "h261",
  "video/h263": "h263",
  "video/h264": "h264",
  "application/vnd.hal+xml": "hal",
  "application/vnd.hbci": "hbci",
  "application/x-hdf": "hdf",
  "application/winhlp": "hlp",
  "application/vnd.hp-hpgl": "hpgl",
  "application/vnd.hp-hpid": "hpid",
  "application/vnd.hp-hps": "hps",
  "application/mac-binhex40": "hqx",
  "application/vnd.kenameaapp": "htke",
  "text/html": "htm",
  "application/vnd.yamaha.hv-dic": "hvd",
  "application/vnd.yamaha.hv-voice": "hvp",
  "application/vnd.yamaha.hv-script": "hvs",
  "application/vnd.intergeo": "i2g",
  "application/vnd.iccprofile": "icm",
  "x-conference/x-cooltalk": "ice",
  "image/x-icon": "ico",
  "text/calendar": "ifb",
  "image/ief": "ief",
  "application/vnd.shana.informed.formdata": "ifm",
  "model/iges": "igs",
  "application/vnd.igloader": "igl",
  "application/vnd.insors.igm": "igm",
  "application/vnd.micrografx.igx": "igx",
  "application/vnd.shana.informed.interchange": "iif",
  "application/vnd.accpac.simply.imp": "imp",
  "application/vnd.ms-ims": "ims",
  "application/inkml+xml": "inkml",
  "application/x-install-instructions": "install",
  "application/vnd.astraea-software.iota": "iota",
  "application/ipfix": "ipfix",
  "application/vnd.shana.informed.package": "ipk",
  "application/vnd.ibm.rights-management": "irm",
  "application/vnd.irepository.package+xml": "irp",
  "application/x-iso9660-image": "iso",
  "application/vnd.shana.informed.formtemplate": "itp",
  "application/vnd.immervision-ivp": "ivp",
  "application/vnd.immervision-ivu": "ivu",
  "text/vnd.sun.j2me.app-descriptor": "jad",
  "application/vnd.jam": "jam",
  "application/java-archive": "jar",
  "text/x-java-source": "java",
  "application/vnd.jisp": "jisp",
  "application/vnd.hp-jlyt": "jlt",
  "application/x-java-jnlp-file": "jnlp",
  "application/vnd.joost.joda-archive": "joda",
  "image/jpeg": "jpg",
  "video/jpm": "jpm",
  "video/jpeg": "jpgv",
  "application/javascript": "js",
  "application/json": "json",
  "application/jsonml+json": "jsonml",
  "audio/midi": "rmi",
  "application/vnd.kde.karbon": "karbon",
  "application/vnd.kde.kformula": "kfo",
  "application/vnd.kidspiration": "kia",
  "application/vnd.google-earth.kml+xml": "kml",
  "application/vnd.google-earth.kmz": "kmz",
  "application/vnd.kinar": "knp",
  "application/vnd.kde.kontour": "kon",
  "application/vnd.kde.kpresenter": "kpt",
  "application/vnd.ds-keypoint": "kpxx",
  "application/vnd.kde.kspread": "ksp",
  "application/vnd.kahootz": "ktz",
  "image/ktx": "ktx",
  "application/vnd.kde.kword": "kwt",
  "application/vnd.las.las+xml": "lasxml",
  "application/x-latex": "latex",
  "application/vnd.llamagraphics.life-balance.desktop": "lbd",
  "application/vnd.llamagraphics.life-balance.exchange+xml": "lbe",
  "application/vnd.hhe.lesson-player": "les",
  "application/x-lzh-compressed": "lzh",
  "application/vnd.route66.link66+xml": "link66",
  "application/x-ms-shortcut": "lnk",
  "application/lost+xml": "lostxml",
  "application/vnd.ms-lrm": "lrm",
  "application/vnd.frogans.ltf": "ltf",
  "audio/vnd.lucent.voice": "lvp",
  "application/vnd.lotus-wordpro": "lwp",
  "application/x-msmediaview": "mvb",
  "video/mpeg": "mpg",
  "application/mp21": "mp21",
  "audio/mpeg": "mpga",
  "audio/mp3": "mp3",
  "application/vnd.apple.mpegurl": "m3u8",
  "audio/x-mpegurl": "m3u",
  "audio/mp4": "mp4a",
  "video/vnd.mpegurl": "mxu",
  "video/x-m4v": "m4v",
  "application/mathematica": "nb",
  "application/mads+xml": "mads",
  "application/vnd.ecowin.chart": "mag",
  "text/troff": "t",
  "application/mathml+xml": "mathml",
  "application/vnd.mobius.mbk": "mbk",
  "application/mbox": "mbox",
  "application/vnd.medcalcdata": "mc1",
  "application/vnd.mcd": "mcd",
  "text/vnd.curl.mcurl": "mcurl",
  "application/x-msaccess": "mdb",
  "image/vnd.ms-modi": "mdi",
  "model/mesh": "silo",
  "application/metalink4+xml": "meta4",
  "application/metalink+xml": "metalink",
  "application/mets+xml": "mets",
  "application/vnd.mfmp": "mfm",
  "application/rpki-manifest": "mft",
  "application/vnd.osgeo.mapguide.package": "mgp",
  "application/vnd.proteus.magazine": "mgz",
  "application/x-mie": "mie",
  "application/vnd.mif": "mif",
  "video/mj2": "mjp2",
  "video/x-matroska": "mkv",
  "audio/x-matroska": "mka",
  "application/vnd.dolby.mlp": "mlp",
  "application/vnd.chipnuts.karaoke-mmd": "mmd",
  "application/vnd.smaf": "mmf",
  "image/vnd.fujixerox.edmics-mmr": "mmr",
  "video/x-mng": "mng",
  "application/x-msmoney": "mny",
  "application/x-mobipocket-ebook": "prc",
  "application/mods+xml": "mods",
  "video/x-sgi-movie": "movie",
  "video/quicktime": "qt",
  "application/mp4": "mp4s",
  "video/mp4": "mpg4",
  "application/vnd.mophun.certificate": "mpc",
  "application/vnd.apple.installer+xml": "mpkg",
  "application/vnd.blueice.multipass": "mpm",
  "application/vnd.mophun.application": "mpn",
  "application/vnd.ms-project": "mpt",
  "application/vnd.ibm.minipay": "mpy",
  "application/vnd.mobius.mqy": "mqy",
  "application/marc": "mrc",
  "application/marcxml+xml": "mrcx",
  "application/mediaservercontrol+xml": "mscml",
  "application/vnd.fdsn.mseed": "mseed",
  "application/vnd.mseq": "mseq",
  "application/vnd.epson.msf": "msf",
  "application/vnd.mobius.msl": "msl",
  "application/vnd.muvee.style": "msty",
  "model/vnd.mts": "mts",
  "application/vnd.musician": "mus",
  "application/vnd.recordare.musicxml+xml": "musicxml",
  "application/vnd.mfer": "mwf",
  "application/mxf": "mxf",
  "application/vnd.recordare.musicxml": "mxl",
  "application/xv+xml": "xvml",
  "application/vnd.triscape.mxs": "mxs",
  "text/n3": "n3",
  "application/vnd.wolfram.player": "nbp",
  "application/x-dtbncx+xml": "ncx",
  "text/x-nfo": "nfo",
  "application/vnd.nokia.n-gage.symbian.install": "n-gage",
  "application/vnd.nokia.n-gage.data": "ngdat",
  "application/vnd.nitf": "ntf",
  "application/vnd.neurolanguage.nlu": "nlu",
  "application/vnd.enliven": "nml",
  "application/vnd.noblenet-directory": "nnd",
  "application/vnd.noblenet-sealer": "nns",
  "application/vnd.noblenet-web": "nnw",
  "image/vnd.net-fpx": "npx",
  "application/x-conference": "nsc",
  "application/vnd.lotus-notes": "nsf",
  "application/x-nzb": "nzb",
  "application/vnd.fujitsu.oasys2": "oa2",
  "application/vnd.fujitsu.oasys3": "oa3",
  "application/vnd.fujitsu.oasys": "oas",
  "application/x-msbinder": "obd",
  "application/x-tgif": "obj",
  "application/oda": "oda",
  "application/vnd.oasis.opendocument.database": "odb",
  "application/vnd.oasis.opendocument.chart": "odc",
  "application/vnd.oasis.opendocument.formula": "odf",
  "application/vnd.oasis.opendocument.formula-template": "odft",
  "application/vnd.oasis.opendocument.graphics": "odg",
  "application/vnd.oasis.opendocument.image": "odi",
  "application/vnd.oasis.opendocument.text-master": "odm",
  "application/vnd.oasis.opendocument.presentation": "odp",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
  "application/vnd.oasis.opendocument.text": "odt",
  "audio/ogg": "spx",
  "video/ogg": "ogv",
  "application/ogg": "ogx",
  "application/omdoc+xml": "omdoc",
  "application/onenote": "onetoc",
  "application/oebps-package+xml": "opf",
  "text/x-opml": "opml",
  "application/vnd.palm": "pqa",
  "application/vnd.lotus-organizer": "org",
  "application/vnd.yamaha.openscoreformat": "osf",
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": "osfpvg",
  "application/vnd.oasis.opendocument.chart-template": "otc",
  "font/otf": "otf",
  "application/vnd.oasis.opendocument.graphics-template": "otg",
  "application/vnd.oasis.opendocument.text-web": "oth",
  "application/vnd.oasis.opendocument.image-template": "oti",
  "application/vnd.oasis.opendocument.presentation-template": "otp",
  "application/vnd.oasis.opendocument.spreadsheet-template": "ots",
  "application/vnd.oasis.opendocument.text-template": "ott",
  "application/oxps": "oxps",
  "application/vnd.openofficeorg.extension": "oxt",
  "application/pkcs10": "p10",
  "application/x-pkcs12": "pfx",
  "application/x-pkcs7-certificates": "spc",
  "application/pkcs7-mime": "p7m",
  "application/x-pkcs7-certreqresp": "p7r",
  "application/pkcs7-signature": "p7s",
  "application/pkcs8": "p8",
  "text/x-pascal": "p",
  "application/vnd.pawaafile": "paw",
  "application/vnd.powerbuilder6": "pbd",
  "image/x-portable-bitmap": "pbm",
  "application/x-font-pcf": "pcf",
  "application/vnd.hp-pcl": "pcl",
  "application/vnd.hp-pclxl": "pclxl",
  "image/x-pict": "pic",
  "application/vnd.curl.pcurl": "pcurl",
  "image/x-pcx": "pcx",
  "application/pdf": "pdf",
  "application/font-tdpfr": "pfr",
  "image/x-portable-graymap": "pgm",
  "application/x-chess-pgn": "pgn",
  "application/pgp-encrypted": "pgp",
  "application/pkixcmp": "pki",
  "application/pkix-pkipath": "pkipath",
  "application/vnd.3gpp.pic-bw-large": "plb",
  "application/vnd.mobius.plc": "plc",
  "application/vnd.pocketlearn": "plf",
  "application/pls+xml": "pls",
  "application/vnd.ctc-posml": "pml",
  "image/png": "png",
  "image/x-portable-anymap": "pnm",
  "application/vnd.macports.portpkg": "portpkg",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.ms-powerpoint.template.macroenabled.12": "potm",
  "application/vnd.openxmlformats-officedocument.presentationml.template": "potx",
  "application/vnd.ms-powerpoint.addin.macroenabled.12": "ppam",
  "application/vnd.cups-ppd": "ppd",
  "image/x-portable-pixmap": "ppm",
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": "ppsm",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": "pptm",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/vnd.lotus-freelance": "pre",
  "application/pics-rules": "prf",
  "application/vnd.3gpp.pic-bw-small": "psb",
  "image/vnd.adobe.photoshop": "psd",
  "application/x-font-linux-psf": "psf",
  "application/pskc+xml": "pskcxml",
  "application/vnd.pvi.ptid1": "ptid",
  "application/x-mspublisher": "pub",
  "application/vnd.3gpp.pic-bw-var": "pvb",
  "application/vnd.3m.post-it-notes": "pwn",
  "audio/vnd.ms-playready.media.pya": "pya",
  "video/vnd.ms-playready.media.pyv": "pyv",
  "application/vnd.epson.quickanime": "qam",
  "application/vnd.intu.qbo": "qbo",
  "application/vnd.intu.qfx": "qfx",
  "application/vnd.publishare-delta-tree": "qps",
  "application/vnd.quark.quarkxpress": "qxt",
  "audio/x-pn-realaudio": "ram",
  "application/x-rar-compressed": "rar",
  "image/x-cmu-raster": "ras",
  "application/vnd.ipunplugged.rcprofile": "rcprofile",
  "application/rdf+xml": "rdf",
  "application/vnd.data-vision.rdz": "rdz",
  "application/vnd.businessobjects": "rep",
  "application/x-dtbresource+xml": "res",
  "image/x-rgb": "rgb",
  "application/reginfo+xml": "rif",
  "audio/vnd.rip": "rip",
  "application/x-research-info-systems": "ris",
  "application/resource-lists+xml": "rl",
  "image/vnd.fujixerox.edmics-rlc": "rlc",
  "application/resource-lists-diff+xml": "rld",
  "application/vnd.rn-realmedia": "rm",
  "audio/x-pn-realaudio-plugin": "rmp",
  "application/vnd.jcp.javame.midlet-rms": "rms",
  "application/vnd.rn-realmedia-vbr": "rmvb",
  "application/relax-ng-compact-syntax": "rnc",
  "application/rpki-roa": "roa",
  "application/vnd.cloanto.rp9": "rp9",
  "application/vnd.nokia.radio-presets": "rpss",
  "application/vnd.nokia.radio-preset": "rpst",
  "application/sparql-query": "rq",
  "application/rls-services+xml": "rs",
  "application/rsd+xml": "rsd",
  "application/rss+xml": "rss",
  "application/rtf": "rtf",
  "text/richtext": "rtx",
  "audio/s3m": "s3m",
  "application/vnd.yamaha.smaf-audio": "saf",
  "application/sbml+xml": "sbml",
  "application/vnd.ibm.secure-container": "sc",
  "application/x-msschedule": "scd",
  "application/vnd.lotus-screencam": "scm",
  "application/scvp-cv-request": "scq",
  "application/scvp-cv-response": "scs",
  "text/vnd.curl.scurl": "scurl",
  "application/vnd.stardivision.draw": "sda",
  "application/vnd.stardivision.calc": "sdc",
  "application/vnd.stardivision.impress": "sdd",
  "application/vnd.solent.sdkm+xml": "sdkm",
  "application/sdp": "sdp",
  "application/vnd.stardivision.writer": "vor",
  "application/vnd.seemail": "see",
  "application/vnd.sema": "sema",
  "application/vnd.semd": "semd",
  "application/vnd.semf": "semf",
  "application/java-serialized-object": "ser",
  "application/set-payment-initiation": "setpay",
  "application/set-registration-initiation": "setreg",
  "application/vnd.hydrostatix.sof-data": "sfd-hdstx",
  "application/vnd.spotfire.sfs": "sfs",
  "text/x-sfv": "sfv",
  "image/sgi": "sgi",
  "application/vnd.stardivision.writer-global": "sgl",
  "text/sgml": "sgm",
  "application/x-sh": "sh",
  "application/x-shar": "shar",
  "application/shf+xml": "shf",
  "image/x-mrsid-image": "sid",
  "audio/silk": "sil",
  "application/vnd.symbian.install": "sisx",
  "application/x-stuffit": "sit",
  "application/x-stuffitx": "sitx",
  "application/vnd.koan": "skt",
  "application/vnd.ms-powerpoint.slide.macroenabled.12": "sldm",
  "application/vnd.openxmlformats-officedocument.presentationml.slide": "sldx",
  "application/vnd.epson.salt": "slt",
  "application/vnd.stepmania.stepchart": "sm",
  "application/vnd.stardivision.math": "smf",
  "application/smil+xml": "smil",
  "video/x-smv": "smv",
  "application/vnd.stepmania.package": "smzip",
  "application/x-font-snf": "snf",
  "application/vnd.yamaha.smaf-phrase": "spf",
  "application/x-futuresplash": "spl",
  "text/vnd.in3d.spot": "spot",
  "application/scvp-vp-response": "spp",
  "application/scvp-vp-request": "spq",
  "application/x-sql": "sql",
  "application/x-wais-source": "src",
  "application/x-subrip": "srt",
  "application/sru+xml": "sru",
  "application/sparql-results+xml": "srx",
  "application/ssdl+xml": "ssdl",
  "application/vnd.kodak-descriptor": "sse",
  "application/vnd.epson.ssf": "ssf",
  "application/ssml+xml": "ssml",
  "application/vnd.sailingtracker.track": "st",
  "application/vnd.sun.xml.calc.template": "stc",
  "application/vnd.sun.xml.draw.template": "std",
  "application/vnd.wt.stf": "stf",
  "application/vnd.sun.xml.impress.template": "sti",
  "application/hyperstudio": "stk",
  "application/vnd.ms-pki.stl": "stl",
  "application/vnd.pg.format": "str",
  "application/vnd.sun.xml.writer.template": "stw",
  "image/vnd.dvb.subtitle": "sub",
  "text/vnd.dvb.subtitle": "sub",
  "application/vnd.sus-calendar": "susp",
  "application/x-sv4cpio": "sv4cpio",
  "application/x-sv4crc": "sv4crc",
  "application/vnd.dvb.service": "svc",
  "application/vnd.svd": "svd",
  "image/svg+xml": "svgz",
  "application/x-shockwave-flash": "swf",
  "application/vnd.aristanetworks.swi": "swi",
  "application/vnd.sun.xml.calc": "sxc",
  "application/vnd.sun.xml.draw": "sxd",
  "application/vnd.sun.xml.writer.global": "sxg",
  "application/vnd.sun.xml.impress": "sxi",
  "application/vnd.sun.xml.math": "sxm",
  "application/vnd.sun.xml.writer": "sxw",
  "application/x-t3vm-image": "t3",
  "application/vnd.mynfc": "taglet",
  "application/vnd.tao.intent-module-archive": "tao",
  "application/x-tar": "tar",
  "application/vnd.3gpp2.tcap": "tcap",
  "application/x-tcl": "tcl",
  "application/vnd.smart.teacher": "teacher",
  "application/tei+xml": "teicorpus",
  "application/x-tex": "tex",
  "application/x-texinfo": "texinfo",
  "application/thraud+xml": "tfi",
  "application/x-tex-tfm": "tfm",
  "image/x-tga": "tga",
  "application/vnd.ms-officetheme": "thmx",
  "image/tiff": "tif",
  "application/vnd.tmobile-livetv": "tmo",
  "application/x-bittorrent": "torrent",
  "application/vnd.groove-tool-template": "tpl",
  "application/vnd.trid.tpt": "tpt",
  "application/vnd.trueapp": "tra",
  "application/x-msterminal": "trm",
  "application/timestamped-data": "tsd",
  "text/tab-separated-values": "tsv",
  "font/collection": "ttc",
  "font/ttf": "ttf",
  "text/turtle": "ttl",
  "application/vnd.simtech-mindmapper": "twds",
  "application/vnd.genomatix.tuxedo": "txd",
  "application/vnd.mobius.txf": "txf",
  "application/vnd.ufdl": "ufdl",
  "application/x-glulx": "ulx",
  "application/vnd.umajin": "umj",
  "application/vnd.unity": "unityweb",
  "application/vnd.uoml+xml": "uoml",
  "text/uri-list": "urls",
  "application/x-ustar": "ustar",
  "application/vnd.uiq.theme": "utz",
  "text/x-uuencode": "uu",
  "audio/vnd.dece.audio": "uvva",
  "application/vnd.dece.data": "uvvf",
  "image/vnd.dece.graphic": "uvvi",
  "video/vnd.dece.hd": "uvvh",
  "video/vnd.dece.mobile": "uvvm",
  "video/vnd.dece.pd": "uvvp",
  "video/vnd.dece.sd": "uvvs",
  "application/vnd.dece.ttml+xml": "uvvt",
  "video/vnd.uvvu.mp4": "uvvu",
  "video/vnd.dece.video": "uvvv",
  "application/vnd.dece.unspecified": "uvx",
  "application/vnd.dece.zip": "uvz",
  "text/vcard": "vcard",
  "application/x-cdlink": "vcd",
  "text/x-vcard": "vcf",
  "application/vnd.groove-vcard": "vcg",
  "text/x-vcalendar": "vcs",
  "application/vnd.vcx": "vcx",
  "application/vnd.visionary": "vis",
  "video/vnd.vivo": "viv",
  "video/x-ms-vob": "vob",
  "model/vrml": "wrl",
  "application/vnd.visio": "vsw",
  "application/vnd.vsf": "vsf",
  "model/vnd.vtu": "vtu",
  "application/voicexml+xml": "vxml",
  "application/x-doom": "wad",
  "audio/x-wav": "wav",
  "audio/x-ms-wax": "wax",
  "image/vnd.wap.wbmp": "wbmp",
  "application/vnd.criticaltools.wbs+xml": "wbs",
  "application/vnd.wap.wbxml": "wbxml",
  "application/vnd.ms-works": "wps",
  "image/vnd.ms-photo": "wdp",
  "audio/webm": "weba",
  "video/webm": "webm",
  "image/webp": "webp",
  "application/vnd.pmi.widget": "wg",
  "application/widget": "wgt",
  "audio/x-ms-wma": "wma",
  "application/x-ms-wmd": "wmd",
  "application/vnd.wap.wmlc": "wmlc",
  "application/vnd.wap.wmlscriptc": "wmlsc",
  "text/vnd.wap.wmlscript": "wmls",
  "text/vnd.wap.wml": "wml",
  "video/x-ms-wm": "wm",
  "video/x-ms-wmv": "wmv",
  "video/x-ms-wmx": "wmx",
  "application/x-ms-wmz": "wmz",
  "font/woff2": "woff2",
  "font/woff": "woff",
  "application/vnd.wordperfect": "wpd",
  "application/vnd.ms-wpl": "wpl",
  "application/vnd.wqd": "wqd",
  "application/x-mswrite": "wri",
  "application/wsdl+xml": "wsdl",
  "application/wspolicy+xml": "wspolicy",
  "application/vnd.webturbo": "wtb",
  "video/x-ms-wvx": "wvx",
  "model/x3d+binary": "x3dbz",
  "model/x3d+xml": "x3dz",
  "model/x3d+vrml": "x3dvz",
  "application/xaml+xml": "xaml",
  "application/x-silverlight-app": "xap",
  "application/vnd.xara": "xar",
  "application/x-ms-xbap": "xbap",
  "application/vnd.fujixerox.docuworks.binder": "xbd",
  "image/x-xbitmap": "xbm",
  "application/xcap-diff+xml": "xdf",
  "application/vnd.syncml.dm+xml": "xdm",
  "application/vnd.adobe.xdp+xml": "xdp",
  "application/dssc+xml": "xdssc",
  "application/vnd.fujixerox.docuworks": "xdw",
  "application/xenc+xml": "xenc",
  "application/patch-ops-error+xml": "xer",
  "application/vnd.adobe.xfdf": "xfdf",
  "application/vnd.xfdl": "xfdl",
  "application/xhtml+xml": "xhtml",
  "image/vnd.xiff": "xif",
  "application/vnd.ms-excel": "xlw",
  "application/vnd.ms-excel.addin.macroenabled.12": "xlam",
  "application/x-xliff+xml": "xlf",
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": "xlsb",
  "application/vnd.ms-excel.sheet.macroenabled.12": "xlsm",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel.template.macroenabled.12": "xltm",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": "xltx",
  "audio/xm": "xm",
  "application/xml": "xsl",
  "application/vnd.olpc-sugar": "xo",
  "application/xop+xml": "xop",
  "application/x-xpinstall": "xpi",
  "application/xproc+xml": "xpl",
  "image/x-xpixmap": "xpm",
  "application/vnd.is-xpr": "xpr",
  "application/vnd.ms-xpsdocument": "xps",
  "application/vnd.intercon.formnet": "xpx",
  "application/xslt+xml": "xslt",
  "application/vnd.syncml+xml": "xsm",
  "application/xspf+xml": "xspf",
  "application/vnd.mozilla.xul+xml": "xul",
  "image/x-xwindowdump": "xwd",
  "chemical/x-xyz": "xyz",
  "application/x-xz": "xz",
  "application/yang": "yang",
  "application/yin+xml": "yin",
  "application/x-zmachine": "z8",
  "application/vnd.zzazz.deck+xml": "zaz",
  "application/zip": "zip",
  "application/vnd.zul": "zirz",
  "application/vnd.handheld-entertainment+xml": "zmm"
}

export const getExtensionByMimetype = (mime) => {
  return mimes[mime];
}