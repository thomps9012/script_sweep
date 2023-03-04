"use strict";(self.webpackChunkscript_sweep_docs=self.webpackChunkscript_sweep_docs||[]).push([[2001],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>d});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=a.createContext({}),c=function(e){var t=a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,p=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),u=c(r),m=n,d=u["".concat(p,".").concat(m)]||u[m]||y[m]||i;return r?a.createElement(d,s(s({ref:t},l),{},{components:r})):a.createElement(d,s({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,s=new Array(i);s[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[u]="string"==typeof e?e:n,s[1]=o;for(var c=2;c<i;c++)s[c]=r[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7660:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>y,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=r(7462),n=(r(7294),r(3905));const i={sidebar_position:1},s="Request an API Key",o={unversionedId:"quick_start/api_key",id:"quick_start/api_key",title:"Request an API Key",description:"Send a POST request to the https://tinyurl.com/4zh9cjzb/api/auth/api_key",source:"@site/docs/quick_start/api_key.md",sourceDirName:"quick_start",slug:"/quick_start/api_key",permalink:"/script_sweep/docs/quick_start/api_key",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Quick Start",permalink:"/script_sweep/docs/category/quick-start"},next:{title:"Request a JWT",permalink:"/script_sweep/docs/quick_start/jwt"}},p={},c=[{value:"API Key Example Request",id:"api-key-example-request",level:3},{value:"API Key Example Response",id:"api-key-example-response",level:3},{value:"Ensure you save the API Key in a secure place as it will not be shown again",id:"ensure-you-save-the-api-key-in-a-secure-place-as-it-will-not-be-shown-again",level:2}],l={toc:c},u="wrapper";function y(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"request-an-api-key"},"Request an API Key"),(0,n.kt)("p",null,"Send a POST request to the ",(0,n.kt)("a",{parentName:"p",href:"https://tinyurl.com/4zh9cjzb/api/auth/api_key"},"https://tinyurl.com/4zh9cjzb/api/auth/api_key"),"\nWith a valid email, first, and last name"),(0,n.kt)("h3",{id:"api-key-example-request"},"API Key Example Request"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-javascript"},'const data = await fetch("https://tinyurl.com/4zh9cjzb/api/auth/api_key", {\n  method: POST,\n  body: JSON.stringify({\n    email: "sgfunk@email.com",\n    first_name: "Simon",\n    last_name: "Garfunkel",\n  }),\n});\n')),(0,n.kt)("h3",{id:"api-key-example-response"},"API Key Example Response"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n    "key": "3KdaXhS.f2QWJ4GMtfpv9vqA+8lTMPwuG5L",\n    "message": "Please save this api key somewhere secure as it will not be displayed again."\n}\n')),(0,n.kt)("h2",{id:"ensure-you-save-the-api-key-in-a-secure-place-as-it-will-not-be-shown-again"},"Ensure you save the API Key in a secure place as it will not be shown again"))}y.isMDXComponent=!0}}]);