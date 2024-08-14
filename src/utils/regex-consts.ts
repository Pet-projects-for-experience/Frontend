export const generalEmailRegex =
	/^[a-zA-Z0-9][a-zA-Z0-9_.-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(?:\.[a-zA-Zа-яА-Я0-9-]+)*\.[a-zA-Zа-яА-Я-]{2,}$/;
export const noSpecialCharEmailRegex =
	/^[^/[!"#$%&'()*+,/:;<=>?[\\\]^`{|}~\u2116\u0024\u20AC\u00A3\u00A5\u20BD\u00A9\u2122\u00AE]*$/;
export const limitedCharEmailRegex = /^[a-zA-Zа-яА-Я0-9-._@]*$/;

export const passwordRegex =
	/[a-zA-Zа-яА-Я0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\u2116\u0024\u20AC\u00A3\u00A5\u20BD\u00A9\u2122\u00AE]$/;