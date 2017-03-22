'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoverableTextOverlay = function (_JABView) {
	_inherits(HoverableTextOverlay, _JABView);

	function HoverableTextOverlay(customId) {
		_classCallCheck(this, HoverableTextOverlay);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HoverableTextOverlay).call(this, customId));

		_this.hovered = false;
		_this.text = '';

		// Parameters
		_this.parameters = {
			fractionOfWidthForLabel: 0.7,
			rightBufferForLabel: 20,
			topBufferForLabel: 20
		};

		// UI
		_this.dimmer = new JABView('Dimmer');
		_this.label = new UILabel('Label');

		return _this;
	}

	//
	// Init
	//

	_createClass(HoverableTextOverlay, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(HoverableTextOverlay.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addDimmer();
			this.addLabel();
		}
	}, {
		key: 'addDimmer',
		value: function addDimmer() {
			this.addSubview(this.dimmer);
		}
	}, {
		key: 'addLabel',
		value: function addLabel() {
			this.addSubview(this.label);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(HoverableTextOverlay.prototype), 'updateAllUI', this).call(this);

			this.configureDimmer();
			this.positionDimmer();

			this.positionLabel();
			this.configureLabel();
		}

		// Dimmer

	}, {
		key: 'configureDimmer',
		value: function configureDimmer() {
			var view = this.dimmer;
			view.hoverable = true;
			view.backgroundColor = 'black';
			view.opacity = { true: 0.3, false: 0 }[this.hovered];
		}
	}, {
		key: 'positionDimmer',
		value: function positionDimmer() {
			var view = this.dimmer;
			var newFrame = this.bounds;
			view.frame = newFrame;
		}

		// Label

	}, {
		key: 'configureLabel',
		value: function configureLabel() {
			var view = this.label;

			if (view.text == '') {
				view.text = this.text;
			}

			view.textColor = 'white';
			view.fontSize = 16;
			view.fontFamily = 'siteFont';
			view.textAlign = 'right';

			view.opacity = { true: 1, false: 0 }[this.hovered];
		}
	}, {
		key: 'positionLabel',
		value: function positionLabel() {
			var view = this.label;
			var newFrame = new CGRect();
			var size = view.font.sizeOfString(view.text, this.width * this.parameters.fractionOfWidthForLabel);

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.width - newFrame.size.width - this.parameters.rightBufferForLabel;
			newFrame.origin.y = this.parameters.topBufferForLabel;

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

		//
		// Actions
		//

		//
		// Delegate
		//

		// JABView

	}, {
		key: 'viewWasHovered',
		value: function viewWasHovered(view) {
			this.hovered = true;
			this.animatedUpdate();
		}
	}, {
		key: 'viewWasUnhovered',
		value: function viewWasUnhovered(view) {
			this.hovered = false;
			this.animatedUpdate();
		}
	}]);

	return HoverableTextOverlay;
}(JABView);