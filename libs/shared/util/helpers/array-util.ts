// grupBy
// Group array by certain key
// The following is example about how to use this function
// const pets = [
//   {type:"Dog", name:"Spot"},
//   {type:"Cat", name:"Tiger"},
//   {type:"Dog", name:"Rover"},
//   {type:"Cat", name:"Leo"}
// ];
// const grouped = groupBy(pets, pet => pet.type);
import * as moment from 'moment'

export const getValueForKey = (key: string, data: any) => {
  if(!key) return null;
  const keys: string[] = key.split('.');
  let value = keys.reduce((acc, currentKey) => {
    if(!acc) return null;
    return acc[currentKey]
  }, data)
  return value;
}

export const groupBy = (list: any[], keyGetter: Function) => {
  const map: any = {}
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map[key];
       if (!collection) {
           map[key] = [item];
       } else {
           collection.push(item);
       }
  });
  return map;
}

export const groupByList = (list: any[], keyGetter: Function) => {
  const map: any = {}
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map[key];
       if (!collection) {
           map[key] = [item];
       } else {
           collection.push(item);
       }
  });
  const grouped: Record<string, any> = groupBy(list, keyGetter);
  const result = []
  for (const key in grouped) {
    let tempHours = grouped[key]
    tempHours = tempHours.map( item => {
      item.startTime = (moment(item.startTime, 'hh:mm A').isValid())?moment(item.startTime, 'hh:mm A').format('HH:mm'):item.startTime;
      item.endTime = (moment(item.endTime, 'hh:mm A').isValid())?moment(item.endTime, 'hh:mm A').format('HH:mm'):item.endTime;
      return item
    });
    result.push({
      key: key, items: tempHours
    })
  }

  const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  result.sort((a, b) => WeekDays.indexOf(a.key) - WeekDays.indexOf(b.key))
  console.log(result);
  return result;
}

export const isContainValue = (list: any[], value: any)=>{
  const findIndex = list.includes(value);
  return (findIndex)?true:false;
}
