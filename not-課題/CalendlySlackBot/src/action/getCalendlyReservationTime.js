'use strict';

const superagent = require('superagent');
const uuid = 'GFFTHFYOBDB57WUG'; // Calendlyの対象ユーザーのID（CalendlyページのNetworkにhttps://calendly.com/api/booking/event_types/${uuid}/calendar/rangeがあるので探せば確認できる）
const dayjs = require('dayjs');
require('dayjs/locale/ja');
dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.extend(require('dayjs/plugin/utc'));
dayjs.locale('ja');
dayjs.tz.setDefault('Asia/Tokyo');

module.exports = async (optionDateTime) => {
  try {
    const url = `https://calendly.com/api/booking/event_types/${uuid}/calendar/range`;
    const query = {
      timezone: 'Asia/Tokyo',
      diagnostics: false,
      range_start: dayjs(new Date()).tz().format('YYYY-MM-DD'),
      range_end: dayjs(new Date()).tz().add(1, 'month').format('YYYY-MM-DD'),
    };
    const response = await superagent.get(url).query(query);
    const days = JSON.parse(response.text)['days'];
    if(days === null || undefined) '空いている時間帯が見つかりませんでした';

    const messageAA =`--∧＿∧----\n（　´∀｀）＜　直近１ヶ月の${optionDateTime}に空いている日程やで\n-------つ--`;

    const timeMsg = days.map(day => {

      return day['spots']
        .flatMap((x) => x['start_time'])
        .filter((x) => optionDateTime === dayjs(x).tz().format('HH:mm'))
        .map((x) => dayjs(x).tz().format('MM月DD日(ddd) HH:mm'));
    })
    .reduce((acc, x) => {
      if(x === undefined || null) return acc;

      return acc.concat(x);
    });

    if(timeMsg.length === 0) return `--∧＿∧----\n（　´∀｀）＜　${optionDateTime} で予約可能な日にちは見つからなかったで。時間帯を変えてみてやで。\n-------つ--`;
    const message = [messageAA].concat(timeMsg).join('\n');
    
    return message;

  } catch (error) {
    return '処理の途中でエラーやで。時間は（例 12:00）のような形式でお願いや。解決できひん場合は @Akifumi Yoshimura  まで連絡や。';
  }
};