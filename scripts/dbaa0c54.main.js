!function(){window.App=Ember.Application.create({})}(),function(){"use strict";App.AcolytesEditController=Ember.ObjectController.extend({actions:{save:function(){this.get("model").save()},revert:function(){this.get("model").rollback()}}})}(),function(){"use strict";App.ApplicationController=Ember.Controller.extend({isIndex:function(){return"index"===this.get("currentPath")}.property("currentPath"),actions:{transitionUp:function(){var a=this.get("currentPath").split(".");"index"===a.pop()&&a.pop(),0===a.length?this.transitionToRoute("index"):this.transitionToRoute(a.join("."))}}})}(),function(){"use strict";App.SchedulesEditController=Ember.ObjectController.extend({acolytes:[]})}(),function(){"use strict";App.ServiceController=Ember.ObjectController.extend({splittedEinteilungen:function(){var a=this.get("model.einteilungen"),b=[],c=null;return a.forEach(function(a,d){d%2===0?(c=Ember.Object.create({links:a}),b.push(c)):c.rechts=a}),Ember.A(b)}.property("einteilungen.@each")})}(),function(){"use strict";App.Acolyte=DS.Model.extend({givenName:DS.attr("string"),surName:DS.attr("string"),contactPossibilities:DS.hasMany("ContactPossibility",{async:!0}),shortenedName:function(){var a=(""+this.get("surName")).split(" ");return this.get("givenName")+" "+a.map(function(a){return(""+a).slice(0,1)+"."}).join(" ")}.property("givenName","surName"),fullName:function(){return this.get("givenName")+" "+this.get("surName")}.property("givenName","surName")}),App.Acolyte.FIXTURES=[{id:1,givenName:"Max",surName:"Mustermann",contactPossibilities:[101,102]},{id:2,givenName:"Melanie",surName:"Musterfrau",contactPossibilities:[201]}]}(),function(){"use strict";App.ContactPossibility=DS.Model.extend({protocol:DS.attr("string"),value:DS.attr("string"),receiveSchedule:DS.attr("string"),htmlInputType:function(){switch(this.get("protocol")){case"mailto":return"email";case"tel":return"tel"}}.property("protocol")}),App.ContactPossibility.FIXTURES=[{id:101,protocol:"mailto",value:"max@example.com",receiveSchedule:"f"},{id:102,protocol:"tel",value:"012454 67890",receiveSchedule:"f"},{id:201,protocol:"mailto",value:"melanie@example.com",receiveSchedule:"f"}]}(),function(){"use strict";App.Einteilung=DS.Model.extend({service:DS.belongsTo("service"),acolyte:DS.belongsTo("acolyte")}),App.Einteilung.FIXTURES=[{id:1,service:1,acolyte:1},{id:2,service:1,acolyte:2}]}(),function(){"use strict";App.Schedule=DS.Model.extend({services:DS.hasMany("Service",{async:!0}),internalTitle:DS.attr("string")}),App.Schedule.FIXTURES=[{id:1,internalTitle:"Weihnachten 2013",services:[1,2,3]}]}(),function(){"use strict";App.Service=DS.Model.extend({date:DS.attr("date"),time:DS.attr("time"),annotation:DS.attr("string"),einteilungen:DS.hasMany("einteilung",{async:!0})}),App.Service.FIXTURES=[{id:1,date:"2013-12-24",time:"18:30",annotation:"Heilig Abend",einteilungen:[1,2]},{id:2,date:"2013-12-29",time:"09:00",einteilungen:[]},{id:3,date:"2014-01-01",time:"10:30",annotation:"Neujahr",einteilungen:[]}]}(),function(){App.Store=DS.Store.extend({adapter:DS.FixtureAdapter})}(),function(){"use strict";App.AcolytesIndexRoute=Ember.Route.extend({model:function(){return this.get("store").findAll("acolyte")}})}(),function(){"use strict";App.SchedulesEditRoute=Ember.Route.extend({model:function(a){return this.get("store").find("schedule",a.schedule_id)},setupController:function(a,b){a.set("model",b),a.set("acolytes",this.get("store").find("acolyte"))}})}(),function(){"use strict";App.SchedulesIndexRoute=Ember.Route.extend({model:function(){return this.get("store").findAll("schedule")}})}(),function(){"use strict";App.AcolyteDraggableTextView=Ember.View.extend({tagName:"li",attributeBindings:["draggable"],draggable:"true",value:null,dragStart:function(a){a.dataTransfer.effectAllowed="link",a.dataTransfer.setData("application/x-acolyte",this.get("value").get("id")),a.dataTransfer.setData("text/plain",this.get("value"))}})}(),function(){"use strict";App.ApplicationView=Ember.View.extend({didInsertElement:function(){$(document).foundation()}})}(),function(){"use strict";App.DroppableTextView=Ember.View.extend({tagName:"input",classNameBindings:["isDraggedOver:drag-over"],attributeBindings:["readonly","type","value"],readonly:!0,type:"text",value:function(){return this.get("model").get("shortenedName")}.property("model","model.shortenedName"),model:null,isDraggedOver:!1,loadAndSetAsValue:function(a){var b=this;b.get("controller.store").find("acolyte",a).then(function(a){b.set("model",a)})},dragEnter:function(){this.set("isDraggedOver",!0)},dragLeave:function(){this.set("isDraggedOver",!1)},dragOver:function(a){return a.preventDefault&&a.preventDefault(),!1},drop:function(a){var b=this;b.set("isDraggedOver",!1),b.loadAndSetAsValue(a.dataTransfer.getData("application/x-acolyte"))},click:function(a){var b=this;if($("html").hasClass("touch")){var c=$("#acolyteselectbox");c.offset({top:$(a.target).offset().top}),c.val(b.get("model").get("id")),c.off("change"),c.one("change",function(){b.loadAndSetAsValue.call(b,c.val())});var d=document.createEvent("MouseEvents");d.initMouseEvent("mousedown",!0,!0,window),c.get(0).dispatchEvent(d)}}})}(),function(){"use strict";App.Router.map(function(){this.resource("acolytes",{path:"acolytes"},function(){this.route("edit",{path:"/:acolyte_id"}),this.route("new")}),this.resource("schedules",function(){this.route("edit",{path:"/:schedule_id"})})})}();