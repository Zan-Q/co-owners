import{c as ue}from"./clsx-B-dksMZM.js";import{r as se,c as fe}from"./jsx-runtime-D2HyDbKh.js";import{a as pe}from"./index-Cd_vq22D.js";import{n as ge}from"./index-PxjvPj8E.js";var O={exports:{}};(function(e,r){(function(t,o){o(r,se)})(fe,function(t,o){const a={delay:500,minDuration:200,ssr:!0};function n(){const[s,c]=o.useState(!0);return o.useEffect(()=>{c(!1)},[]),s}function i(s,c){c=Object.assign({},a,c);const f=n(),g=c.ssr&&f&&s?"DISPLAY":"IDLE",[p,b]=o.useState(g),h=o.useRef(null);return o.useEffect(()=>{if(s&&(p==="IDLE"||f)){clearTimeout(h.current);const k=f?0:c.delay;h.current=setTimeout(()=>{if(!s)return b("IDLE");h.current=setTimeout(()=>{b("EXPIRE")},c.minDuration),b("DISPLAY")},k),f||b("DELAY")}!s&&p!=="DISPLAY"&&(clearTimeout(h.current),b("IDLE"))},[s,p,c.delay,c.minDuration]),o.useEffect(()=>()=>clearTimeout(h.current),[]),p==="DISPLAY"||p==="EXPIRE"}t.defaultOptions=a,t.useSpinDelay=i})})(O,O.exports);var er=O.exports;const $="-";function be(e){const r=he(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;function a(i){const s=i.split($);return s[0]===""&&s.length!==1&&s.shift(),ie(s,r)||me(i)}function n(i,s){const c=t[i]||[];return s&&o[i]?[...c,...o[i]]:c}return{getClassGroupId:a,getConflictingClassGroupIds:n}}function ie(e,r){var i;if(e.length===0)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),a=o?ie(e.slice(1),o):void 0;if(a)return a;if(r.validators.length===0)return;const n=e.join($);return(i=r.validators.find(({validator:s})=>s(n)))==null?void 0:i.classGroupId}const re=/^\[(.+)\]$/;function me(e){if(re.test(e)){const r=re.exec(e)[1],t=r==null?void 0:r.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}}function he(e){const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return xe(Object.entries(e.classGroups),t).forEach(([n,i])=>{B(i,o,n,r)}),o}function B(e,r,t,o){e.forEach(a=>{if(typeof a=="string"){const n=a===""?r:te(r,a);n.classGroupId=t;return}if(typeof a=="function"){if(ye(a)){B(a(o),r,t,o);return}r.validators.push({validator:a,classGroupId:t});return}Object.entries(a).forEach(([n,i])=>{B(i,te(r,n),t,o)})})}function te(e,r){let t=e;return r.split($).forEach(o=>{t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function ye(e){return e.isThemeGetter}function xe(e,r){return r?e.map(([t,o])=>{const a=o.map(n=>typeof n=="string"?r+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(([i,s])=>[r+i,s])):n);return[t,a]}):e}function ve(e){if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;function a(n,i){t.set(n,i),r++,r>e&&(r=0,o=t,t=new Map)}return{get(n){let i=t.get(n);if(i!==void 0)return i;if((i=o.get(n))!==void 0)return a(n,i),i},set(n,i){t.has(n)?t.set(n,i):a(n,i)}}}const ae="!";function we(e){const{separator:r,experimentalParseClassName:t}=e,o=r.length===1,a=r[0],n=r.length;function i(s){const c=[];let f=0,g=0,p;for(let m=0;m<s.length;m++){let y=s[m];if(f===0){if(y===a&&(o||s.slice(m,m+n)===r)){c.push(s.slice(g,m)),g=m+n;continue}if(y==="/"){p=m;continue}}y==="["?f++:y==="]"&&f--}const b=c.length===0?s:s.substring(g),h=b.startsWith(ae),k=h?b.substring(1):b,x=p&&p>g?p-g:void 0;return{modifiers:c,hasImportantModifier:h,baseClassName:k,maybePostfixModifierPosition:x}}return t?function(c){return t({className:c,parseClassName:i})}:i}function ke(e){if(e.length<=1)return e;const r=[];let t=[];return e.forEach(o=>{o[0]==="["?(r.push(...t.sort(),o),t=[]):t.push(o)}),r.push(...t.sort()),r}function Se(e){return{cache:ve(e.cacheSize),parseClassName:we(e),...be(e)}}const Ce=/\s+/;function Ae(e,r){const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:a}=r,n=new Set;return e.trim().split(Ce).map(i=>{const{modifiers:s,hasImportantModifier:c,baseClassName:f,maybePostfixModifierPosition:g}=t(i);let p=!!g,b=o(p?f.substring(0,g):f);if(!b){if(!p)return{isTailwindClass:!1,originalClassName:i};if(b=o(f),!b)return{isTailwindClass:!1,originalClassName:i};p=!1}const h=ke(s).join(":");return{isTailwindClass:!0,modifierId:c?h+ae:h,classGroupId:b,originalClassName:i,hasPostfixModifier:p}}).reverse().filter(i=>{if(!i.isTailwindClass)return!0;const{modifierId:s,classGroupId:c,hasPostfixModifier:f}=i,g=s+c;return n.has(g)?!1:(n.add(g),a(c,f).forEach(p=>n.add(s+p)),!0)}).reverse().map(i=>i.originalClassName).join(" ")}function ze(){let e=0,r,t,o="";for(;e<arguments.length;)(r=arguments[e++])&&(t=le(r))&&(o&&(o+=" "),o+=t);return o}function le(e){if(typeof e=="string")return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=le(e[o]))&&(t&&(t+=" "),t+=r);return t}function oe(e,...r){let t,o,a,n=i;function i(c){const f=r.reduce((g,p)=>p(g),e());return t=Se(f),o=t.cache.get,a=t.cache.set,n=s,s(c)}function s(c){const f=o(c);if(f)return f;const g=Ae(c,t);return a(c,g),g}return function(){return n(ze.apply(null,arguments))}}function d(e){const r=t=>t[e]||[];return r.isThemeGetter=!0,r}const ce=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ee=/^\d+\/\d+$/,Te=new Set(["px","full","screen"]),Pe=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Ie=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Re=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,Le=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Me=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;function w(e){return A(e)||Te.has(e)||Ee.test(e)}function S(e){return z(e,"length",Ne)}function A(e){return!!e&&!Number.isNaN(Number(e))}function U(e){return z(e,"number",A)}function P(e){return!!e&&Number.isInteger(Number(e))}function Ge(e){return e.endsWith("%")&&A(e.slice(0,-1))}function l(e){return ce.test(e)}function C(e){return Pe.test(e)}const Ue=new Set(["length","size","percentage"]);function De(e){return z(e,Ue,de)}function je(e){return z(e,"position",de)}const We=new Set(["image","url"]);function Fe(e){return z(e,We,Be)}function He(e){return z(e,"",Oe)}function I(){return!0}function z(e,r,t){const o=ce.exec(e);return o?o[1]?typeof r=="string"?o[1]===r:r.has(o[1]):t(o[2]):!1}function Ne(e){return Ie.test(e)&&!Re.test(e)}function de(){return!1}function Oe(e){return Le.test(e)}function Be(e){return Me.test(e)}function ne(){const e=d("colors"),r=d("spacing"),t=d("blur"),o=d("brightness"),a=d("borderColor"),n=d("borderRadius"),i=d("borderSpacing"),s=d("borderWidth"),c=d("contrast"),f=d("grayscale"),g=d("hueRotate"),p=d("invert"),b=d("gap"),h=d("gradientColorStops"),k=d("gradientColorStopPositions"),x=d("inset"),m=d("margin"),y=d("opacity"),v=d("padding"),_=d("saturate"),D=d("scale"),Y=d("sepia"),K=d("skew"),X=d("space"),q=d("translate"),j=()=>["auto","contain","none"],W=()=>["auto","hidden","clip","visible","scroll"],F=()=>["auto",l,r],u=()=>[l,r],J=()=>["",w,S],L=()=>["auto",A,l],Z=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],M=()=>["solid","dashed","dotted","double","none"],Q=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],H=()=>["start","end","center","between","around","evenly","stretch"],E=()=>["","0",l],ee=()=>["auto","avoid","all","avoid-page","page","left","right","column"],T=()=>[A,U],G=()=>[A,l];return{cacheSize:500,separator:":",theme:{colors:[I],spacing:[w,S],blur:["none","",C,l],brightness:T(),borderColor:[e],borderRadius:["none","","full",C,l],borderSpacing:u(),borderWidth:J(),contrast:T(),grayscale:E(),hueRotate:G(),invert:E(),gap:u(),gradientColorStops:[e],gradientColorStopPositions:[Ge,S],inset:F(),margin:F(),opacity:T(),padding:u(),saturate:T(),scale:T(),sepia:E(),skew:G(),space:u(),translate:u()},classGroups:{aspect:[{aspect:["auto","square","video",l]}],container:["container"],columns:[{columns:[C]}],"break-after":[{"break-after":ee()}],"break-before":[{"break-before":ee()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...Z(),l]}],overflow:[{overflow:W()}],"overflow-x":[{"overflow-x":W()}],"overflow-y":[{"overflow-y":W()}],overscroll:[{overscroll:j()}],"overscroll-x":[{"overscroll-x":j()}],"overscroll-y":[{"overscroll-y":j()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[x]}],"inset-x":[{"inset-x":[x]}],"inset-y":[{"inset-y":[x]}],start:[{start:[x]}],end:[{end:[x]}],top:[{top:[x]}],right:[{right:[x]}],bottom:[{bottom:[x]}],left:[{left:[x]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",P,l]}],basis:[{basis:F()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",l]}],grow:[{grow:E()}],shrink:[{shrink:E()}],order:[{order:["first","last","none",P,l]}],"grid-cols":[{"grid-cols":[I]}],"col-start-end":[{col:["auto",{span:["full",P,l]},l]}],"col-start":[{"col-start":L()}],"col-end":[{"col-end":L()}],"grid-rows":[{"grid-rows":[I]}],"row-start-end":[{row:["auto",{span:[P,l]},l]}],"row-start":[{"row-start":L()}],"row-end":[{"row-end":L()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",l]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",l]}],gap:[{gap:[b]}],"gap-x":[{"gap-x":[b]}],"gap-y":[{"gap-y":[b]}],"justify-content":[{justify:["normal",...H()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...H(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...H(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[v]}],px:[{px:[v]}],py:[{py:[v]}],ps:[{ps:[v]}],pe:[{pe:[v]}],pt:[{pt:[v]}],pr:[{pr:[v]}],pb:[{pb:[v]}],pl:[{pl:[v]}],m:[{m:[m]}],mx:[{mx:[m]}],my:[{my:[m]}],ms:[{ms:[m]}],me:[{me:[m]}],mt:[{mt:[m]}],mr:[{mr:[m]}],mb:[{mb:[m]}],ml:[{ml:[m]}],"space-x":[{"space-x":[X]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[X]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",l,r]}],"min-w":[{"min-w":[l,r,"min","max","fit"]}],"max-w":[{"max-w":[l,r,"none","full","min","max","fit","prose",{screen:[C]},C]}],h:[{h:[l,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[l,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[l,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[l,r,"auto","min","max","fit"]}],"font-size":[{text:["base",C,S]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",U]}],"font-family":[{font:[I]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",l]}],"line-clamp":[{"line-clamp":["none",A,U]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",w,l]}],"list-image":[{"list-image":["none",l]}],"list-style-type":[{list:["none","disc","decimal",l]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[y]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[y]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...M(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",w,S]}],"underline-offset":[{"underline-offset":["auto",w,l]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:u()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",l]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",l]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[y]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...Z(),je]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",De]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Fe]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[k]}],"gradient-via-pos":[{via:[k]}],"gradient-to-pos":[{to:[k]}],"gradient-from":[{from:[h]}],"gradient-via":[{via:[h]}],"gradient-to":[{to:[h]}],rounded:[{rounded:[n]}],"rounded-s":[{"rounded-s":[n]}],"rounded-e":[{"rounded-e":[n]}],"rounded-t":[{"rounded-t":[n]}],"rounded-r":[{"rounded-r":[n]}],"rounded-b":[{"rounded-b":[n]}],"rounded-l":[{"rounded-l":[n]}],"rounded-ss":[{"rounded-ss":[n]}],"rounded-se":[{"rounded-se":[n]}],"rounded-ee":[{"rounded-ee":[n]}],"rounded-es":[{"rounded-es":[n]}],"rounded-tl":[{"rounded-tl":[n]}],"rounded-tr":[{"rounded-tr":[n]}],"rounded-br":[{"rounded-br":[n]}],"rounded-bl":[{"rounded-bl":[n]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[y]}],"border-style":[{border:[...M(),"hidden"]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[y]}],"divide-style":[{divide:M()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",...M()]}],"outline-offset":[{"outline-offset":[w,l]}],"outline-w":[{outline:[w,S]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:J()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[y]}],"ring-offset-w":[{"ring-offset":[w,S]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",C,He]}],"shadow-color":[{shadow:[I]}],opacity:[{opacity:[y]}],"mix-blend":[{"mix-blend":[...Q(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Q()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",C,l]}],grayscale:[{grayscale:[f]}],"hue-rotate":[{"hue-rotate":[g]}],invert:[{invert:[p]}],saturate:[{saturate:[_]}],sepia:[{sepia:[Y]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[f]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[g]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[y]}],"backdrop-saturate":[{"backdrop-saturate":[_]}],"backdrop-sepia":[{"backdrop-sepia":[Y]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[i]}],"border-spacing-x":[{"border-spacing-x":[i]}],"border-spacing-y":[{"border-spacing-y":[i]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",l]}],duration:[{duration:G()}],ease:[{ease:["linear","in","out","in-out",l]}],delay:[{delay:G()}],animate:[{animate:["none","spin","ping","pulse","bounce",l]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[D]}],"scale-x":[{"scale-x":[D]}],"scale-y":[{"scale-y":[D]}],rotate:[{rotate:[P,l]}],"translate-x":[{"translate-x":[q]}],"translate-y":[{"translate-y":[q]}],"skew-x":[{"skew-x":[K]}],"skew-y":[{"skew-y":[K]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",l]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",l]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":u()}],"scroll-mx":[{"scroll-mx":u()}],"scroll-my":[{"scroll-my":u()}],"scroll-ms":[{"scroll-ms":u()}],"scroll-me":[{"scroll-me":u()}],"scroll-mt":[{"scroll-mt":u()}],"scroll-mr":[{"scroll-mr":u()}],"scroll-mb":[{"scroll-mb":u()}],"scroll-ml":[{"scroll-ml":u()}],"scroll-p":[{"scroll-p":u()}],"scroll-px":[{"scroll-px":u()}],"scroll-py":[{"scroll-py":u()}],"scroll-ps":[{"scroll-ps":u()}],"scroll-pe":[{"scroll-pe":u()}],"scroll-pt":[{"scroll-pt":u()}],"scroll-pr":[{"scroll-pr":u()}],"scroll-pb":[{"scroll-pb":u()}],"scroll-pl":[{"scroll-pl":u()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",l]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[w,S,U]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}function Ve(e,{cacheSize:r,prefix:t,separator:o,experimentalParseClassName:a,extend:n={},override:i={}}){R(e,"cacheSize",r),R(e,"prefix",t),R(e,"separator",o),R(e,"experimentalParseClassName",a);for(const s in i)$e(e[s],i[s]);for(const s in n)_e(e[s],n[s]);return e}function R(e,r,t){t!==void 0&&(e[r]=t)}function $e(e,r){if(r)for(const t in r)R(e,t,r[t])}function _e(e,r){if(r)for(const t in r){const o=r[t];o!==void 0&&(e[t]=(e[t]||[]).concat(o))}}function Ye(e,...r){return typeof e=="function"?oe(ne,e,...r):oe(()=>Ve(ne(),e),...r)}const V={colors:{border:"hsl(var(--border))",input:{DEFAULT:"hsl(var(--input))",invalid:"hsl(var(--input-invalid))"},ring:{DEFAULT:"hsl(var(--ring))",invalid:"hsl(var(--foreground-destructive))"},background:"hsl(var(--background))",foreground:{DEFAULT:"hsl(var(--foreground))",destructive:"hsl(var(--foreground-destructive))"},primary:{DEFAULT:"hsl(var(--primary))",foreground:"hsl(var(--primary-foreground))"},secondary:{DEFAULT:"hsl(var(--secondary))",foreground:"hsl(var(--secondary-foreground))"},destructive:{DEFAULT:"hsl(var(--destructive))",foreground:"hsl(var(--destructive-foreground))"},muted:{DEFAULT:"hsl(var(--muted))",foreground:"hsl(var(--muted-foreground))"},accent:{DEFAULT:"hsl(var(--accent))",foreground:"hsl(var(--accent-foreground))"},popover:{DEFAULT:"hsl(var(--popover))",foreground:"hsl(var(--popover-foreground))"},card:{DEFAULT:"hsl(var(--card))",foreground:"hsl(var(--card-foreground))"}},borderColor:{DEFAULT:"hsl(var(--border))"},borderRadius:{lg:"var(--radius)",md:"calc(var(--radius) - 2px)",sm:"calc(var(--radius) - 4px)"},fontSize:{mega:["5rem",{lineHeight:"5.25rem",fontWeight:"700"}],h1:["3.5rem",{lineHeight:"3.875rem",fontWeight:"700"}],h2:["2.5rem",{lineHeight:"3rem",fontWeight:"700"}],h3:["2rem",{lineHeight:"2.25rem",fontWeight:"700"}],h4:["1.75rem",{lineHeight:"2.25rem",fontWeight:"700"}],h5:["1.5rem",{lineHeight:"2rem",fontWeight:"700"}],h6:["1rem",{lineHeight:"1.25rem",fontWeight:"700"}],"body-2xl":["2rem",{lineHeight:"2.25rem"}],"body-xl":["1.75rem",{lineHeight:"2.25rem"}],"body-lg":["1.5rem",{lineHeight:"2rem"}],"body-md":["1.25rem",{lineHeight:"1.75rem"}],"body-sm":["1rem",{lineHeight:"1.25rem"}],"body-xs":["0.875rem",{lineHeight:"1.125rem"}],"body-2xs":["0.75rem",{lineHeight:"1rem"}],caption:["1.125rem",{lineHeight:"1.5rem",fontWeight:"600"}],button:["0.75rem",{lineHeight:"1rem",fontWeight:"700"}]},keyframes:{"caret-blink":{"0%,70%,100%":{opacity:"1"},"20%,50%":{opacity:"0"}}},animation:{"caret-blink":"caret-blink 1.25s ease-out infinite"}};function rr(e){return e?`${e}`:"/img/user.png"}function tr(e){return typeof e=="string"?e:e&&typeof e=="object"&&"message"in e&&typeof e.message=="string"?e.message:(console.error("Unable to get error message for error",e),"Unknown Error")}function Ke(){const e=[];for(const[r,t]of Object.entries(V.colors))if(typeof t=="string")e.push(r);else{const o=Object.keys(t).map(a=>a==="DEFAULT"?"":a);e.push({[r]:o})}return e}const Xe=Ye({extend:{theme:{colors:Ke(),borderRadius:Object.keys(V.borderRadius)},classGroups:{"font-size":[{text:Object.keys(V.fontSize)}]}}});function or(...e){return Xe(ue(e))}function nr({formAction:e,formMethod:r="POST",state:t="non-idle"}={}){const o=pe(),a=ge();return(t==="non-idle"?a.state!=="idle":a.state===t)&&a.formAction===(e??o)&&a.formMethod===r}function N(...e){return(...r)=>e.forEach(t=>t==null?void 0:t(...r))}function sr(){const[e,r]=se.useState(!1);function t(o){const a=()=>r(!1),n=e?void 0:s=>{s.preventDefault(),r(!0)},i=s=>{s.key==="Escape"&&r(!1)};return{...o,onBlur:N(a,o==null?void 0:o.onBlur),onClick:N(n,o==null?void 0:o.onClick),onKeyUp:N(i,o==null?void 0:o.onKeyUp)}}return{doubleCheck:e,getButtonProps:t}}export{sr as a,rr as b,or as c,er as d,tr as g,nr as u};
//# sourceMappingURL=misc-BxwGVpjn.js.map