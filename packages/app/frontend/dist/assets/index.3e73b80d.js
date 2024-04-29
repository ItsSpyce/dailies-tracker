var Qe=Object.defineProperty;var Xe=(e,t,r)=>t in e?Qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ae=(e,t,r)=>(Xe(e,typeof t!="symbol"?t+"":t,r),r);import{StyledApp as Ye,StatusPanel as Ve,ExtraRewards as et,DailiesPanel as tt,ChooseDateForm as rt,DailiesList as nt}from"./styles.f1647077.js";import{u as l,R as te,r as g,j as u,a,p as V,e as ot,F as Pe,b as it,c as at,D as st}from"./index.334db849.js";function y(e,t){return r=>typeof e=="function"?e(r)?"&":"&.__never__":r[e]===t?"&":"&.__never__"}function ct(...e){return e.length===1?`
      left: ${e[0]};
      right: ${e[0]};
      top: ${e[0]};
      bottom: ${e[0]};
    `:e.length===2?`
      left: ${e[1]};
      right: ${e[1]};
      top: ${e[0]};
      bottom: ${e[0]};
    `:e.length===3?`
      left: ${e[1]};
      right: ${e[1]};
      top: ${e[0]};
      bottom: ${e[2]};
    `:`
    left: ${e[3]};
    right: ${e[1]};
    top: ${e[0]};
    bottom: ${e[2]};
  `}function w(){return w=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},w.apply(this,arguments)}function dt(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Z(e,t){return Z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,o){return n.__proto__=o,n},Z(e,t)}function lt(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,Z(e,t)}function ue(e){return ue=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(r){return r.__proto__||Object.getPrototypeOf(r)},ue(e)}function ut(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}function _e(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(_e=function(){return!!e})()}function ft(e,t,r){if(_e())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,t);var o=new(e.bind.apply(e,n));return r&&Z(o,r.prototype),o}function fe(e){var t=typeof Map=="function"?new Map:void 0;return fe=function(n){if(n===null||!ut(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t<"u"){if(t.has(n))return t.get(n);t.set(n,o)}function o(){return ft(n,arguments,ue(this).constructor)}return o.prototype=Object.create(n.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),Z(o,n)},fe(e)}var O=function(e){lt(t,e);function t(r){var n;return n=e.call(this,"An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#"+r+" for more information.")||this,dt(n)}return t}(fe(Error));function se(e){return Math.round(e*255)}function pt(e,t,r){return se(e)+","+se(t)+","+se(r)}function J(e,t,r,n){if(n===void 0&&(n=pt),t===0)return n(r,r,r);var o=(e%360+360)%360/60,i=(1-Math.abs(2*r-1))*t,s=i*(1-Math.abs(o%2-1)),d=0,c=0,p=0;o>=0&&o<1?(d=i,c=s):o>=1&&o<2?(d=s,c=i):o>=2&&o<3?(c=i,p=s):o>=3&&o<4?(c=s,p=i):o>=4&&o<5?(d=s,p=i):o>=5&&o<6&&(d=i,p=s);var b=r-i/2,h=d+b,m=c+b,v=p+b;return n(h,m,v)}var $e={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function ht(e){if(typeof e!="string")return e;var t=e.toLowerCase();return $e[t]?"#"+$e[t]:e}var mt=/^#[a-fA-F0-9]{6}$/,gt=/^#[a-fA-F0-9]{8}$/,bt=/^#[a-fA-F0-9]{3}$/,yt=/^#[a-fA-F0-9]{4}$/,ce=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,xt=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,vt=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,kt=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function K(e){if(typeof e!="string")throw new O(3);var t=ht(e);if(t.match(mt))return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16)};if(t.match(gt)){var r=parseFloat((parseInt(""+t[7]+t[8],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16),alpha:r}}if(t.match(bt))return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16)};if(t.match(yt)){var n=parseFloat((parseInt(""+t[4]+t[4],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16),alpha:n}}var o=ce.exec(t);if(o)return{red:parseInt(""+o[1],10),green:parseInt(""+o[2],10),blue:parseInt(""+o[3],10)};var i=xt.exec(t.substring(0,50));if(i)return{red:parseInt(""+i[1],10),green:parseInt(""+i[2],10),blue:parseInt(""+i[3],10),alpha:parseFloat(""+i[4])>1?parseFloat(""+i[4])/100:parseFloat(""+i[4])};var s=vt.exec(t);if(s){var d=parseInt(""+s[1],10),c=parseInt(""+s[2],10)/100,p=parseInt(""+s[3],10)/100,b="rgb("+J(d,c,p)+")",h=ce.exec(b);if(!h)throw new O(4,t,b);return{red:parseInt(""+h[1],10),green:parseInt(""+h[2],10),blue:parseInt(""+h[3],10)}}var m=kt.exec(t.substring(0,50));if(m){var v=parseInt(""+m[1],10),A=parseInt(""+m[2],10)/100,D=parseInt(""+m[3],10)/100,we="rgb("+J(v,A,D)+")",Y=ce.exec(we);if(!Y)throw new O(4,t,we);return{red:parseInt(""+Y[1],10),green:parseInt(""+Y[2],10),blue:parseInt(""+Y[3],10),alpha:parseFloat(""+m[4])>1?parseFloat(""+m[4])/100:parseFloat(""+m[4])}}throw new O(5)}function wt(e){var t=e.red/255,r=e.green/255,n=e.blue/255,o=Math.max(t,r,n),i=Math.min(t,r,n),s=(o+i)/2;if(o===i)return e.alpha!==void 0?{hue:0,saturation:0,lightness:s,alpha:e.alpha}:{hue:0,saturation:0,lightness:s};var d,c=o-i,p=s>.5?c/(2-o-i):c/(o+i);switch(o){case t:d=(r-n)/c+(r<n?6:0);break;case r:d=(n-t)/c+2;break;default:d=(t-r)/c+4;break}return d*=60,e.alpha!==void 0?{hue:d,saturation:p,lightness:s,alpha:e.alpha}:{hue:d,saturation:p,lightness:s}}function M(e){return wt(K(e))}var $t=function(t){return t.length===7&&t[1]===t[2]&&t[3]===t[4]&&t[5]===t[6]?"#"+t[1]+t[3]+t[5]:t},pe=$t;function B(e){var t=e.toString(16);return t.length===1?"0"+t:t}function de(e){return B(Math.round(e*255))}function Ct(e,t,r){return pe("#"+de(e)+de(t)+de(r))}function re(e,t,r){return J(e,t,r,Ct)}function It(e,t,r){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number")return re(e,t,r);if(typeof e=="object"&&t===void 0&&r===void 0)return re(e.hue,e.saturation,e.lightness);throw new O(1)}function St(e,t,r,n){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number"&&typeof n=="number")return n>=1?re(e,t,r):"rgba("+J(e,t,r)+","+n+")";if(typeof e=="object"&&t===void 0&&r===void 0&&n===void 0)return e.alpha>=1?re(e.hue,e.saturation,e.lightness):"rgba("+J(e.hue,e.saturation,e.lightness)+","+e.alpha+")";throw new O(2)}function he(e,t,r){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number")return pe("#"+B(e)+B(t)+B(r));if(typeof e=="object"&&t===void 0&&r===void 0)return pe("#"+B(e.red)+B(e.green)+B(e.blue));throw new O(6)}function X(e,t,r,n){if(typeof e=="string"&&typeof t=="number"){var o=K(e);return"rgba("+o.red+","+o.green+","+o.blue+","+t+")"}else{if(typeof e=="number"&&typeof t=="number"&&typeof r=="number"&&typeof n=="number")return n>=1?he(e,t,r):"rgba("+e+","+t+","+r+","+n+")";if(typeof e=="object"&&t===void 0&&r===void 0&&n===void 0)return e.alpha>=1?he(e.red,e.green,e.blue):"rgba("+e.red+","+e.green+","+e.blue+","+e.alpha+")"}throw new O(7)}var Ft=function(t){return typeof t.red=="number"&&typeof t.green=="number"&&typeof t.blue=="number"&&(typeof t.alpha!="number"||typeof t.alpha>"u")},jt=function(t){return typeof t.red=="number"&&typeof t.green=="number"&&typeof t.blue=="number"&&typeof t.alpha=="number"},Ot=function(t){return typeof t.hue=="number"&&typeof t.saturation=="number"&&typeof t.lightness=="number"&&(typeof t.alpha!="number"||typeof t.alpha>"u")},Dt=function(t){return typeof t.hue=="number"&&typeof t.saturation=="number"&&typeof t.lightness=="number"&&typeof t.alpha=="number"};function _(e){if(typeof e!="object")throw new O(8);if(jt(e))return X(e);if(Ft(e))return he(e);if(Dt(e))return St(e);if(Ot(e))return It(e);throw new O(8)}function ze(e,t,r){return function(){var o=r.concat(Array.prototype.slice.call(arguments));return o.length>=t?e.apply(this,o):ze(e,t,o)}}function $(e){return ze(e,e.length,[])}function Tt(e,t){if(t==="transparent")return t;var r=M(t);return _(w({},r,{hue:r.hue+parseFloat(e)}))}$(Tt);function U(e,t,r){return Math.max(e,Math.min(t,r))}function Pt(e,t){if(t==="transparent")return t;var r=M(t);return _(w({},r,{lightness:U(0,1,r.lightness-parseFloat(e))}))}var _t=$(Pt),be=_t;function zt(e,t){if(t==="transparent")return t;var r=M(t);return _(w({},r,{saturation:U(0,1,r.saturation-parseFloat(e))}))}$(zt);function Rt(e){if(e==="transparent")return e;var t=K(e);return _(w({},t,{red:255-t.red,green:255-t.green,blue:255-t.blue}))}function Ht(e,t){if(t==="transparent")return t;var r=M(t);return _(w({},r,{lightness:U(0,1,r.lightness+parseFloat(e))}))}var Nt=$(Ht),T=Nt;function Et(e,t,r){if(t==="transparent")return r;if(r==="transparent")return t;if(e===0)return r;var n=K(t),o=w({},n,{alpha:typeof n.alpha=="number"?n.alpha:1}),i=K(r),s=w({},i,{alpha:typeof i.alpha=="number"?i.alpha:1}),d=o.alpha-s.alpha,c=parseFloat(e)*2-1,p=c*d===-1?c:c+d,b=1+c*d,h=(p/b+1)/2,m=1-h,v={red:Math.floor(o.red*h+s.red*m),green:Math.floor(o.green*h+s.green*m),blue:Math.floor(o.blue*h+s.blue*m),alpha:o.alpha*parseFloat(e)+s.alpha*(1-parseFloat(e))};return X(v)}var Mt=$(Et),Re=Mt;function At(e,t){if(t==="transparent")return t;var r=K(t),n=typeof r.alpha=="number"?r.alpha:1,o=w({},r,{alpha:U(0,1,(n*100+parseFloat(e)*100)/100)});return X(o)}$(At);function Bt(e,t){if(t==="transparent")return t;var r=M(t);return _(w({},r,{saturation:U(0,1,r.saturation+parseFloat(e))}))}$(Bt);function Lt(e,t){return t==="transparent"?t:_(w({},M(t),{hue:parseFloat(e)}))}$(Lt);function Wt(e,t){return t==="transparent"?t:_(w({},M(t),{lightness:parseFloat(e)}))}$(Wt);function qt(e,t){return t==="transparent"?t:_(w({},M(t),{saturation:parseFloat(e)}))}$(qt);function Kt(e,t){return t==="transparent"?t:Re(parseFloat(e),"rgb(0, 0, 0)",t)}$(Kt);function Ut(e,t){return t==="transparent"?t:Re(parseFloat(e),"rgb(255, 255, 255)",t)}$(Ut);function Gt(e,t){if(t==="transparent")return t;var r=K(t),n=typeof r.alpha=="number"?r.alpha:1,o=w({},r,{alpha:U(0,1,+(n*100-parseFloat(e)*100).toFixed(2)/100)});return X(o)}$(Gt);const Ce=l.button`
  background-color: ${e=>e.theme.colors.backgroundColored};
  color: ${e=>e.theme.colors.text};
  column-gap: 8px;
  align-items: center;
  text-align: center;
  padding: 16px 12px;
  font-family: inherit;
  font-size: 20px;
  border: 3px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  width: 100%;

  &:hover {
    background-color: ${e=>be(.05,e.theme.colors.backgroundColored)};
    outline: none;
    box-shadow: none;
  }

  ${y("variant","secondary")} {
    background-color: ${e=>e.theme.colors.background};
  }

  ${y(e=>te.Children.count(e.children)===1)} {
    display: grid;
    grid-template-columns: 1fr;
  }

  ${y(e=>te.Children.count(e.children)===2)} {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`;l.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: ${e=>e.theme.colors.text};
  padding: 0;
  margin: 0;
  display: inline;
  font-weight: 400;
  font-family: inherit;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${e=>e.theme.colors.text};
  }

  &:hover {
    &::after {
      background-color: transparent;
    }
  }
`;const He=l.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`,ye=l.div`
  height: 24px;
  width: 24px;
  border: 3px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background};
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${y("focused","focused")} {
    border-color: ${e=>e.theme.colors.accent};
  }
`,Ne=l.span`
  color: ${e=>e.theme.colors.text};
  font-weight: 700;
  font-size: 20px;
  user-select: none;
`,Ee=l.label`
  color: ${e=>e.theme.colors.text};
  cursor: pointer;
  user-select: none;
`,Zt=g.exports.forwardRef(({children:e,...t},r)=>{var b,h,m;const n=g.exports.useRef((b=r==null?void 0:r.current)!=null?b:null),[o,i]=g.exports.useState((h=t.checked)!=null?h:!1),[s,d]=g.exports.useState((m=t.autoFocus)!=null?m:!1);return g.exports.useEffect(()=>{var v;o!==t.checked&&i((v=t.checked)!=null?v:!1)},[t.checked]),u(He,{onClick:v=>{var A;if((A=n.current)==null||A.focus(),t.checked!=null){if(t.onChange==null)return;{const D={...new Event("change",{bubbles:!0}),nativeEvent:v,isPropagationStopped:!1,isDefaultPrevented:!1,persist:!0,target:n==null?void 0:n.current};t.onChange(D)}}else i(D=>!D)},children:[a("input",{...t,ref:n,type:"checkbox",checked:o,onChange:v=>i(v.target.checked),onFocus:()=>{d(!0)},onBlur:()=>{d(!1)},hidden:!0}),a(ye,{focused:s?"focused":void 0,children:o&&a(Ne,{children:"\u2713"})}),e&&a(Ee,{children:e})]})}),Jt=l.div`
  background-color: ${e=>e.theme.colors.background};
  border: 3px solid ${e=>T(.1,e.theme.colors.border)};
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: auto 50% 40% 10%;
  align-items: center;
  cursor: pointer;

  &:hover {
    border-color: ${e=>e.theme.colors.border};
  }

  * {
    user-select: none;
  }
`,Qt=l.div``,Xt=l.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 1.5rem 1rem;
`,Yt=l.span`
  font-size: 1.25rem;
`,Vt=l.span`
  font-size: 0.875rem;
  color: ${e=>e.theme.colors.textColoredLight};
  font-family: 'ZH', sans-serif;
`,er=l.div`
  padding: 1.5rem 0.5rem;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  justify-content: flex-end;
`,tr=l.div`
  background-color: ${e=>e.theme.colors.backgroundColored};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0.5rem 0.5rem 0;
  height: 100%;

  ${ye} {
    border-color: ${e=>T(.1,e.theme.colors.border)};
    border-width: 1px;
  }
`,L=g.exports.forwardRef(({children:e,...t},r)=>{var b,h,m;const n=g.exports.useRef((b=r==null?void 0:r.current)!=null?b:null),[o,i]=g.exports.useState((h=t.checked)!=null?h:!1),[s,d]=g.exports.useState((m=t.autoFocus)!=null?m:!1);return g.exports.useEffect(()=>{var v;o!==t.checked&&i((v=t.checked)!=null?v:!1)},[t.checked]),u(He,{onClick:v=>{var A;if((A=n.current)==null||A.focus(),t.checked!=null){if(t.onChange==null)return;{const D={...new Event("change",{bubbles:!0}),nativeEvent:v,isPropagationStopped:!1,isDefaultPrevented:!1,persist:!0,target:n==null?void 0:n.current};t.onChange(D)}}else i(D=>!D)},children:[a("input",{...t,ref:n,type:"checkbox",checked:o,onChange:v=>i(v.target.checked),onFocus:()=>{d(!0)},onBlur:()=>{d(!1)},hidden:!0}),a(ye,{focused:s?"focused":void 0,children:o&&a(Ne,{children:"\u2713"})}),e&&a(Ee,{children:e})]})}),rr=l.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`,nr=l.div`
  width: 40px;
  height: 50%;
  background-color: ${e=>e.theme.colors.textColoredLight};
  border: 1px solid ${e=>e.theme.colors.text};
  border-left: none;
  border-radius: 0 1rem 1rem 0;
`,or=({children:e})=>u(rr,{children:[e,a(nr,{})]}),P=Symbol.for("@ts-pattern/matcher"),ir=Symbol.for("@ts-pattern/isVariadic"),ne="@ts-pattern/anonymous-select-key",me=e=>Boolean(e&&typeof e=="object"),ee=e=>e&&!!e[P],j=(e,t,r)=>{if(ee(e)){const n=e[P](),{matched:o,selections:i}=n.match(t);return o&&i&&Object.keys(i).forEach(s=>r(s,i[s])),o}if(me(e)){if(!me(t))return!1;if(Array.isArray(e)){if(!Array.isArray(t))return!1;let n=[],o=[],i=[];for(const s of e.keys()){const d=e[s];ee(d)&&d[ir]?i.push(d):i.length?o.push(d):n.push(d)}if(i.length){if(i.length>1)throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");if(t.length<n.length+o.length)return!1;const s=t.slice(0,n.length),d=o.length===0?[]:t.slice(-o.length),c=t.slice(n.length,o.length===0?1/0:-o.length);return n.every((p,b)=>j(p,s[b],r))&&o.every((p,b)=>j(p,d[b],r))&&(i.length===0||j(i[0],c,r))}return e.length===t.length&&e.every((s,d)=>j(s,t[d],r))}return Object.keys(e).every(n=>{const o=e[n];return(n in t||ee(i=o)&&i[P]().matcherType==="optional")&&j(o,t[n],r);var i})}return Object.is(t,e)},E=e=>{var t,r,n;return me(e)?ee(e)?(t=(r=(n=e[P]()).getSelectionKeys)==null?void 0:r.call(n))!=null?t:[]:Array.isArray(e)?Q(e,E):Q(Object.values(e),E):[]},Q=(e,t)=>e.reduce((r,n)=>r.concat(t(n)),[]);function I(e){return Object.assign(e,{optional:()=>ar(e),and:t=>x(e,t),or:t=>sr(e,t),select:t=>t===void 0?Ie(e):Ie(t,e)})}function ar(e){return I({[P]:()=>({match:t=>{let r={};const n=(o,i)=>{r[o]=i};return t===void 0?(E(e).forEach(o=>n(o,void 0)),{matched:!0,selections:r}):{matched:j(e,t,n),selections:r}},getSelectionKeys:()=>E(e),matcherType:"optional"})})}function x(...e){return I({[P]:()=>({match:t=>{let r={};const n=(o,i)=>{r[o]=i};return{matched:e.every(o=>j(o,t,n)),selections:r}},getSelectionKeys:()=>Q(e,E),matcherType:"and"})})}function sr(...e){return I({[P]:()=>({match:t=>{let r={};const n=(o,i)=>{r[o]=i};return Q(e,E).forEach(o=>n(o,void 0)),{matched:e.some(o=>j(o,t,n)),selections:r}},getSelectionKeys:()=>Q(e,E),matcherType:"or"})})}function f(e){return{[P]:()=>({match:t=>({matched:Boolean(e(t))})})}}function Ie(...e){const t=typeof e[0]=="string"?e[0]:void 0,r=e.length===2?e[1]:typeof e[0]=="string"?void 0:e[0];return I({[P]:()=>({match:n=>{let o={[t!=null?t:ne]:n};return{matched:r===void 0||j(r,n,(i,s)=>{o[i]=s}),selections:o}},getSelectionKeys:()=>[t!=null?t:ne].concat(r===void 0?[]:E(r))})})}function S(e){return typeof e=="number"}function W(e){return typeof e=="string"}function R(e){return typeof e=="bigint"}I(f(function(e){return!0}));const q=e=>Object.assign(I(e),{startsWith:t=>{return q(x(e,(r=t,f(n=>W(n)&&n.startsWith(r)))));var r},endsWith:t=>{return q(x(e,(r=t,f(n=>W(n)&&n.endsWith(r)))));var r},minLength:t=>q(x(e,(r=>f(n=>W(n)&&n.length>=r))(t))),maxLength:t=>q(x(e,(r=>f(n=>W(n)&&n.length<=r))(t))),includes:t=>{return q(x(e,(r=t,f(n=>W(n)&&n.includes(r)))));var r},regex:t=>{return q(x(e,(r=t,f(n=>W(n)&&Boolean(n.match(r))))));var r}});q(f(W));const F=e=>Object.assign(I(e),{between:(t,r)=>F(x(e,((n,o)=>f(i=>S(i)&&n<=i&&o>=i))(t,r))),lt:t=>F(x(e,(r=>f(n=>S(n)&&n<r))(t))),gt:t=>F(x(e,(r=>f(n=>S(n)&&n>r))(t))),lte:t=>F(x(e,(r=>f(n=>S(n)&&n<=r))(t))),gte:t=>F(x(e,(r=>f(n=>S(n)&&n>=r))(t))),int:()=>F(x(e,f(t=>S(t)&&Number.isInteger(t)))),finite:()=>F(x(e,f(t=>S(t)&&Number.isFinite(t)))),positive:()=>F(x(e,f(t=>S(t)&&t>0))),negative:()=>F(x(e,f(t=>S(t)&&t<0)))});F(f(S));const H=e=>Object.assign(I(e),{between:(t,r)=>H(x(e,((n,o)=>f(i=>R(i)&&n<=i&&o>=i))(t,r))),lt:t=>H(x(e,(r=>f(n=>R(n)&&n<r))(t))),gt:t=>H(x(e,(r=>f(n=>R(n)&&n>r))(t))),lte:t=>H(x(e,(r=>f(n=>R(n)&&n<=r))(t))),gte:t=>H(x(e,(r=>f(n=>R(n)&&n>=r))(t))),positive:()=>H(x(e,f(t=>R(t)&&t>0))),negative:()=>H(x(e,f(t=>R(t)&&t<0)))});H(f(R));I(f(function(e){return typeof e=="boolean"}));I(f(function(e){return typeof e=="symbol"}));I(f(function(e){return e==null}));I(f(function(e){return e!=null}));const ge={matched:!1,value:void 0};function Me(e){return new oe(e,ge)}class oe{constructor(t,r){this.input=void 0,this.state=void 0,this.input=t,this.state=r}with(...t){if(this.state.matched)return this;const r=t[t.length-1],n=[t[0]];let o;t.length===3&&typeof t[1]=="function"?o=t[1]:t.length>2&&n.push(...t.slice(1,t.length-1));let i=!1,s={};const d=(p,b)=>{i=!0,s[p]=b},c=!n.some(p=>j(p,this.input,d))||o&&!Boolean(o(this.input))?ge:{matched:!0,value:r(i?ne in s?s[ne]:s:this.input,this.input)};return new oe(this.input,c)}when(t,r){if(this.state.matched)return this;const n=Boolean(t(this.input));return new oe(this.input,n?{matched:!0,value:r(this.input,this.input)}:ge)}otherwise(t){return this.state.matched?this.state.value:t(this.input)}exhaustive(){if(this.state.matched)return this.state.value;let t;try{t=JSON.stringify(this.input)}catch{t=this.input}throw new Error(`Pattern matching error: no pattern matches value ${t}`)}run(){return this.exhaustive()}returnType(){return this}}var k=(e=>(e.Common="#7a7a78",e.Uncommon="#658d72",e.Rare="#6485a1",e.Epic="#a678b6",e.Legendary="#cc812e",e))(k||{});const Ae=l.img`
  position: absolute;
  height: 100%;
  width: 100%;
  transform: scale(1.1);
`,G=l.span`
  width: 100%;
  text-align: center;
  color: #fff;
  background-color: ${e=>X(Rt(e.theme.colors.background),.3)};
  border-radius: 0 0 0.5rem 0.5rem;
  font-size: 0.75rem;
  z-index: 1;
  padding: 0.125rem 0;
`,Be=l.div`
  background-image: linear-gradient(
    to top left,
    ${e=>e.rarity},
    ${e=>be(.1,e.rarity)}
  );
  background-color: ${e=>e.rarity};
  border-radius: 0.5rem;
  display: grid;
  place-items: end;
  position: relative;

  ${y("size","sm")} {
    ${G} {
      font-size: 0.5rem;
    }
    height: 3.25rem;
    width: 3rem;
  }

  ${y("size","md")} {
    height: 4.5rem;
    width: 4rem;
    ${G} {
      font-size: 0.75rem;
    }
  }

  ${y("size","lg")} {
    height: 5.5rem;
    width: 5rem;
    ${G} {
      font-size: 0.875rem;
    }
  }
`,cr=({type:e,amount:t,rarity:r,size:n="md"})=>{const o=Me(e).with("primos",()=>"/images/icons/primos.png").with("coins",()=>"/images/icons/coins.png").with("health",()=>"/images/icons/buff_recovery.png").otherwise(()=>"");return u(Be,{rarity:r,size:n,children:[o&&a(Ae,{src:typeof o=="string"?o:""}),a(G,{children:t})]})},dr={primos:k.Legendary,coins:k.Uncommon,arexp:k.Epic,cleaning_points:k.Rare,creative_points:k.Rare,health:k.Rare},lr=({commission:e,onStatusChange:t,...r})=>{const[n,o]=g.exports.useState(e.isCompleted);return g.exports.useEffect(()=>{n!==e.isCompleted&&o(e.isCompleted)},[e]),g.exports.useEffect(()=>{n!==e.isCompleted&&(t==null||t(n))},[n]),a(or,{children:u(Jt,{...r,onClick:i=>{r.onClick&&r.onClick(i),o(s=>!s)},children:[a(Qt,{}),u(Xt,{children:[a(Yt,{children:e.description}),a(Vt,{children:"Realm of Spyce"})]}),a(er,{children:e.rewards.map(i=>a(cr,{type:i.type,amount:i.count,rarity:dr[i.type]},i.type))}),a(tr,{children:a(L,{checked:n})})]})})};function ur(e,t){if(e==null)return{};var r=fr(e,t),n,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],!(t.indexOf(n)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,n)||(r[n]=e[n]))}return r}function fr(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,i;for(i=0;i<n.length;i++)o=n[i],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}var xe=g.exports.forwardRef(function(e,t){var r=e.color,n=r===void 0?"currentColor":r,o=e.size,i=o===void 0?24:o,s=ur(e,["color","size"]);return u("svg",{ref:t,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...s,children:[a("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),a("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),a("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),a("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]})});xe.propTypes={color:V.exports.string,size:V.exports.oneOfType([V.exports.string,V.exports.number])};xe.displayName="Calendar";const pr=xe,hr=l.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 3px solid ${e=>e.theme.colors.border};
  border-radius: 1.5rem;
  background-color: ${e=>e.theme.colors.background};
  font-family: 'ZH', sans-serif;
  padding: 1rem 0.5rem 1rem 1rem;
  cursor: pointer;
  user-select: none;
  align-items: center;
`,mr=l.span`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`,Se=l.span`
  color: ${e=>T(.4,e.theme.colors.text)};
`,Fe=l.span``,gr=l.div`
  position: absolute;
  background-color: ${e=>e.theme.colors.background};
  ${ct("-3px","-3px","initial")}
  height: 200px;
  border-radius: 1.5rem;
  border: 3px solid ${e=>e.theme.colors.border};
  z-index: 999;
`,br=l.span`
  display: flex;
  flex-direction: row;
  padding: 18px 1rem;
  column-gap: 0.5rem;
  align-items: center;
`,yr=l.div``,xr=g.exports.createContext(ot);function ve(){return g.exports.useContext(xr)}const C=({iden:e})=>{var r;const t=ve();return a(Pe,{children:(r=t[e])!=null?r:e})};function Le(e){const t=Object.prototype.toString.call(e);return e instanceof Date||typeof e=="object"&&t==="[object Date]"?new e.constructor(+e):typeof e=="number"||t==="[object Number]"||typeof e=="string"||t==="[object String]"?new Date(e):new Date(NaN)}function vr(e,t){return e instanceof Date?new e.constructor(t):new Date(t)}function kr(e,t){const r=Le(e);return isNaN(t)?vr(e,NaN):(t&&r.setDate(r.getDate()+t),r)}const je=l.button`
  background-color: ${e=>e.theme.colors.backgroundColored};
  color: ${e=>e.theme.colors.text};
  column-gap: 8px;
  align-items: center;
  text-align: center;
  padding: 16px 12px;
  font-family: inherit;
  font-size: 20px;
  border: 3px solid ${e=>e.theme.colors.border};
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  width: 100%;

  &:hover {
    background-color: ${e=>be(.05,e.theme.colors.backgroundColored)};
    outline: none;
    box-shadow: none;
  }

  ${y("variant","secondary")} {
    background-color: ${e=>e.theme.colors.background};
  }

  ${y(e=>te.Children.count(e.children)===1)} {
    display: grid;
    grid-template-columns: 1fr;
  }

  ${y(e=>te.Children.count(e.children)===2)} {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`,wr=l.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: ${e=>e.theme.colors.text};
  padding: 0;
  margin: 0;
  display: inline;
  font-weight: 400;
  font-family: inherit;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${e=>e.theme.colors.text};
  }

  &:hover {
    &::after {
      background-color: transparent;
    }
  }
`,$r=({value:e,onChange:t,...r})=>{const n=Le(e!=null?e:Date.now()),[o,i]=g.exports.useState(!1),[s,d]=g.exports.useState(n.getMonth()),c=it();return g.exports.useEffect(()=>{d(n.getMonth())},[e]),u(hr,{...r,onClick:()=>i(p=>!p),children:[u(mr,{children:[a(Se,{children:a(C,{iden:`calendar.days.${n.getDay()}`})}),u(Fe,{children:[a(C,{iden:`calendar.months.${n.getMonth()+1}`})," ",n.getDate()]})]}),a(pr,{color:c.colors.textColored,size:24}),o&&u(gr,{children:[u(br,{children:[a(Se,{children:a(C,{iden:`calendar.days.${n.getDay()}`})}),u(Fe,{children:[a(C,{iden:`calendar.months.${n.getMonth()+1}`})," ",n.getDate()]}),a(wr,{children:"Today"})]}),a(yr,{children:a("span",{})})]})]})},z=({iden:e})=>{var r;const t=ve();return a(Pe,{children:(r=t[e])!=null?r:e})},le=({type:e,amount:t,rarity:r,size:n="md"})=>{const o=Me(e).with("primos",()=>"/images/icons/primos.png").with("coins",()=>"/images/icons/coins.png").with("health",()=>"/images/icons/buff_recovery.png").otherwise(()=>"");return u(Be,{rarity:r,size:n,children:[o&&a(Ae,{src:typeof o=="string"?o:""}),a(G,{children:t})]})},Cr=l.section`
  display: grid;
  grid-template-rows: auto 1fr;
  position: relative;
  margin-bottom: 2rem;
`,Oe=l.div`
  content: '';
  width: 100%;
  height: 4px;
  margin-top: 26px;
  background-color: ${e=>e.theme.colors.border};
  border-radius: 8px;
`,Ir=l.div`
  display: grid;
  column-gap: 8px;
  ${y("align","left")} {
    grid-template-columns: auto 1fr;
  }

  ${y("align","center")} {
    grid-template-columns: 1fr auto 1fr;
  }

  ${y("align","right")} {
    grid-template-columns: 1fr auto;
  }
`,Sr=l.p`
  color: ${e=>e.theme.colors.textColored};
`,De=({align:e="left",header:t,...r})=>u(Cr,{...r,children:[u(Ir,{align:e,children:[["center","right"].includes(e)&&a(Oe,{}),a(Sr,{children:t}),["center","left"].includes(e)&&a(Oe,{})]}),r.children]}),We=250,ie=We/2,qe=20,Ke=(We-qe)/2,Ue=Ke*Math.PI*2,ke=at`
  cx: ${ie}px;
  cy: ${ie}px;
  r: ${Ke}px;
  stroke-width: ${qe}px;
  fill: none;
  stroke-linecap: round;
`,Fr=l.circle`
  ${ke}
  stroke: ${e=>T(.5,e.theme.colors.border)};
`,Ge=l.circle`
  ${ke}

  @keyframes pulse {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`,Ze=l.circle`
  ${ke}
  transform: rotate(-90deg);
  transform-origin: ${ie}px ${ie}px;
  stroke-dasharray: var(--dash) calc(${Ue}px - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s, box-shadow 0.3s linear 0s;
  stroke: ${e=>e.theme.colors.border};
`,jr=l.div`
  --dash: calc((var(--progress) * ${Ue}px) / 100);
  --progress: ${e=>e.progress};
  background-clip: padding-box;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 300px;

  ${Ge} {
    ${y(e=>e.progress<20)} {
      display: none;
    }
    ${y(e=>e.progress>=20)} {
      stroke: ${()=>T(.2,k.Uncommon)};
      filter: blur(2px);
      animation: pulse 4s infinite;
    }
    ${y(e=>e.progress>=40)} {
      stroke: ${()=>T(.2,k.Rare)};
      filter: blur(4px);
      animation: pulse 3s infinite;
    }
    ${y(e=>e.progress>=60)} {
      stroke: ${()=>T(.2,k.Epic)};
      filter: blur(6px);
      animation: pulse 2s infinite;
    }
    ${y(e=>e.progress>=80)} {
      stroke: ${()=>T(.2,k.Legendary)};
      filter: blur(8px);
      animation: pulse 1s infinite;
    }
  }

  ${Ze} {
    ${y(e=>e.progress<20)} {
      stroke: ${()=>k.Common};
      box-shadow: none;
    }
    ${y(e=>e.progress>=20&&e.progress<40)} {
      stroke: ${()=>k.Uncommon};
    }
    ${y(e=>e.progress>=40&&e.progress<60)} {
      stroke: ${()=>k.Rare};
    }
    ${y(e=>e.progress>=60&&e.progress<80)} {
      stroke: ${()=>k.Epic};
    }
    ${y(e=>e.progress>=80)} {
      stroke: ${()=>k.Legendary};
    }
  }
`,Or=l.svg`
  position: absolute;
`,Dr=l.div`
  text-align: center;

  h1 {
    font-size: 5rem;
    margin: 0;
    font-weight: 500;
  }

  h3 {
    margin: 0;
    color: ${e=>T(.2,e.theme.colors.text)};
    font-weight: 500;
  }
`,Tr=({totalTasks:e,completedTasks:t})=>{const r=t/e*100;return u(jr,{progress:isNaN(r)?0:r,children:[u(Or,{width:"250",height:"250",viewBox:"0 0 250 250",children:[a(Ge,{}),a(Fr,{}),a(Ze,{})]}),u(Dr,{children:[a("h1",{children:t}),a("h3",{children:"Tasks"})]})]})},Pr=l.div``,_r=l.h1`
  position: relative;
  text-align: center;
  padding: 8px 12px 20px;
  font-size: 24px;
  color: ${e=>e.theme.colors.textColored};

  &::after {
    position: absolute;
    content: '';
    background-color: ${e=>e.theme.colors.border};
    border-radius: 8px;
    height: 4px;
    bottom: 0;
    left: 0;
    right: 0;
  }
`,zr=l.p`
  text-align: center;
  padding: 8px 32px;
  color: ${e=>e.theme.colors.textColored};
`,Rr=({header:e,subHeader:t,...r})=>u(Pr,{...r,children:[a(_r,{children:e}),a(zr,{children:t})]});class Hr extends st{constructor(){super("commissions");ae(this,"tasks");ae(this,"history");this.version(1).stores({tasks:"++id,description,createdAt,deleted,rewards",history:"++id,taskId,completed,dueDate,deleted"})}async getNextTaskId(){return await this.tasks.count()+1}async getNextHistoryId(){return await this.history.count()+1}}const N=new Hr;async function Nr(e){const t=Je(e),r=await N.tasks.toArray(),n=await N.history.where({dueDate:t}).toArray();for(const o of r)if(!n.find(s=>s.taskId===o.id)){const s={id:await N.getNextHistoryId(),taskId:o.id,completed:!1,dueDate:t,deleted:!1};await N.history.add(s),n.push(s)}return r.map(o=>{const i=n.some(s=>s.taskId===o.id&&s.completed);return{...o,isCompleted:i}})}async function Er(e,t){const r=new Date,n=await N.getNextTaskId();await N.tasks.add({id:n,description:e,createdAt:r,deleted:!1,rewards:t}),await N.history.add({id:await N.getNextHistoryId(),taskId:n,completed:!1,dueDate:Je(r),deleted:!1})}function Je(e){const t=kr(e,1);return t.setHours(0),t.setMinutes(0),t.setSeconds(0),t.setMilliseconds(0),t}const Mr=l.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`,Ar=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
`,Te=l.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;l.div``;const Br=l.input`
  border: 3px solid ${e=>e.theme.colors.border};
  border-radius: 16px;
  background-color: ${e=>e.theme.colors.background};
  font-family: 'ZH', sans-serif;
  padding: 16px;
`,Lr=l.div`
  display: flex;
  justify-content: stretch;
  flex-direction: row-reverse;
  column-gap: 16px;
`,Wr={primos:400,coins:5e4,arexp:200,cleaning_points:150,creative_points:150,health:100},qr=({onSubmit:e,onCancel:t})=>{const[r,n]=g.exports.useState(""),[o,i]=g.exports.useState([]),s=ve();function d(c){return()=>{const p=Wr[c];i(b=>{const h=b.findIndex(m=>m.type===c);return h===-1?[...b,{type:c,count:p}]:b.map((m,v)=>v===h?{type:c,count:p}:m)})}}return u(Mr,{children:[a(Br,{type:"text",value:r,onChange:c=>n(c.target.value),placeholder:s["app.addCommission.description"]}),u(Ar,{children:[u(Te,{children:[a(L,{checked:o.some(c=>c.type==="primos"),onChange:d("primos"),children:a(C,{iden:"rewards.primos"})}),a(L,{checked:o.some(c=>c.type==="coins"),onChange:d("coins"),children:a(C,{iden:"rewards.coins"})}),a(L,{checked:o.some(c=>c.type==="arexp"),onChange:d("arexp"),children:a(C,{iden:"rewards.arexp"})})]}),u(Te,{children:[a(L,{checked:o.some(c=>c.type==="cleaning_points"),onChange:d("cleaning_points"),children:a(C,{iden:"rewards.cleaningPoints"})}),a(L,{checked:o.some(c=>c.type==="creative_points"),onChange:d("creative_points"),children:a(C,{iden:"rewards.creativePoints"})}),a(L,{checked:o.some(c=>c.type==="health"),onChange:d("health"),children:a(C,{iden:"rewards.health"})})]})]}),u(Lr,{children:[a(je,{onClick:()=>{e(r,o)},variant:"primary",children:a(C,{iden:"app.create"})}),a(je,{onClick:()=>{n(""),i([]),t()},variant:"secondary",children:a(C,{iden:"app.cancel"})})]})]})},Zr=()=>{const[e,t]=g.exports.useState([]),[r,n]=g.exports.useState(!1),[o,i]=g.exports.useState(!1),[s,d]=g.exports.useState(new Date);function c(){n(h=>!h)}async function p(h,m){await Er(h,m),i(!1)}function b(h,m){}return g.exports.useEffect(()=>{Nr(s).then(t)},[]),u(Ye,{children:[u(Ve,{children:[a(Rr,{header:a(z,{iden:"app.header"}),subHeader:a(z,{iden:"app.subHeader"})}),a(Tr,{totalTasks:e.length,completedTasks:e.filter(h=>h.isCompleted).length}),a(De,{header:a(z,{iden:"app.dailies.bonusRewards"}),align:"center",children:u(et,{children:[a(le,{type:"primos",amount:3e3,rarity:k.Legendary,size:"lg"}),a(le,{type:"arexp",amount:1e3,rarity:k.Rare,size:"lg"}),a(le,{type:"health",amount:1,rarity:k.Rare,size:"lg"})]})}),u(Ce,{onClick:c,children:[a(Zt,{checked:r}),a(z,{iden:"app.dailies.claimed"})]})]}),u(tt,{children:[u(rt,{children:[a(z,{iden:"app.chooseDate"}),a($r,{value:s})]}),a(De,{header:a(z,{iden:"app.dailies.title"}),align:"left",children:u(nt,{children:[e.length===0&&a("p",{children:a(z,{iden:"app.dailies.none"})}),e.map((h,m)=>a(lr,{commission:h,onStatusChange:v=>void 0},m)),o?a(qr,{onSubmit:p,onCancel:()=>i(!1)}):a(Ce,{variant:"secondary",onClick:()=>i(!0),children:a(z,{iden:"app.dailies.addCommission"})})]})})]})]})};export{Zr as component$};
