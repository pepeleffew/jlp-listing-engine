(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[311],{1145:function(e,t,s){Promise.resolve().then(s.bind(s,4833))},4833:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return j}});var i=s(7437),a=s(2265),r=s(7138),l=s(6463),n=s(8184),c=s(2513),d=s(4817),o=s(3852),u=s(9338),x=s(1773);/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let h=(0,s(8030).Z)("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);var f=s(6884),m=s(5891),y=s(883),g=s(2414),p=s(9332),v=s(227),b=s(1466);function j(){let e=(0,l.useRouter)(),{listings:t,createListing:s,duplicateListing:u,deleteListing:x,archiveListing:h,toggleFavorite:f}=(0,v.A)(),[m,y]=(0,a.useState)(""),[j,N]=(0,a.useState)("all"),[Z,w]=(0,a.useState)(null),C=(0,a.useMemo)(()=>{let e=t;if("active"===j&&(e=e.filter(e=>"active"===e.status)),"archived"===j&&(e=e.filter(e=>"archived"===e.status)),"starred"===j&&(e=e.filter(e=>e.favorited)),m){let t=m.toLowerCase();e=e.filter(e=>e.address.toLowerCase().includes(t)||e.city.toLowerCase().includes(t)||e.price.toLowerCase().includes(t)||e.mlsNumber.toLowerCase().includes(t))}return e},[t,j,m]),z=()=>{let t=s();e.push("/listings/".concat(t.id))},M=(0,a.useMemo)(()=>({all:t.length,active:t.filter(e=>"active"===e.status).length,archived:t.filter(e=>"archived"===e.status).length,starred:t.filter(e=>e.favorited).length}),[t]),S=[{id:"all",label:"All (".concat(M.all,")")},{id:"active",label:"Active (".concat(M.active,")")},{id:"archived",label:"Archived (".concat(M.archived,")")},{id:"starred",label:"★ Starred (".concat(M.starred,")")}];return(0,i.jsx)(g.Z,{children:(0,i.jsxs)("div",{className:"p-8 max-w-6xl mx-auto",children:[(0,i.jsx)(p.mr,{title:"Listings",description:"Manage your listing projects and generate marketing assets.",actions:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(r.default,{href:"/import",className:"btn-secondary",children:[(0,i.jsx)(n.Z,{size:14})," Import CSV"]}),(0,i.jsxs)("button",{onClick:z,className:"btn-primary",children:[(0,i.jsx)(c.Z,{size:14})," New Listing"]})]})}),(0,i.jsxs)("div",{className:"flex items-center gap-4 mb-6",children:[(0,i.jsxs)("div",{className:"relative flex-1 max-w-sm",children:[(0,i.jsx)(d.Z,{size:14,className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"}),(0,i.jsx)("input",{type:"text",placeholder:"Search by address, city, MLS…",value:m,onChange:e=>y(e.target.value),className:"input pl-9"})]}),(0,i.jsx)("div",{className:"flex items-center bg-white rounded-lg border border-gray-200 p-0.5",children:S.map(e=>(0,i.jsx)("button",{onClick:()=>N(e.id),className:(0,b.cn)("px-3 py-1.5 rounded-md text-xs font-medium transition-all",j===e.id?"bg-brand-navy text-white shadow-sm":"text-gray-500 hover:text-gray-800"),children:e.label},e.id))})]}),0===C.length?(0,i.jsx)(p.ub,{icon:(0,i.jsx)(o.Z,{size:28}),title:m?"No listings match your search":"No listings yet",description:m?"Try a different search term.":"Create your first listing or import from a CSV spreadsheet.",action:!m&&(0,i.jsxs)("div",{className:"flex gap-2",children:[(0,i.jsxs)("button",{onClick:z,className:"btn-primary btn-sm",children:[(0,i.jsx)(c.Z,{size:13})," New Listing"]}),(0,i.jsxs)(r.default,{href:"/import",className:"btn-secondary btn-sm",children:[(0,i.jsx)(n.Z,{size:13})," Import CSV"]})]})}):(0,i.jsx)("div",{className:"grid grid-cols-1 gap-3",children:C.map(t=>(0,i.jsx)(k,{listing:t,menuOpen:Z===t.id,onMenuToggle:()=>w(Z===t.id?null:t.id),onMenuClose:()=>w(null),onFavorite:()=>f(t.id),onDuplicate:()=>{let s=u(t.id);e.push("/listings/".concat(s.id))},onArchive:()=>h(t.id),onDelete:()=>{confirm("Delete this listing?")&&x(t.id)}},t.id))})]})})}function k(e){let{listing:t,menuOpen:s,onMenuToggle:a,onMenuClose:l,onFavorite:n,onDuplicate:c,onArchive:d,onDelete:g}=e,p=t.photos.find(e=>e.id===t.primaryPhotoId);return(0,i.jsxs)("div",{className:(0,b.cn)("card flex items-center gap-5 px-5 py-4 transition-all hover:shadow-card-md group","archived"===t.status?"opacity-60":""),children:[(0,i.jsx)("div",{className:"w-16 h-12 rounded-lg bg-surface-2 flex-shrink-0 overflow-hidden",children:p?(0,i.jsx)("img",{src:p.url,alt:"",className:"w-full h-full object-cover"}):(0,i.jsx)("div",{className:"w-full h-full flex items-center justify-center",children:(0,i.jsx)(o.Z,{size:18,className:"text-gray-300"})})}),(0,i.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,i.jsxs)("div",{className:"flex items-center gap-2 mb-0.5",children:[(0,i.jsx)(r.default,{href:"/listings/".concat(t.id),className:"text-sm font-semibold text-gray-900 hover:text-brand-blue transition-colors truncate",children:t.address}),t.favorited&&(0,i.jsx)(u.Z,{size:12,className:"text-brand-gold fill-brand-gold flex-shrink-0"}),(0,i.jsx)(Z,{status:t.status})]}),(0,i.jsxs)("p",{className:"text-xs text-gray-400 truncate",children:[t.city,", ",t.state," ",t.zip,t.mlsNumber&&" \xb7 MLS ".concat(t.mlsNumber)]})]}),(0,i.jsxs)("div",{className:"hidden lg:flex items-center gap-8 flex-shrink-0",children:[(0,i.jsx)(N,{label:"Price",value:t.price||"—",bold:!0}),(0,i.jsx)(N,{label:"Beds",value:t.beds||"—"}),(0,i.jsx)(N,{label:"Baths",value:t.baths||"—"}),(0,i.jsx)(N,{label:"Sq Ft",value:t.sqft||"—"}),(0,i.jsx)(N,{label:"Photos",value:String(t.photos.length)}),(0,i.jsx)(N,{label:"Exports",value:String(t.exports.length)})]}),(0,i.jsx)("div",{className:"flex-shrink-0 text-xs text-gray-400 hidden xl:block w-20 text-right",children:(0,b.GV)(t.updatedAt)}),(0,i.jsxs)("div",{className:"flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",children:[(0,i.jsx)(r.default,{href:"/listings/".concat(t.id,"/generate"),className:"btn-ghost btn-sm text-gray-400 hover:text-brand-blue",title:"Generate assets",children:(0,i.jsx)(x.Z,{size:14})}),(0,i.jsx)("button",{onClick:n,className:"btn-ghost btn-sm text-gray-400 hover:text-brand-gold",title:"Favorite",children:(0,i.jsx)(u.Z,{size:14,className:t.favorited?"fill-brand-gold text-brand-gold":""})}),(0,i.jsxs)("div",{className:"relative",children:[(0,i.jsx)("button",{onClick:a,className:"btn-ghost btn-sm text-gray-400",children:(0,i.jsx)(h,{size:14})}),s&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"fixed inset-0 z-10",onClick:l}),(0,i.jsxs)("div",{className:"absolute right-0 top-8 z-20 w-44 bg-white rounded-xl shadow-card-lg border border-gray-100 py-1 animate-slide-up",children:[(0,i.jsx)(w,{icon:(0,i.jsx)(f.Z,{size:13}),label:"Duplicate",onClick:c}),(0,i.jsx)(w,{icon:(0,i.jsx)(m.Z,{size:13}),label:"archived"===t.status?"Restore":"Archive",onClick:d}),(0,i.jsx)("div",{className:"border-t border-gray-100 my-1"}),(0,i.jsx)(w,{icon:(0,i.jsx)(y.Z,{size:13}),label:"Delete",onClick:g,danger:!0})]})]})]})]})]})}function N(e){let{label:t,value:s,bold:a}=e;return(0,i.jsxs)("div",{className:"text-center",children:[(0,i.jsx)("p",{className:(0,b.cn)("text-sm",a?"font-semibold text-brand-navy":"text-gray-600"),children:s}),(0,i.jsx)("p",{className:"text-[10px] text-gray-400 uppercase tracking-wide",children:t})]})}function Z(e){let{status:t}=e;return(0,i.jsx)("span",{className:(0,b.cn)("badge","active"===t&&"badge-green","archived"===t&&"badge-gray","sold"===t&&"badge-gold"),children:t})}function w(e){let{icon:t,label:s,onClick:a,danger:r}=e;return(0,i.jsxs)("button",{onClick:a,className:(0,b.cn)("flex items-center gap-2.5 w-full px-3 py-2 text-xs transition-colors text-left",r?"text-red-500 hover:bg-red-50":"text-gray-700 hover:bg-gray-50"),children:[t,s]})}},5891:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]])},6780:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])},2940:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},6884:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},3852:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]])},690:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]])},3274:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},2513:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},4817:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},9338:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},883:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},4697:function(e,t,s){"use strict";s.d(t,{Z:function(){return i}});/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s(8030).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])}},function(e){e.O(0,[740,827,971,23,744],function(){return e(e.s=1145)}),_N_E=e.O()}]);