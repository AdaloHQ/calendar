import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import EventCalendar from './eventCal/EventCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {LocaleConfig} from 'react-native-calendars';
import * as moment from 'moment';

LocaleConfig.locales['Chinese'] = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
};

LocaleConfig.locales['English'] = {
	monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
	monthNamesShort: ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'],
	dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	dayNamesShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
};

LocaleConfig.locales['French'] = {
	monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
	monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
	dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
};

LocaleConfig.locales['German'] = {
	monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September','Oktober','November','Dezember'],
	monthNamesShort: ['Jan.','Feb.','Mär.','Apr.','Mai','Jun.','Jul.','Aug.','Sept.','Okt.','Nov.','Dez.'],
	dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
	dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
};

LocaleConfig.locales['Spanish'] = {
	monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
	monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Set.','Oct.','Nov.','Dic.'],
	dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
	dayNamesShort: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
};

class DynamicCalendar extends Component {
	
	constructor(props) {
		super(props);
		this.multiDotRender.bind(this)
		this.getDates.bind(this)
		this.insertHash.bind(this)
		this.pushDate.bind(this)
		this.formatDate.bind(this)
		this.pushAgendaEvents.bind(this)
		this.state = {
			calendarRender: true,
			chosenDay:  '2020-06-13',
			realWidth: 400,
		};
	  }
	  onDayPress = (day) => {
		this.setState({chosenDay: day.dateString});
		this.setState({realWidth: document.getElementById('foo').getBoundingClientRect().width});
		this.setState({calendarRender: !this.state.calendarRender});
	  }
	  
	  eventClicked(event) {

	  }

	  goBack() {
		this.setState({calendarRender: !this.state.calendarRender});
	  }

	  multiDotRender(number, activeColor){
		  let markerDots = {color: activeColor};
		  let multiDotArray = [markerDots]
		  for (let i = 0; i < number-1; ++i){
			multiDotArray.push(markerDots)
		  }
		  return multiDotArray
	  }
	  
	  getDates(startDate, endDate) {
		let dates = [],
		currentDate = startDate,
		addDays = function(days) {
			let date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		},
		subDays = function(days) {
			let date = new Date(this.valueOf());
			date.setDate(date.getDate() - days);
			return date;
		};
		while (currentDate <= endDate) {
			currentDate = addDays.call(currentDate, 1);
			dates.push(subDays.call(currentDate, 1));
		}
		return dates;
	  }
	
	insertHash(array, hash, property){
		if(hash.get(array) == undefined){
			let tempArray = []
			tempArray.push(property)
			hash.set(array, tempArray);
		}
		else{
			let tempArray = []
			tempArray = hash.get(array)
			tempArray.push(property)
			hash.set(array, tempArray);
		}
	}

	pushDate(date, markedDatesArray, periodArray){
		let datePush = date.getFullYear() + "-"
		if(date.getMonth()+1 > 10){ 
			datePush += (date.getMonth()+1) 
		}
		else{
			datePush += '0' + (date.getMonth()+1) 
		}
		if(date.getDate()+1 > 10){
			markedDatesArray.push(datePush += "-" + date.getDate())
			if(periodArray != undefined){
				periodArray.push(datePush)
			}
		}
		else{
			markedDatesArray.push(datePush += "-0" + date.getDate())
			if(periodArray != undefined){
				periodArray.push(datePush)
			}
		}
		return datePush
	}

	formatDate(date, wantTime){
		let datePush = date.getFullYear() + "-"
		if(date.getMonth()+1 > 10){ 
			datePush += (date.getMonth()+1) 
		}
		else{
			datePush += '0' + (date.getMonth()+1) 
		}
		if(date.getDate()+1 > 10){
			datePush += "-" + date.getDate()
		}
		else{
			datePush += "-0" + date.getDate()		
		}
		if(wantTime){
			if(date.getHours() > 10){
				datePush += " " + date.getHours()
			}
			else{
				datePush += " 0" + date.getHours()		
			}
			if(date.getMinutes() > 10){
				datePush += ":" + date.getMinutes()
			}
			else{
				datePush += ":0" + date.getMinutes()		
			}
		}
		return datePush
	}

	pushAgendaEvents(agendaEvents, start, end, title, subtitle){
		agendaEvents.push(
			{ 
				start: start, 
				end: end, 
				title: title, 
				summary: subtitle
			}
		)
	}
	  
	  render() {
		// calendar
		let { items, language, mondayBegin, periodMarking, colors, navigation, agenda } = this.props;
		let markerStyle = 'multi-dot'
		if(periodMarking){
			markerStyle = 'multi-period'
		}
		let monday = 0;
		if(mondayBegin){
			monday = 1;
		}
		LocaleConfig.defaultLocale = language;
		let monthValue = this.state.chosenDay.substring(this.state.chosenDay.length-5,this.state.chosenDay.length-3);
		if(this.state.chosenDay[this.state.chosenDay.length-5].localeCompare('0') == 0){
			monthValue = this.state.chosenDay.substring(this.state.chosenDay.length-4,this.state.chosenDay.length-3);
		}
		let yearValue = this.state.chosenDay.substring(0,this.state.chosenDay.length-6);
		let dayValue = this.state.chosenDay.substring(this.state.chosenDay.length-2,this.state.chosenDay.length);
		// colors
		let { activeColor, textColor, disabledColor, bgColor, headingTextColor } = colors;
		// navigation
		let { defDate, minDate, maxDate, changeMonths } = navigation;
		let formats = [
			moment.ISO_8601,
			"YYYY-MM-DD"
		];
		let startDate = moment().format("YYYY-MM-DD");

		if (moment(defDate, formats, true).isValid()){
			startDate = defDate;
		}
		const nextDays = [
			startDate
		];
		let calAgendaObject = {};
		nextDays.forEach((day) => {
			calAgendaObject[day] = {
			selected: true
		};
		});
		// agenda
		let eventBgColorPass = "#ffffff"
		let eventTextColorPass = "#000000"
		let agendaRenderPass = false
		let agendaEvents = []
		if(items != undefined && items != null){
			let { eventBgColor, eventTextColor, agendaRender, onPressEvent } = items[0].agenda;
			eventBgColorPass = eventBgColor
			eventTextColorPass = eventTextColor
			agendaRenderPass = agendaRender
			let eventTitleArray = []
			let eventSubtitleArray = []
			let eventStarttimeArray = []
			let eventEndtimeArray = []
			let markedDatesArray = []
			let periodHash = new Map()
			for(let i = 0; i < items.length; ++i){
				eventTitleArray.push(items[i].agenda.eventTitle)
				eventSubtitleArray.push(items[i].agenda.eventSubtitle)
				eventStarttimeArray.push(items[i].agenda.eventStarttime)
				eventEndtimeArray.push(items[i].agenda.eventEndtime)
				let periodArray = []
				if(items[i].agenda.eventEndtime != undefined && items[i].agenda.eventStarttime != undefined ){
					if (this.formatDate(new Date(eventStarttimeArray[i]), false) != this.formatDate(new Date(eventEndtimeArray[i]), false)){
						let dates = this.getDates(new Date(eventStarttimeArray[i]).setHours(0, 0, 0, 0), new Date(eventEndtimeArray[i]).setHours(0, 0, 0, 0));                                                                                                    
						for(let j = 0; j < dates.length; ++j){
							this.pushDate(dates[j], markedDatesArray, periodArray)
						}
					}
					else{
						markedDatesArray.push(this.formatDate(new Date(eventEndtimeArray[i]), false))
						periodArray.push(this.formatDate(new Date(eventEndtimeArray[i]), false))
					}
				}
				periodHash.set(i, periodArray)
			}
			let datesHash = new Map()
			for(let i = 0; i < markedDatesArray.length; ++i){
				let count = 0
				for(let j = 0; j < markedDatesArray.length; ++j){
					if (markedDatesArray[i] == markedDatesArray[j]){
						count++;
					}
				}
				datesHash.set(markedDatesArray[i], count)
			}
			let overlapArray = []
			for(let i = 0; i < markedDatesArray.length; ++i){
				if (datesHash.get(markedDatesArray[i]) > 1){
					overlapArray.push(markedDatesArray[i])
				}
			}
			let overlapMarkedArray = []
			for(let i = 0; i < periodHash.size; ++i){
				let count = 0
				for(let j = 0; j < periodHash.get(i).length; ++j){
					for(let k = 0; k < overlapArray.length; ++k){
						if(overlapArray[k] == periodHash.get(i)[j]){
							count++
						}
					}
				}
				if(count != 0){
					periodHash.get(i).forEach((day) => {
						overlapMarkedArray.push(day)
					});
				}
			}
			if(!periodMarking){
				markedDatesArray.forEach((day) => {
					calAgendaObject[day] = {
					dots: this.multiDotRender(datesHash.get(day), activeColor)
				};
				});
			}
			else{
				let finalHash = new Map()
				for(let i = 0; i < periodHash.size; ++i){
					let startingDayTrue = {startingDay: true, endingDay: false, color: activeColor};
					let endingDayTrue = {startingDay: false, endingDay: true, color: activeColor};
					let neitherTrue = {startingDay: false, endingDay: false, color: activeColor};
					let datesArray = periodHash.get(i)
					let maxSize = 0;
					if (datesArray.length == 1){
						this.insertHash(datesArray[0], finalHash, {startingDay: true, endingDay: true, color: activeColor})
					}
					else{
						this.insertHash(datesArray[0], finalHash, startingDayTrue)
						for(let j = 1; j < datesArray.length-1; ++j){
							this.insertHash(datesArray[j], finalHash, neitherTrue)
						}
						this.insertHash(datesArray[datesArray.length-1], finalHash, endingDayTrue)
					}
					for (let j = 0; j < finalHash.size; ++j){
						if (finalHash.get(overlapMarkedArray[j]) != undefined){
							if (finalHash.get(overlapMarkedArray[j]).length > maxSize){
								maxSize = finalHash.get(overlapMarkedArray[j]).length
							}
						}
					}
					for (let j = 0; j < overlapMarkedArray.length; ++j){
						if (finalHash.get(overlapMarkedArray[j]) != undefined){
							while (finalHash.get(overlapMarkedArray[j]).length != maxSize){
								let tempArray = finalHash.get(overlapMarkedArray[j])
								tempArray.push({color: 'transparent'})
								finalHash.set(overlapMarkedArray[j], tempArray);
							}
						}
						else{
							let tempArray = []
							tempArray.push({color: 'transparent'})
							finalHash.set(overlapMarkedArray[j], tempArray);
						}
					}
				}
				markedDatesArray.forEach((day) => {
					calAgendaObject[day] = {
					periods: finalHash.get(day)
				};
				});
			}
			for(let i = 0; i < items.length; ++i){
				let startTime = new Date(eventStarttimeArray[i]).getFullYear() + "-" + (new Date(eventStarttimeArray[i]).getMonth()+1) + '-' + new Date(eventStarttimeArray[i]).getDate()
				let endTime = new Date(eventEndtimeArray[i]).getFullYear() + "-" + (new Date(eventEndtimeArray[i]).getMonth()+1) + '-' + new Date(eventEndtimeArray[i]).getDate()
				if(startTime == endTime){
					this.pushAgendaEvents(agendaEvents, this.formatDate(new Date(eventStarttimeArray[i]), true), this.formatDate(new Date(eventEndtimeArray[i]), true), eventTitleArray[i], eventSubtitleArray[i])
				}
				else{
					this.pushAgendaEvents(agendaEvents, this.formatDate(new Date(eventStarttimeArray[i]), true), this.formatDate(new Date(eventStarttimeArray[i]), false) + " 23:59", eventTitleArray[i], eventSubtitleArray[i])
					let dates = this.getDates(new Date(startTime),new Date(endTime));   
					for(let j = 1; j < dates.length - 1; ++j){
						let datePush = this.pushDate(dates[j], markedDatesArray)
						this.pushAgendaEvents(agendaEvents, datePush + ' 00:00', datePush + ' 23:59', eventTitleArray[i], eventSubtitleArray[i])
					}
					this.pushAgendaEvents(agendaEvents, this.formatDate(new Date(eventEndtimeArray[i]), false) + " 00:00", this.formatDate(new Date(eventEndtimeArray[i]), true), eventTitleArray[i], eventSubtitleArray[i])
				}
			}
		}
		if((agendaRenderPass && !this.state.calendarRender) || (!agendaRenderPass && this.state.calendarRender)){
			return (
				<div id="foo">
				<View style={{ flex: 1, marginTop: 20 }}>
					<Calendar
						firstDay={monday}
						onDayPress={this.onDayPress}
						minDate = {minDate}
						maxDate = {maxDate}
						current = {startDate}
						hideArrows={!changeMonths}
						renderArrow={(direction) => direction === 'left' ? <FontAwesomeIcon icon={faChevronLeft} color={activeColor}/> : <FontAwesomeIcon icon={faChevronRight} color={activeColor}/>}
						markedDates={calAgendaObject}
						markingType={markerStyle}
						theme={{
							calendarBackground: bgColor,
							textSectionTitleColor: textColor,
							selectedDayBackgroundColor: bgColor,
							selectedDayTextColor: activeColor,
							todayTextColor: textColor,
							dayTextColor: textColor, 
							textDisabledColor: disabledColor,  
							dotColor: activeColor,
							selectedDotColor: activeColor,
							monthTextColor: headingTextColor,
							textDayFontWeight: '300',
							textMonthFontWeight: 'bold',
							textDayHeaderFontWeight: '300',
							textDayFontSize: 16,
							textMonthFontSize: 16,
							textDayHeaderFontSize: 16
						}}
					/>
				</View>
				</div>
			);
		}
		else{
			return (
				<View style={{ flex: 1, marginTop: 20 }}>
				  <EventCalendar {...this.props} title={dayValue + " " + LocaleConfig.locales[language].monthNames[monthValue - 1] + " " + yearValue} headerColor={bgColor} headerTextColor={headingTextColor} eventBgColor={eventBgColorPass} eventTextColor={eventTextColorPass}
					eventTapped={this.eventClicked.bind(this)}
					backButton={this.goBack.bind(this)}
					events={agendaEvents}
					width={this.state.realWidth}
					initDate={this.state.chosenDay}
					scrollToFirst
				  />
				</View>
			  );
		}
	  }
	}

export default DynamicCalendar


	// let overlapHash = new Map()
	// let noOverlapHash = new Map()
	// let overlapMarkedArray = []
	// for(let i = 0; i < periodHash.size; ++i){
	// 	let count = 0
	// 	for(let j = 0; j < periodHash.get(i).length; ++j){
	// 		for(let k = 0; k < overlapArray.length; ++k){
	// 			if(overlapArray[k] == periodHash.get(i)[j]){
	// 				count++
	// 			}
	// 		}
	// 	}
	// 	if(count != 0){
	// 		overlapHash.set(overlapHash.size, periodHash.get(i))
	// 		periodHash.get(i).forEach((day) => {
	// 			overlapMarkedArray.push(day)
	// 		});
	// 	}
	// 	else{
	// 		noOverlapHash.set(noOverlapHash.size, periodHash.get(i))
	// 	}
	// }

	// for(let i = 0; i < overlapHash.size; ++i){
	// 	periodHash.set(i, overlapHash.get(i))
	// }
	// for(let i = 0; i < noOverlapHash.size; ++i){
	// 	periodHash.set(i+overlapHash.size, noOverlapHash.get(i))
	// }