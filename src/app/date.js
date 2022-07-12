let dt = 1657360558;
let timezone = 7200;
let sunrise = 1657334511;
let sunset = 1657391847;

let date = new Date();
let datex = new Date("Tue, 21 Apr 2020 09:20:30 GMT");
let date2 = Date();
let date3 = new Date(1657391847 * 1000)

dd = date.getDay();
const options = { timeZone: "UTC", timeZoneName: "short" };

955
function daytime(sunset,sunrise){

let c = sunset-sunrise 

let hours= ''+ (c / 3600)

let minutes = ''+ (c % 3600)/60

return '' + hours.split('.')[0] + 'h' + ' ' + minutes.split('.')[0] + 'm'

}


console.log('daytime: ' + daytime(sunset,sunrise))
function time_format(d) {
  d = new Date(d * 1000);
  let tail = "";
 
  let time = [d.getHours(), d.getMinutes()];

  if (+time[0] > 12) {
    time[0] -= 12;
    tail = " PM ";
  } else tail = " AM ";

  return  "" + time.join(":") + tail;
}

console.log(time_format(1657391847));

console.log(
  "date : " + date + "  " + date.toDateString() + "  " + date.toLocaleString()
);

console.log("date2 : " + date2.toString());
console.log("date3 : " + date3);
console.log("day   :" + dd);
console.log(date.toLocaleTimeString("en-US", options));
console.log("datex   :" + datex.toString());



/* Wednesday, 08 Oct 2020 | 4:30PM 
toUTCString gives you Wed, 23 Jan 2019 09:23:42 GMT*/

function datenow(dt){

 let array = dt.toString().split(' ')
 console.log (array)
 let day = (d) => {
  let day;
  switch(d){
   case 'Mon':  day = 'Monday'; break;
   case 'Tue':  day = 'Tuesday'; break;
   case 'Wed':  day = 'Wednesday'; break;
   case 'Thu':  day = 'Thursday'; break;
   case 'Fri':  day = 'Friday'; break;
   case 'Sat':  day = 'Saturday'; break;
   case 'Sun':  day = 'Sunday'; break;
 
  }
  return day;

}

let time = array[4].split(':');
 time.pop();

if (+time[0] > 12) {
  time[0] -= 12;
  tail = "PM";
} else tail = "AM";





return day(array[0]) +',' + ' ' + array[2] + ' ' + array[1] + ' ' +  array[3] + ' ' + '|' + ' ' +  time.join(":") + tail;
 
}




console.log(datenow(date2))