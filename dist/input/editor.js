import {
  DynamicCalendar
} from '../../index.js'

export const components = {
  DynamicCalendar
}

export const config = {"logo":"./logo.png","displayName":"Calendar","name":"dynamic-calendar","version":"dev","components":[{"name":"DynamicCalendar","displayName":"Calendar","icon":"./icon.png","defaultWidth":400,"defaultHeight":350,"props":[{"name":"items","displayName":"What events should be displayed?","type":"list"},{"name":"language","displayName":"Language","type":"text","default":"English","control":{"type":"menu","options":[{"label":"Arabic","value":"Arabic"},{"label":"Chinese","value":"Chinese"},{"label":"English","value":"English"},{"label":"French","value":"French"},{"label":"German","value":"German"},{"label":"Hindi","value":"Hindi"},{"label":"Japanese","value":"Japanese"},{"label":"Portuguese","value":"Portuguese"},{"label":"Spanish","value":"Spanish"}]}},{"name":"mondayBegin","displayName":"First Day of the Week","type":"text","default":"Sunday","control":{"type":"menu","options":[{"label":"Sunday","value":"Sunday"},{"label":"Monday","value":"Monday"}]}},{"name":"eventStarttime","displayName":"Event Start","role":"listItem","reference":"items","type":"date"},{"name":"eventEndtime","displayName":"Event End","role":"listItem","reference":"items","type":"date"},{"name":"oneEventAction","displayName":"Clicking days with only one event should...","type":"text","default":"action","control":{"type":"menu","options":[{"label":"Run an Action","value":"action"},{"label":"Open the Agenda View","value":"agenda"}]}},{"name":"onPressCalendar","displayName":"Click Actions","type":"action","role":"listItem","reference":"items","enabled":{"oneEventAction":"action"}}],"childComponents":[{"name":"colors","displayName":"Colors","props":[{"name":"activeColor","displayName":"Active Color","type":"color","default":"@primary"},{"name":"textColor","displayName":"Text Color","type":"color","default":"#424242"},{"name":"disabledColor","displayName":"Disabled Text Color","type":"color","default":"#CCCCCC"},{"name":"bgColor","displayName":"Background Color","type":"color","default":"#ffffff"},{"name":"headingTextColor","displayName":"Heading Text Color","type":"color","default":"#000000"}]},{"name":"navigation","displayName":"Navigation","props":[{"name":"defDate","displayName":"Default Selected Date","type":"text","placeholder":"YYYY-MM-DD"},{"name":"minDate","displayName":"Earliest Selectable Date","type":"text","placeholder":"YYYY-MM-DD","default":"2019-01-01"},{"name":"maxDate","displayName":"Latest Selectable Date","type":"text","placeholder":"YYYY-MM-DD","default":"2021-01-01"},{"name":"changeMonths","displayName":"Allow Changing Months?","type":"boolean","default":true},{"name":"markingStyle","displayName":"Multi-Day Event Marking Style","type":"text","default":"multi-dot","control":{"type":"menu","options":[{"label":"Dots","value":"multi-dot"},{"label":"Bars","value":"multi-period"}]}}]},{"name":"agenda","displayName":"Agenda View","role":"listItem","reference":"items","props":[{"name":"agendaRender","displayName":"Show Preview of Agenda View","type":"boolean","default":false},{"name":"eventBgColor","displayName":"Event Background Color","type":"color","default":"#ffffff"},{"name":"eventTextColor","displayName":"Event Text Color","type":"color","default":"#000000"},{"name":"eventTitle","displayName":"Event Titles","type":"text"},{"name":"eventSubtitle","displayName":"Event Subtitles","type":"text"},{"name":"onPressEvent","displayName":"Click Actions","type":"action"}]}],"resizeY":true}]}