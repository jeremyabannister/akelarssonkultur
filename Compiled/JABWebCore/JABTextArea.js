'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JABTextArea = function (_JABView) {
	_inherits(JABTextArea, _JABView);

	function JABTextArea(customId) {
		_classCallCheck(this, JABTextArea);

		// State

		// Configuration

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JABTextArea).call(this, customId));

		_this.font = new UIFont();
		_this.textColor = 'black';
		_this.textAlign = null;
		_this.wordBreak = null;
		_this.hyphenate = null;
		_this.placeholder = '';

		// Parameters

		// UI*
		_this.textArea = "<textarea></textarea>";

		return _this;
	}

	//
	// Init
	//

	_createClass(JABTextArea, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(JABTextArea.prototype), 'init', this).call(this);
			this.startEventListeners();
		}

		//
		// Getters and Setters
		//

		// Font

	}, {
		key: 'addAllUI',


		//
		// UI
		//

		// Add
		value: function addAllUI() {
			$(this.selector).append(this.textArea);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(JABTextArea.prototype), 'updateAllUI', this).call(this);

			this.configureTextArea();
			this.positionTextArea();
		}
	}, {
		key: 'configureTextArea',
		value: function configureTextArea() {

			var configureDuration = this.animationOptions.configureDuration || 0;
			var configureEasingFunction = this.animationOptions.configureEasingFunction || 'ease-in-out';
			var configureDelay = this.animationOptions.configureDelay || 0;

			var positionDuration = this.animationOptions.positionDuration || 0;
			var positionEasingFunction = this.animationOptions.positionEasingFunction || 'ease-in-out';
			var positionDelay = this.animationOptions.positionDelay || 0;

			$(this.selector + ' > textarea').css({
				transition: 'opacity ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, background-color ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, border-radius ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, -webkit-backdrop-filter ' + configureDuration + 'ms ' + configureEasingFunction + ' ' + configureDelay + 'ms, transform ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, width ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms, height ' + positionDuration + 'ms ' + positionEasingFunction + ' ' + positionDelay + 'ms',

				'background': 'none',
				'border': 'none'
			});
		}
	}, {
		key: 'positionTextArea',
		value: function positionTextArea() {

			$(this.selector + ' > textarea').css({
				'width': this.width + 'px',
				'height': this.height + 'px'
			});
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {
			var textarea = this;
			$(this.selector + ' > textarea').keydown(function (event) {
				textarea.keyWasReleased(event);
			});
		}

		//
		// Actions
		//

	}, {
		key: 'keyWasReleased',
		value: function keyWasReleased(event) {
			var keyCode = event.keyCode || event.which;

			if (keyCode == 9) {
				event.preventDefault();
				$(this.selector + ' > textarea').val($(this.selector + ' > textarea').val() + '        ');
			}
		}

		//
		// Delegate
		//

	}, {
		key: 'font',
		get: function get() {
			return this._font;
		},
		set: function set(newFont) {
			this._font = newFont;

			// for (var i = 0; i < this.stateSelectors.length; i++) {
			// 	var property = this[this.stateSelectors[i]]
			// 	if (property != null) {
			// 		cssOptions[this.correspondingCSSSelectors[i]] = property
			// 	}
			// }

			$(this.selector + ' > textarea').css({
				'fontSize': newFont.size,
				'font-family': newFont.family,
				'font-weight': newFont.weight,
				'font-style': newFont.style,
				'font-variant': newFont.variant,
				'letter-spacing': newFont.letterSpacing,
				'line-height': newFont.lineHeight
			});
		}

		// Text Color

	}, {
		key: 'textColor',
		get: function get() {
			return this._textColor;
		},
		set: function set(newTextColor) {
			if (this.textColor != newTextColor) {
				this._textColor = newTextColor;

				$(this.selector + ' > textarea').css({
					'color': newTextColor
				});
			}
		}

		// Text Align

	}, {
		key: 'textAlign',
		get: function get() {
			return this._textAlign;
		},
		set: function set(newTextAlign) {
			this._textAlign = newTextAlign;

			if (newTextAlign != null) {
				$(this.selector).css({
					'text-align': newTextAlign
				});
			}
		}

		// Word Break

	}, {
		key: 'wordBreak',
		get: function get() {
			return this._wordBreak;
		},
		set: function set(newWordBreak) {
			this._wordBreak = newWordBreak;

			if (newWordBreak != null) {
				$(this.selector + ' > textarea').css({
					'word-break': newWordBreak
				});
			}
		}

		// Hyphenate

	}, {
		key: 'hyphenate',
		get: function get() {
			return this._hyphenate;
		},
		set: function set(newHyphenate) {
			this._hyphenate = newHyphenate;

			if (newHyphenate) {
				$(this.selector + ' > textarea').css({
					'-webkit-hyphens': 'auto',
					'-moz-hyphens': 'auto',
					'-ms-hyphens': 'auto',
					'hyphens': 'auto'
				});
			} else {
				$(this.selector + ' > textarea').css({
					'-webkit-hyphens': 'none',
					'-moz-hyphens': 'none',
					'-ms-hyphens': 'none',
					'hyphens': 'none'
				});
			}
		}

		// Placeholder

	}, {
		key: 'placeholder',
		get: function get() {
			return this._placeholder;
		},
		set: function set(newPlaceholder) {
			if (this.placeholder != newPlaceholder) {
				this._placeholder = newPlaceholder;

				$(this.selector + ' > textarea').attr({
					'placeholder': newPlaceholder
				});
			}
		}

		//
		// Font properties
		//

		// Font Size

	}, {
		key: 'fontSize',
		get: function get() {
			return this.font.size;
		},
		set: function set(newFontSize) {
			this.font.size = newFontSize;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}

		// Font Family

	}, {
		key: 'fontFamily',
		get: function get() {
			return this.font.family;
		},
		set: function set(newFontFamily) {
			this.font.family = newFontFamily;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}

		// Font Weight

	}, {
		key: 'fontWeight',
		get: function get() {
			return this.font.weight;
		},
		set: function set(newFontWeight) {
			this.font.weight = newFontWeight;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}

		// Font Style

	}, {
		key: 'fontStyle',
		get: function get() {
			return this.font.style;
		},
		set: function set(newFontStyle) {
			this.font.style = newFontStyle;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}

		// Font Variant

	}, {
		key: 'fontVariant',
		get: function get() {
			return this.font.variant;
		},
		set: function set(newFontVariant) {
			this.font.variant = newFontVariant;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}

		// Letter Spacing

	}, {
		key: 'letterSpacing',
		get: function get() {
			return this.font.letterSpacing;
		},
		set: function set(newLetterSpacing) {
			this.font.letterSpacing = newLetterSpacing;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}

		// Line Height

	}, {
		key: 'lineHeight',
		get: function get() {
			return this.font.lineHeight;
		},
		set: function set(newLineHeight) {
			this.font.lineHeight = newLineHeight;
			this.font = this.font; // Reassiging the font triggers set font which updates the DOM
		}
	}]);

	return JABTextArea;
}(JABView);