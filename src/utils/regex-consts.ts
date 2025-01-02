export const generalEmailRegex =
	/^[a-zA-Z0-9][a-zA-Z0-9_.-]*[a-zA-Z0-9]@[a-zA-Z0-9-]+(?:\.[a-zA-Zа-яА-Я0-9-]+)*\.[a-zA-Zа-яА-Я-]{2,}$/;
export const noSpecialCharEmailRegex =
	/^[^/[!"#$%&'()*+,/:;<=>?[\\\]^`{|}~\u2116\u0024\u20AC\u00A3\u00A5\u20BD\u00A9\u2122\u00AE]*$/;
export const limitedCharEmailRegex = /^[a-zA-Zа-яА-Я0-9-._@]*$/;

export const passwordRegex =
	/[a-zA-Zа-яА-Я0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\u2116\u0024\u20AC\u00A3\u00A5\u20BD\u00A9\u2122\u00AE]$/;

export const phoneRegex = /^(\+7)\d{10}$/;

// eslint-disable-next-line no-useless-escape
export const urlRegex: RegExp =
	/^(https?:\/\/)?(?:www\.|[a-zA-Z0-9-]+\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-]*)*\/?$/;

export const nickNameRegex = /^[a-zA-Z0-9_\-.]+$/;
