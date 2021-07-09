'use strict';
const program = require('commander');
const superagent = require('superagent');
const dayjs = require('dayjs');
const uuid = 'GFFTHFYOBDB57WUG';

program
  .version('0.0.1')
  .requiredOption('-d, --date_time <type>', 'set calendly event_type')
  .parse(process.argv);

const options = program.opts();
if (!options.date_time) {
  console.log('オプションを指定してください。ex: node app.js -d 18:00');

  return;
}

(async () => {
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

    console.log(
      ' --∧＿∧----\n', // eslint-disable-next-line no-irregular-whitespace
      `（　´∀｀）＜　直近１ヶ月の${options.date_time}に空いている日程やで\n`,
      '-------つ--'
    );

    for (const day of days) {
      day['spots']
        .flatMap((x) => x['start_time'])
        .filter((x) => options.date_time === dayjs(x).format('HH:mm'))
        .map((x) => console.log(dayjs(x).format('MM月DD日 HH:mm')));
    }
  } catch (error) {
    console.log(error.response.body);
  }
})();
