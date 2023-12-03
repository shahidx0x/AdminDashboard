import{R as h,q as Se,x as Ie,s as Pe,y as ke,r as l,K as Y,z as Ee,I as _e,t as ge,D as $e,E as xe,F as Ne,i as Z,G as Be,H as De,v as n,m as Ue,J as Me,u as je,a as Re,e as ue,c as Ae,d as Le,j as a,B as y,L as J,U as ve,g as ye,M as me,h as Fe,C as pe,O as Te}from"./index-6260d541.js";import{R as we,t as Ve}from"./toolbar.config-5ecdac22.js";import{g as Oe}from"./BrandServices-a6d852ce.js";import{a as ze}from"./CategoryService-26a1dbb2.js";import{g as He}from"./SubCategoryServices-8dd7a0e4.js";import{S as Q}from"./SelectPicker-729090bc.js";var We=function(o){return/(^-?|^\+?|^\d?)\d*\.\d+$/.test(o+"")};function qe(t){return We(t)?t.toString().split(".")[1].length:0}function Ce(){for(var t=arguments.length,o=new Array(t),u=0;u<t;u++)o[u]=arguments[u];var w=o.map(qe);return Math.max.apply(Math,w)}function Ke(t,o){return xe(t)?!1:+t>=o}function Ge(t,o){return xe(t)?!1:+t<=o}var fe=h.forwardRef(function(t,o){var u=t.as,w=u===void 0?Ue:u,H=t.className,P=t.classPrefix,ee=P===void 0?"input-number":P,b=t.disabled,C=t.readOnly,k=t.plaintext,A=t.value,ae=t.defaultValue,L=t.size,W=t.prefix,F=t.postfix,q=t.step,p=q===void 0?1:q,E=t.buttonAppearance,$=E===void 0?"subtle":E,N=t.min,j=t.max,se=t.scrollable,T=se===void 0?!0:se,B=t.onChange,_=t.onWheel,te=Se(t,["as","className","classPrefix","disabled","readOnly","plaintext","value","defaultValue","size","prefix","postfix","step","buttonAppearance","min","max","scrollable","onChange","onWheel"]),D=N??-1/0,U=j??1/0,x=Ie(A,ae),i=x[0],le=x[1],V=Pe(ee),he=V.withClassPrefix,re=V.merge,O=V.prefix,ne=re(H,he()),K=ke(te),M=K[0],oe=K[1],z=l.useRef(),m=l.useCallback(function(s,r){s!==i&&(le(s),B==null||B(s,r))},[B,le,i]),f=l.useCallback(function(s){return Number.isNaN(s)?s="":(+s>U&&(s=U),+s<D&&(s=D)),s.toString()},[U,D]),S=l.useCallback(function(s){var r=+(i||0),v=Ce(r,p);m(f((r+p).toFixed(v)),s)},[f,m,p,i]),I=l.useCallback(function(s){var r=+(i||0),v=Ce(r,p);m(f((r-p).toFixed(v)),s)},[f,m,p,i]),ce=b||C||Ke(i,U),be=b||C||Ge(i,D),de=l.useCallback(function(s){switch(s.key){case Y.UP:s.preventDefault(),S(s);break;case Y.DOWN:s.preventDefault(),I(s);break;case Y.HOME:typeof N<"u"&&(s.preventDefault(),m(f(N),s));break;case Y.END:typeof j<"u"&&(s.preventDefault(),m(f(j),s));break}},[S,I,N,j,m,f]),ie=l.useCallback(function(s){if(!T){s.preventDefault();return}if(!b&&!C&&s.target===document.activeElement){s.preventDefault();var r=s.wheelDelta||-s.deltaY||-(s==null?void 0:s.detail);r>0&&I(s),r<0&&S(s)}_==null||_(s)},[b,I,S,_,C,T]),G=l.useCallback(function(s,r){!/^-?(?:\d+)?(\.)?\d*$/.test(s)&&s!==""||m(s,r)},[m]),R=l.useCallback(function(s){var r,v=Number.parseFloat((r=s.target)===null||r===void 0?void 0:r.value);m(f(v),s)},[f,m]);l.useEffect(function(){var s;return z.current&&(s=Ee(z.current,"wheel",ie,{passive:!1})),function(){var r;(r=s)===null||r===void 0||r.off()}},[ie,T]);var c=h.createElement(_e,ge({},M,{type:"number",autoComplete:"off",step:p,inputRef:z,onChange:G,onBlur:$e(R,M==null?void 0:M.onBlur),value:xe(i)?"":""+i,disabled:b,readOnly:C,plaintext:k,ref:k?o:void 0,onKeyDown:de}));return k?c:h.createElement(w,ge({},oe,{ref:o,className:ne,disabled:b,size:L}),W&&h.createElement(Ne,null,W),c,h.createElement("span",{className:O("btn-group-vertical")},h.createElement(Z,{tabIndex:-1,appearance:$,className:O("touchspin-up"),onClick:S,disabled:ce,"aria-label":"Increment"},h.createElement(Be,null)),h.createElement(Z,{tabIndex:-1,appearance:$,className:O("touchspin-down"),onClick:I,disabled:be,"aria-label":"Decrement"},h.createElement(De,null))),F&&h.createElement(Ne,null,F))});fe.displayName="InputNumber";fe.propTypes={className:n.string,classPrefix:n.string,min:n.number,max:n.number,step:n.number,value:n.oneOfType([n.number,n.string]),defaultValue:n.oneOfType([n.number,n.string]),prefix:n.node,postfix:n.node,disabled:n.bool,readOnly:n.bool,plaintext:n.bool,scrollable:n.bool,size:n.oneOf(["lg","md","sm","xs"]),buttonAppearance:n.oneOf(["default","primary","link","subtle","ghost"]),onWheel:n.func,onChange:n.func};const X=fe,Ye=Me("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);function Je(t,o){const u=new FileReader;u.onloadend=()=>{o(u.result)},u.readAsDataURL(t)}function ta(){var s,r,v;const t=je(e=>e.user.user),o=Re(),[u,w]=l.useState(!1),[H,P]=l.useState({product_image:""}),[ee,b]=l.useState([]),[C,k]=l.useState(null),[A,ae]=l.useState("brand"),[L,W]=l.useState(""),[F,q]=l.useState(""),{data:p}=ue(["brandsIdName",t.jwt],Oe),{data:E}=ue(["categoryIdName","",t.jwt,A.split(",")[0],-1],ze),{data:$}=ue(["subCategoryIdName","",t.jwt,L.split(",")[0],-1],He),N=(s=E==null?void 0:E.data)==null?void 0:s.map(e=>({label:e==null?void 0:e.category_label,value:e._id,slug:e.category_slug})),j=(r=$==null?void 0:$.data)==null?void 0:r.map(e=>({label:e==null?void 0:e.subcategory_name,value:e._id+","+e.subcategory_slug})),T=[...((v=p==null?void 0:p.data)==null?void 0:v.map(e=>({label:e==null?void 0:e.name,value:e.id,slug:e.slug})))||["loading"]].map(e=>({label:e==null?void 0:e.label,value:(e==null?void 0:e.value)+","+(e==null?void 0:e.slug)})),B=[...N||[{label:"No Category",value:"no-category"}]].map(e=>({label:e==null?void 0:e.label,value:(e==null?void 0:e.value)+","+(e==null?void 0:e.slug)})),[_,te]=l.useState(we.createEmptyValue()),D=["Box","Pices"].map(e=>({label:e,value:e})),U=e=>{e&&te(e)},{register:x,control:i,reset:le,handleSubmit:V,formState:{errors:he}}=Ae({}),re=Le(Te),[O,ne]=l.useState("No Brand"),[K,M]=l.useState("No Category"),[oe,z]=l.useState("No Sub Category"),m=a.jsx(me,{showIcon:!0,type:"success",closable:!0,children:"Success : Product Added Successfully."}),f=a.jsx(me,{showIcon:!0,type:"error",closable:!0,children:"Error : Product Added Failed !."}),[S,I]=l.useState("Pices"),ce=e=>{const d=_.toString("html");e.brand_id=A.split(",")[0],e.subcategory_id=F.split(",")[0],e.category_id=L.split(",")[0],e.fet_image=[...ee],e.product_image=C,e.product_unit_type=S,e.brand_name=O,e.category_name=K,e.subcategory_name=oe,e.product_information=d,e.brand_slug=A.split(",")[1],e.category_slug=L.split(",")[1],e.subcategory_slug=F.split(",")[1],re.mutate({data:e,token:t.jwt},{onSuccess:g=>{o.push(m,{placement:"bottomStart",duration:2e3}),P(null),k(null),b(null)},onError:g=>{o.push(f,{placement:"bottomStart",duration:3e3})}}),setTimeout(()=>{window.location.reload()},1500)},[be,de]=l.useState(""),[ie,G]=l.useState(null),R=e=>{/^\d*$/.test(e)?(de(e),G("")):G("Only numeric values are allowed")},c=je(e=>e.settings);return a.jsx(a.Fragment,{children:a.jsx("section",{className:"p-6 bg-base-100 text-gray-900 h-screen ",children:a.jsxs("form",{onSubmit:V(ce),className:"container flex flex-col mx-auto space-y-12 ",children:[a.jsxs("fieldset",{className:" grid grid-cols-4 gap-6 p-24 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50",children:[a.jsxs("div",{className:"space-y-2 col-span-full lg:col-span-1",children:[a.jsxs(y,{className:"text-sm",children:[a.jsx(y.Item,{as:J,to:"/dashbord",children:"Home"}),a.jsx(y.Item,{as:J,to:"/dashbord/product/list",children:"product-list"}),a.jsx(y.Item,{active:!0,className:"text-blue-400",children:"product-creation"})]}),a.jsx("p",{className:`font-thin text-3xl ${c.theme==="dark"&&"text-white"} `,children:"Product & Feature Images"})]}),a.jsx("div",{className:"flex  flex-col flex-wrap gap-4 col-span-full lg:col-span-3",children:a.jsxs("div",{className:"flex flex-col 2xl:flex-row gap-10",children:[a.jsxs("div",{className:"col-span-full sm:col-span-3",children:[a.jsx("p",{className:`font-thin text-sm underline ${c.theme==="dark"&&"text-white"} `,children:"Upload Product Image"}),a.jsx(ve,{fileListVisible:!1,listType:"picture",action:`${ye.endpoints.host}/upload`,onUpload:e=>{w(!0),Je(e.blobFile,d=>{P(g=>({...g,product_image:d}))})},onSuccess:(e,d)=>{w(!1),k(e.fileUrl)},onError:()=>{P(null),w(!1),o.push(a.jsx(me,{type:"error",children:"Upload failed"}))},children:a.jsxs("button",{type:"button",style:{width:150,height:150},children:[u&&a.jsx(Fe,{backdrop:!0,center:!0}),H?a.jsx("img",{src:H.product_image,width:"100%",height:"150%",alt:"product_picture"}):a.jsx("img",{src:"https://www.ivins.com/wp-content/uploads/2020/09/placeholder-1.png",alt:"product_picture"})]})})]}),a.jsxs("div",{className:"col-span-full",children:[a.jsx("p",{className:`font-thin text-sm underline ${c.theme==="dark"&&"text-white"} `,children:"Upload Product Feature Image"}),a.jsx(ve,{multiple:!0,listType:"picture",action:`${ye.endpoints.host}/upload`,onSuccess:e=>b(d=>[...d,e.fileUrl]),children:a.jsx("button",{type:"button",children:a.jsx(Ye,{})})})]})]})})]}),a.jsxs("fieldset",{className:"  grid grid-cols-4 gap-6 px-16 2xl:px-24 py-5 border-l-8 border-l-indigo-400 border-b-2 border-t hover:shadow-md rounded-md shadow-sm bg-base-50",children:[a.jsxs("div",{className:"space-y-2 col-span-full lg:col-span-1",children:[a.jsxs(y,{className:"text-sm",children:[a.jsx(y.Item,{as:J,to:"/dashbord",children:"Home"}),a.jsx(y.Item,{as:J,to:"/dashbord/product/list",children:"product-list"}),a.jsx(y.Item,{active:!0,className:"text-blue-400",children:"product-creation"})]}),a.jsx("p",{className:`font-thin text-3xl  ${c.theme==="dark"&&"text-white"} `,children:"Product Inormation"})]}),a.jsxs("div",{className:"flex flex-wrap gap-4 col-span-full lg:col-span-3",children:[a.jsxs("div",{className:"col-span-full sm:col-span-3 flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Product Name"}),a.jsx(_e,{required:!0,className:"w-[12rem] 2xl:w-[14.5rem]",...x("name")}),a.jsx("div",{"data-lastpass-icon-root":"true"})]}),a.jsxs("div",{className:"col-span-full sm:col-span-3 flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Product Unit Type"}),a.jsx(Q,{className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(e,d)=>I(e),searchable:!1,data:D}),a.jsx("div",{"data-lastpass-icon-root":"true"})]}),a.jsxs("div",{className:"flex flex-col col-span-full sm:col-span-3 gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Select Company"}),a.jsx(pe,{name:"brand_id",...x("brand_id"),control:i,render:({field:e})=>a.jsx(Q,{searchable:!0,...e,size:"md",data:T,className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(d,g)=>{e.onChange(d),ae(d),ne(g.target.innerHTML)},onBlur:()=>e.onBlur()})})]}),a.jsxs("div",{className:"flex flex-col col-span-full sm:col-span-3 gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Category"}),a.jsx(pe,{name:"category_id",...x("category_id"),control:i,render:({field:e})=>a.jsx(Q,{searchable:!0,...e,size:"md",data:B,className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(d,g)=>{e.onChange(d),M(g.target.innerHTML),W(d)},onBlur:()=>e.onBlur()})})]}),a.jsxs("div",{className:"col-span-full flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Subcategory"}),a.jsx(pe,{name:"sub_category_id",...x("subcategory_id"),control:i,render:({field:e})=>a.jsx(Q,{searchable:!0,...e,size:"md",data:j,className:"w-[12rem] 2xl:w-[14.5rem]",onChange:(d,g)=>{z(g.target.innerHTML),e.onChange(d),q(d)},onBlur:()=>e.onBlur()})})]}),a.jsxs("div",{className:"flex flex-col col-span-full sm:col-span-2 gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Price"}),a.jsx(X,{className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 ",required:!0,...x("price"),onChange:R})]}),a.jsxs("div",{className:"col-span-full sm:col-span-2 flex flex-col gap-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Minimum Purchase"}),a.jsx(X,{className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 ",defaultValue:0,...x("min_purchease"),onChange:R})]}),a.jsxs("div",{className:"col-span-full sm:col-span-2 flex flex-col gap-1",children:[a.jsx("label",{htmlFor:"zip",className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Maximum Purchase"}),a.jsx(X,{className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200 ",defaultValue:0,...x("max_purchease"),onChange:R})]}),a.jsxs("div",{className:"flex flex-col mt-1",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Discount"}),a.jsx(X,{defaultValue:0,className:"w-[12rem] 2xl:w-[14.5rem] h-[2.24rem] rounded-md border border-gray-200",...x("discount"),onChange:R})]}),a.jsx("div",{className:"col-span-full sm:col-span-2 flex flex-col gap-1",children:a.jsx("div",{className:"flex flex-col gap-5",children:a.jsxs("div",{className:"2xl:w-[100vh]",children:[a.jsx("label",{className:`font-bold text-sm  ${c.theme==="dark"&&"text-white"} `,children:"Product Information"}),a.jsx(we,{className:"mt-2",toolbarConfig:Ve,value:_,onChange:U}),a.jsxs("div",{className:"flex gap-2 mt-10",children:[a.jsx(Z,{className:"2xl:w-[10rem]",appearance:"ghost",children:"Cancel"}),a.jsx(Z,{type:"submit","aria-required":!0,appearance:"primary",className:"bg-blue-600 font-bold 2xl:h-[3rem] 2xl:w-[10rem] ",children:"Add Product"})]})]})})})]})]})]})})})}export{ta as default};
