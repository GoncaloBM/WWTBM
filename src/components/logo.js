import './logo.css';
import React from "react";
// import '/styles.css'

// $(document).ready(function() {
//   $(".curved-top, .curved-bottom").lettering();
// });

// (function($) {
//   function injector(t, splitter, klass, after) {
//     var a = t.text().split(splitter),
//       inject = "";
//     if (a.length) {
//       $(a).each(function(i, item) {
//         inject +=
//           '<span class="' + klass + (i + 1) + '">' + item + "</span>" + after;
//       });
//       t.empty().append(inject);
//     }
//   }

//   var methods = {
//     init: function() {
//       return this.each(function() {
//         injector($(this), "", "char", "");
//       });
//     },

//     words: function() {
//       return this.each(function() {
//         injector($(this), " ", "word", " ");
//       });
//     },

//     lines: function() {
//       return this.each(function() {
//         var r = "eefec303079ad17405c889e092e105b0";
//         // Because it's hard to split a <br/> tag consistently across browsers,
//         // (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
//         // (of the word "split").  If you're trying to use this plugin on that
//         // md5 hash string, it will fail because you're being ridiculous.
//         injector(
//           $(this)
//             .children("br")
//             .replaceWith(r)
//             .end(),
//           r,
//           "line",
//           ""
//         );
//       });
//     }
//   };

//   $.fn.lettering = function(method) {
//     // Method calling logic
//     if (method && methods[method]) {
//       return methods[method].apply(this, [].slice.call(arguments, 1));
//     } else if (method === "letters" || !method) {
//       return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
//     }
//     $.error("Method " + method + " does not exist on jQuery.lettering");
//     return this;
//   };
// })(jQuery);

export const logo = () => {
  return (
  //   <div class="wrapper">
  //     <section class="stage-0">
  //       <div class="logo">
  //         <div class="elipse elipse1"></div>
  //         <div class="elipse elipse2"></div>
  //         <div class="elipse elipse3"></div>
  //         <div class="elipse elipse4"></div>
  //         <div class="elipse elipse5"></div>
  //         <div class="elipse elipse6"></div>
  //         <div class="elipse elipse7"></div>
  //         <div class="elipse elipse8"></div>
  //         <div class="elipse elipse9"></div>
  //         <div class="curved-top">WHO WANTS TO BE A</div>
  //         <div class="title">MILLIONAIRE</div>
  //         <div class="curved-bottom">WHO WANTS TO BE A</div>
  //         <div class="inner-circle"></div>
  //       </div>
  //     </section>
  //   </div>
  // );

  <div id ='wwtbm-logo'></div>
  )
};
