import{r as d,j as m}from"./jsx-runtime-D2HyDbKh.js";import{i as Ge,s as jt,f as Je,a as Oe,g as se,b as He,c as Xe,d as Ie,e as je,h as ye,_ as R,j as fe,k as We,n as Pt,l as Ct,I as Qe,m as Vt,o as Nt,q as he,r as ve,t as Ft,u as Tt,v as we}from"./parse-DONhxXj2.js";import{u as At}from"./index-tx3aR2qd.js";import{P as Ve,c as Lt,f as Rt,b as $e,d as Mt,g as Dt}from"./index-4Ns2fbOC.js";import{c as Q}from"./misc-BxwGVpjn.js";import{c as Bt}from"./button-BOdK6DJc.js";const Ye=d.forwardRef(({className:e,type:t,...r},n)=>m.jsx("input",{type:t,className:Q("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid md:text-sm md:file:text-sm",e),ref:n,...r}));Ye.displayName="Input";var Ht="Label",_e=d.forwardRef((e,t)=>m.jsx(Ve.label,{...e,ref:t,onMouseDown:r=>{var i;r.target.closest("button, input, select, textarea")||((i=e.onMouseDown)==null||i.call(e,r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));_e.displayName=Ht;var et=_e;const Wt=Bt("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),Ne=d.forwardRef(({className:e,...t},r)=>m.jsx(et,{ref:r,className:Q(Wt(),e),...t}));Ne.displayName=et.displayName;function $t(e){return e instanceof Element&&(e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA"||e.tagName==="BUTTON")}function ke(e){return $t(e)&&e.type!=="submit"&&e.type!=="button"&&e.type!=="reset"}function qt(e){var t,r,n=e.target,i=e.submitter;return(t=(r=i==null?void 0:i.getAttribute("formaction"))!==null&&r!==void 0?r:n.getAttribute("action"))!==null&&t!==void 0?t:"".concat(location.pathname).concat(location.search)}function Ut(e){var t,r=e.target,n=e.submitter,i=(t=n==null?void 0:n.getAttribute("formenctype"))!==null&&t!==void 0?t:r.enctype;return i==="multipart/form-data"?i:"application/x-www-form-urlencoded"}function Zt(e){var t,r,n=e.target,i=e.submitter,a=(t=(r=i==null?void 0:i.getAttribute("formmethod"))!==null&&r!==void 0?r:n.getAttribute("method"))===null||t===void 0?void 0:t.toUpperCase();switch(a){case"POST":case"PUT":case"PATCH":case"DELETE":return a}return"GET"}function zt(e,t){if(Ge(!!e,"Failed to submit the form. The element provided is null or undefined."),typeof e.requestSubmit=="function")e.requestSubmit(t);else{var r=new SubmitEvent("submit",{bubbles:!0,cancelable:!0,submitter:t});e.dispatchEvent(r)}}function qe(e,t){var r,n,i,a,o,u=t?void 0:e.lastResult,l=e.defaultValue?jt(e.defaultValue):{},g=(r=u==null?void 0:u.initialValue)!==null&&r!==void 0?r:l,S={formId:e.formId,isValueUpdated:!1,submissionStatus:u==null?void 0:u.status,defaultValue:l,initialValue:g,value:g,constraint:(n=e.constraint)!==null&&n!==void 0?n:{},validated:(i=u==null||(a=u.state)===null||a===void 0?void 0:a.validated)!==null&&i!==void 0?i:{},key:t?R({"":se()},pe(l)):pe(l),error:(o=u==null?void 0:u.error)!==null&&o!==void 0?o:{}};return tt(S,u==null?void 0:u.intent,u==null?void 0:u.fields),S}function pe(e,t){return Object.entries(Je(e,{prefix:t})).reduce((r,n)=>{var[i,a]=n;if(Array.isArray(a))for(var o=0;o<a.length;o++)r[Oe(i,o)]=se();return r},{})}function Ue(e,t){for(var r of Object.keys(e.error).concat(t??[]))e.validated[r]=!0}function tt(e,t,r,n){var i;if(!t){Ue(e,r);return}switch(t.type){case"validate":{t.payload.name?e.validated[t.payload.name]=!0:Ue(e,r);break}case"update":{var{validated:a,value:o}=t.payload,u=Oe(t.payload.name,t.payload.index);typeof o<"u"&&Ze(e,u??"",o),typeof a<"u"&&(u?Ie(e.validated,u,()=>{}):e.validated={},a?((je(o)||Array.isArray(o))&&Object.assign(e.validated,Je(o,{resolve(){return!0},prefix:u})),e.validated[u??""]=!0):u&&delete e.validated[u]);break}case"reset":{var l=Oe(t.payload.name,t.payload.index),g=Xe(e.defaultValue,l);Ze(e,l,g),l?(Ie(e.validated,l,()=>{}),delete e.validated[l]):e.validated={};break}case"insert":case"remove":case"reorder":{n&&(e.initialValue=fe(e.initialValue),e.key=fe(e.key),He(e.key,t,v=>!Array.isArray(v)&&!je(v)?se():Object.assign(pe(v),{[Tt]:se()})),Nt(e.initialValue,t)),He(e.validated,t),e.validated[t.payload.name]=!0;break}}var S=(i=r==null?void 0:r.filter(v=>e.validated[v]))!==null&&i!==void 0?i:[];e.error=Object.entries(e.error).reduce((v,w)=>{var[y,h]=w;return(e.validated[y]||S.some(p=>ye(y,p)))&&(v[y]=h),v},{})}function Ze(e,t,r){if(t===""){e.initialValue=r,e.value=r,e.key=R(R({},pe(r)),{},{"":se()});return}e.initialValue=fe(e.initialValue),e.value=fe(e.value),e.key=fe(e.key),We(e.initialValue,t,()=>r),We(e.value,t,()=>r),(je(r)||Array.isArray(r))&&(Ie(e.key,t,()=>{}),Object.assign(e.key,pe(r,t))),e.key[t]=se()}function me(e){var t={};return new Proxy(t,{get(r,n,i){var a;if(typeof n=="string")return(a=t[n])!==null&&a!==void 0?a:t[n]=e(n,i)}})}function Se(e){var t=Pt(e);return me((r,n)=>{if(r==="")return t;var i=he(r),a=ve(i.slice(0,-1)),o=ve(i.slice(-1)),u=n[a];return Xe(u,o)})}function Kt(e){return me((t,r)=>{var n,i=e[t];if(!i){for(var a=he(t),o=a.length-1;o>=0;o--){var u=a[o];if(typeof u=="number"&&!Number.isNaN(u)){a[o]=Number.NaN;break}}var l=ve(a);t!==l&&(i=r[l])}return(n=i)!==null&&n!==void 0?n:{}})}function Gt(e){return me((t,r)=>{var n=e[t],i=he(t);if(i.length===0)return n;var a=r[ve(i.slice(0,-1))];return typeof a>"u"?n:"".concat(a,"/").concat(n??i.at(-1))})}function Jt(e){return me(t=>{var r=Object.keys(e);if(t==="")return r.length===0;for(var n of r)if(ye(n,t)&&typeof e[n]<"u")return!1;return!0})}function Xt(e,t,r){return me(n=>JSON.stringify(e[n])!==JSON.stringify(t[n],(i,a)=>n===""&&i===""&&a?Object.entries(a).reduce((o,u)=>{var[l,g]=u;return r(l)?Object.assign(o??{},{[l]:g}):o},void 0):a))}function ue(e,t,r,n){var i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:(y,h)=>JSON.stringify(y)!==JSON.stringify(h);if(n&&e!==t){var a,o,u=(a=n.prefix)!==null&&a!==void 0?a:[],l=(o=n.name)!==null&&o!==void 0?o:[],g=u.length===0?l:Array.from(new Set([...Object.keys(e),...Object.keys(t)])),S=function(h){if(u.length===0||l.includes(h)||u.some(k=>ye(h,k))){var p;if((p=r[h])!==null&&p!==void 0||(r[h]=i(e[h],t[h])),r[h])return{v:!0}}},v;for(var w of g)if(v=S(w),v)return v.v}return!1}function Qt(e){var t=[],r=e,n=qe(e),i=o(n);function a(){return document.forms.namedItem(r.formId)}function o(s){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:s,f=arguments.length>2?arguments[2]:void 0,E=!f||c.defaultValue!==s.defaultValue?Se(s.defaultValue):f.defaultValue,I=s.initialValue===s.defaultValue?E:!f||c.initialValue!==s.initialValue?Se(s.initialValue):f.initialValue,C=s.value===s.initialValue?I:!f||c.value!==s.value?Se(s.value):f.value;return{submissionStatus:s.submissionStatus,defaultValue:E,initialValue:I,value:C,error:!f||c.error!==s.error?s.error:f.error,validated:s.validated,constraint:!f||c.constraint!==s.constraint?Kt(s.constraint):f.constraint,key:!f||c.key!==s.key?Gt(s.key):f.key,valid:!f||c.error!==s.error?Jt(s.error):f.valid,dirty:!f||c.defaultValue!==s.defaultValue||c.value!==s.value?Xt(E,C,F=>{var V,W;return(V=(W=r.shouldDirtyConsider)===null||W===void 0?void 0:W.call(r,F))!==null&&V!==void 0?V:!0}):f.dirty}}function u(s){var c=n,f=i,E=o(s,c,f);n=s,i=E;var I={value:{},error:{},initialValue:{},key:{},valid:{},dirty:{}};for(var C of t){var F,V=(F=C.getSubject)===null||F===void 0?void 0:F.call(C);(!V||V.formId&&c.formId!==s.formId||V.status&&f.submissionStatus!==E.submissionStatus||ue(f.error,E.error,I.error,V.error)||ue(f.initialValue,E.initialValue,I.initialValue,V.initialValue)||ue(f.key,E.key,I.key,V.key,(W,D)=>W!==D)||ue(f.valid,E.valid,I.valid,V.valid,l)||ue(f.dirty,E.dirty,I.dirty,V.dirty,l)||ue(f.value,E.value,I.value,V.value))&&C.callback()}}function l(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return s!==c}function g(){return JSON.stringify({validated:n.validated})}function S(s){var c=s.target,f=s.submitter;Ge(c===a(),"The submit event is dispatched by form#".concat(c.id," instead of form#").concat(r.formId));var E=Ct(c,f),I={formData:E,action:qt(s),encType:Ut(s),method:Zt(s)};if(typeof(r==null?void 0:r.onValidate)>"u")return I;var C=r.onValidate({form:c,formData:E,submitter:f});if(C.status==="success"||C.error!==null){var F=C.reply();H(R(R({},F),{},{status:F.status!=="success"?F.status:void 0}))}return R(R({},I),{},{submission:C})}function v(s){var c=a(),f=s.target;return!c||!ke(f)||f.form!==c||!f.form.isConnected||f.name===""?null:f}function w(s,c){var{shouldValidate:f="onSubmit",shouldRevalidate:E=f}=r,I=n.validated[s.name];return I?E===c&&(c==="onInput"||n.isValueUpdated):f===c}function y(s){var c=new FormData(s),f=Ft(c);u(R(R({},n),{},{isValueUpdated:!0,value:f.payload}))}function h(s){var c=v(s);!c||!c.form||(s.defaultPrevented||!w(c,"onInput")?y(c.form):q({type:"validate",payload:{name:c.name}}))}function p(s){var c=v(s);!c||s.defaultPrevented||!w(c,"onBlur")||q({type:"validate",payload:{name:c.name}})}function k(){u(qe(r,!0))}function T(s){var c=a();s.type!=="reset"||s.target!==c||s.defaultPrevented||k()}function H(s){var c,f,E=a();if(!s.initialValue){k();return}var I=Object.entries((c=s.error)!==null&&c!==void 0?c:{}).reduce((V,W)=>{var[D,K]=W,Z=K===null?n.error[D]:K;return Z&&(V[D]=Z),V},{}),C=R(R({},n),{},{isValueUpdated:!1,submissionStatus:s.status,value:s.initialValue,validated:R(R({},n.validated),(f=s.state)===null||f===void 0?void 0:f.validated),error:I});if(tt(C,s.intent,s.fields,!0),u(C),E&&s.status==="error"){for(var F of E.elements)if(ke(F)&&n.error[F.name]){F.focus();break}}}function P(s){var c=r.formId,f=r.lastResult;Object.assign(r,s),r.formId!==c?k():s.lastResult&&s.lastResult!==f&&H(s.lastResult)}function A(s,c){var f={callback:s,getSubject:c};return t.push(f),()=>{t=t.filter(E=>E!==f)}}function U(){return i}function q(s){var c=a(),f=document.createElement("button"),E=O(s);f.name=E.name,f.value=E.value,f.hidden=!0,f.formNoValidate=!0,c==null||c.appendChild(f),zt(c,f),c==null||c.removeChild(f)}function O(s){return{name:Qe,value:Vt(s),form:r.formId,formNoValidate:!0}}function N(s){var c=function(){var E=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return q({type:s,payload:E})};return Object.assign(c,{getButtonProps(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return O({type:s,payload:f})}})}function Y(){var s=new MutationObserver(c=>{var f=a();if(f)for(var E of c){var I=E.type==="childList"?[...E.addedNodes,...E.removedNodes]:[E.target];for(var C of I){var F=ke(C)?C:C instanceof HTMLElement?C.querySelector("input,select,textarea"):null;if((F==null?void 0:F.form)===f){y(f);return}}}});return s.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["form","name"]}),()=>{s.disconnect()}}return{getFormId(){return n.formId},submit:S,onReset:T,onInput:h,onBlur:p,onUpdate:P,validate:N("validate"),reset:N("reset"),update:N("update"),insert:N("insert"),remove:N("remove"),reorder:N("reorder"),subscribe:A,getState:U,getSerializedState:g,observe:Y}}function ze(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?ze(Object(r),!0).forEach(function(n){Yt(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ze(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function Yt(e,t,r){return t=rr(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _t(e,t){if(e==null)return{};var r={},n=Object.keys(e),i,a;for(a=0;a<n.length;a++)i=n[a],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}function er(e,t){if(e==null)return{};var r=_t(e,t),n,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function tr(e,t){if(typeof e!="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function rr(e){var t=tr(e,"string");return typeof t=="symbol"?t:String(t)}var nr=Symbol("wrapped");function ar(e,t){var r=d.useCallback(n=>e.subscribe(n,()=>t==null?void 0:t.current),[e,t]);return d.useSyncExternalStore(r,e.getState,e.getState)}function ir(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=d.useRef(e);return t.current=e,t}function le(e,t,r,n){if(t==="status"||t==="formId")e.current[t]=!0;else if(typeof r<"u"&&typeof n<"u"){var i,a;e.current[t]=M(M({},e.current[t]),{},{[r]:((i=(a=e.current[t])===null||a===void 0?void 0:a[r])!==null&&i!==void 0?i:[]).concat(n)})}}function rt(e,t,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",i=n?"".concat(e.getFormId(),"-").concat(n):e.getFormId(),a=e.getState();return new Proxy({id:i,name:n,errorId:"".concat(i,"-error"),descriptionId:"".concat(i,"-description"),get initialValue(){return a.initialValue[n]},get value(){return a.value[n]},get errors(){return a.error[n]},get key(){return a.key[n]},get valid(){return a.valid[n]},get dirty(){return a.dirty[n]},get allErrors(){if(n==="")return a.error;var o={};for(var[u,l]of Object.entries(a.error))ye(u,n)&&(o[u]=l);return o},get getFieldset(){return()=>new Proxy({},{get(o,u,l){return typeof u=="string"?nt(e,t,r,n,u):Reflect.get(o,u,l)}})}},{get(o,u,l){if(a===r)switch(u){case"id":case"errorId":case"descriptionId":le(t,"formId");break;case"key":case"initialValue":case"value":case"valid":case"dirty":le(t,u,"name",n);break;case"errors":case"allErrors":le(t,"error",u==="errors"?"name":"prefix",n);break}return Reflect.get(o,u,l)}})}function nt(e,t,r){var n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"",i=arguments.length>4?arguments[4]:void 0,a=typeof i>"u"?n:ve([...he(n),i]);return new Proxy({},{get(o,u,l){var g,S=rt(e,t,r,a),v=e.getState();switch(u){case"formId":return v===r&&le(t,"formId"),e.getFormId();case"required":case"minLength":case"maxLength":case"min":case"max":case"pattern":case"step":case"multiple":return(g=v.constraint[a])===null||g===void 0?void 0:g[u];case"getFieldList":return()=>{var w,y=(w=v.initialValue[a])!==null&&w!==void 0?w:[];if(v===r&&le(t,"initialValue","name",a),!Array.isArray(y))throw new Error("The initial value at the given name is not a list");return Array(y.length).fill(0).map((h,p)=>nt(e,t,r,a,p))}}return Reflect.get(S,u,l)}})}function or(e,t,r,n){return new Proxy({},{get(i,a,o){var u=rt(e,t,r),l=e.getState();switch(a){case"context":return{[nr]:e};case"status":return l===r&&le(t,"status"),l.submissionStatus;case"validate":case"update":case"reset":case"insert":case"remove":case"reorder":return e[a];case"onSubmit":return e.submit;case"noValidate":return n}return Reflect.get(u,a,o)}})}function ur(e){var{onSubmit:t}=e,r=Qt(e);return M(M({},r),{},{submit(n){var i=n.nativeEvent,a=r.submit(i);if(!a.submission||a.submission.status==="success"||a.submission.error===null){if(!a.formData.has(Qe)){var o;(o=t)===null||o===void 0||o(n,a)}}else n.preventDefault()},onUpdate(n){t=n.onSubmit,r.onUpdate(n)}})}var lr=["id"],Pe=typeof document>"u"?d.useEffect:d.useLayoutEffect;function sr(e){var t=d.useId();return e??t}function dr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0,[t,r]=d.useState(e);return Pe(()=>{t||r(!0)},[t]),t}function Gr(e){var{id:t}=e,r=er(e,lr),n=sr(t),[i]=d.useState(()=>ur(M(M({},r),{},{formId:n})));Pe(()=>{var g=i.observe();return document.addEventListener("input",i.onInput),document.addEventListener("focusout",i.onBlur),document.addEventListener("reset",i.onReset),()=>{g(),document.removeEventListener("input",i.onInput),document.removeEventListener("focusout",i.onBlur),document.removeEventListener("reset",i.onReset)}},[i]),Pe(()=>{i.onUpdate(M(M({},r),{},{formId:n}))});var a=ir(),o=ar(i,a),u=dr(e.defaultNoValidate),l=or(i,a,o,u);return[l,l.getFieldset()]}function cr(e){return document.forms.namedItem(e)}function at(e,t){var r=e==null?void 0:e.elements.namedItem(t),n=r?r instanceof Element?[r]:Array.from(r.values()):[];return n.filter(i=>i instanceof HTMLInputElement||i instanceof HTMLSelectElement||i instanceof HTMLTextAreaElement)}function fr(e,t,r){var n,i=at(e,t);if(i.length>1){var a=r;for(var o of i)if(!(typeof a<"u"&&o instanceof HTMLInputElement&&o.type==="checkbox"&&(o.checked?a.includes(o.value):!a.includes(o.value))))return o}return(n=i[0])!==null&&n!==void 0?n:null}function vr(e,t,r){var n=document.createElement("select"),i=typeof r=="string"?[r]:r??[];n.name=t,n.multiple=!0,n.dataset.conform="true",n.setAttribute("aria-hidden","true"),n.tabIndex=-1,n.style.position="absolute",n.style.width="1px",n.style.height="1px",n.style.padding="0",n.style.margin="-1px",n.style.overflow="hidden",n.style.clip="rect(0,0,0,0)",n.style.whiteSpace="nowrap",n.style.border="0";for(var a of i)n.options.add(new Option(a,a,!0,!0));return e.appendChild(n),n}function it(e){return e.dataset.conform==="true"}function pr(e,t){if(e instanceof HTMLInputElement&&(e.type==="checkbox"||e.type==="radio"))e.checked=Array.isArray(t)?t.includes(e.value):e.value===t;else if(e instanceof HTMLSelectElement&&e.multiple){var r=Array.isArray(t)?[...t]:[t];for(var n of e.options){var i=r.indexOf(n.value),a=i>-1;n.selected=a,a&&r.splice(i,1)}if(it(e))for(var o of r)e.options.add(new Option(o,o,!1,!0))}else if(e.value!==t){var{set:u}=Object.getOwnPropertyDescriptor(e,"value")||{},l=Object.getPrototypeOf(e),{set:g}=Object.getOwnPropertyDescriptor(l,"value")||{};if(g&&u!==g)g.call(e,t);else if(u)u.call(e,t);else throw new Error("The given element does not have a value setter")}}function mr(){var e=d.useRef(null),t=d.useRef({change:!1,focus:!1,blur:!1});return d.useEffect(()=>{var r=o=>u=>{var l=e.current;l&&u.target===l&&(t.current[o]=!0)},n=r("change"),i=r("focus"),a=r("blur");return document.addEventListener("input",n,!0),document.addEventListener("focusin",i,!0),document.addEventListener("focusout",a,!0),()=>{document.removeEventListener("input",n,!0),document.removeEventListener("focusin",i,!0),document.removeEventListener("focusout",a,!0)}},[e]),d.useMemo(()=>({change(r){if(!t.current.change){t.current.change=!0;var n=e.current;n&&(pr(n,r),n.dispatchEvent(new InputEvent("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})))}t.current.change=!1},focus(){if(!t.current.focus){t.current.focus=!0;var r=e.current;r&&(r.dispatchEvent(new FocusEvent("focusin",{bubbles:!0})),r.dispatchEvent(new FocusEvent("focus")))}t.current.focus=!1},blur(){if(!t.current.blur){t.current.blur=!0;var r=e.current;r&&(r.dispatchEvent(new FocusEvent("focusout",{bubbles:!0})),r.dispatchEvent(new FocusEvent("blur")))}t.current.blur=!1},register(r){e.current=r}}),[])}function gr(e){var t=()=>{var o;return typeof e.initialValue=="string"?e.initialValue:(o=e.initialValue)===null||o===void 0?void 0:o.map(u=>u??"")},[r,n]=d.useState(e.key),[i,a]=d.useState(t);return r!==e.key&&(a(t),n(e.key)),[i,a]}function br(e){var[t,r]=gr(e),n=d.useRef(!1),{register:i,change:a,focus:o,blur:u}=mr();return d.useEffect(()=>{var l=cr(e.formId);if(!l){console.warn("useInputControl is unable to find form#".concat(e.formId," and identify if a dummy input is required"));return}var g=fr(l,e.name);return!g&&typeof t<"u"&&(!Array.isArray(t)||t.length>0)&&(g=vr(l,e.name,t)),i(g),n.current?a(t??""):n.current=!0,()=>{i(null);var S=at(l,e.name);for(var v of S)it(v)&&v.remove()}},[e.formId,e.name,t,a,i]),{value:t,change:r,focus:o,blur:u}}function ge(e){for(var t in e)e[t]===void 0&&delete e[t];return e}function ot(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(typeof t.ariaAttributes<"u"&&!t.ariaAttributes)return{};var r=t.ariaInvalid==="allErrors"?!e.valid:typeof e.errors<"u",n=t.ariaDescribedBy;return ge({"aria-invalid":r||void 0,"aria-describedby":r?"".concat(e.errorId," ").concat(n??"").trim():n})}function Jr(e,t){return ge(M({id:e.id,onSubmit:e.onSubmit,noValidate:e.noValidate},ot(e,t)))}function yr(e,t){return ge(M({id:e.id,name:e.name,form:e.formId},ot(e,t)))}function hr(e,t){return ge(M({key:e.key,required:e.required||void 0},yr(e,t)))}function Xr(e,t){var r=M(M({},hr(e,t)),{},{type:t.type,minLength:e.minLength,maxLength:e.maxLength,min:e.min,max:e.max,step:e.step,pattern:e.pattern,multiple:e.multiple});return(typeof t.value>"u"||t.value)&&(t.type==="checkbox"||t.type==="radio"?(r.value=typeof t.value=="string"?t.value:"on",r.defaultChecked=Array.isArray(e.initialValue)?e.initialValue.includes(t.value):e.initialValue===r.value):typeof e.initialValue=="string"&&(r.defaultValue=e.initialValue)),ge(r)}var xr=["required","minLength","maxLength","min","max","step","multiple","pattern"];function Qr(e){function t(n,i){var a,o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"",u=o!==""?(a=i[o])!==null&&a!==void 0?a:i[o]={required:!0}:{},l=n._def;if(l.typeName==="ZodObject")for(var g in l.shape())t(l.shape()[g],i,o?"".concat(o,".").concat(g):g);else if(l.typeName==="ZodEffects")t(l.schema,i,o);else if(l.typeName==="ZodPipeline")t(l.out,i,o);else if(l.typeName==="ZodIntersection"){var S={},v={};t(l.left,S,o),t(l.right,v,o),Object.assign(i,S,v)}else if(l.typeName==="ZodUnion"||l.typeName==="ZodDiscriminatedUnion")Object.assign(i,l.options.map(k=>{var T={};return t(k,T,o),T}).reduce((k,T)=>{var H=new Set([...Object.keys(k),...Object.keys(T)]),P={};for(var A of H){var U=k[A],q=T[A];if(U&&q){var O={};P[A]=O;for(var N of xr)typeof U[N]<"u"&&typeof q[N]<"u"&&U[N]===q[N]&&(O[N]=U[N])}else P[A]=we(we(we({},U),q),{},{required:!1})}return P}));else{if(o==="")throw new Error("Unsupported schema");if(l.typeName==="ZodArray")u.multiple=!0,t(l.type,i,"".concat(o,"[]"));else if(l.typeName==="ZodString"){var w=n;if(w.minLength!==null){var y;u.minLength=(y=w.minLength)!==null&&y!==void 0?y:void 0}w.maxLength!==null&&(u.maxLength=w.maxLength)}else if(l.typeName==="ZodOptional")u.required=!1,t(l.innerType,i,o);else if(l.typeName==="ZodDefault")u.required=!1,t(l.innerType,i,o);else if(l.typeName==="ZodNumber"){var h=n;h.minValue!==null&&(u.min=h.minValue),h.maxValue!==null&&(u.max=h.maxValue)}else if(l.typeName==="ZodEnum")u.pattern=l.values.map(k=>k.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")).join("|");else if(l.typeName==="ZodTuple")for(var p=0;p<l.items.length;p++)t(l.items[p],i,"".concat(o,"[").concat(p,"]"));else l.typeName}}var r={};return t(e,r),r}var Er=Object.defineProperty,wr=Object.defineProperties,kr=Object.getOwnPropertyDescriptors,be=Object.getOwnPropertySymbols,ut=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable,Ke=(e,t,r)=>t in e?Er(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Sr=(e,t)=>{for(var r in t||(t={}))ut.call(t,r)&&Ke(e,r,t[r]);if(be)for(var r of be(t))lt.call(t,r)&&Ke(e,r,t[r]);return e},Or=(e,t)=>wr(e,kr(t)),Ir=(e,t)=>{var r={};for(var n in e)ut.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&be)for(var n of be(e))t.indexOf(n)<0&&lt.call(e,n)&&(r[n]=e[n]);return r},jr="^\\d+$",Pr="^[a-zA-Z0-9]+$";function Cr(e){let t=setTimeout(e,0),r=setTimeout(e,10),n=setTimeout(e,50);return[t,r,n]}function Vr(e){let t=d.useRef();return d.useEffect(()=>{t.current=e}),t.current}var Nr=18,st=40,Fr=`${st}px`,Tr=["[data-lastpass-icon-root]","com-1password-button","[data-dashlanecreated]",'[style$="2147483647 !important;"]'].join(",");function Ar({containerRef:e,inputRef:t,pushPasswordManagerStrategy:r,isFocused:n}){let i=d.useRef({done:!1,refocused:!1}),[a,o]=d.useState(!1),[u,l]=d.useState(!1),[g,S]=d.useState(!1),v=d.useMemo(()=>r==="none"?!1:(r==="increase-width"||r==="experimental-no-flickering")&&a&&u,[a,u,r]),w=d.useCallback(()=>{let y=e.current,h=t.current;if(!y||!h||g||r==="none")return;let p=y,k=p.getBoundingClientRect().left+p.offsetWidth,T=p.getBoundingClientRect().top+p.offsetHeight/2,H=k-Nr,P=T;if(!(document.querySelectorAll(Tr).length===0&&document.elementFromPoint(H,P)===y)&&(o(!0),S(!0),!i.current.refocused&&document.activeElement===h)){let A=[h.selectionStart,h.selectionEnd];h.blur(),h.focus(),h.setSelectionRange(A[0],A[1]),i.current.refocused=!0}},[e,t,g,r]);return d.useEffect(()=>{let y=e.current;if(!y||r==="none")return;function h(){let k=window.innerWidth-y.getBoundingClientRect().right;l(k>=st)}h();let p=setInterval(h,1e3);return()=>{clearInterval(p)}},[e,r]),d.useEffect(()=>{let y=n||document.activeElement===t.current;if(r==="none"||!y)return;let h=setTimeout(w,0),p=setTimeout(w,2e3),k=setTimeout(w,5e3),T=setTimeout(()=>{S(!0)},6e3);return()=>{clearTimeout(h),clearTimeout(p),clearTimeout(k),clearTimeout(T)}},[t,n,r,w]),{hasPWMBadge:a,willPushPWMBadge:v,PWM_BADGE_SPACE_WIDTH:Fr}}var dt=d.createContext({}),ct=d.forwardRef((e,t)=>{var r=e,{value:n,onChange:i,maxLength:a,textAlign:o="left",pattern:u=jr,inputMode:l="numeric",onComplete:g,pushPasswordManagerStrategy:S="increase-width",containerClassName:v,noScriptCSSFallback:w=Lr,render:y,children:h}=r,p=Ir(r,["value","onChange","maxLength","textAlign","pattern","inputMode","onComplete","pushPasswordManagerStrategy","containerClassName","noScriptCSSFallback","render","children"]),k,T,H,P,A;let[U,q]=d.useState(typeof p.defaultValue=="string"?p.defaultValue:""),O=n??U,N=Vr(O),Y=d.useCallback(b=>{i==null||i(b),q(b)},[i]),s=d.useMemo(()=>u?typeof u=="string"?new RegExp(u):u:null,[u]),c=d.useRef(null),f=d.useRef(null),E=d.useRef({value:O,onChange:Y,isIOS:typeof window<"u"&&((T=(k=window==null?void 0:window.CSS)==null?void 0:k.supports)==null?void 0:T.call(k,"-webkit-touch-callout","none"))}),I=d.useRef({prev:[(H=c.current)==null?void 0:H.selectionStart,(P=c.current)==null?void 0:P.selectionEnd,(A=c.current)==null?void 0:A.selectionDirection]});d.useImperativeHandle(t,()=>c.current,[]),d.useEffect(()=>{let b=c.current,x=f.current;if(!b||!x)return;E.current.value!==b.value&&E.current.onChange(b.value),I.current.prev=[b.selectionStart,b.selectionEnd,b.selectionDirection];function L(){if(document.activeElement!==b){K(null),de(null);return}let j=b.selectionStart,$=b.selectionEnd,G=b.selectionDirection,_=b.maxLength,ee=b.value,oe=I.current.prev,J=-1,X=-1,te;if(ee.length!==0&&j!==null&&$!==null){let St=j===$,Ot=j===ee.length&&ee.length<_;if(St&&!Ot){let re=j;if(re===0)J=0,X=1,te="forward";else if(re===_)J=re-1,X=re,te="backward";else if(_>1&&ee.length>1){let Ee=0;if(oe[0]!==null&&oe[1]!==null){te=re<oe[1]?"backward":"forward";let It=oe[0]===oe[1]&&oe[0]<_;te==="backward"&&!It&&(Ee=-1)}J=Ee+re,X=Ee+re+1}}J!==-1&&X!==-1&&J!==X&&c.current.setSelectionRange(J,X,te)}let De=J!==-1?J:j,Be=X!==-1?X:$,kt=te??G;K(De),de(Be),I.current.prev=[De,Be,kt]}if(document.addEventListener("selectionchange",L,{capture:!0}),L(),document.activeElement===b&&W(!0),!document.getElementById("input-otp-style")){let j=document.createElement("style");if(j.id="input-otp-style",document.head.appendChild(j),j.sheet){let $="background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";ce(j.sheet,"[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"),ce(j.sheet,`[data-input-otp]:autofill { ${$} }`),ce(j.sheet,`[data-input-otp]:-webkit-autofill { ${$} }`),ce(j.sheet,"@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"),ce(j.sheet,"[data-input-otp] + * { pointer-events: all !important; }")}}let B=()=>{x&&x.style.setProperty("--root-height",`${b.clientHeight}px`)};B();let z=new ResizeObserver(B);return z.observe(b),()=>{document.removeEventListener("selectionchange",L,{capture:!0}),z.disconnect()}},[]);let[C,F]=d.useState(!1),[V,W]=d.useState(!1),[D,K]=d.useState(null),[Z,de]=d.useState(null);d.useEffect(()=>{Cr(()=>{var b,x,L,B;(b=c.current)==null||b.dispatchEvent(new Event("input"));let z=(x=c.current)==null?void 0:x.selectionStart,j=(L=c.current)==null?void 0:L.selectionEnd,$=(B=c.current)==null?void 0:B.selectionDirection;z!==null&&j!==null&&(K(z),de(j),I.current.prev=[z,j,$])})},[O,V]),d.useEffect(()=>{N!==void 0&&O!==N&&N.length<a&&O.length===a&&(g==null||g(O))},[a,g,N,O]);let ie=Ar({containerRef:f,inputRef:c,pushPasswordManagerStrategy:S,isFocused:V}),Ae=d.useCallback(b=>{let x=b.currentTarget.value.slice(0,a);if(x.length>0&&s&&!s.test(x)){b.preventDefault();return}typeof N=="string"&&x.length<N.length&&document.dispatchEvent(new Event("selectionchange")),Y(x)},[a,Y,N,s]),Le=d.useCallback(()=>{var b;if(c.current){let x=Math.min(c.current.value.length,a-1),L=c.current.value.length;(b=c.current)==null||b.setSelectionRange(x,L),K(x),de(L)}W(!0)},[a]),Re=d.useCallback(b=>{var x,L;let B=c.current;if(!E.current.isIOS||!b.clipboardData||!B)return;let z=b.clipboardData.getData("text/plain");b.preventDefault();let j=(x=c.current)==null?void 0:x.selectionStart,$=(L=c.current)==null?void 0:L.selectionEnd,G=(j!==$?O.slice(0,j)+z+O.slice($):O.slice(0,j)+z+O.slice(j)).slice(0,a);if(G.length>0&&s&&!s.test(G))return;B.value=G,Y(G);let _=Math.min(G.length,a-1),ee=G.length;B.setSelectionRange(_,ee),K(_),de(ee)},[a,Y,s,O]),xt=d.useMemo(()=>({position:"relative",cursor:p.disabled?"default":"text",userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none"}),[p.disabled]),Me=d.useMemo(()=>({position:"absolute",inset:0,width:ie.willPushPWMBadge?`calc(100% + ${ie.PWM_BADGE_SPACE_WIDTH})`:"100%",clipPath:ie.willPushPWMBadge?`inset(0 ${ie.PWM_BADGE_SPACE_WIDTH} 0 0)`:void 0,height:"100%",display:"flex",textAlign:o,opacity:"1",color:"transparent",pointerEvents:"all",background:"transparent",caretColor:"transparent",border:"0 solid transparent",outline:"0 solid transparent",boxShadow:"none",lineHeight:"1",letterSpacing:"-.5em",fontSize:"var(--root-height)",fontFamily:"monospace",fontVariantNumeric:"tabular-nums"}),[ie.PWM_BADGE_SPACE_WIDTH,ie.willPushPWMBadge,o]),Et=d.useMemo(()=>d.createElement("input",Or(Sr({autoComplete:p.autoComplete||"one-time-code"},p),{"data-input-otp":!0,"data-input-otp-mss":D,"data-input-otp-mse":Z,inputMode:l,pattern:s==null?void 0:s.source,style:Me,maxLength:a,value:O,ref:c,onPaste:b=>{var x;Re(b),(x=p.onPaste)==null||x.call(p,b)},onChange:Ae,onMouseOver:b=>{var x;F(!0),(x=p.onMouseOver)==null||x.call(p,b)},onMouseLeave:b=>{var x;F(!1),(x=p.onMouseLeave)==null||x.call(p,b)},onFocus:b=>{var x;Le(),(x=p.onFocus)==null||x.call(p,b)},onBlur:b=>{var x;W(!1),(x=p.onBlur)==null||x.call(p,b)}})),[Ae,Le,Re,l,Me,a,Z,D,p,s==null?void 0:s.source,O]),xe=d.useMemo(()=>({slots:Array.from({length:a}).map((b,x)=>{let L=V&&D!==null&&Z!==null&&(D===Z&&x===D||x>=D&&x<Z),B=O[x]!==void 0?O[x]:null;return{char:B,isActive:L,hasFakeCaret:L&&B===null}}),isFocused:V,isHovering:!p.disabled&&C}),[V,C,a,Z,D,p.disabled,O]),wt=d.useMemo(()=>y?y(xe):d.createElement(dt.Provider,{value:xe},h),[h,xe,y]);return d.createElement(d.Fragment,null,w!==null&&d.createElement("noscript",null,d.createElement("style",null,w)),d.createElement("div",{ref:f,"data-input-otp-container":!0,style:xt,className:v},wt,d.createElement("div",{style:{position:"absolute",inset:0,pointerEvents:"none"}},Et)))});ct.displayName="Input";function ce(e,t){try{e.insertRule(t)}catch{console.error("input-otp could not insert CSS rule:",t)}}var Lr=`
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;function Rr(e){const t=d.useRef({value:e,previous:e});return d.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}var Fe="Checkbox",[Mr,Yr]=Lt(Fe),[Dr,Br]=Mr(Fe),ft=d.forwardRef((e,t)=>{const{__scopeCheckbox:r,name:n,checked:i,defaultChecked:a,required:o,disabled:u,value:l="on",onCheckedChange:g,...S}=e,[v,w]=d.useState(null),y=At(t,P=>w(P)),h=d.useRef(!1),p=v?!!v.closest("form"):!0,[k=!1,T]=Rt({prop:i,defaultProp:a,onChange:g}),H=d.useRef(k);return d.useEffect(()=>{const P=v==null?void 0:v.form;if(P){const A=()=>T(H.current);return P.addEventListener("reset",A),()=>P.removeEventListener("reset",A)}},[v,T]),m.jsxs(Dr,{scope:r,state:k,disabled:u,children:[m.jsx(Ve.button,{type:"button",role:"checkbox","aria-checked":ae(k)?"mixed":k,"aria-required":o,"data-state":mt(k),"data-disabled":u?"":void 0,disabled:u,value:l,...S,ref:y,onKeyDown:$e(e.onKeyDown,P=>{P.key==="Enter"&&P.preventDefault()}),onClick:$e(e.onClick,P=>{T(A=>ae(A)?!0:!A),p&&(h.current=P.isPropagationStopped(),h.current||P.stopPropagation())})}),p&&m.jsx(Hr,{control:v,bubbles:!h.current,name:n,value:l,checked:k,required:o,disabled:u,style:{transform:"translateX(-100%)"}})]})});ft.displayName=Fe;var vt="CheckboxIndicator",pt=d.forwardRef((e,t)=>{const{__scopeCheckbox:r,forceMount:n,...i}=e,a=Br(vt,r);return m.jsx(Mt,{present:n||ae(a.state)||a.state===!0,children:m.jsx(Ve.span,{"data-state":mt(a.state),"data-disabled":a.disabled?"":void 0,...i,ref:t,style:{pointerEvents:"none",...e.style}})})});pt.displayName=vt;var Hr=e=>{const{control:t,checked:r,bubbles:n=!0,...i}=e,a=d.useRef(null),o=Rr(r),u=Dt(t);return d.useEffect(()=>{const l=a.current,g=window.HTMLInputElement.prototype,v=Object.getOwnPropertyDescriptor(g,"checked").set;if(o!==r&&v){const w=new Event("click",{bubbles:n});l.indeterminate=ae(r),v.call(l,ae(r)?!1:r),l.dispatchEvent(w)}},[o,r,n]),m.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:ae(r)?!1:r,...i,tabIndex:-1,ref:a,style:{...e.style,...u,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function ae(e){return e==="indeterminate"}function mt(e){return ae(e)?"indeterminate":e?"checked":"unchecked"}var gt=ft,Wr=pt;const bt=d.forwardRef(({className:e,...t},r)=>m.jsx(gt,{ref:r,className:Q("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",e),...t,children:m.jsx(Wr,{className:Q("flex items-center justify-center text-current"),children:m.jsx("svg",{viewBox:"0 0 8 8",children:m.jsx("path",{d:"M1,4 L3,6 L7,2",stroke:"currentcolor",strokeWidth:"1",fill:"none"})})})}));bt.displayName=gt.displayName;const yt=d.forwardRef(({className:e,containerClassName:t,...r},n)=>m.jsx(ct,{ref:n,containerClassName:Q("flex items-center gap-2 has-[:disabled]:opacity-50",t),className:Q("disabled:cursor-not-allowed",e),...r}));yt.displayName="InputOTP";const Ce=d.forwardRef(({className:e,...t},r)=>m.jsx("div",{ref:r,className:Q("flex items-center",e),...t}));Ce.displayName="InputOTPGroup";const ne=d.forwardRef(({index:e,className:t,...r},n)=>{const a=d.useContext(dt).slots[e];if(!a)throw new Error("Invalid slot index");const{char:o,hasFakeCaret:u,isActive:l}=a;return m.jsxs("div",{ref:n,className:Q("relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-base transition-all first:rounded-l-md first:border-l last:rounded-r-md md:text-sm",l&&"z-10 ring-2 ring-ring ring-offset-background",t),...r,children:[o,u&&m.jsx("div",{className:"pointer-events-none absolute inset-0 flex items-center justify-center",children:m.jsx("div",{className:"h-4 w-px animate-caret-blink bg-foreground duration-1000"})})]})});ne.displayName="InputOTPSlot";const ht=d.forwardRef(({...e},t)=>m.jsx("div",{ref:t,role:"separator",...e,children:"-"}));ht.displayName="InputOTPSeparator";function Te({id:e,errors:t}){const r=t==null?void 0:t.filter(Boolean);return r!=null&&r.length?m.jsx("ul",{id:e,className:"flex flex-col gap-1",children:r.map(n=>m.jsx("li",{className:"text-[10px] text-foreground-destructive",children:n},n))}):null}function _r({labelProps:e,inputProps:t,errors:r,className:n}){const i=d.useId(),a=t.id??i,o=r!=null&&r.length?`${a}-error`:void 0;return m.jsxs("div",{className:n,children:[m.jsx(Ne,{htmlFor:a,...e}),m.jsx(Ye,{id:a,"aria-invalid":o?!0:void 0,"aria-describedby":o,...t}),m.jsx("div",{className:"min-h-[32px] px-4 pb-3 pt-1",children:o?m.jsx(Te,{id:o,errors:r}):null})]})}function en({labelProps:e,inputProps:t,errors:r,className:n}){const i=d.useId(),a=t.id??i,o=r!=null&&r.length?`${a}-error`:void 0;return m.jsxs("div",{className:n,children:[m.jsx(Ne,{htmlFor:a,...e}),m.jsxs(yt,{pattern:Pr,maxLength:6,id:a,"aria-invalid":o?!0:void 0,"aria-describedby":o,...t,children:[m.jsxs(Ce,{children:[m.jsx(ne,{index:0}),m.jsx(ne,{index:1}),m.jsx(ne,{index:2})]}),m.jsx(ht,{}),m.jsxs(Ce,{children:[m.jsx(ne,{index:3}),m.jsx(ne,{index:4}),m.jsx(ne,{index:5})]})]}),m.jsx("div",{className:"min-h-[32px] px-4 pb-3 pt-1",children:o?m.jsx(Te,{id:o,errors:r}):null})]})}function tn({labelProps:e,buttonProps:t,errors:r,className:n}){const{key:i,defaultChecked:a,...o}=t,u=d.useId(),l=t.value??"on",g=br({key:i,name:t.name,formId:t.form,initialValue:a?l:void 0}),S=t.id??u,v=r!=null&&r.length?`${S}-error`:void 0;return m.jsxs("div",{className:n,children:[m.jsxs("div",{className:"flex gap-2",children:[m.jsx(bt,{...o,id:S,"aria-invalid":v?!0:void 0,"aria-describedby":v,checked:g.value===l,onCheckedChange:w=>{var y;g.change(w.valueOf()?l:""),(y=t.onCheckedChange)==null||y.call(t,w)},onFocus:w=>{var y;g.focus(),(y=t.onFocus)==null||y.call(t,w)},onBlur:w=>{var y;g.blur(),(y=t.onBlur)==null||y.call(t,w)},type:"button"}),m.jsx("label",{htmlFor:S,...e,className:"self-center text-body-xs text-muted-foreground"})]}),m.jsx("div",{className:"px-4 pb-3 pt-1",children:v?m.jsx(Te,{id:v,errors:r}):null})]})}export{tn as C,Te as E,_r as F,en as O,Jr as a,Xr as b,Qr as g,Gr as u};
//# sourceMappingURL=forms-Dd4gJQEl.js.map