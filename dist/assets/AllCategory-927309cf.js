import{r as n,u as Ce,a as ye,e as be,d as ke,c as B,j as e,h as ve,i as x,I as R,B as T,T as Ne,D as o,k as Se,l as h,m as E,n as we,o as K,R as He,M as W,_ as Ie,A as Le}from"./index-e8ba72f9.js";import{g as P,d as Oe}from"./CategoryService-0e7a98f1.js";function Ke(){var A,M,_;n.useState(!1);const[c,F]=n.useState(!0),[m,G]=n.useState(!0),[V,Ae]=n.useState(!1),[j,y]=n.useState(1),[b,$]=n.useState(!0),[g,q]=n.useState(!0),[Q,Me]=n.useState(!1),[k,z]=n.useState(!0),f=Ce(s=>s.user.user),[J,U]=n.useState(""),[X,v]=n.useState(!1);n.useState(!1);const N=ye(),S=be(),{Column:Y,HeaderCell:w,Cell:a}=K,Z=s=>e.jsx(a,{...s,style:{padding:4}}),D=s=>e.jsx(w,{...s,style:{padding:4},children:e.jsx("div",{className:"flex justify-center font-bold",children:s.children})}),{data:l,status:ee,refetch:d}=ke(["category",j,f.jwt],P,{cacheTime:0}),[se,p]=n.useState(!1),[te,ne]=n.useState(null),le=()=>{p(!0)},re=B(Oe),ae=()=>{re.mutate({deleteId:te,token:f.jwt},{onSuccess:s=>{N.push(e.jsx(W,{type:"success",children:"Category deleted successfully"})),d(),p(!1)},onError:s=>{console.log(s.response),N.push(e.jsx(W,{type:"error",children:"Category delete failed !"}))}}),d()},H=()=>p(!1),I=({content:s,...t})=>e.jsx(a,{...t,children:e.jsx("p",{className:"flex justify-center items-center",children:s})}),C=[{key:"image",label:"Category Image",cellRenderer:({rowData:s,...t})=>e.jsx(a,{...t,children:e.jsx("div",{className:"flex justify-center -mt-2",children:e.jsx(Le,{src:(s==null?void 0:s.image)||"https://avatars.githubusercontent.com/u/12592949",alt:"P"})})}),width:100},{key:"category_label",label:"Category Name",cellRenderer:({rowData:s,...t})=>{const i=()=>{S(`/dashbord/subcategory/list/${s==null?void 0:s.category_label}/${s==null?void 0:s._id}`,{state:{rowData:s}})};return e.jsx(a,{...t,children:e.jsx("p",{onClick:i,className:"flex justify-center items-center text-blue-500 font-bold hover:underline hover:cursor-pointer",children:s==null?void 0:s.category_label})})},width:200},{key:"category_label",label:"Sub Category Count",cellRenderer:s=>{var t;return e.jsx(I,{...s,content:((t=s.rowData)==null?void 0:t.subCategories.length)||0,className:"font-bold"})},width:150},{key:"brand_name",label:"Brand Name",cellRenderer:s=>{var t;return e.jsx(I,{...s,content:(t=s.rowData)==null?void 0:t.brand_name})},width:150},{key:"actions",label:"Actions",cellRenderer:({rowData:s,...t})=>{const i=()=>{le(),ne(s._id)},u=()=>{S("/dashbord/category/edit",{state:{myData:s}})};return e.jsx(a,{...t,children:e.jsxs("div",{className:"flex justify-center gap-2",children:[e.jsx("button",{type:"button",className:"text-blue-500 border px-3 py-2 -mt-1 hover:text-white hover:bg-indigo-500 rounded-lg",onClick:u,children:"Edit"}),e.jsx("button",{type:"button",className:"text-red-500 border px-3 py-2 -mt-1 rounded-lg hover:text-white hover:bg-red-500",onClick:i,children:"Delete"})]})})},width:200}],r=B(P),oe=s=>{U(s),s===""&&(d(),v(!1))},ce=()=>{v(!0),Ie.promise(r.mutateAsync({queryKey:["user_search",j,f.jwt,J]}),{loading:"Searching...",success:e.jsx("b",{children:"Category found!"}),error:e.jsx("b",{children:"Category not found in the database!"})})},de=X&&((A=r==null?void 0:r.data)!=null&&A.data[0])?[(M=r==null?void 0:r.data)==null?void 0:M.data[0]]:l==null?void 0:l.data,[L,ie]=n.useState(C.map(s=>s.key)),he=C.filter(s=>L.some(t=>t===s.key)),ue=c?Z:a,xe=c?D:w,me=()=>{y(s=>{var t;return s<((t=l==null?void 0:l.meta)==null?void 0:t.total_page)?s+1:s}),d()},je=()=>{y(s=>Math.max(s-1,1)),d()},[ge,O]=n.useState(!1),fe=s=>{s.target.value==="confirm"?O(!0):O(!1)};return e.jsxs("div",{children:[e.jsx(ve,{}),e.jsxs(x,{open:se,onClose:H,children:[e.jsxs(x.Header,{className:"p-5",children:[e.jsx(x.Title,{className:"font-bold font-mono",children:"Are you sure ?"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("p",{children:"All subcategory and product under this category will be deleted !"}),e.jsx(R,{className:"border-red-300",onChange:(s,t)=>fe(t),placeholder:"Type 'confirm' to delete"})]})]}),e.jsxs(x.Footer,{children:[e.jsx(T,{disabled:!ge,onClick:ae,className:"bg-blue-500 w-20",appearance:"primary",children:"Confirm"}),e.jsx(T,{className:" bg-red-500 text-white",onClick:H,children:"Cancel"})]})]}),e.jsxs("div",{children:[e.jsx("hr",{}),e.jsx("div",{className:"p-5",children:e.jsxs("div",{className:"flex flex-col 2xl:flex-row gap-3 2xl:justify-between",children:[e.jsxs("div",{className:"",children:[e.jsx(Ne,{className:"h-12",data:C,labelKey:"label",valueKey:"key",value:L,onChange:ie,cleanable:!1}),e.jsxs(o,{className:"",icon:e.jsx(Se,{}),children:[e.jsx(o.Item,{children:e.jsxs("span",{className:"flex justify-between",children:[e.jsx("p",{children:"Compact："}),e.jsx(h,{checkedChildren:"On",unCheckedChildren:"Off",checked:c,onChange:F})]})}),e.jsx(o.Item,{children:e.jsxs("span",{className:"flex justify-between",children:[e.jsx("p",{children:"Bordered："}),e.jsx(h,{checkedChildren:"On",unCheckedChildren:"Off",checked:m,onChange:G})]})}),e.jsx(o.Item,{children:e.jsxs("span",{className:"flex justify-between",children:["Show Header：",e.jsx(h,{checkedChildren:"On",unCheckedChildren:"Off",checked:b,onChange:$})]})}),e.jsx(o.Item,{children:e.jsxs("span",{className:"flex justify-between",children:["Hover：",e.jsx(h,{checkedChildren:"On",unCheckedChildren:"Off",checked:k,onChange:z})]})}),e.jsx(o.Item,{children:e.jsxs("span",{className:"flex justify-between",children:["Auto Height：",e.jsx(h,{checkedChildren:"On",unCheckedChildren:"Off",checked:g,onChange:q})]})})]})]}),e.jsx("div",{children:e.jsx("div",{className:" ",children:e.jsxs(E,{children:[e.jsx(R,{placeholder:"Search by Category Name",onChange:s=>oe(s)}),e.jsx(E.Button,{onClick:()=>ce(),tabIndex:-1,children:e.jsx(we,{className:"text-indigo-500 font-bold"})})]})})})]})}),e.jsx("hr",{}),e.jsxs("div",{className:"mt-5 ml-4",style:{height:g?"auto":400},children:[e.jsx(K,{loading:ee==="loading",height:300,hover:k,fillHeight:Q,showHeader:b,autoHeight:g,data:V?[]:de,bordered:m,cellBordered:m,headerHeight:c?40:30,rowHeight:c?56:30,children:he.map(s=>{const{key:t,label:i,cellRenderer:u,...pe}=s;return n.createElement(Y,{...pe,key:t},e.jsx(xe,{children:i}),u?He.createElement(u,{dataKey:t}):e.jsx(ue,{dataKey:t}))})}),e.jsx("div",{className:"border-b",children:e.jsx("div",{className:"flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4",children:e.jsxs("div",{className:"lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200",children:[e.jsxs("div",{className:"flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer",children:[e.jsxs("svg",{width:14,height:8,viewBox:"0 0 14 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M1.1665 4H12.8332",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M1.1665 4L4.49984 7.33333",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M1.1665 4.00002L4.49984 0.666687",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]}),e.jsx("p",{onClick:je,className:"text-sm ml-3 font-medium leading-none ",children:"Previous"})]}),e.jsx("div",{className:"sm:flex hidden",children:e.jsxs("p",{className:"text-sm font-bold leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2",children:["pages : ",j,"/",(_=l==null?void 0:l.meta)==null?void 0:_.total_page]})}),e.jsxs("div",{className:"flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer",children:[e.jsx("p",{onClick:me,className:"text-sm font-medium leading-none mr-3",children:"Next"}),e.jsxs("svg",{width:14,height:8,viewBox:"0 0 14 8",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M1.1665 4H12.8332",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M9.5 7.33333L12.8333 4",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M9.5 0.666687L12.8333 4.00002",stroke:"currentColor",strokeWidth:"1.25",strokeLinecap:"round",strokeLinejoin:"round"})]})]})]})})})]})]})]})}export{Ke as default};
