(this["webpackJsonpreact-typescript-demo"]=this["webpackJsonpreact-typescript-demo"]||[]).push([[0],{25:function(e,t,n){},47:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),o=n(18),d=n.n(o),i=(n(25),n(5)),s=n(6),r=n(8),u=n(4),l=n.n(u),p=n(19),h=n(20),j=(n(47),n(0)),b="http://localhost:3005/",f=function(){var e=Object(a.useState)(""),t=Object(r.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),d=Object(r.a)(o,2),u=d[0],f=d[1],O=Object(a.useReducer)((function(e,t){switch(t.type){case"add":return[].concat(Object(i.a)(e),[t.payload]);case"update":return Object(i.a)(e).map((function(e){var n=Object(s.a)({},e);return e._id===t.payload._id?(n.isDone=!e.isDone,n):n}));case"delete":return Object(i.a)(e.filter((function(e){return e._id!==t.payload._id})));default:return Object(i.a)(e)}}),[]),v=Object(r.a)(O,2),y=v[0],g=v[1];Object(a.useEffect)((function(){f(!0),l.a.get(b+"get-todos").then((function(e){e.data.data.error||e.data.data.forEach((function(e){return g({type:"add",payload:e})})),f(!1)})).catch((function(e){console.log(e),f(!1)}))}),[]);var m=function(){var e;""!==n&&(e={value:n,isDone:!1},l.a.post(b+"add-todos",Object(s.a)({},e)).then((function(e){var t=e.data.data,n=t.isDone,a=t.value,o=t._id;g({type:"add",payload:{isDone:n,value:a,_id:o}}),c("")})).catch((function(e){console.error(e)})))};return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("header",{className:"App-header",children:"Todos"}),Object(j.jsxs)("div",{className:"todo-input-section",children:[Object(j.jsx)("input",{className:"todo-input","data-testid":"input",value:n,placeholder:"please add the task here",onChange:function(e){return c(e.target.value)},onKeyPress:function(e){return"Enter"===e.key&&m()}}),Object(j.jsx)("button",{onClick:m,"data-testid":"add-btn",children:"Add"})]}),Object(j.jsx)("div",{className:"todo-elements","data-testid":"elements",children:u?"loading...":y.map((function(e,t){return Object(j.jsxs)("div",{className:"todo-element",children:[Object(j.jsx)("input",{defaultChecked:e.isDone,type:"checkbox",className:"checkbox",onChange:function(t){return function(e,t,n){var a=Object(s.a)({},n);a[e]=t,l.a.put(b+"update-todos",Object(s.a)({},a)).then((function(e){return g({type:"update",payload:a})})).catch((function(e){return console.log(e)}))}("isDone",t.target.checked,e)},"data-testid":"checkbox"}),Object(j.jsx)("span",{style:e.isDone?{textDecoration:"line-through",color:"lightgray"}:{},children:e.value},e._id),Object(j.jsx)("span",{className:"delete-todo","data-testid":"delete-".concat(t),onClick:function(){return t=e,void l.a.delete(b+"delete-todos",{data:{_id:t._id}}).then((function(e){g({type:"delete",payload:t})})).catch((function(e){return console.log(e)}));var t},children:Object(j.jsx)(p.Icon,{path:h.a,size:"1.3rem"})})]},e._id)}))})]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,o=t.getLCP,d=t.getTTFB;n(e),a(e),c(e),o(e),d(e)}))};d.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(f,{})}),document.getElementById("root")),O()}},[[49,1,2]]]);
//# sourceMappingURL=main.d157079f.chunk.js.map