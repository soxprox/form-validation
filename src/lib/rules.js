export const validationRules = {
	alpha(value) {
		return /^[a-zA-Z]+$/.test(value);
	},
  string(value) {
    return typeof value === 'string';
  },
	notEmpty(value) {
		return !!value.trim();
	},
	empty(value) {
		return !value.trim();
	},
	maxLength(value, args) {
		if (value.length > args[1]) {
			return false;
		}
		return true;
	},
	minLength(value, args) {
		if (value.length < args[1]) {
			return false;
		}
		return true;
	},
	length(value, args) {
		if (value.length != args[1]) {
			return false;
		}
		return true;
	},

	lengthBetween(value, args) {
		if (value.length >= args[1] && value.length <= args[2]) {
			return true;
		}
		return false;
	},

	equal(value, args) {
		if (value == args[1]) {
			return true;
		}
		return false;
	},

	notEqual(value, args) {
		if (value != args[1]) {
			return true;
		}
		return false;
	},
	inArray(value, args) {
		const arrayValues = args[1].split(',');
		if (arrayValues.indexOf(value) > -1) {
			return true;
		}
		return false;
	},

	notInArray(value, args) {
		const arrayValues = args[1].split(',');
		if (arrayValues.indexOf(value) == -1) {
			return true;
		}
		return false;
	},
	inRegex(value, args) {
		const regex = new RegExp(args[1]);
		return regex.test(value);
	},
	notInRegex(value, args) {
		const regex = new RegExp(args[1]);
		return !regex.test(value);
	},
	includesAllWords(value, args) {
		let errors = false;
		const arrayValues = args[1].split(',');
		arrayValues.forEach((word) => {
			if (!value.toLowerCase().includes(word.toLowerCase())) {
				errors = true;
			}
		});
		return !errors;
	},
	doesNotIncludeWords(value, args) {
		let errors = false;
		const arrayValues = args[1].split(',');
		arrayValues.forEach((word) => {
			if (value.toLowerCase().includes(word.toLowerCase())) {
				errors = true;
			}
		});
		return !errors;
	},
	url(value) {
		const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
		return regex.test(value);
	},
	email(value) {
		const regex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regex.test(value);
	},

	// Numeric rules
	numeric(value) {
		return !isNaN(value);
	},
	lessThan(value, args) {
		return value < args[1];
	},
	greaterThan(value, args) {
		return value > args[1];
	},
	integer(value) {
		return Number.isInteger(value);
	},
	float(value) {
		return Number(value) === value && value % 1 !== 0;
	}
};