(()=>{"use strict";var e={38:(e,t,n)=>{e.exports=n.p+"49570bcb1d637fdb38e5.svg"},41:(e,t,n)=>{e.exports=n.p+"a086f758840ae814ecde.svg"},117:(e,t,n)=>{e.exports=n.p+"6666407ac3aa5af1d5de.jpg"},302:(e,t,n)=>{e.exports=n.p+"a274c87c0f6b553b47ad.svg"},359:(e,t,n)=>{e.exports=n.p+"81f9808b88871ce01200.jpg"},362:(e,t,n)=>{e.exports=n.p+"d54fc136d7e0d52199e6.jpg"},384:(e,t,n)=>{e.exports=n.p+"d86bb2edc2f6eadb96b7.svg"},400:(e,t,n)=>{e.exports=n.p+"84a69e2a88582107beb5.jpg"},576:(e,t,n)=>{e.exports=n.p+"fc3e6875d825f899a98d.svg"},629:(e,t,n)=>{e.exports=n.p+"8667ac4a523e8fc42e59.svg"},871:(e,t,n)=>{e.exports=n.p+"888d78eb885c525f5e00.svg"},999:(e,t,n)=>{e.exports=n.p+"75438e944a43e4c0b404.svg"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,n),c.exports}n.m=e,n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="",n.b=document.baseURI||self.location.href;var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"c44508a0-0c2c-4cb7-9d60-63e4113ccd28","Content-Type":"application/json"}},r=function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка при удалении карточки:",e)}))},c=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)},a=function(e){e.classList.remove("popup_is-opened")},u=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&(a(t),document.removeEventListener("keydown",u))}},i=function(e,t){var n=document.getElementById("card-template").content.querySelector(".card").cloneNode(!0),o=n.querySelector(".card__image");o.src=e.link,o.alt=e.name,n.querySelector(".card__title").textContent=e.name;var c=n.querySelector(".card__like-count");c.textContent=e.likes.length,e.likes.forEach((function(e){e._id===t.userId&&n.querySelector(".card__like-button").classList.add("card__like-button_is-active")}));var a=n.querySelector(".card__delete-button");return e.owner._id===t.userId?a.addEventListener("click",(function(){return t.deleteCard(n,e._id,r)})):a.style.display="none",n.setAttribute("data-id",e._id),n.addEventListener("click",(function(n){return t.likeCard(n,e,c)})),o.addEventListener("click",(function(){return t.openImageTypePopup(e.name,e.link)})),n},s=function(e,t,n){!function(e){return e.some((function(e){return console.log(e.classList,e.validity.valid),!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},l=function(e,t,n){var o=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.setCustomValidity(""),l(e,n,t)})),s(n,o,t)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}new URL(n(384),n.b),new URL(n(117),n.b),new URL(n(400),n.b),new URL(n(359),n.b),new URL(n(362),n.b),new URL(n(871),n.b),new URL(n(302),n.b),new URL(n(629),n.b),new URL(n(999),n.b),new URL(n(38),n.b),new URL(n(576),n.b),new URL(n(41),n.b);var f,_={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active",inactiveButtonClass:"popup__button_disabled"};f=_,Array.from(document.querySelectorAll(f.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){l(e,r,t),function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,o){var r=e.querySelector("#".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),s(n,o,t)}))}))}(e,f)}));var m={deleteCard:function(e,t,n){var o=document.querySelector(".popup_type_delete-card");c(o),o.querySelector(".popup__button").addEventListener("click",(function(){n(t).then((function(){e.remove(),a(o)})).catch((function(e){console.log("Ошибка при удалении карточки",e)}))}))},likeCard:function(e){if(e.target&&e.target.classList.contains("card__like-button")){var t=e.target,n=t.closest(".card"),r=n.dataset.id,c=n.querySelector(".card__like-count");t.classList.toggle("card__like-button_is-active"),t.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка постановки лайка на карточку:",e)}))}(r).then((function(e){c.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при добавлении лайка",e),t.classList.remove("card__like-button_is-active")})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка удаления лайка с карточки",e)}))}(r).then((function(e){c.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при удалении лайка",e),t.classList.add("card__like-button_is-active")}))}},openImageTypePopup:function(e,t){var n=document.querySelector(".popup_type_image"),o=n.querySelector(".popup__image"),r=n.querySelector(".popup__caption");o.src=t,o.alt="Фотография места: ".concat(e),r.textContent=e,c(n)},userId:x},v=document.querySelector(".places__list"),y=document.querySelector(".popup__input_type_card-name"),b=document.querySelector(".popup__input_type_url"),h=document.querySelector(".popup_type_new-card .popup__form");h.addEventListener("submit",(function(e){e.preventDefault(),function(e,t){var n,r,c=h.querySelector(".popup__button");w(c,!0),(n=e.name,r=e.link,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка при отправке карточки:",e)}))).then((function(e){var n=i(e,t);v.prepend(n),h.reset(),a(document.querySelector(".popup_is-opened"))})).catch((function(e){console.log("Ошибка при добавлении карточки:",e)})).finally((function(){return w(c,!1)}))}({name:y.value,link:b.value},m)})),document.querySelectorAll(".popup").forEach((function(e){!function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(t){a(e)})),e.addEventListener("click",(function(t){t.target===t.currentTarget&&a(e)}))}(e)}));var S=document.querySelector(".popup_type_edit_avatar");document.querySelector(".avatar__edit-button").addEventListener("click",(function(){c(S),d(L,_)}));var g=document.querySelector(".popup_type_edit");document.querySelector(".profile__edit-button").addEventListener("click",(function(){j.value=document.querySelector(".profile__title").textContent,U.value=document.querySelector(".profile__description").textContent,c(g),d(E,_)}));var q=document.querySelector(".popup_type_new-card");document.querySelector(".profile__add-button").addEventListener("click",(function(){c(q),d(h,_)}));var L=document.querySelector('.popup__form[name="edit-avatar"]'),k=L.querySelector(".popup__input_type_avatar_url");L.addEventListener("submit",(function(e){e.preventDefault();var t,n=L.querySelector(".popup__button");w(n,!0),(t=k.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка при отправке аватара Пользователя:",e)}))).then((function(e){if(e){document.querySelector(".profile__image").style.backgroundImage="url('".concat(e.avatar,"')");var t=document.querySelector(".popup_is-opened");a(t),k.value=""}})).catch((function(e){console.log("Ошибка при обновлении аватара:",e)})).finally((function(){return w(n,!1)}))}));var x,C,E=document.querySelector('.popup__form[name="edit-profile"]'),j=E.querySelector(".popup__input_type_name"),U=E.querySelector(".popup__input_type_description");E.addEventListener("submit",(function(e){e.preventDefault();var t=E.querySelector(".popup__button");w(t,!0);var n,r,c=j.value,u=U.value;(n=c,r=u,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка при отправке данных Пользователя:",e)}))).then((function(e){if(e){var t=document.querySelector(".profile__title"),n=document.querySelector(".profile__description");t.textContent=c,n.textContent=u;var o=document.querySelector(".popup_is-opened");a(o)}})).catch((function(e){console.log("Ошибка при обновлении данных Пользователя:",e)})).finally((function(){return w(t,!1)}))})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log("Ошибка при получении данных Пользователя:",e)})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){return console.log(e),e})).catch((function(e){console.log("Ошибка при получении карточек:",e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){s=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];console.log("Profile Data:",r),x=r._id,m.userId=x,document.querySelector(".profile__image").style.backgroundImage="url('".concat(r.avatar,"')"),document.querySelector(".profile__title").textContent=r.name,document.querySelector(".profile__description").textContent=r.about,c.forEach((function(e){C=e._id;var t=i(e,m);v.append(t),t.setAttribute("data-id",C)}))}));var w=function(e,t){t?(e.dataset.originalText||(e.dataset.originalText=e.textContent),e.textContent="Сохранение..."):(e.textContent=e.dataset.originalText,delete e.dataset.originalText)}})();