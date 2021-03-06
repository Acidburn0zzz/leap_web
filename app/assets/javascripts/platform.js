/* Inspired by mozillas platform detection:
  https://github.com/mozilla/bedrock/tree/master/media/js/base
*/
 (function () {
   'use strict';
   function getPlatform() {
     var ua = navigator.userAgent,
         pf = navigator.platform;
     if (/Win(16|9[x58]|NT( [1234]| 5\.0| [^0-9]|[^ -]|$))/.test(ua) ||
       /Windows ([MC]E|9[x58]|3\.1|4\.10|NT( [1234]| 5\.0| [^0-9]|[^ ]|$))/.test(ua) ||
       /Windows_95/.test(ua)) {
       /**
        * Officially unsupported platforms are Windows 95, 98, ME, NT 4.x, 2000
        * These regular expressions match:
        *  - Win16
        *  - Win9x
        *  - Win95
        *  - Win98
        *  - WinNT (not followed by version or followed by version <= 5)
        *  - Windows ME
        *  - Windows CE
        *  - Windows 9x
        *  - Windows 95
        *  - Windows 98
        *  - Windows 3.1
        *  - Windows 4.10
        *  - Windows NT (not followed by version or followed by version <= 5)
        *  - Windows_95
        */
       return 'oldwin';
     }
     if (ua.indexOf("MSIE 6.0") !== -1 &&
       ua.indexOf("Windows NT 5.1") !== -1 &&
       ua.indexOf("SV1") === -1) {
       // Windows XP SP1
       return 'oldwin';
     }
     if (pf.indexOf("Win32") !== -1 ||
       pf.indexOf("Win64") !== -1) {
       return 'windows';
     }
     if (/android/i.test(ua)) {
       return 'android';
     }
     if (/armv[6-7]l/.test(pf)) {
       return 'android';
     }
     if (pf.indexOf("Linux") !== -1) {
       return 'linux';
       //if (pf.indexOf("64") !== -1) {
       //  return 'linux64';
       //} else {
       //  return 'linux32';
       //}
     }
     if (pf.indexOf("MacPPC") !== -1) {
       return 'oldmac';
     }
     if (/Mac OS X 10.[0-5]/.test(ua)) {
       return 'oldmac';
     }
     if (pf.indexOf('iPhone') !== -1 ||
       pf.indexOf('iPad') !== -1 ||
       pf.indexOf('iPod') !== -1 ) {
       return 'ios';
     }
     if (ua.indexOf("Mac OS X") !== -1) {
       return 'osx';
     }
     if (ua.indexOf("MSIE 5.2") !== -1) {
       return 'oldmac';
     }
     if (pf.indexOf("Mac") !== -1) {
       return 'oldmac';
     }
     if (navigator.platform === '' &&
       navigator.userAgent.indexOf("Firefox") !== -1 &&
       navigator.userAgent.indexOf("Mobile") !== -1) {
       return 'fxos';
     }

     return 'other';
   }
   (function () {
     // Immediately set the platform classname on the html-element
     // to avoid lots of flickering
     var h = document.documentElement;
     window.site = {
       platform : getPlatform()
     };
     h.className = window.site.platform;
   })();
 })();
