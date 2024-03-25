import * as yup from 'yup';

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Поле обязательно для заполнения')
		.email('Проверьте правильность ввода')
		.trim()
		.min(6, 'Проверьте правильность ввода')
		.max(256, 'Проверьте правильность ввода')
		.matches(
			/^[a-zA-Z0-9][a-zA-Z0-9_.-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(?:\.[a-zA-Zа-яА-Я0-9-]+)*\.[a-zA-Zа-яА-Я-]{2,}$/,
			'Проверьте правильность ввода'
		)
		.matches(
			/^[^/[!"#$%&'()*+,/:;<=>?[\\\]^`{|}~\u2116\u0024\u20AC\u00A3\u00A5\u20BD\u00A9\u2122\u00AE]*$/,
			'Проверьте правильность ввода'
		)
		.matches(/^[a-zA-Zа-яА-Я0-9-._@]*$/, 'Только буквы (A-z, А-я), цифры (0-9)')
		.max(256, 'Проверьте правильность ввода'),
	password: yup
		.string()
		.trim()
		.required('Поле обязательно для заполнения')
		.min(8, 'Проверьте правильность ввода')
		.max(20, 'Проверьте правильность ввода')
		.matches(
			/[a-zA-Zа-яА-Я0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\u2116\u0024\u20AC\u00A3\u00A5\u20BD\u00A9\u2122\u00AE]$/,
			'Проверьте правильность ввода'
		),
});
export default schema;
