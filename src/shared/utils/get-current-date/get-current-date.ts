const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря',
];
export const getDate = (date: string) => {
	return date ? `${date?.slice(-2)} ${months[new Date(date).getMonth()]}` : ' ';
};
