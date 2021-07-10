'use strict';

// const program = require('commander');
const superagent = require('superagent');
const dayjs = require('dayjs');
const uuid = 'GFFTHFYOBDB57WUG';

// program
//   .version('0.0.1')
//   .requiredOption('-d, --date_time <type>', 'set calendly event_type')
//   .parse(process.argv);

// const options = program.opts();
// if (!options.date_time) {
//   console.log('オプションを指定してください。ex: node app.js -d 18:00');

//   return;
// }
const optionDateTime = '18:00';

module.exports = async () => {
  try {
    const url = `https://calendly.com/api/booking/event_types/${uuid}/calendar/range`;
    const query = {
      timezone: 'Asia/Tokyo',
      diagnostics: false,
      range_start: dayjs(new Date()).format('YYYY-MM-DD'),
      range_end: dayjs(new Date()).add(1, 'month').format('YYYY-MM-DD'),
    };
    const response = await superagent.get(url).query(query);
    const days = JSON.parse(response.text)['days'];

    const messageAA =
      `--∧＿∧----\n
      （　´∀｀）＜　直近１ヶ月の${optionDateTime}に空いている日程やで\n
      -------つ--`;

    const timeMsg = days.map(day => {
      return day['spots']
        .flatMap((x) => x['start_time'])
        .filter((x) => optionDateTime === dayjs(x).format('HH:mm'))
        .map((x) => dayjs(x).format('MM月DD日 HH:mm'));
    })
    .reduce((acc, x) => acc.concat(`\n${x}`), []);
    const message = [messageAA].concat(timeMsg).join('\n');

    return message;

  } catch (error) {
    return error.response.body;
  }
};