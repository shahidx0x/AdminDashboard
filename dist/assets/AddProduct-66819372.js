import{R as f,t as we,z as Ce,v as Se,E as _e,r as l,K as Y,F as Ie,I as ye,w as fe,G as Pe,H as me,J as he,i as Z,O as ke,Q as Ee,x as r,o as $e,V as Be,u as be,a as De,e as ce,c as Me,d as Ue,j as a,B as j,L as J,U as ge,g as Ne,M as de,h as Re,C as ie,W as Ae}from"./index-4498a719.js";import{R as je,t as Le}from"./toolbar.config-070f2830.js";import{g as Fe}from"./BrandServices-afce6952.js";import{a as Ve}from"./CategoryService-86f47048.js";import{g as Te}from"./SubCategoryServices-d9ce6033.js";import{S as ue}from"./SelectPicker-f31bdb08.js";var Oe=function(n){return/(^-?|^\+?|^\d?)\d*\.\d+$/.test(n+"")};function ze(s){return Oe(s)?s.toString().split(".")[1].length:0}function ve(){for(var s=arguments.length,n=new Array(s),d=0;d<s;d++)n[d]=arguments[d];var v=n.map(ze);return Math.max.apply(Math,v)}function He(s,n){return me(s)?!1:+s>=n}function We(s,n){return me(s)?!1:+s<=n}var pe=f.forwardRef(function(s,n){var d=s.as,v=d===void 0?$e:d,T=s.className,C=s.classPrefix,ee=C===void 0?"input-number":C,h=s.disabled,y=s.readOnly,S=s.plaintext,M=s.value,ae=s.defaultValue,U=s.size,O=s.prefix,R=s.postfix,z=s.step,m=z===void 0?1:z,_=s.buttonAppearance,I=_===void 0?"subtle":_,b=s.min,g=s.max,se=s.scrollable,A=se===void 0?!0:se,P=s.onChange,N=s.onWheel,te=we(s,["as","className","classPrefix","disabled","readOnly","plaintext","value","defaultValue","size","prefix","postfix","step","buttonAppearance","min","max","scrollable","onChange","onWheel"]),k=b??-1/0,i=g??1/0,E=Ce(M,ae),p=E[0],H=E[1],W=Se(ee),le=W.withClassPrefix,re=W.merge,L=W.prefix,ne=re(T,le()),K=_e(te),$=K[0],oe=K[1],F=l.useRef(),u=l.useCallback(function(e,t){e!==p&&(H(e),P==null||P(e,t))},[P,H,p]),x=l.useCallback(function(e){return Number.isNaN(e)?e="":(+e>i&&(e=i),+e<k&&(e=k)),e.toString()},[i,k]),B=l.useCallback(function(e){var t=+(p||0),c=ve(t,m);u(x((t+m).toFixed(c)),e)},[x,u,m,p]),w=l.useCallback(function(e){var t=+(p||0),c=ve(t,m);u(x((t-m).toFixed(c)),e)},[x,u,m,p]),xe=h||y||He(p,i),q=h||y||We(p,k),D=l.useCallback(function(e){switch(e.key){case Y.UP:e.preventDefault(),B(e);break;case Y.DOWN:e.preventDefault(),w(e);break;case Y.HOME:typeof b<"u"&&(e.preventDefault(),u(x(b),e));break;case Y.END:typeof g<"u"&&(e.preventDefault(),u(x(g),e));break}},[B,w,b,g,u,x]),o=l.useCallback(function(e){if(!A){e.preventDefault();return}if(!h&&!y&&e.target===document.activeElement){e.preventDefault();var t=e.wheelDelta||-e.deltaY||-(e==null?void 0:e.detail);t>0&&w(e),t<0&&B(e)}N==null||N(e)},[h,w,B,N,y,A]),G=l.useCallback(function(e,t){!/^-?(?:\d+)?(\.)?\d*$/.test(e)&&e!==""||u(e,t)},[u]),Q=l.useCallback(function(e){var t,c=Number.parseFloat((t=e.target)===null||t===void 0?void 0:t.value);u(x(c),e)},[x,u]);l.useEffect(function(){var e;return F.current&&(e=Ie(F.current,"wheel",o,{passive:!1})),function(){var t;(t=e)===null||t===void 0||t.off()}},[o,A]);var V=f.createElement(ye,fe({},$,{type:"number",autoComplete:"off",step:m,inputRef:F,onChange:G,onBlur:Pe(Q,$==null?void 0:$.onBlur),value:me(p)?"":""+p,disabled:h,readOnly:y,plaintext:S,ref:S?n:void 0,onKeyDown:D}));return S?V:f.createElement(v,fe({},oe,{ref:n,className:ne,disabled:h,size:U}),O&&f.createElement(he,null,O),V,f.createElement("span",{className:L("btn-group-vertical")},f.createElement(Z,{tabIndex:-1,appearance:I,className:L("touchspin-up"),onClick:B,disabled:xe,"aria-label":"Increment"},f.createElement(ke,null)),f.createElement(Z,{tabIndex:-1,appearance:I,className:L("touchspin-down"),onClick:w,disabled:q,"aria-label":"Decrement"},f.createElement(Ee,null))),R&&f.createElement(he,null,R))});pe.displayName="InputNumber";pe.propTypes={className:r.string,classPrefix:r.string,min:r.number,max:r.number,step:r.number,value:r.oneOfType([r.number,r.string]),defaultValue:r.oneOfType([r.number,r.string]),prefix:r.node,postfix:r.node,disabled:r.bool,readOnly:r.bool,plaintext:r.bool,scrollable:r.bool,size:r.oneOf(["lg","md","sm","xs"]),buttonAppearance:r.oneOf(["default","primary","link","subtle","ghost"]),onWheel:r.func,onChange:r.func};const X=pe,Ke=Be("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);function qe(s,n){const d=new FileReader;d.onloadend=()=>{n(d.result)},d.readAsDataURL(s)}function ea(){var G,Q,V;const s=be(e=>e.user.user),n=De(),[d,v]=l.useState(!1),[T,C]=l.useState({product_image:""}),[ee,h]=l.useState([]),[y,S]=l.useState(null),[M,ae]=l.useState("brand"),[U,O]=l.useState(""),[R,z]=l.useState(""),{data:m}=ce(["brandsIdName",s.jwt],Fe),{data:_}=ce(["categoryIdName","",s.jwt,M.split(",")[0],-1],Ve),{data:I}=ce(["subCategoryIdName","",s.jwt,U.split(",")[0],-1],Te),b=(G=_==null?void 0:_.data)==null?void 0:G.map(e=>({label:e==null?void 0:e.category_label,value:e._id,slug:e.category_slug})),g=(Q=I==null?void 0:I.data)==null?void 0:Q.map(e=>({label:e==null?void 0:e.subcategory_name,value:e._id+","+e.subcategory_slug})),A=[...((V=m==null?void 0:m.data)==null?void 0:V.map(e=>({label:e==null?void 0:e.name,value:e.id,slug:e.slug})))||["loading"]].map(e=>({label:e==null?void 0:e.label,value:(e==null?void 0:e.value)+","+(e==null?void 0:e.slug)})),P=[...b||[{label:"No Category",value:"no-category"}]].map(e=>({label:e==null?void 0:e.label,value:(e==null?void 0:e.value)+","+(e==null?void 0:e.slug)})),[N,te]=l.useState(je.createEmptyValue());console.log(N);const k=e=>{e&&te(e)},{register:i,control:E,reset:p,handleSubmit:H,formState:{errors:W}}=Me({}),le=Ue(Ae),[re,L]=l.useState("No Brand"),[ne,K]=l.useState("No Category"),[$,oe]=l.useState("No Sub Category"),F=a.jsx(de,{showIcon:!0,type:"success",closable:!0,children:"Success : Product Added Successfully."}),u=a.jsx(de,{showIcon:!0,type:"error",closable:!0,children:"Error : Product Added Failed !."}),x=e=>{const t=N.toString("html");e.brand_id=M.split(",")[0],e.subcategory_id=R.split(",")[0],e.category_id=U.split(",")[0],e.fet_image=[...ee],e.product_image=y,e.brand_name=re,e.category_name=ne,e.subcategory_name=$,e.product_information=t,e.brand_slug=M.split(",")[1],e.category_slug=U.split(",")[1],e.subcategory_slug=R.split(",")[1],console.log(e),le.mutate({data:e,token:s.jwt},{onSuccess:c=>{n.push(F,{placement:"bottomStart",duration:2e3}),C(null),S(null),h(null)},onError:c=>{n.push(u,{placement:"bottomStart",duration:3e3})}}),setTimeout(()=>{window.location.reload()},1500)},[B,w]=l.useState(""),[xe,q]=l.useState(null),D=e=>{/^\d*$/.test(e)?(w(e),q("")):q("Only numeric values are allowed")},o=be(e=>e.settings);return a.jsx(a.Fragment,{children:a.jsx("section",{className:"p-6 bg-base-100 text-gray-900 h-screen ",children:a.jsxs("form",{onSubmit:H(x),className:"container flex flex-col mx-auto space-y-12 ",children:[a.jsxs("fieldset",{className:" grid grid-cols-4 gap-6 p-24 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50",children:[a.jsxs("div",{className:"space-y-2 col-span-full lg:col-span-1",children:[a.jsxs(j,{className:"text-sm",children:[a.jsx(j.Item,{as:J,to:"/dashbord",children:"Home"}),a.jsx(j.Item,{as:J,to:"/dashbord/product/list",children:"product-list"}),a.jsx(j.Item,{active:!0,className:"text-blue-400",children:"product-creation"})]}),a.jsx("p",{className:`font-thin text-3xl ${o.theme==="dark"&&"text-white"} `,children:"Product & Feature Images"})]}),a.jsx("div",{className:"flex  flex-col flex-wrap gap-4 col-span-full lg:col-span-3",children:a.jsxs("div",{className:"flex flex-col 2xl:flex-row gap-10",children:[a.jsxs("div",{className:"col-span-full sm:col-span-3",children:[a.jsx("p",{className:`font-thin text-sm underline ${o.theme==="dark"&&"text-white"} `,children:"Upload Product Image"}),a.jsx(ge,{fileListVisible:!1,listType:"picture",action:`${Ne.endpoints.host}/upload`,onUpload:e=>{v(!0),qe(e.blobFile,t=>{C(c=>({...c,product_image:t}))})},onSuccess:(e,t)=>{v(!1),S(e.fileUrl)},onError:()=>{C(null),v(!1),n.push(a.jsx(de,{type:"error",children:"Upload failed"}))},children:a.jsxs("button",{type:"button",style:{width:150,height:150},children:[d&&a.jsx(Re,{backdrop:!0,center:!0}),T?a.jsx("img",{src:T.product_image,width:"100%",height:"150%",alt:"product_picture"}):a.jsx("img",{src:"https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png",alt:"product_picture"})]})})]}),a.jsxs("div",{className:"col-span-full",children:[a.jsx("p",{className:`font-thin text-sm underline ${o.theme==="dark"&&"text-white"} `,children:"Upload Product Feature Image"}),a.jsx(ge,{multiple:!0,listType:"picture",action:`${Ne.endpoints.host}/upload`,onSuccess:e=>h(t=>[...t,e.fileUrl]),children:a.jsx("button",{type:"button",children:a.jsx(Ke,{})})})]})]})})]}),a.jsxs("fieldset",{className:"  grid grid-cols-4 gap-6 px-16 2xl:px-24 py-5 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50",children:[a.jsxs("div",{className:"space-y-2 col-span-full lg:col-span-1",children:[a.jsxs(j,{className:"text-sm",children:[a.jsx(j.Item,{as:J,to:"/dashbord",children:"Home"}),a.jsx(j.Item,{as:J,to:"/dashbord/product/list",children:"product-list"}),a.jsx(j.Item,{active:!0,className:"text-blue-400",children:"product-creation"})]}),a.jsx("p",{className:`font-thin text-3xl  ${o.theme==="dark"&&"text-white"} `,children:"Product Inormation"})]}),a.jsxs("div",{className:"flex flex-wrap gap-4 col-span-full lg:col-span-3",children:[a.jsxs("div",{className:"col-span-full sm:col-span-3 flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Product Name"}),a.jsx(ye,{required:!0,className:"w-[12rem] 2xl:w-[14.5rem]",...i("name")}),a.jsx("div",{"data-lastpass-icon-root":"true"})]}),a.jsxs("div",{className:"flex flex-col col-span-full sm:col-span-3 gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Select Company"}),a.jsx(ie,{name:"brand_id",...i("brand_id"),control:E,render:({field:e})=>a.jsx(ue,{searchable:!0,...e,size:"md",data:A,className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(t,c)=>{e.onChange(t),ae(t),L(c.target.innerHTML)},onBlur:()=>e.onBlur()})})]}),a.jsxs("div",{className:"flex flex-col col-span-full sm:col-span-3 gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Category"}),a.jsx(ie,{name:"category_id",...i("category_id"),control:E,render:({field:e})=>a.jsx(ue,{searchable:!0,...e,size:"md",data:P,className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(t,c)=>{e.onChange(t),K(c.target.innerHTML),O(t)},onBlur:()=>e.onBlur()})})]}),a.jsxs("div",{className:"col-span-full flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Subcategory"}),a.jsx(ie,{name:"sub_category_id",...i("subcategory_id"),control:E,render:({field:e})=>a.jsx(ue,{searchable:!0,...e,size:"md",data:g,className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(t,c)=>{oe(c.target.innerHTML),e.onChange(t),z(t)},onBlur:()=>e.onBlur()})})]}),a.jsxs("div",{className:"flex flex-col col-span-full sm:col-span-2 gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Price"}),a.jsx(X,{className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 ",required:!0,...i("price"),onChange:D})]}),a.jsxs("div",{className:"col-span-full sm:col-span-2 flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Minimum Purchase"}),a.jsx(X,{className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 ",defaultValue:0,...i("min_purchease"),onChange:D})]}),a.jsxs("div",{className:"col-span-full sm:col-span-2 flex flex-col gap-1",children:[a.jsx("label",{htmlFor:"zip",className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Maximum Purchase"}),a.jsx(X,{className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 ",defaultValue:0,...i("max_purchease"),onChange:D})]}),a.jsxs("div",{className:"flex flex-col mt-1",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Discount"}),a.jsx(X,{defaultValue:0,className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200",...i("discount"),onChange:D})]}),a.jsx("div",{className:"col-span-full sm:col-span-2 flex flex-col gap-1",children:a.jsx("div",{className:"flex flex-col gap-5",children:a.jsxs("div",{className:"2xl:w-[100vh]",children:[a.jsx("label",{className:`font-bold text-sm  ${o.theme==="dark"&&"text-white"} `,children:"Product Information"}),a.jsx(je,{className:"mt-2",toolbarConfig:Le,value:N,onChange:k}),a.jsxs("div",{className:"flex gap-2 mt-10",children:[a.jsx(Z,{className:"2xl:w-[10rem]",appearance:"ghost",children:"Cancel"}),a.jsx(Z,{type:"submit","aria-required":!0,appearance:"primary",className:"bg-blue-600 font-bold 2xl:h-[3rem] 2xl:w-[10rem] ",children:"Add Product"})]})]})})})]})]})]})})})}export{ea as default};
