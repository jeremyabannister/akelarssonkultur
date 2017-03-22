'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TitledParagraph = function (_JABView) {
	_inherits(TitledParagraph, _JABView);

	function TitledParagraph(customId) {
		_classCallCheck(this, TitledParagraph);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TitledParagraph).call(this, customId));

		_this.title = '';
		_this.text = '';
		_this.textIndent = 0;
		_this.textAlign = 'left';
		_this.requiredHeight = 0;

		// Parameters
		_this.parameters = {
			topBufferForTextLabel: 10
		};

		// UI
		_this.titleLabel = new UILabel('TitleLabel');
		_this.textLabel = new UILabel('TextLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(TitledParagraph, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(TitledParagraph.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addTitleLabel();
			this.addTextLabel();
		}
	}, {
		key: 'addTitleLabel',
		value: function addTitleLabel() {
			this.addSubview(this.titleLabel);
		}
	}, {
		key: 'addTextLabel',
		value: function addTextLabel() {
			this.addSubview(this.textLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(TitledParagraph.prototype), 'updateAllUI', this).call(this);

			this.configureTitleLabel();
			this.positionTitleLabel();

			this.configureTextLabel();
			this.positionTextLabel();
		}

		// Title Label

	}, {
		key: 'configureTitleLabel',
		value: function configureTitleLabel() {
			var view = this.titleLabel;

			if (view.text == '') {
				view.text = this.title;
			}

			view.textColor = 'black';
			view.fontSize = 18;
			view.fontFamily = 'siteFont';
			view.fontWeight = 'bold';
		}
	}, {
		key: 'positionTitleLabel',
		value: function positionTitleLabel() {
			var view = this.titleLabel;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Text Label

	}, {
		key: 'configureTextLabel',
		value: function configureTextLabel() {
			var view = this.textLabel;

			if (view.text == '') {
				view.text = this.text;
			}

			view.textColor = '#999999';
			view.fontSize = { 'xxs': 13, 'xs': 20, 's': 14, 'm': 14, 'l': 14, 'xl': 14 }[sizeClass];
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';
			view.lineHeight = { 'xxs': 1.5, 'xs': 1.8, 's': 1.7, 'm': 1.7, 'l': 1.7, 'xl': 1.7 }[sizeClass];
			view.textIndent = this.textIndent;

			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				view.textAlign = 'justify';
				view.textJustify = 'inter-word';
			} else {
				view.textAlign = this.textAlign;
				view.textJustify = 'auto';
			}
		}
	}, {
		key: 'positionTextLabel',
		value: function positionTextLabel() {
			var view = this.textLabel;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			var size = view.font.sizeOfString(view.text, newFrame.size.width);
			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.titleLabel.bottom + this.parameters.topBufferForTextLabel;

			view.frame = newFrame;
			this.requiredHeight = view.bottom;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

	}, {
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {
			var size = this.textLabel.font.sizeOfString(this.textLabel.text, width);
			return this.titleLabel.height + this.parameters.topBufferForTextLabel + size.height;
		}

		//
		// Delegate
		//

	}]);

	return TitledParagraph;
}(JABView);